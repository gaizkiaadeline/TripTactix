// import { Box, Typography } from '@mui/material';

// const Footer = () => {
//   return (
//     <Box
//       width="100%"
//       padding={2}
//       color="white"
//       textAlign="center"
//       sx={{
//         marginTop: '55px',
//         fontFamily: 'Poppins, sans-serif',
//         borderTop: '1px solid rgba(255, 255, 255, 0.3)', 
//       }}
//     >
//       <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif' }}>© 2024. All rights reserved.</Typography>
//       <Typography variant="body2" mt={1} sx={{ fontFamily: 'Poppins, sans-serif' }}>Dev Team: Veronica, Fatih, Adeline, Shashank</Typography>
//       <Typography variant="body2" mt={1} sx={{ fontFamily: 'Poppins, sans-serif' }}>Coming Soon!</Typography>
//     </Box>
//   );
// };

// export default Footer;

import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      width="100%"
      padding={2}
      color="white"
      textAlign="center"
      sx={{
        marginTop: '55px',
        fontFamily: 'Poppins, sans-serif',
        borderTop: '1px solid rgba(255, 255, 255, 0.3)', 
      }}
    >
      <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif' }}>
        © 2024. All rights reserved.
      </Typography>
      <Typography variant="body2" mt={1} sx={{ fontFamily: 'Poppins, sans-serif' }}>
        Dev Team: 
        <a
          href="https://www.linkedin.com/in/veronica-dwiyanti"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#365486', 
            textDecoration: 'underline',
            margin: '0 4px',
            fontWeight: 'bold'
          }}
        >
          Veronica
        </a>, 
        <a
          href="https://www.linkedin.com/in/fatih-aulia-jauhar-0864ab311/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#365486', 
            textDecoration: 'underline',
            margin: '0 4px',
            fontWeight: 'bold'
          }}
        >
          Fatih
        </a>, 
        <a
          href="https://www.linkedin.com/in/gaizkia-adeline-atmaka-56117b215/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#365486', 
            textDecoration: 'underline',
            margin: '0 4px', 
            fontWeight: 'bold'
          }}
        >
          Adeline
        </a>, 
        <a
          href="https://www.linkedin.com/in/shashank-profile"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#365486', 
            textDecoration: 'underline',
            margin: '0 4px', 
            fontWeight: 'bold'
          }}
        >
          Shashank
        </a>
      </Typography>
      <Typography variant="body2" mt={1} sx={{ fontFamily: 'Poppins, sans-serif' }}>
        Coming Soon!
      </Typography>
    </Box>
  );
};

export default Footer;
