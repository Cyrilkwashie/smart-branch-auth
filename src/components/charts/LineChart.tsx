import React, { useState } from 'react';

interface LineChartProps {
  gradientId: string;
  gradientColor: string;
  strokeColor: string;
  strokeWidth?: number;
  yAxisLabels: string[];
  months: string[];
  pathData: string;
  areaPathData: string;
  className?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  gradientId,
  gradientColor,
  strokeColor,
  strokeWidth = 5,
  yAxisLabels,
  months,
  pathData,
  areaPathData,
  className = ""
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  // Data points for Fee Income chart
  const dataPoints = [
    { month: 'Jan', value: 2.5, x: 0, y: 120 },
    { month: 'Feb', value: 3.2, x: 100, y: 100 },
    { month: 'Mar', value: 4.1, x: 200, y: 85 },
    { month: 'Apr', value: 5.2, x: 300, y: 70 },
    { month: 'May', value: 6.1, x: 400, y: 60 },
    { month: 'Jun', value: 7.2, x: 500, y: 50 },
    { month: 'July', value: 8.1, x: 600, y: 45 },
    { month: 'Aug', value: 8.8, x: 700, y: 40 },
    { month: 'Sep', value: 9.2, x: 800, y: 35 },
    { month: 'Oct', value: 9.8, x: 900, y: 30 },
    { month: 'Nov', value: 10.2, x: 1000, y: 28 },
    { month: 'Dec', value: 10.5, x: 1036, y: 25 }
  ];

  const handlePointClick = (month: string) => {
    setSelectedMonth(selectedMonth === month ? null : month);
  };

  const getHighlightValue = (month: string): string => {
    const point = dataPoints.find(d => d.month === month);
    return point ? `${point.value.toFixed(1)}%` : '';
  };

  return (
    <div className={`box-border w-full min-w-[1150px] h-[341px] border border-black/10 dark:border-white/10 rounded-2xl relative ${className}`}>
      
      {/* Y-axis labels and grid lines with exact positioning from CSS */}
      {/* 10% - Group 10 */}
      <div className="absolute w-[1077.15px] h-[17.16px] left-[20.91px] top-[75px]">
        <div className="absolute bg-black/5 dark:bg-white/5 h-px" style={{
          left: '5.34%', 
          right: '1.16%', 
          top: '24.34%'
        }} />
        <span className="absolute text-xs font-normal leading-[15px] text-black/40 dark:text-white/40" style={{
          left: '1.88%', 
          top: '21.99%'
        }}>10%</span>
      </div>

      {/* 8% - Group 9 */}
      <div className="absolute w-[1075.16px] h-[17.16px] left-[20.91px] top-[116.16px]">
        <div className="absolute bg-black/5 dark:bg-white/5 h-px" style={{
          left: '5.16%', 
          right: '1.34%', 
          top: '36.41%'
        }} />
        <span className="absolute text-xs font-normal leading-[15px] text-black/40 dark:text-white/40" style={{
          left: '1.88%', 
          top: '34.07%'
        }}>8%</span>
      </div>

      {/* 6% - Group 8 */}
      <div className="absolute w-[1069.19px] h-[17.16px] left-[20.91px] top-[157.33px]">
        <div className="absolute bg-black/5 dark:bg-white/5 h-px" style={{
          left: '4.63%', 
          right: '1.88%', 
          top: '48.48%'
        }} />
        <span className="absolute text-xs font-normal leading-[15px] text-black/40 dark:text-white/40" style={{
          left: '1.88%', 
          top: '46.14%'
        }}>6%</span>
      </div>

      {/* 4% - Group 7 */}
      <div className="absolute w-[1071.18px] h-[17.16px] left-[20.91px] top-[198.49px]">
        <div className="absolute bg-black/5 dark:bg-white/5 h-px" style={{
          left: '4.8%', 
          right: '1.7%', 
          top: '59.89%'
        }} />
        <span className="absolute text-xs font-normal leading-[15px] text-black/40 dark:text-white/40" style={{
          left: '1.88%', 
          top: '58.21%'
        }}>4%</span>
      </div>

      {/* 2% - Group 5 */}
      <div className="absolute w-[1069.19px] h-[17.16px] left-[20.91px] top-[239.66px]">
        <div className="absolute bg-black/5 dark:bg-white/5 h-px" style={{
          left: '4.63%', 
          right: '1.88%', 
          top: '72.63%'
        }} />
        <span className="absolute text-xs font-normal leading-[15px] text-black/40 dark:text-white/40" style={{
          left: '1.88%', 
          top: '70.28%'
        }}>2%</span>
      </div>

      {/* 0 - Group 6 */}
      <div className="absolute w-[1061.22px] h-[17.16px] left-[20.91px] top-[280.82px]">
        <div className="absolute bg-black/5 dark:bg-white/5 h-px" style={{
          left: '3.91%', 
          right: '2.6%', 
          top: '84.7%'
        }} />
        <span className="absolute text-xs font-normal leading-[15px] text-black/40 dark:text-white/40" style={{
          left: '1.88%', 
          top: '82.35%'
        }}>0</span>
      </div>

      {/* Main chart area */}
      <div className="absolute w-[1036px] h-[214px] left-[75px] top-[76px]">
        {/* SVG for line chart with area fill */}
        <svg className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={gradientColor} stopOpacity="1"/>
              <stop offset="100%" stopColor={gradientColor} stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          {/* Area fill */}
          <path
            d={areaPathData}
            fill={`url(#${gradientId})`}
            className="opacity-80"
          />
          
          {/* Main line */}
          <path
            d={pathData}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            className="opacity-90"
          />

          {/* Interactive data points - invisible clickable areas like NPL ratio */}
          {dataPoints.map((point) => (
            <circle
              key={point.month}
              cx={point.x + 75} // Offset for container positioning
              cy={point.y + 76} // Offset for container positioning
              r="12"
              fill="transparent"
              className="cursor-pointer hover:fill-orange-200/20"
              onClick={() => handlePointClick(point.month)}
            >
              <title>{`${point.month}: ${point.value}%`}</title>
            </circle>
          ))}

          {/* Visible dots for selected point only */}
          {selectedMonth && dataPoints.map((point) => (
            point.month === selectedMonth && (
              <circle
                key={`dot-${point.month}`}
                cx={point.x + 75}
                cy={point.y + 76}
                r="4"
                fill={strokeColor}
                className="animate-pulse"
              />
            )
          ))}
        </svg>
      </div>

      {/* Highlight label - positioned outside SVG like NPL ratio */}
      {selectedMonth && (
        <div className="absolute w-[65px] h-[53px]" style={{
          left: `${dataPoints.find(d => d.month === selectedMonth)?.x + 75 - 32 || 0}px`,
          top: `${dataPoints.find(d => d.month === selectedMonth)?.y + 76 - 53 || 0}px`
        }}>
          <div className="flex flex-row justify-center items-center px-2.5 py-2.5 gap-2.5 absolute w-[65px] h-[37px] left-0 top-0 bg-black dark:bg-white border border-blue-200/10 rounded-full">
            <span className="w-[34px] h-[17px] text-sm font-normal leading-[17px] text-center text-white dark:text-black">
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

export default LineChart;