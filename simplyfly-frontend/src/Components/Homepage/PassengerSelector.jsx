import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Popover,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PersonIcon from '@mui/icons-material/Person';

const PassengerSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (type, operation) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: operation === 'increment' ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };

  return (
    <div>
      {/* Select as Trigger */}
      <Select
        size="small"
        value=""
        onClick={handleOpen}
        displayEmpty
        renderValue={() => (
          <Box display="flex" alignItems="center">
            <PersonIcon style={{ marginRight: 4 }} />
            {totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}
          </Box>
        )}

        sx={{ p: 1 }}
        style={{
          cursor: 'pointer',
          border: '1px solid rgba(0, 0, 0, 0.23)',
          borderRadius: '4px',
          backgroundColor: "white"
        }}
        // MenuProps={{ disableScrollLock: true }} // Disable dropdown menu behavior
        inputProps={{ readOnly: true }} // Prevent default dropdown behavior
      />


      {/* Popover for Passenger Details */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={2} width={250}>
          {['adults', 'children', 'infants'].map((type) => (
            <Box
              key={type}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Typography>
              <Box display="flex" alignItems="center">
                <IconButton
                  onClick={() => handleChange(type, 'decrement')}
                  size="small"
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{passengers[type]}</Typography>
                <IconButton
                  onClick={() => handleChange(type, 'increment')}
                  size="small"
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Typography align="center">
            Total: {totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}
          </Typography>
          <Button
            onClick={handleClose}
            variant="contained"
            fullWidth
            size="small"
            sx={{mt:1}}
          >
            Done
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default PassengerSelector;