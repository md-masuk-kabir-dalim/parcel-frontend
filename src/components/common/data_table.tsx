'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { icons } from '@/constants/icons';
import Image from 'next/image';
import DropdownMenus from './dropdown_menu';
import Loading from '@/components/shared/loading';

const DataTable = ({
    headers,
    initialHeaders,
    setSelectHeaders = () => {},
    filterData = [],
    data,
    isFetching = false,
    actions,
    setSearchTerm,
    createButtonText,
    createPageLink,
    filterType,
    setFilterType
}: any) => {
    const initialSelectedHeaders = headers.slice(0, 4).map((header: any) => header.key);

    const [selectedHeaders, setSelectedHeaders] = useState(
        (initialHeaders?.length >= 1 && initialHeaders) || initialSelectedHeaders
    );

    const handleHeaderChange = (selected: string[]) => {
        setSelectedHeaders(selected);
        setSelectHeaders && setSelectHeaders(selected);
    };

    return (
        <div className='overflow-x-auto'>
            <div
                className={`flex ${setSearchTerm ? 'justify-between' : 'justify-end'} items-center mb-4 gap-4`}
            >
                {/* Search Input */}
                {setSearchTerm && (
                    <Input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-2/4 border border-blue outline-none'
                        placeholder='Search'
                    />
                )}

                {/* Create Button & Header Dropdown */}
                <div className='flex items-center gap-5'>
                    {/* Type Filter */}
                    {setFilterType && (
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className='border border-blue outline-none rounded px-2 py-1'
                        >
                            {filterData.map((type: any) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    )}
                    {createButtonText && (
                        <Link href={`${createPageLink}`}>
                            <Button className='hover:underline flex justify-center text-white items-center gap-2 px-5'>
                                <icons.createIcon className='text-lg' /> {createButtonText}
                            </Button>
                        </Link>
                    )}

                    <DropdownMenus
                        options={headers}
                        onSelect={handleHeaderChange}
                        initialSelectedHeaders={
                            (initialHeaders?.length >= 1 && initialHeaders) ||
                            initialSelectedHeaders
                        }
                    />
                </div>
            </div>

            {/* Table */}
            {selectedHeaders.length > 0 && (
                <table className='table-auto w-full border-collapse border border-b-white bg-white'>
                    <thead>
                        <tr>
                            {headers?.map(
                                (header: any, index: number) =>
                                    selectedHeaders.includes(header.key) && (
                                        <th
                                            key={index}
                                            className='border border-b-white bg-blue text-white font-semibold px-4 py-3 text-center'
                                        >
                                            {header.text}
                                        </th>
                                    )
                            )}
                            {actions && (
                                <th className='px-4 py-3 font-semibold bg-blue text-white text-start'>
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {isFetching ? (
                            <tr>
                                <td
                                    colSpan={selectedHeaders.length + (actions ? 1 : 0)}
                                    className='text-center py-4'
                                >
                                    <Loading />
                                </td>
                            </tr>
                        ) : (
                            data?.map((row: any, rowIndex: number) => (
                                <tr
                                    key={rowIndex}
                                    className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-100'}`}
                                >
                                    {headers.map(
                                        (header: any, cellIndex: any) =>
                                            selectedHeaders.includes(header.key) && (
                                                <td
                                                    key={cellIndex}
                                                    className='border border-b-white px-2 py-2 text-center'
                                                >
                                                    {header.key === 'image' ? (
                                                        <Image
                                                            src={
                                                                row?.images?.viewUrl ||
                                                                row[header.key]
                                                            }
                                                            alt='image'
                                                            height={50}
                                                            width={50}
                                                        />
                                                    ) : (
                                                        row[header.key]
                                                    )}
                                                </td>
                                            )
                                    )}
                                    {actions && (
                                        <td className='flex justify-center items-center my-auto'>
                                            {actions.map((action: any, index: number) => (
                                                <div key={index} className='flex items-center mt-3'>
                                                    {action?.link ? (
                                                        <Link
                                                            href={action.link(row)}
                                                            className={`flex !items-center justify-center rounded-full transition-all ease-in-out duration-300 hover:bg-[#53C1F6] hover:text-white my-auto bg-white border text-[#53C1F6] ${
                                                                action?.type === 'delete' &&
                                                                'text-[#EB3223] hover:bg-[#EB3223] hover:text-white'
                                                            } ms-2 h-8 w-8`}
                                                            onClick={() => action.onClick(row)}
                                                        >
                                                            <span className='text-2xl'>
                                                                {action.label}
                                                            </span>
                                                        </Link>
                                                    ) : (
                                                        <button
                                                            className={`flex items-center justify-center my-auto rounded-full bg-white border transition-all ease-in-out duration-300 hover:bg-[#53C1F6] hover:text-white text-[#53C1F6] ${
                                                                action?.type === 'delete' &&
                                                                'text-[#EB3223] hover:bg-[#EB3223] hover:text-white'
                                                            } ms-2 h-8 w-8`}
                                                            onClick={() => action.onClick(row)}
                                                        >
                                                            <span className='text-2xl'>
                                                                {action.label}
                                                            </span>
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DataTable;
