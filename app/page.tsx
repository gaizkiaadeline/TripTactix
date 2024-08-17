'use client';
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import JoinWaitlistModal from './JoinWaitlistModal';
import { Toaster, toast } from 'react-hot-toast';
import { doc, setDoc } from "firebase/firestore";
import { firestore } from '@/firebase';

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hello! I'm Trixie, your TripTactix support agent. I'm here to help with any questions or issues you have. What can I assist you with today?` }
  ]);

  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    const updatedMessages = [...messages, userMessage, { role: 'assistant', content: '' }];

    setMessages(updatedMessages);
    setMessage('');

    try {
      const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: [...messages, userMessage] }),  
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { role: 'assistant', content: data.content || "Sorry, I couldn't understand your request." },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    }
  };

  // const handleJoinWaitlist = async (name: string, email: string): Promise<void> => {
  //   console.log("Name submitted:", name);
  //   console.log("Email submitted:", email);
  //   toast.success("Thank you for joining our waitlist! 🚀");
  //   setIsModalOpen(false);
  // };


  const handleJoinWaitlist = async (firstName: string, lastName: string, email: string): Promise<void> => {
    try {
      const userDocRef = doc(firestore, "waitlist", email);
      await setDoc(userDocRef, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        timestamp: new Date().toISOString(),
      });
      toast.success("Thank you for joining our waitlist! 🚀");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving to Firestore:", err);
      toast.error("Oops! Something went wrong!");
    }
  };


  return (
    <Box
      width="100vw"
      minHeight="100vh"
      // height="auto" //
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: 'linear-gradient(-45deg, #00BFAE, #007BFF, #00BFAE, #007BFF)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        padding: 2,
        position: 'relative',
        overflowY: 'auto', // scroll or auto
      }}
    >
      {/* Logo TripTactix*/}
      <Box position="absolute" top={16} left={16}>
        <Box component="img" src="/images/logo.png" alt="TripTactix Logo" sx={{ width: 170, height: 170, marginTop: -5, marginLeft: -1 }} />
      </Box>

      {/* Title Text Centered Above Chat Box */}
      <Typography 
        variant="h3" 
        color="white" 
        fontWeight="bold" 
        sx={{ 
          marginTop: { xs: 12, sm: 14 }, 
          textAlign: 'center', 
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } 
        }}  
      >
        Your AI-powered <span style={{ color: '#f8b878' }}>Travel Planner</span>
      </Typography>

      <Typography 
        variant="h6"  
        color="white"
        sx={{ 
          marginTop: 2, 
          marginBottom: 2,  
          maxWidth: { xs: '90%', sm: '80%', md: '70%' },
          textAlign: 'center',
          fontSize: { xs: '1rem', sm: '1.25rem' }, 
          lineHeight: 1.2, 
          whiteSpace: 'normal', 
          display: 'block',
        }}
      >
        Curates personalized destinations, itineraries, and activities, all aligned with<br />
        your unique preferences and budget.
      </Typography>

      {/* Input for Waitlist */}
      <Box
        width="100%"
        maxWidth="500px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={7}  
        sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}  
      >
        <button 
          className="px-1 py-1 w-full rounded-full mr-4 bg-gradient-to-br from-red-500 via-purple-500 to-orange-600 text-white mt-3 hover:bg-slate-600"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="block bg-[#221C35] hover:bg-slate-800 rounded-full px-5 py-2">
            Join Waitlist
          </span>
        </button>
      </Box>

      <Typography
        variant="h6"
        color="white"
        sx={{
          marginBottom: 4,
          textAlign: 'center',
          fontSize: '18px',
          fontStyle: 'italic',
          maxWidth: '80%',
        }}
      >
        Curious About Personalized Travel Plans? Give Our AI Chatbot a Try!
      </Typography>

      {/* Chat Box */}
      <Box
        width="100%"
        maxWidth={{ xs: '90%', sm: '80%', md: '50%' }}
        height={{ xs: '80vh', md: '80vh' }}  
        borderRadius="12px"
        boxShadow={3}
        overflow="hidden"
        bgcolor="rgba(255, 255, 255, 0.8)"
        display="flex"
        flexDirection="column"
        sx={{ zIndex: 1 }} 
      >
        <Box
          display="flex"
          alignItems="center"
          bgcolor="#0F1035"
          padding={2}
          sx={{ borderBottom: '1px solid #DDD' }}
          height="80px"
        >
          <Box
            component="img"
            src="/images/Trixie.png"
            alt="Trixie Logo"
            sx={{ width: 100, height: 100, borderRadius: '50%', marginRight: 2 }} 
          />
          <Typography variant="h6" color="white">Trixie AI Support</Typography>
        </Box>
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto" 
          padding={2}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent={msg.role === 'assistant' ? 'flex-start' : 'flex-end'}
              alignItems='flex-start'
            >
              {msg.role === 'assistant' && (
                <Box
                  component="img"
                  src="/images/Trixie.png"
                  alt="Trixie Logo"
                  sx={{ width: 40, height: 40, borderRadius: '50%', marginRight: 1 }}
                />
              )}
              <Box
                bgcolor={msg.role === 'assistant' ? '#7FC7D9' : '#365486'} 
                color={msg.role === 'assistant' ? '#0F1035' : '#DCF2F1'}
                borderRadius="16px"
                p={2}
                maxWidth="75%"
                display="inline-block"
                sx={{ whiteSpace: 'pre-wrap' }}
              >
                <Typography variant="body1">{msg.content}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack
          direction='row'
          spacing={2}
          p={2}
          alignItems='center'
          bgcolor='#F5F5F5'
          borderTop="1px solid #DDD"
        >
          <TextField
            label='Start typing your message'
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: '#0F1035', color: '#FFFFFF' }} 
            onClick={sendMessage}
          >
            Send
          </Button>
        </Stack>
      </Box>

      {/* Modal */}
      <JoinWaitlistModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleJoin={handleJoinWaitlist}
      />

      <Toaster />
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>
    </Box>
  );
}

