import Link from 'next/link';
import React from 'react';

interface BreadcrumbItem {
    label: string;
    path: string;
    icon?: React.ReactNode;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className='flex items-center space-x-2'>
            {items?.map((item, index) => (
                <React.Fragment key={index}>
                    <Link
                        href={item.path}
                        className='flex items-center text-black hover:text-primary hover:underline'
                    >
                        {item.icon && <span className='mr-1'>{item.icon}</span>}
                        {/* Display the icon */}
                        {item.label}
                    </Link>
                    {index < items.length - 1 && <span className='text-black'>/</span>}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
