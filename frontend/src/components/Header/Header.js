import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  StyledContainer,
  StyledDashboardDiv,
  StyledUserContainer,
  StyledButton,
} from './Header.styled';
import { useDispatch, useSelector } from 'react-redux';
import {logout, reset} from '../../features/Authentication/userSlice'

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login')
  }
  
  return (
    <StyledContainer>
      <StyledDashboardDiv>
        <Link to="/">Мой список дел</Link>
      </StyledDashboardDiv>
      {user ? (
        <StyledButton onClick={handleLogout}>
          <LogoutIcon />
          <h5>Выход</h5>
        </StyledButton>
      ) : (
        <>
          <StyledUserContainer>
            <Link to="login">
              <LoginIcon />
              <h5>Вход</h5>
            </Link>
          </StyledUserContainer>
          <StyledUserContainer>
            <Link to="register">
              <PersonIcon />
              <h5>Регистрация</h5>
            </Link>
          </StyledUserContainer>
        </>
      )}
    </StyledContainer>
  );
};

export default Header;
