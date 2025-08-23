import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { icons } from '@/constants/icons';
import { Button } from '@/components/ui/button';
const DropdownMenus = ({ options, onSelect, initialSelectedHeaders }: any) => {
    const [selectedHeaders, setSelectedHeaders] = useState(initialSelectedHeaders);

    const handleOptionClick = (option: any) => {
        const updatedSelectedHeaders = selectedHeaders.includes(option.key)
            ? // 👇 Deselect option if already selected
              selectedHeaders.filter((header: any) => header !== option.key)
            : // 👇 Select option if not selected yet
              [...selectedHeaders, option.key];
        setSelectedHeaders(updatedSelectedHeaders);
        onSelect(updatedSelectedHeaders);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={` right-1 text-black bg-none border-none px-4 py-1 border rounded flex  items-center justify-between gap-3 focus:outline-none`}
            >
                {/* <icons.ArrowRight className="text-xl" /> */}
                <Button>
                    <span className='flex  gap-3 items-center'>
                        Column
                        <icons.cricleRightArrow className='text-xl' />
                    </span>{' '}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {options.map((option: any, index: number) => (
                    <DropdownMenuItem key={index} onClick={() => handleOptionClick(option)}>
                        {selectedHeaders.includes(option.key) && (
                            <icons.doneIcon className='me-2 ' />
                        )}
                        {option.text}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownMenus;
