import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';

interface CustomAccordionProps {
    children: React.ReactNode;
    title: string;
    id: string;
    type?: 'single' | 'multiple';
    className?: string;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
    children,
    title,
    id,
    type = 'single',
    className
}) => {
    return (
        <Accordion type={type} collapsible className={className}>
            <AccordionItem value={id}>
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>{children}</AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default CustomAccordion;
