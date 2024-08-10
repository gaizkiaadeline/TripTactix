'use client';

import { useEffect, useRef } from 'react';

const LottieBus = () => {
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lottieRef.current) {
      const lottiePlayer = document.createElement('dotlottie-player') as any;
      lottiePlayer.src = 'https://lottie.host/69879e35-879c-4601-9e7f-bb7f89bf35e1/Pz1RssoFYz.json';
      lottiePlayer.style.position = 'absolute';
      lottiePlayer.style.top = '0';
      lottiePlayer.style.left = '0';
      lottiePlayer.style.width = '100%';
      lottiePlayer.style.height = '100%';
      lottiePlayer.style.zIndex = '0'; 
      lottiePlayer.setAttribute('background', 'transparent');
      lottiePlayer.setAttribute('speed', '1');
      lottiePlayer.setAttribute('direction', '1');
      lottiePlayer.setAttribute('playMode', 'normal');
      lottiePlayer.setAttribute('loop', 'true');
      lottiePlayer.setAttribute('controls', 'false');
      lottiePlayer.setAttribute('autoplay', 'true');
      lottieRef.current.appendChild(lottiePlayer);
    }
  }, []);

  return <div ref={lottieRef} className="lottie-background" />;
};

export default LottieBus;










