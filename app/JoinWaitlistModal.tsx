import { Box, Button, TextField, Typography, Modal, Fade, Backdrop, Tooltip } from "@mui/material";
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import WarningIcon from '@mui/icons-material/Warning'; 
import { toast } from 'react-hot-toast';

interface JoinWaitlistModalProps {
  open: boolean;
  handleClose: () => void;
  handleJoin: (firstName: string, lastName: string, email: string) => Promise<void>; 
}

const JoinWaitlistModal: React.FC<JoinWaitlistModalProps> = ({ open, handleClose, handleJoin }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    if (firstNameError && e.target.value.trim()) {
      setFirstNameError(false);
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    if (lastNameError && e.target.value.trim()) {
      setLastNameError(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError && e.target.value.trim()) {
      setEmailError(false);
    }
  };

  const handleSubmit = async () => {
    let hasError = false;

    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);

    if (!firstName.trim()) {
      setFirstNameError(true);
      hasError = true;
    }

    if (!lastName.trim()) {
      setLastNameError(true);
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError(true);
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      await handleJoin(firstName, lastName, email);
      setFirstName('');
      setLastName('');
      setEmail('');
      toast.success("Thank you for joining our waitlist! 🚀");
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Oops! Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: 'translate(-50%, -50%)', background: '#ffffff', padding: 4  }}
          bgcolor="background.paper"
          borderRadius="12px"
          boxShadow={24}
          p={4}
          width="90%"
          maxWidth="500px"
        >
          <button
            className="absolute top-2 right-2"
            onClick={handleClose}
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6 text-black" />
          </button>
          <Typography 
            variant="h6" 
            mb={2} 
            color="primary"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            Join the Waitlist
          </Typography>
          <Box
            sx={{ background: '#f5f5f5', borderRadius: '8px', padding: 2, mb: 3 }}
          >
            <Typography 
              variant="body2" 
              color="textSecondary"
              sx={{ textAlign: 'center' }}
            >
              Don&apos;t miss out on our upcoming updates! Join our waitlist to be the first to know when we launch.
            </Typography>
          </Box>
          <Box sx={{ position: 'relative', marginBottom: 2 }}>
            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="John"
              required
              error={firstNameError}
              InputProps={{
                endAdornment: firstNameError ? (
                  <Tooltip title="Please fill out this field">
                    <WarningIcon color="warning" sx={{ marginLeft: 1 }} />
                  </Tooltip>
                ) : null,
              }}
            />
          </Box>
          <Box sx={{ position: 'relative', marginBottom: 2 }}>
            <TextField
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={handleLastNameChange}
              placeholder="Doe"
              required
              error={lastNameError}
              InputProps={{
                endAdornment: lastNameError ? (
                  <Tooltip title="Please fill out this field">
                    <WarningIcon color="warning" sx={{ marginLeft: 1 }} />
                  </Tooltip>
                ) : null,
              }}
            />
          </Box>
          <Box sx={{ position: 'relative', marginBottom: 2 }}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              placeholder="johndoe@gmail.com"
              type="email"
              required
              error={emailError}
              InputProps={{
                endAdornment: emailError ? (
                  <Tooltip title="Please fill out this field">
                    <WarningIcon color="warning" sx={{ marginLeft: 1 }} />
                  </Tooltip>
                ) : null,
              }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            disabled={loading}
            sx={{ backgroundColor: '#f8b878 ', color: '#FFFFFF', '&:hover': { backgroundColor: '#0056b3' } }}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
          <Box mt={2} sx={{ textAlign: 'center', color: 'textSecondary' }}>
            <Typography variant="caption">
              No worries! Your data is completely safe and will only be used to provide you with updates.
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default JoinWaitlistModal;











