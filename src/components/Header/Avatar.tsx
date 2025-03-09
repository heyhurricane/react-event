import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { useNavigate, Link } from 'react-router-dom';

import { logOut } from '../../store/authorization';
import { AppRoute } from '../../const/const';

export default function ImageAvatar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
    navigate(AppRoute.Profile, { replace: true });
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlLogOut = () => {
    dispatch(logOut());
    navigate(AppRoute.Login, { replace: true });
  };

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton
          onClick={handleClick}
          size='small'
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar src='/broken-image.jpg' />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={() => {}}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClickProfile} sx={{ fontSize: '16px' }}>
          <Avatar /> Мой профиль
        </MenuItem>
        <MenuItem component={Link} to='/login' onClick={handlLogOut} sx={{ fontSize: '16px' }}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
