import React from 'react';

interface BrandLogoProps {
  light?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  light = false,
  size = 'md',
  showTagline = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const textColor = light ? 'text-white' : 'text-[#073B66]';
  const subtitleColor = light ? 'text-[#E8F7FC]/80' : 'text-[#263746]/70';

  return (
    <div className="flex items-center gap-2.5 select-none group">
      {/* Abstract fluid water movement icon */}
      <div
        className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Back fluid loop */}
          <path
            d="M8 20C8 13.3726 13.3726 8 20 8C26.6274 8 32 13.3726 32 20C32 26.6274 26.6274 32 20 32"
            stroke={light ? '#E8F7FC' : '#00A6D6'}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="1 8"
            className="opacity-40"
          />
          {/* Main fluid wave curve */}
          <path
            d="M6 24C9 28 14 31 20 31C27.5 31 33 25.5 33 18C33 11 27 7 20 7C14.5 7 10 10.5 8 15"
            stroke={light ? '#00A6D6' : '#073B66'}
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          {/* Internal crest water splash drop */}
          <path
            d="M17 19C17 16.5 20 13 20 13C20 13 23 16.5 23 19C23 20.6569 21.6569 22 20 22C18.3431 22 17 20.6569 17 19Z"
            fill={light ? '#35C6A4' : '#00A6D6'}
          />
          {/* Subtle water current streak */}
          <path
            d="M13 25C15 27 18 27.5 21 27"
            stroke={light ? '#FFFFFF' : '#35C6A4'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-['Plus_Jakarta_Sans',sans-serif] font-extrabold tracking-tight leading-none ${textSizes[size]} ${textColor}`}
        >
          FLUIDA
        </span>
        {showTagline && (
          <span className={`text-[10px] uppercase font-semibold tracking-widest mt-0.5 ${subtitleColor}`}>
            Piscinas & Lazer
          </span>
        )}
      </div>
    </div>
  );
};
