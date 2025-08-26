'use client';
import { getDistanceFromLatLonInMeters } from '@/lib/helpers/calculate_distance';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export let socket: WebSocket | null = null;

const AgentLocation = () => {
    const { user, token } = useSelector((state: any) => state.auth);
    const lastSentPosition = useRef<{ lat: number, lng: number } | null>(null);
    const [currentPosition, setCurrentPosition] = useState<{ lat: number, lng: number } | null>(
        null
    );
    useEffect(() => {
        socket = new WebSocket(`wss://dalim.tourshare.xyz/?token=${token}`);

        socket.onopen = () => {
            console.log('Connected to WebSocket');
            socket?.send(
                JSON.stringify({
                    type: 'joinApp'
                })
            );
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Message from server:', data);
        };

        socket.onerror = (err) => console.log('WebSocket error:', err);
        if (user?.role === 'DELIVERY_AGENT') {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const latitude = Number(position.coords.latitude);
                    const longitude = Number(position.coords.longitude);

                    const newPos = { lat: latitude, lng: longitude };
                    setCurrentPosition(newPos);

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

                        socket?.send(
                            JSON.stringify({
                                type: 'agentLocationUpdate',
                                userName: user?.userName || 'agent1',
                                lat: newPos.lat,
                                lng: newPos.lng
                            })
                        );
                    }
                },
                (error) => console.log('Geolocation error:', error),
                { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        }

        return () => {
            socket?.close();
        };
    }, [user?.role, user?.userName]);

    if (user?.role !== 'DELIVERY_AGENT') {
        return null;
    }

    return null;
};

export default AgentLocation;
