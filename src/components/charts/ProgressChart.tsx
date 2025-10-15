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
    <div className={`box-border w-full h-[341px] border border-black/10 dark:border-white/10 rounded-2xl relative ${className}`}>
      
      {/* Main percentage display */}
      <div 
        className="absolute w-[132px] h-[79px] left-[42px] top-[113px] cursor-pointer"
        onClick={handleStepClick}
        title="Click to change progress"
      >
        <span className={`absolute inset-0 flex items-center justify-center font-semibold text-[64px] leading-[79px] text-center capitalize text-[#2B2B2B] dark:text-white transition-all duration-300 ${
          isAnimating ? 'scale-110' : 'hover:scale-105'
        }`}>
          {displayPercentage}%
        </span>
      </div>

      {/* Progress bar container */}
      <div className="absolute w-[742px] h-[35px] left-[327px] top-[135px]">
        {/* Background progress bar */}
        <div 
          className="absolute w-[742px] h-[35px] left-0 top-0 bg-[#F4F4F4] dark:bg-gray-700 border border-black/5 dark:border-white/5 rounded-[20px] cursor-pointer hover:bg-[#EEEEEE] dark:hover:bg-gray-600 transition-colors"
          onClick={handleProgressClick}
          title="Click to animate"
        />
        
        {/* Progress fill */}
        <div 
          className={`absolute h-[35px] left-0 top-0 bg-gradient-to-r from-[#8364E8] to-[#D397FA] rounded-[20px] transition-all duration-500 ease-out ${
            isAnimating ? 'animate-pulse' : ''
          }`}
          style={{ width: `${Math.min(displayProgressWidth, 742)}px` }}
        />
      </div>

      {/* Bottom section with improvement text and change indicator */}
      <div className="absolute flex flex-row justify-between items-center w-[1027px] h-[20px] left-[42px] top-[257px] gap-[555px]">
        {/* Left side - Improvement text */}
        <div className="w-[305px] h-[20px]">
          <span className="text-base font-normal leading-[20px] text-center text-black/60 dark:text-white/60">
            📈 {improvementText}
          </span>
        </div>

        {/* Right side - Change indicator */}
        <div className="flex flex-row items-center gap-2 w-[152px] h-[20px]">
          {/* Change percentage with arrow */}
          <div className="flex flex-row justify-center items-center gap-1 w-[54px] h-[20px]">
            {/* Arrow icon */}
            <div className="w-5 h-5 flex items-center justify-center">
              <div className={`w-[11.67px] h-[11.67px] border-2 transform rotate-45 border-b-0 border-l-0 ${
                isPositive ? 'border-[#12B76A]' : 'border-red-500'
              }`} />
            </div>
            {/* Change text */}
            <span className={`w-[30px] h-[20px] text-sm font-medium leading-[20px] text-center ${
              isPositive ? 'text-[#027A48]' : 'text-red-600'
            }`}>
              {changePercentage}
            </span>
          </div>
          
          {/* Additional text */}
          <span className="w-[90px] h-[15px] text-xs font-normal leading-[15px] text-black/40 dark:text-white/40 flex-1">
            vs last month
          </span>
        </div>
      </div>

      {/* Target indicator section */}
      <div className="absolute flex flex-row justify-between items-end w-[624px] h-[43px] left-[439px] top-[175px] gap-[490px]">
        {/* Current value indicator */}
        <div className="flex flex-col items-center w-[34px] h-[43px]">
          {/* Triangle indicator */}
          <div className="w-[23px] h-[23px] bg-gradient-to-b from-[#D095F9] to-[#8D6AEA]" style={{
            clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)'
          }} />
          {/* Current percentage label */}
          <span className="w-[34px] h-[20px] text-base font-normal leading-[20px] text-center text-black/60 dark:text-white/60 mt-auto">
            {displayPercentage}%
          </span>
        </div>

        {/* Target label */}
        <div className="w-[100px] h-[20px]">
          <span className="text-base font-normal leading-[20px] text-center text-black/60 dark:text-white/60">
            Target: {target}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;