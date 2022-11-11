import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  StyledContainer,
  StyledFormHeader,
  StyledFormContainer,
  StyledInputContainer,
} from '../Register/Register.styled';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { getTodos, reset, addTodos, updateTodo } from '../../features/todo/todoSlice';
import Todo from '../Todo/Todo';

const Home = () => {
  const [todoText, setTodoText] = useState();
  const [updateTodoId, setUpdateTodoId] = useState('');
  const { todo } = useSelector((state) => state.todo);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    dispatch(getTodos());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const handleTodochange = (e) => {
    setTodoText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateTodoId !== '' && todoText) {
      const updateData = {
        updateTodoId,
        todoText,
      };
      dispatch(updateTodo(updateData));
      setTodoText('');
      setUpdateTodoId('');
    } else {
      dispatch(addTodos(todoText));
      setTodoText('');
    }
  };

  return (
    <>
      <StyledContainer>
        <StyledFormHeader>
          <h1>
            <DashboardIcon />
            {`Добро пожаловать, ${user?.name}!`}
          </h1>
        </StyledFormHeader>
        <StyledFormContainer>
          <form onSubmit={handleSubmit}>
            <StyledInputContainer>
              <input
                type="text"
                id="todo"
                name="todo"
                defaultValue={todoText}
                placeholder="Добавьте, что планируете сделать"
                onChange={handleTodochange}
              />
            </StyledInputContainer>
          </form>
          {todo?.map((item) => (
            <Todo
              key={item._id}
              todo={item}
              setTodoText={setTodoText}
              setUpdateTodoId={setUpdateTodoId}
            />
          ))}
        </StyledFormContainer>
      </StyledContainer>
    </>
  );
};

export default Home;
