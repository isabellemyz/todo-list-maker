import React from 'react';
import '../style.css';
import { CardHeader } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddButton from './AddButton';

const Header = ({ handleAddClick }) => {
  return (
    <CardHeader
      sx={{ color: 'white', backgroundColor: 'primary.dark' }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MenuIcon />
          <span style={{ marginLeft: '2px' }}>Frameworks</span>
        </div>
      }
      action={<AddButton handleClick={handleAddClick} />}
    ></CardHeader>
  );
};

export default Header;
