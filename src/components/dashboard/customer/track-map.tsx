'use client';
import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, DirectionsRenderer, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import { FaTruck, FaUserCheck } from 'react-icons/fa';
import { envConfig } from '@/lib/helpers/envConfig';

type Location = { lat: number; lng: number };
type Library = 'places' | 'drawing' | 'geometry' | 'visualization';
const libraries: Library[] = ['places'];

const TrackMap = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [agentPosition, setAgentPosition] = useState<Location>({ lat: 23.8103, lng: 90.4125 });
  const [pathCoords, setPathCoords] = useState<Location[]>([]);
  const [eta, setEta] = useState<string>('');
  const stepIndex = useRef(0);
  const mapRef = useRef<google.maps.Map | null>(null);
  const customerPosition: Location = { lat: 24.3000, lng: 91.8000 };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: envConfig.google_api_key!,
    libraries,
  });

  useEffect(() => {
    if (!isLoaded) return;
    const origin = { lat: 23.8103, lng: 90.4125 };
    const destination = customerPosition;
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: { departureTime: new Date(), trafficModel: google.maps.TrafficModel.BEST_GUESS }
      },
      (result, status) => {
        if (status === 'OK' && result?.routes?.length) {
          setDirections(result);
          const routeSteps = result.routes[0].legs?.[0]?.steps ?? [];
          const coords: Location[] = [];
          routeSteps.forEach(step =>
            step.path.forEach(p => coords.push({ lat: p.lat(), lng: p.lng() }))
          );
          setPathCoords(coords);
          const duration = result.routes[0].legs?.[0]?.duration?.text ?? '';
          setEta(duration);
        }
      }
    );
  }, [isLoaded]);

  // Animate agent along route
  useEffect(() => {
    if (!pathCoords.length) return;

    const interval = setInterval(() => {
      setAgentPosition(pathCoords[stepIndex.current]);
      stepIndex.current += 1;
      if (stepIndex.current >= pathCoords.length) clearInterval(interval);

      mapRef.current?.panTo(pathCoords[stepIndex.current] || pathCoords[pathCoords.length - 1]);
    }, 30000);

    return () => clearInterval(interval);
  }, [pathCoords]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="bg-white shadow-md rounded-sm p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Live Delivery Tracking</h2>
      <p className="mb-4 text-gray-600">
        Estimated Time Remaining: <span className="font-semibold">{eta}</span>
      </p>

      <GoogleMap
        center={agentPosition}
        zoom={8}
        mapContainerClassName="h-96 w-full rounded-lg"
        onLoad={map => { mapRef.current = map; }}
        options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
      >
        <OverlayView
          position={agentPosition}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="flex flex-col items-center animate-bounce text-blue-600 text-2xl">
            <FaTruck />
            <span className="text-xs font-semibold bg-white px-1 rounded shadow">Agent</span>
          </div>
        </OverlayView>

        <OverlayView
          position={customerPosition}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="flex flex-col items-center text-red-600 text-2xl">
            <FaUserCheck  />
            <span className="text-xs font-semibold bg-white px-1 rounded shadow">Customer</span>
          </div>
        </OverlayView>

        {/* Route */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: { strokeColor: '#1E40AF', strokeWeight: 6 }
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default TrackMap;
