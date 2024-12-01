import React, { FC, KeyboardEvent } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface CustomTextAreaProps {
    name: string;
    placeholder: string;
}

const CustomTextArea: FC<CustomTextAreaProps> = ({ name, placeholder }) => {
    const { register, control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name
    });

    const handleAddField = () => {
        append('');
    };

    const handleRemoveField = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddField();
        } else if (
            event.key === 'Backspace' &&
            event.currentTarget.value === '' &&
            fields.length > 1
        ) {
            event.preventDefault();
            handleRemoveField(index);
        }
    };

    return (
        <div className='border border-gray-200 rounded-sm p-2 mt-3'>
            {fields.map((field, index) => (
                <div key={field.id} className='mb-3'>
                    <input
                        {...register(`${name}.${index}`)}
                        placeholder={placeholder}
                        className='w-full border-none focus:outline-none mb-2'
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                </div>
            ))}
        </div>
    );
};

export default CustomTextArea;
