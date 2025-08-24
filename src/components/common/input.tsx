'use client';
import React, { useEffect, useState } from 'react';
import { useFormContext, FieldError } from 'react-hook-form';

const Input: React.FC<InputProps> = ({
    name,
    label,
    type = 'text',
    placeholder = '',
    rules = {},
    row = 3,
    textArea = false,
    className = '',
    formClassName = '',
    labelClassName = '',
    onChange,
    defaultValue,
    value,
    required = false,
    disabled
}) => {
    const {
        register,
        formState: { errors }
    } = useFormContext();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const getNestedError = (name: string, errors: any): string | undefined => {
        const keys = name.split('.');
        let nestedError = errors;

        for (const key of keys) {
            if (nestedError[key]) {
                nestedError = nestedError[key];
            } else {
                return undefined;
            }
        }

        return nestedError && nestedError.message ? nestedError.message : undefined;
    };

    const errorMessage = getNestedError(name, errors);

    if (!mounted) return null;

    return (
        <div className={`${formClassName}`}>
            <label htmlFor={name} className={`${labelClassName}`}>
                {label} {required && <span className='text-red-600 font-bold'>*</span>}
            </label>

            {textArea ? (
                <textarea
                    id={name}
                    rows={row}
                    defaultValue={defaultValue ?? ''}
                    value={value}
                    className={`${
                        errorMessage ? 'border border-red-200 bg-red-50' : ''
                    } ${className} w-full p-2 border rounded-md drop-shadow-sm`}
                    placeholder={placeholder ?? ''}
                    disabled={disabled}
                    {...register(name, {
                        ...rules,
                        onChange: onChange ? onChange : undefined
                    })}
                />
            ) : (
                <input
                    className={`${className} ${
                        errorMessage ? 'border border-red-200 bg-red-50' : ''
                    } w-full p-2 border border-gray-300 rounded-md outline-none drop-shadow-sm`}
                    type={type}
                    defaultValue={defaultValue ?? ''}
                    value={value}
                    id={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...register(name, {
                        ...rules,
                        onChange: onChange ? onChange : undefined
                    })}
                />
            )}

            {errorMessage && (
                <p className='text-red-600 text-sm'>
                    {typeof errorMessage === 'string'
                        ? errorMessage
                        : (errorMessage as FieldError).message}
                </p>
            )}
        </div>
    );
};

export default Input;
