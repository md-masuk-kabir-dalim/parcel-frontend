'use client';
import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

interface ChartConfig {
    legend?: boolean;
    tooltip?: boolean;
}

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
        <div className={`${height} ${className}`}>
            <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray='3 3' vertical={false} />
                    <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={10} />
                    {config.tooltip && <Tooltip />}
                    {config.legend && <Legend />}
                    {bars.map((bar) => (
                        <Bar
                            key={bar.dataKey}
                            dataKey={bar.dataKey}
                            fill='#3b82f6'
                            radius={bar.radius ?? 4}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ReusableBarChart;
