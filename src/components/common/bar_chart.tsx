'use client';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart';

interface ReusableBarChartProps {
    data: any[];
    config: ChartConfig;
    xKey: string;
    bars: {
        dataKey: string,
        radius?: number
    }[];
    height?: string;
    className?: string;
}

const ReusableBarChart: React.FC<ReusableBarChartProps> = ({
    data,
    config,
    xKey,
    bars,
    height = 'min-h-[200px]',
    className = 'w-full'
}) => {
    return (
        <ChartContainer config={config} className={`${height} ${className}`}>
            <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={xKey}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) =>
                        typeof value === 'string' ? value.slice(0, 3) : value
                    }
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                {bars.map((bar) => (
                    <Bar
                        key={bar.dataKey}
                        dataKey={bar.dataKey}
                        fill={`var(--color-${bar.dataKey})`}
                        radius={bar.radius ?? 4}
                    />
                ))}
            </BarChart>
        </ChartContainer>
    );
};

export default ReusableBarChart;
