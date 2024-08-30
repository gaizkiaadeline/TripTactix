import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSpring, animated } from '@react-spring/web';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How does TripTactix generate personalized itineraries?",
    answer: "TripTactix uses advanced AI algorithms to analyze your preferences, budget, and interests to create tailored travel plans just for you."
  },
  {
    question: "What kind of recommendations can I expect?",
    answer: "Our AI provides recommendations for destinations, activities, and accommodations that match your unique interests and travel style."
  },
  {
    question: "Can I make changes to my itinerary?",
    answer: "Yes, you can modify your itinerary at any time. TripTactix will suggest adjustments based on your new preferences or schedule changes."
  },
  {
    question: "How does TripTactix handle my personal data?",
    answer: "Your privacy is important to us. We use encryption and secure protocols to protect your personal data and only use it to enhance your travel experience."
  },
  {
    question: "Is there a cost to use TripTactix?",
    answer: "TripTactix offers a range of free and premium features. You can explore our basic features for free, and choose to upgrade for additional benefits."
  }
];

const FAQSection = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const springProps = useSpring({
    opacity: expanded ? 1 : 0.5,
    transform: expanded ? 'translateY(0)' : 'translateY(-10px)',
  });

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: 'auto', padding: '16px', textAlign: 'center', marginTop: '32px' }}>
      <div style={{ textAlign: 'left' }}>
        {faqs.map((faq: FAQ, index: number) => {
          const isExpandedPanel = expanded === `panel${index}`;

          return (
            <Accordion
              key={index}
              expanded={isExpandedPanel}
              onChange={handleChange(`panel${index}`)}
              style={{
                backgroundColor: '#FFF',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                marginBottom: '16px',
                border: '1px solid #ddd'
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: '#007BFF' }} />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography style={{ fontWeight: '600', color: '#333' }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <animated.div style={isExpandedPanel ? springProps : undefined}>
                  <Typography style={{ color: '#333' }}>
                    {faq.answer}
                  </Typography>
                </animated.div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;










