import React, { useState } from 'react';

interface BarData {
  month: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarData[];
  yAxisLabels: string[];
  maxValue: number;
  defaultHighlightMonth?: string;
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  yAxisLabels,
  maxValue,
  defaultHighlightMonth,
  className = ""
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(defaultHighlightMonth || null);
  const chartHeight = 214; // Height from top grid to bottom
  const barWidth = 45;
  const startX = 60;
  const spacing = 92; // Approximate spacing between bars

  const handleBarClick = (month: string) => {
    setSelectedMonth(selectedMonth === month ? null : month);
  };

  const getHighlightValue = (month: string): string => {
    const item = data.find(d => d.month === month);
    if (!item) return '';
    
    // Format the value based on the data range
    if (item.value >= 3) {
      return `${item.value.toFixed(1)}M`;
    } else {
      return `${item.value.toFixed(1)}M`;
    }
  };

  return (
    <div className={`box-border w-full h-[341px] border border-black/10 dark:border-white/10 rounded-2xl relative ${className}`}>
      
      {/* Y-axis labels */}
      <div className="absolute left-4 top-[75px]">
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
      <div className="absolute left-[60px] top-[75px]">
        {yAxisLabels.map((_, index) => (
          <div
            key={index}
            className="absolute w-[1043px] h-px bg-black/5 dark:bg-white/5"
            style={{ top: `${index * 41}px` }}
          />
        ))}
      </div>

      {/* Bar chart bars */}
      {data.map((item, index) => {
        const barHeight = (item.value / maxValue) * chartHeight;
        const x = startX + index * spacing;
        const y = 290 - barHeight;
        const isHighlighted = selectedMonth === item.month;
        
        return (
          <div
            key={item.month}
            className={`absolute rounded-xl cursor-pointer transition-all duration-200 hover:opacity-80 ${
              isHighlighted 
                ? item.color || 'bg-[#FF9027]' 
                : 'bg-[#EAEAEA] dark:bg-gray-600 hover:bg-[#D5D5D5] dark:hover:bg-gray-500'
            }`}
            style={{
              width: `${barWidth}px`,
              height: `${barHeight}px`,
              left: `${x}px`,
              top: `${y}px`
            }}
            onClick={() => handleBarClick(item.month)}
            title={`${item.month}: ${item.value}`}
          />
        );
      })}

      {/* Highlight label */}
      {selectedMonth && (
        <div className="absolute w-[65px] h-[53px]" style={{
          left: `${startX + data.findIndex(d => d.month === selectedMonth) * spacing - 13}px`,
          top: data.find(d => d.month === selectedMonth) 
            ? `${290 - (data.find(d => d.month === selectedMonth)!.value / maxValue) * chartHeight - 53}px`
            : '109px'
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
      <div className="absolute flex flex-row justify-between items-center px-0 gap-[14px] w-[1043px] h-[13px] left-[60px] top-[314px]">
        {data.map((item) => (
          <span key={item.month} className="w-[30px] h-[13px] text-xs font-normal leading-[15px] text-center text-black/40 dark:text-white/40">
            {item.month}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BarChart;