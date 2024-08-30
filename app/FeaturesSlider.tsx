import React, { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faLightbulb, faClock, faWallet } from '@fortawesome/free-solid-svg-icons';

const features = [
  { 
    title: 'Personalized Itineraries', 
    description: 'AI-generated travel plans tailored to your preferences and budget.', 
    icon: faMapMarkedAlt, 
    color: '#FF5733'
  },
  { 
    title: 'Smart Recommendations', 
    description: 'Discover destinations and activities based on your unique interests.', 
    icon: faLightbulb, 
    color: '#FFC300'
  },
  { 
    title: 'Real-Time Updates', 
    description: 'Stay informed with the latest weather, events, and travel advisories.', 
    icon: faClock, 
    color: '#28A745'
  },
  { 
    title: 'Budget Optimization', 
    description: 'Plan within your budget with AI-suggested cost-effective options.', 
    icon: faWallet, 
    color: '#007BFF'
  },
];

export default function FeaturesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '400px',
        overflow: 'hidden',
        borderRadius: '12px',
        background: 'linear-gradient(to right, #f0f4f8, #e2e8f0)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        padding: 2,
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 1s ease-in-out',
        }}
      >
        {features.map((feature, index) => (
          <Box 
            key={index} 
            sx={{
              flexShrink: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              bgcolor: `linear-gradient(135deg, ${feature.color} 0%, rgba(255, 255, 255, 0.9) 100%)`,
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
              overflow: 'hidden',
              padding: '20px',
              boxSizing: 'border-box',
              position: 'relative',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 16px 32px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '90px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${feature.color} 0%, rgba(255, 255, 255, 0.8) 80%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 8px rgba(0, 0, 0, 0.3)`,
              }}
            >
              <FontAwesomeIcon 
                icon={feature.icon} 
                size="3x" 
                style={{ color: feature.color }} 
              />
            </Box>
            <Box
              sx={{
                marginTop: '120px',
                textAlign: 'center',
              }}
            >
              <Typography 
                variant="h5" 
                fontWeight="bold" 
                sx={{ 
                  marginBottom: '12px', 
                  color: '#333',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                }}
              >
                {feature.title}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#555',
                  lineHeight: 1.6,
                  letterSpacing: '0.5px',
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}








