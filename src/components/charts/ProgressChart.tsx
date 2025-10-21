import React, { useState } from 'react';

interface ProgressChartProps {
  percentage: number;
  target: number;
  title: string;
  improvementText: string;
  changePercentage: string;
  isPositive?: boolean;
  className?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  percentage,
  target,
  title,
  improvementText,
  changePercentage,
  isPositive = true,
  className = ""
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const progressWidth = (percentage / target) * 742; // Calculate progress width

  const handleProgressClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Simulate different progress values for interaction
  const progressSteps = [10, 15, 25, 35, 50, 75, 100];
  const [currentStep, setCurrentStep] = useState(1); // Start at 15%
  
  const handleStepClick = () => {
    const nextStep = (currentStep + 1) % progressSteps.length;
    setCurrentStep(nextStep);
  };

  const displayPercentage = progressSteps[currentStep];
  const displayProgressWidth = (displayPercentage / target) * 742;

  return (
    <div className={`box-border w-full h-auto min-h-[280px] md:min-h-[341px] border border-black/10 dark:border-white/10 rounded-2xl relative p-4 md:p-6 ${className}`}>
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
        {/* Main percentage display */}
        <div 
          className="cursor-pointer flex-shrink-0"
          onClick={handleStepClick}
          title="Click to change progress"
        >
          <span className={`block font-semibold text-5xl md:text-6xl lg:text-[64px] text-center capitalize text-[#2B2B2B] dark:text-white transition-all duration-300 ${
            isAnimating ? 'scale-110' : 'hover:scale-105'
          }`}>
            {displayPercentage}%
          </span>
        </div>

        {/* Progress section */}
        <div className="flex-1 w-full flex flex-col justify-center gap-3 md:gap-4">
          {/* Progress bar container */}
          <div className="relative w-full">
            {/* Background progress bar */}
            <div 
              className="w-full h-8 md:h-[35px] bg-[#F4F4F4] dark:bg-gray-700 border border-black/5 dark:border-white/5 rounded-[20px] cursor-pointer hover:bg-[#EEEEEE] dark:hover:bg-gray-600 transition-colors"
              onClick={handleProgressClick}
              title="Click to animate"
            />
            
            {/* Progress fill */}
            <div 
              className={`absolute left-0 top-0 h-8 md:h-[35px] bg-gradient-to-r from-[#8364E8] to-[#D397FA] rounded-[20px] transition-all duration-500 ease-out ${
                isAnimating ? 'animate-pulse' : ''
              }`}
              style={{ width: `${Math.min((displayPercentage / target) * 100, 100)}%` }}
            />
          </div>

          {/* Target indicator section */}
          <div className="flex items-center justify-between w-full">
            {/* Current value indicator */}
            <div className="flex flex-col items-center gap-1">
              {/* Triangle indicator */}
              <div className="w-5 h-5 md:w-[23px] md:h-[23px] bg-gradient-to-b from-[#D095F9] to-[#8D6AEA]" style={{
                clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)'
              }} />
              {/* Current percentage label */}
              <span className="text-xs md:text-base font-normal text-center text-black/60 dark:text-white/60 whitespace-nowrap">
                {displayPercentage}%
              </span>
            </div>

            {/* Target label */}
            <div>
              <span className="text-xs md:text-base font-normal text-center text-black/60 dark:text-white/60 whitespace-nowrap">
                Target: {target}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with improvement text and change indicator */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mt-4 md:mt-6 pt-3 md:pt-4 border-t border-border/30">
        {/* Left side - Improvement text */}
        <div className="flex-1 min-w-0">
          <span className="text-xs sm:text-sm md:text-base font-normal text-black/60 dark:text-white/60 break-words">
            📈 {improvementText}
          </span>
        </div>

        {/* Right side - Change indicator */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Change percentage with arrow */}
          <div className="flex items-center gap-1">
            {/* Arrow icon */}
            <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center flex-shrink-0">
              <div className={`w-2.5 h-2.5 md:w-[11.67px] md:h-[11.67px] border-2 transform rotate-45 border-b-0 border-l-0 ${
                isPositive ? 'border-[#12B76A]' : 'border-red-500'
              }`} />
            </div>
            {/* Change text */}
            <span className={`text-xs sm:text-sm md:text-sm font-medium ${
              isPositive ? 'text-[#027A48]' : 'text-red-600'
            } whitespace-nowrap`}>
              {changePercentage}
            </span>
          </div>
          
          {/* Additional text */}
          <span className="text-[10px] sm:text-xs font-normal text-black/40 dark:text-white/40 whitespace-nowrap">
            vs last month
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;