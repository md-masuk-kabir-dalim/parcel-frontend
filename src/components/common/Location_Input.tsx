import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
const LocationPickerMap = dynamic(() => import('./LocationPickerMap'), {
    ssr: false
});

type Props = { name: string, label?: string };

const LocationInput: React.FC<Props> = ({ name, label }) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <LocationPickerMap label={label} value={field.value} onChange={field.onChange} />
            )}
        />
    );
};

export default LocationInput;
