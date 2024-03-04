import React from 'react';
import '../style.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';

const AddButton = ({ handleClick }) => {
  return (
    <Button
      variant="contained"
      onClick={handleClick}
      startIcon={<AddCircleIcon />}
    >
      <span>ADD</span>
    </Button>
  );
};

export default AddButton;
