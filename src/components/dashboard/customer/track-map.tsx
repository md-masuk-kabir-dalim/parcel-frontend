'use client';
import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, DirectionsRenderer, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import { FaTruck, FaUserCheck, FaBox } from 'react-icons/fa';
import { envConfig } from '@/lib/helpers/envConfig';

type Location = { lat: number; lng: number };
type Library = 'places' | 'drawing' | 'geometry' | 'visualization';
const libraries: Library[] = ['places'];

interface TrackMapProps {
  pickupLocation: Location;
  dropoffLocation: Location;
  agentLocation: Location;
}

const TrackMap: React.FC<TrackMapProps> = ({ pickupLocation, dropoffLocation, agentLocation }) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [eta, setEta] = useState<string>('');
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: envConfig.google_api_key!,
    libraries,
  });

  // calculate route from pickup → dropoff
  useEffect(() => {
    if (!isLoaded || !pickupLocation || !dropoffLocation) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: pickupLocation,
        destination: dropoffLocation,
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: google.maps.TrafficModel.BEST_GUESS,
        },
      },
      (result, status) => {
        if (status === 'OK' && result?.routes?.length) {
          setDirections(result);
          const duration = result.routes[0].legs?.[0]?.duration?.text ?? '';
          setEta(duration);
        }
      }
    );
  }, [isLoaded, pickupLocation, dropoffLocation]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="bg-white shadow-md rounded-sm p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Live Delivery Tracking</h2>
      <p className="mb-4 text-gray-600">
        Estimated Time Remaining: <span className="font-semibold">{eta || 'Calculating...'}</span>
      </p>

      <GoogleMap
        center={agentLocation || pickupLocation}
        zoom={10}
        mapContainerClassName="h-96 w-full rounded-lg"
        onLoad={(map) => {
          mapRef.current = map;
        }}
        options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
      >
        {/* Pickup */}
        <OverlayView position={pickupLocation} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div className="flex flex-col items-center text-green-600 text-2xl">
            <FaBox />
            <span className="text-xs font-semibold bg-white px-1 rounded shadow">Pickup</span>
          </div>
        </OverlayView>

        {/* Agent (live) */}
        <OverlayView position={agentLocation} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div className="flex flex-col items-center animate-bounce text-blue-600 text-2xl">
            <FaTruck />
            <span className="text-xs font-semibold bg-white px-1 rounded shadow">Agent</span>
          </div>
        </OverlayView>

        {/* Dropoff */}
        <OverlayView position={dropoffLocation} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div className="flex flex-col items-center text-red-600 text-2xl">
            <FaUserCheck />
            <span className="text-xs font-semibold bg-white px-1 rounded shadow">Customer</span>
          </div>
        </OverlayView>

        {/* Route */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: { strokeColor: '#1E40AF', strokeWeight: 6 },
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default TrackMap;
