import React, { useState } from 'react';

interface AreaChartProps {
  gradientId: string;
  gradientColor: string;
  strokeColor: string;
  strokeWidth?: number;
  yAxisLabels: string[];
  months: string[];
  pathData: string;
  defaultHighlightMonth?: string;
  className?: string;
}

const AreaChart: React.FC<AreaChartProps> = ({
  gradientId,
  gradientColor,
  strokeColor,
  strokeWidth = 2,
  yAxisLabels,
  months,
  pathData,
  defaultHighlightMonth,
  className = ""
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(defaultHighlightMonth || null);

  // Sample data points for NPL ratio (you can make this configurable)
  const dataPoints = [
    { month: 'Jan', value: 3.8, x: 47, y: 155 },
    { month: 'Feb', value: 3.7, x: 150, y: 150 },
    { month: 'Mar', value: 3.6, x: 250, y: 145 },
    { month: 'Apr', value: 3.7, x: 350, y: 140 },
    { month: 'May', value: 3.8, x: 450, y: 150 },
    { month: 'Jun', value: 3.9, x: 550, y: 160 },
    { month: 'Jul', value: 3.8, x: 650, y: 155 },
    { month: 'Aug', value: 3.7, x: 750, y: 150 },
    { month: 'Sep', value: 3.6, x: 850, y: 145 },
    { month: 'Oct', value: 3.7, x: 950, y: 140 },
    { month: 'Nov', value: 3.8, x: 1040, y: 155 },
    { month: 'Dec', value: 3.9, x: 1140, y: 160 }
  ];

  const handlePointClick = (month: string) => {
    setSelectedMonth(selectedMonth === month ? null : month);
  };

  const getHighlightValue = (month: string): string => {
    const point = dataPoints.find(d => d.month === month);
    return point ? `${point.value.toFixed(1)}%` : '';
  };

  const getHighlightPosition = (month: string): { x: number; y: number } => {
    const point = dataPoints.find(d => d.month === month);
    return point ? { x: point.x - 32, y: point.y - 50 } : { x: 873, y: 163 };
  };

  return (
    <div className={`box-border w-full min-w-[1150px] h-[341px] border border-black/10 dark:border-white/10 rounded-2xl relative ${className}`}>
      
      {/* Y-axis labels */}
      <div className="absolute left-[20.91px] top-[75px]">
        {yAxisLabels.map((label, index) => (
          <div
            key={label}
            className="absolute w-8 h-3 text-xs font-normal text-black/40 dark:text-white/40 text-center"
            style={{ top: `${index * 41}px` }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Grid lines */}
      <div className="absolute left-[60px] top-[75px] right-4">
        {yAxisLabels.map((_, index) => (
          <div
            key={index}
            className="absolute w-full h-px bg-black/5 dark:bg-white/5"
            style={{ top: `${index * 41}px` }}
          />
        ))}
      </div>

      {/* SVG chart with area and line */}
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={gradientColor} stopOpacity="1"/>
            <stop offset="100%" stopColor={gradientColor} stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        {/* Area fill */}
        <path
          d={`${pathData} L 1040 290 L 47 290 Z`}
          fill={`url(#${gradientId})`}
          opacity="0.6"
        />
        
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          className="opacity-90"
        />

        {/* Interactive data points */}
        {dataPoints.map((point) => (
          <circle
            key={point.month}
            cx={point.x}
            cy={point.y}
            r="8"
            fill="transparent"
            className="cursor-pointer hover:fill-blue-200/30"
            onClick={() => handlePointClick(point.month)}
          >
            <title>{`${point.month}: ${point.value}%`}</title>
          </circle>
        ))}

        {/* Visible dots for selected point */}
        {selectedMonth && dataPoints.map((point) => (
          point.month === selectedMonth && (
            <circle
              key={`dot-${point.month}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={strokeColor}
              className="animate-pulse"
            />
          )
        ))}
      </svg>

      {/* Highlight label */}
      {selectedMonth && (
        <div className="absolute w-[65px] h-[46px]" style={{
          left: `${getHighlightPosition(selectedMonth).x}px`,
          top: `${getHighlightPosition(selectedMonth).y}px`
        }}>
          <div className="flex flex-row justify-center items-center px-2.5 py-2.5 gap-2.5 absolute w-[65px] h-[37px] left-0 top-0 bg-black dark:bg-white border border-blue-200/10 rounded-full">
            <span className="w-[33px] h-[17px] text-sm font-normal leading-[17px] text-center text-white dark:text-black">
              {getHighlightValue(selectedMonth)}
            </span>
          </div>
          <div className="absolute w-3 h-3 left-[28px] top-[34px] bg-black dark:bg-white transform rotate-180" style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }} />
          <div className="absolute w-2 h-2 left-[30px] top-[45px] bg-black dark:bg-white border border-white dark:border-black rounded-full" />
        </div>
      )}

      {/* Month labels */}
      <div className="absolute flex flex-row justify-between items-center left-[60px] right-4 top-[314px] h-[13px]">
        {months.map((month) => (
          <span key={month} className="text-xs font-normal leading-[15px] text-center text-black/40 dark:text-white/40">
            {month}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AreaChart;