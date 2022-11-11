import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import {
  StyledContainer,
  StyledFormHeader,
  StyledFormContainer,
  StyledInputContainer,
  StyledButtonContainer,
} from './Register.styled';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../features/Authentication/userSlice';

const Register = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmedPassword: '',
  });
  const { name, email, password, confirmedPassword } = registerData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (isError) {
      setOpenSnackbar(true);
      setToastMessage(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message,navigate,dispatch]);

  const handleChange = (e) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
 
  const submitData = (e) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      dispatch(reset());
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  const action = (
    <>
      <IconButton onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <>
      <StyledContainer>
        <StyledFormHeader>
          <h1>
            <PersonIcon />
            Регистрация
          </h1>
          <p>Пожалуйста, создайте аккаунт</p>
        </StyledFormHeader>
        <StyledFormContainer>
          <form onSubmit={submitData}>
            <StyledInputContainer>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Введите свое имя"
                onChange={handleChange}
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Введите свой email"
                onChange={handleChange}
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Введите пароль"
                onChange={handleChange}
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <input
                type="password"
                id="confirmedPassword"
                name="confirmedPassword"
                value={confirmedPassword}
                placeholder="Подтвердите пароль"
                onChange={handleChange}
              />
            </StyledInputContainer>
            <StyledButtonContainer>
              <Button
                disabled={
                  name === '' || email === '' || password === '' || confirmedPassword === ''
                }
                variant="contained"
                color="primary"
                type="submit">
                Отправить
              </Button>
            </StyledButtonContainer>
          </form>
        </StyledFormContainer>
      </StyledContainer>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message={toastMessage}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        action={action}
      />
    </>
  );
};

export default Register;
