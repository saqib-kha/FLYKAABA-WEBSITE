import React from 'react';

interface FlyKaabaLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  onClick?: () => void;
}

export const FlyKaabaLogo: React.FC<FlyKaabaLogoProps> = ({
  className = 'h-9 w-auto',
  variant = 'dark',
  onClick,
}) => {
  const textColor = variant === 'light' ? '#FFFFFF' : '#000000';

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center select-none cursor-pointer ${className}`}
      title="FlyKaaba"
    >
      <svg 
        viewBox="0 0 280 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto max-h-full"
      >
        <defs>
          {/* Rich gold gradient for Kiswah calligraphy arms */}
          <linearGradient id={`kiswahGold-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D77F" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA821C" />
            <stop offset="100%" stopColor="#E6C665" />
          </linearGradient>

          {/* Metallic shine for Kaaba door and belt */}
          <linearGradient id={`goldHizam-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFDF73" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#F3CE5A" />
          </linearGradient>

          {/* Calligraphy pattern on upper and lower arms */}
          <pattern 
            id={`calligraphyPattern-${variant}`} 
            width="16" 
            height="16" 
            patternUnits="userSpaceOnUse" 
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="2" x2="16" y2="2" stroke="#7A580F" strokeWidth="1.2" strokeDasharray="3,1,2,1" />
            <line x1="0" y1="6" x2="16" y2="6" stroke="#926D19" strokeWidth="1.5" strokeDasharray="2,2,4,1" />
            <line x1="0" y1="10" x2="16" y2="10" stroke="#664706" strokeWidth="1.2" strokeDasharray="4,1,1,2" />
            <line x1="0" y1="14" x2="16" y2="14" stroke="#8C6615" strokeWidth="1.4" strokeDasharray="1,2,3,2" />
          </pattern>
        </defs>

        {/* 1. "Fly" text in heavy black/white sans-serif font matching the original logo */}
        <text 
          x="0" 
          y="66" 
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
          fontSize="64" 
          fontWeight="900" 
          letterSpacing="-1.5px" 
          fill={textColor}
        >Fly</text>

        {/* 2. Custom Stylized Islamic Letter "K" */}
        <g transform="translate(86, 0)">
          
          {/* Vertical Stem of "K" (Black Kiswah Column) */}
          <rect x="0" y="16" width="12" height="50" rx="1" fill="#0D0D0D" />
          
          {/* Gold Middle Hizam Belt on Vertical Stem */}
          <rect x="-0.5" y="36.5" width="13" height="9" fill={`url(#goldHizam-${variant})`} stroke="#8F6E1C" strokeWidth="0.5" />
          {/* Islamic Diamond Ornament inside Central Belt */}
          <polygon points="6,37.5 9.5,41 6,44.5 2.5,41" fill="#1A1A1A" stroke="#F5D77F" strokeWidth="0.8" />

          {/* Upper Diagonal Arm (Gold with Embroidered Arabic Calligraphy) */}
          <g>
            <polygon 
              points="10,41 20,31 43,8 54,19 28,45 10,41" 
              fill={`url(#kiswahGold-${variant})`} 
              stroke="#8F6E1C" 
              strokeWidth="0.8" 
            />
            <polygon 
              points="10,41 20,31 43,8 54,19 28,45 10,41" 
              fill={`url(#calligraphyPattern-${variant})`} 
              opacity="0.85" 
            />
            <line x1="20" y1="31" x2="43" y2="8" stroke="#FFEBA3" strokeWidth="1.2" />
            <line x1="10" y1="41" x2="28" y2="45" stroke="#7A580F" strokeWidth="1" />
          </g>

          {/* Lower Diagonal Arm (Gold with Embroidered Arabic Calligraphy) */}
          <g>
            <polygon 
              points="10,41 28,37 54,63 43,74 20,51 10,41" 
              fill={`url(#kiswahGold-${variant})`} 
              stroke="#8F6E1C" 
              strokeWidth="0.8" 
            />
            <polygon 
              points="10,41 28,37 54,63 43,74 20,51 10,41" 
              fill={`url(#calligraphyPattern-${variant})`} 
              opacity="0.85" 
            />
            <line x1="28" y1="37" x2="54" y2="63" stroke="#FFEBA3" strokeWidth="1.2" />
            <line x1="20" y1="51" x2="43" y2="74" stroke="#7A580F" strokeWidth="1" />
          </g>

          {/* 3D Isometric Holy Kaaba atop the upper diagonal arm */}
          <g transform="translate(41, -4)">
            {/* Marble base (Shadharwan) */}
            <polygon points="12,19.5 21,23.5 12,25.5 3,21.5" fill="#E8E6E1" />
            
            {/* Front-Left Wall (Black Kiswah) */}
            <polygon points="3,8 12,12 12,23 3,19" fill="#111111" />
            
            {/* Front-Left Wall Gold Belt (Hizam) */}
            <polygon points="3,10.5 12,14.5 12,16.5 3,12.5" fill={`url(#goldHizam-${variant})`} />
            
            {/* Golden Door of the Holy Kaaba (Bab al-Kaaba) */}
            <polygon points="7,14 10.5,15.5 10.5,21.5 7,20" fill="#FFD700" stroke="#9E7618" strokeWidth="0.4" />
            <circle cx="8.5" cy="18" r="0.6" fill="#422E06" />

            {/* Front-Right Wall (Shadowed Black Kiswah) */}
            <polygon points="12,12 21,8 21,19 12,23" fill="#242424" />
            
            {/* Front-Right Wall Gold Belt (Hizam) */}
            <polygon points="12,14.5 21,10.5 21,12.5 12,16.5" fill="#C5A059" />

            {/* Kaaba Roof (White/Light Marble with Inner Parapet) */}
            <polygon points="12,4 21,8 12,12 3,8" fill="#F4F3EF" stroke="#DDDBCF" strokeWidth="0.5" />
            <polygon points="12,5.5 19,8.5 12,11 5,8" fill="#D3D0C5" />

            {/* Golden corner accent */}
            <circle cx="12" cy="12" r="0.8" fill="#FFEBA3" />
          </g>

        </g>

        {/* 3. "aaba" text in heavy black/white sans-serif font matching the original logo */}
        <text 
          x="146" 
          y="66" 
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
          fontSize="64" 
          fontWeight="900" 
          letterSpacing="-1.5px" 
          fill={textColor}
        >aaba</text>
      </svg>
    </div>
  );
};
