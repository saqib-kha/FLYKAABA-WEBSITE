import React from 'react';

interface FlyKaabaLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  variant?: 'dark' | 'light';
  onClick?: () => void;
}

export const FlyKaabaLogo: React.FC<FlyKaabaLogoProps> = ({
  className = 'w-[154px] h-[40px]',
  variant = 'dark',
  onClick,
}) => {
  const lightBackdrop = variant === 'light' ? 'bg-white rounded-md px-2 py-1' : '';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none cursor-pointer ${lightBackdrop} ${className}`}
      title="FlyKaaba"
    >
      <img
        src="/flykaaba-logo.png"
        alt="FlyKaaba"
        className="h-full w-auto max-w-full object-contain"
        draggable={false}
      />
    </div>
  );
};
