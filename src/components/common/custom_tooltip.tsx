import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ReactNode } from 'react';

interface CustomTooltipProps {
    buttonLabel: string;
    tooltipContent: ReactNode;
    variant?: 'default' | 'outline';
    className?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
    buttonLabel,
    tooltipContent,
    variant = 'default',
    className
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={variant} className={className}>
                        {buttonLabel}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{tooltipContent}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default CustomTooltip;
