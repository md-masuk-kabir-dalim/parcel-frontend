'use client';
import { getDistanceFromLatLonInMeters } from '@/lib/helpers/calculate_distance';
import { useEffect, useRef } from 'react';

const AgentLocation = () => {
    const lastSentPosition = useRef<{ lat: number, lng: number } | null>(null);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newPos = { lat: latitude, lng: longitude };
                if (
                    !lastSentPosition.current ||
                    getDistanceFromLatLonInMeters(
                        lastSentPosition.current.lat,
                        lastSentPosition.current.lng,
                        newPos.lat,
                        newPos.lng
                    ) >= 5
                ) {
                    lastSentPosition.current = newPos;

                    fetch('http://localhost:3001/update-location', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            agentId: 'agent1',
                            lat: newPos.lat,
                            lng: newPos.lng
                        })
                    });
                }
            },
            (error) => console.error(error),
            { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return null;
};

export default AgentLocation;
