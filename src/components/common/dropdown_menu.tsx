import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { icons } from '@/constants/icons';
import { Button } from '@/components/ui/button';

interface DropdownMenusProps {
    options: { key: string, text: string }[];
    onSelect: (selected: string[]) => void;
    initialSelectedHeaders: string[];
}

const DropdownMenus: React.FC<DropdownMenusProps> = ({
    options,
    onSelect,
    initialSelectedHeaders
}) => {
    const [selectedHeaders, setSelectedHeaders] = useState(initialSelectedHeaders);

    const handleOptionClick = (option: any) => {
        const updatedSelectedHeaders = selectedHeaders.includes(option.key)
            ? selectedHeaders.filter((header) => header !== option.key)
            : [...selectedHeaders, option.key];
        setSelectedHeaders(updatedSelectedHeaders);
        onSelect(updatedSelectedHeaders);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='flex items-center justify-between gap-2 bg-blue text-white'>
                    Column <icons.dropdown className='ml-1 text-lg' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='bg-white shadow-lg rounded-md p-2 max-h-60 overflow-y-auto z-[9999]'
                sideOffset={5}
            >
                {options.map((option, idx) => (
                    <DropdownMenuItem
                        key={idx}
                        className='flex items-center gap-2 hover:bg-gray-100 rounded-md px-2 py-1 cursor-pointer'
                        onClick={() => handleOptionClick(option)}
                    >
                        {selectedHeaders.includes(option.key) && (
                            <icons.doneIcon className='text-green-500' />
                        )}
                        {option.text}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownMenus;
