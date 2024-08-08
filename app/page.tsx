'use client';
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi, I'm the TripTactix Support Agent. How can I assist you today?` }
  ]);

  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      { role: 'assistant', content: '' },
    ]);

    setMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

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

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: 'linear-gradient(-45deg, #00BFAE, #007BFF, #00BFAE, #007BFF)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        padding: 2
      }}
    >
      <Stack
        direction="column"
        width="100%"
        maxWidth="600px"
        height="80vh"
        borderRadius="12px"
        boxShadow={3}
        overflow="hidden"
        bgcolor="rgba(255, 255, 255, 0.8)"
      >
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
            >
              <Box
                bgcolor={msg.role === 'assistant' ? '#7FC7D9' : '#365486'} // Assistant and user colors
                color={msg.role === 'assistant' ? '#0F1035' : '#DCF2F1'} // Text color for assistant and user
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
            label='Type a message'
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button variant="contained" color="primary" onClick={sendMessage}>Send</Button>
        </Stack>
      </Stack>

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





