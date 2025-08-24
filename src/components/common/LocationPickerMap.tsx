'use client';
import React, { useState, useRef, useCallback } from 'react';
import { useLoadScript, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import { envConfig } from '@/lib/helpers/envConfig';

const containerStyle = { width: '100%', height: '300px' };
const defaultCenter = { lat: 23.8103, lng: 90.4125 };

type LocationValue = {
    type: string,
    address: string,
    coordinates: [number, number] // [lng, lat]
};

type Props = {
    value?: LocationValue,
    onChange: (val: LocationValue) => void,
    label?: string
};

const LocationPickerMap: React.FC<Props> = ({ value, onChange, label }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: envConfig.google_api_key || '',
        libraries: ['places']
    });

    const safeValue: LocationValue = value || {
        type: 'Point',
        address: '',
        coordinates: [0, 0]
    };

    const [marker, setMarker] = useState<{ lat: number, lng: number } | null>(
        safeValue.coordinates[0] && safeValue.coordinates[1]
            ? { lat: safeValue.coordinates[1], lng: safeValue.coordinates[0] }
            : null
    );
    const [center, setCenter] = useState(marker || defaultCenter);
    const [address, setAddress] = useState(safeValue.address || '');

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    const updateLocation = (lat: number, lng: number, addr: string) => {
        setMarker({ lat, lng });
        setCenter({ lat, lng });
        setAddress(addr);
        onChange({ type: 'Point', address: addr, coordinates: [lng, lat] });
    };

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results) => {
                const addr = results?.[0]?.formatted_address || '';
                updateLocation(lat, lng, addr);
                mapRef.current?.panTo({ lat, lng });
            });
        }
    };

    const handleMapClick = async (e: google.maps.MapMouseEvent) => {
        const lat = e.latLng?.lat();
        const lng = e.latLng?.lng();
        if (lat && lng) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results) => {
                const addr = results?.[0]?.formatted_address || '';
                updateLocation(lat, lng, addr);
            });
        }
    };

    if (!isLoaded) return <div>Loading map…</div>;

    return (
        <div className='mb-4'>
            {label && <label className='block mb-1 font-medium'>{label}</label>}
            <Autocomplete
                onLoad={(ref) => (autocompleteRef.current = ref)}
                onPlaceChanged={handlePlaceChanged}
            >
                <input
                    type='text'
                    placeholder='Search location'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className='w-full mb-2 px-4 py-2 border rounded-lg'
                />
            </Autocomplete>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
                onClick={handleMapClick}
                onLoad={onMapLoad}
            >
                {marker && <Marker position={marker} />}
            </GoogleMap>
        </div>
    );
};

export default LocationPickerMap;
