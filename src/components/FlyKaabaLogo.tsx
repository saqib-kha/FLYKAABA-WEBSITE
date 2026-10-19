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
  width = '154',
  height = '40',
  variant = 'dark',
  onClick,
}) => {
  const textColor = variant === 'light' ? '#FFFFFF' : '#000000';
  const idPrefix = `fkl-${variant}`;

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center select-none cursor-pointer ${className}`}
      title="FlyKaaba"
    >
      <svg 
        viewBox="0 0 350 88" 
        width={width}
        height={height}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-[154px] h-[40px] max-h-full overflow-visible"
        aria-label="FlyKaaba"
      >
        <defs>
          {/* Rich metallic gold gradient for Kiswah embroidery and arms */}
          <linearGradient id={`${idPrefix}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDEAA8" />
            <stop offset="25%" stopColor="#E2BD58" />
            <stop offset="55%" stopColor="#BD9226" />
            <stop offset="80%" stopColor="#966F13" />
            <stop offset="100%" stopColor="#E8C765" />
          </linearGradient>

          {/* Golden shine for Hizam belt and Kaaba door */}
          <linearGradient id={`${idPrefix}-hizam`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFF2B8" />
            <stop offset="40%" stopColor="#E0BA55" />
            <stop offset="75%" stopColor="#BF9528" />
            <stop offset="100%" stopColor="#F9DB7D" />
          </linearGradient>

          {/* Intricate Arabic Calligraphy embroidery pattern for diagonal arms */}
          <pattern 
            id={`${idPrefix}-calligraphy`} 
            width="28" 
            height="28" 
            patternUnits="userSpaceOnUse" 
            patternTransform="rotate(45)"
          >
            {/* Thuluth script styled calligraphy ligatures */}
            <path 
              d="M 2,4 Q 8,1 14,4 T 26,3 M 0,9 Q 7,12 15,8 T 28,10 M 3,16 Q 10,13 18,17 T 27,15 M 1,22 Q 9,25 17,21 T 28,23" 
              stroke="#543C08" 
              strokeWidth="1.2" 
              strokeLinecap="round"
              fill="none"
              opacity="0.82"
            />
            <path 
              d="M 6,7 Q 9,9 11,5 M 20,8 Q 23,10 25,6 M 7,19 Q 10,21 12,17 M 19,20 Q 22,22 24,18" 
              stroke="#78560E" 
              strokeWidth="1.4" 
              strokeLinecap="round" 
              fill="none"
              opacity="0.75"
            />
          </pattern>
        </defs>

        {/* 1. "Fly" text in heavy sans-serif matching official brand typography */}
        <text 
          x="0" 
          y="74" 
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          fontSize="73" 
          fontWeight="800" 
          letterSpacing="-2px" 
          fill={textColor}
        >Fly</text>

        {/* 2. Custom Stylized Islamic Letter "K" with Kiswah Embroidery & 3D Holy Kaaba */}
        <g transform="translate(116, 0)">
          
          {/* Vertical Stem of "K" (Black Kiswah Column with Gold Border) */}
          <rect 
            x="0" 
            y="21" 
            width="15.5" 
            height="53" 
            rx="0.5" 
            fill="#111111" 
            stroke={`url(#${idPrefix}-gold)`} 
            strokeWidth="0.8" 
          />
          
          {/* Gold Middle Hizam Belt on Vertical Stem */}
          <rect 
            x="-0.5" 
            y="42" 
            width="16.5" 
            height="10" 
            fill={`url(#${idPrefix}-hizam)`} 
            stroke="#856111" 
            strokeWidth="0.5" 
          />
          {/* Islamic Geometric Diamond Ornament inside Central Belt */}
          <polygon 
            points="7.75,43.5 12,47 7.75,50.5 3.5,47" 
            fill="#141414" 
            stroke="#FFEBA3" 
            strokeWidth="0.6" 
          />
          <circle cx="7.75" cy="47" r="0.9" fill={`url(#${idPrefix}-hizam)`} />

          {/* Upper Diagonal Arm (Gold with Embroidered Arabic Calligraphy) */}
          <g>
            {/* Base Gold Polygon */}
            <polygon 
              points="13,47 25,35 48.5,11.5 61,24 33,52 13,47" 
              fill={`url(#${idPrefix}-gold)`} 
              stroke="#856111" 
              strokeWidth="0.8" 
            />
            {/* Arabic Calligraphy Embroidery Texture */}
            <polygon 
              points="13,47 25,35 48.5,11.5 61,24 33,52 13,47" 
              fill={`url(#${idPrefix}-calligraphy)`} 
            />
            {/* Gold Bevel Highlights */}
            <line x1="25" y1="35" x2="48.5" y2="11.5" stroke="#FFF3C4" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="13" y1="47" x2="33" y2="52" stroke="#664908" strokeWidth="1" />
          </g>

          {/* Lower Diagonal Arm (Gold with Embroidered Arabic Calligraphy) */}
          <g>
            {/* Base Gold Polygon */}
            <polygon 
              points="13,47 33,42 61,70 48.5,82.5 25,59 13,47" 
              fill={`url(#${idPrefix}-gold)`} 
              stroke="#856111" 
              strokeWidth="0.8" 
            />
            {/* Arabic Calligraphy Embroidery Texture */}
            <polygon 
              points="13,47 33,42 61,70 48.5,82.5 25,59 13,47" 
              fill={`url(#${idPrefix}-calligraphy)`} 
            />
            {/* Gold Bevel Highlights */}
            <line x1="33" y1="42" x2="61" y2="70" stroke="#FFF3C4" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="25" y1="59" x2="48.5" y2="82.5" stroke="#664908" strokeWidth="1" />
          </g>

          {/* 3D Isometric Holy Kaaba atop the upper diagonal arm */}
          <g transform="translate(47.5, -3)">
            {/* Marble Base (Shadharwan) */}
            <polygon 
              points="11,19 19.5,23 11,25 2.5,21" 
              fill="#EAE8E2" 
              stroke="#D6D3C8" 
              strokeWidth="0.5" 
            />
            
            {/* Front-Left Wall (Black Kiswah) */}
            <polygon points="2.5,7.5 11,11.5 11,22.5 2.5,18.5" fill="#111111" />
            
            {/* Front-Left Wall Gold Belt (Hizam) with Calligraphy Band */}
            <polygon points="2.5,9.8 11,13.8 11,15.8 2.5,11.8" fill={`url(#${idPrefix}-hizam)`} />
            <line x1="3.5" y1="11" x2="10" y2="14.8" stroke="#7A560A" strokeWidth="0.5" strokeDasharray="1.2,0.8" />
            
            {/* Golden Door of the Holy Kaaba (Bab al-Kaaba) with Twin Panels & Lock */}
            <polygon points="5.5,13.2 9.5,15 9.5,21 5.5,19.2" fill="#FFDF73" stroke="#8C6510" strokeWidth="0.4" />
            <line x1="7.5" y1="14.1" x2="7.5" y2="20.1" stroke="#8C6510" strokeWidth="0.3" />
            <circle cx="6.8" cy="17.8" r="0.5" fill="#3D2903" />

            {/* Front-Right Wall (Perspective Shadowed Black Kiswah) */}
            <polygon points="11,11.5 19.5,7.5 19.5,18.5 11,22.5" fill="#222222" />
            
            {/* Front-Right Wall Gold Belt (Hizam) */}
            <polygon points="11,13.8 19.5,9.8 19.5,11.8 11,15.8" fill="#B88F2A" />
            <line x1="12" y1="14.8" x2="18.5" y2="11" stroke="#694C0C" strokeWidth="0.5" strokeDasharray="1.2,0.8" />

            {/* Kaaba Roof (Light Marble Parapet with Inner Recessed Panel) */}
            <polygon points="11,3.5 19.5,7.5 11,11.5 2.5,7.5" fill="#F6F5F1" stroke="#DBD8CC" strokeWidth="0.5" />
            <polygon points="11,5 17.5,8 11,10.2 4.5,7.5" fill="#DDD9CC" />

            {/* Golden Corner Mezab Accent */}
            <circle cx="11,11.5" r="0.75" fill="#FFEBA3" />
          </g>

        </g>

        {/* 3. "aaba" text in heavy sans-serif matching official brand typography */}
        <text 
          x="184" 
          y="74" 
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          fontSize="73" 
          fontWeight="800" 
          letterSpacing="-2px" 
          fill={textColor}
        >aaba</text>
      </svg>
    </div>
  );
};
