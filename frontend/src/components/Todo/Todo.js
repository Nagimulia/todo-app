import React from 'react';
import { StyledTodoContainer, StyledTodoActionContainer, StyledActionTodo } from './Todo.Styled';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { deleteTodo } from '../../features/todo/todoSlice';
import { useDispatch } from 'react-redux';

const Todo = ({ todo = {}, setTodoText = () => {}, setUpdateTodoId = () => {} }) => {
  const dispatch = useDispatch();
  const convertDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };

  const handleDeleteTodo = (e) => {
    dispatch(deleteTodo(todo?._id));
  };
  const handleEditTodo = () => {
    setTodoText(todo.todo);
    setUpdateTodoId(todo._id)
  };

  return (
    <>
      <StyledTodoContainer>
        <StyledTodoActionContainer>
          <h1>{todo.todo}</h1>
          <StyledActionTodo>
            <Tooltip title="Изменить">
              <IconButton onClick={handleEditTodo}>
                <EditIcon sx={{ color: '#219ebc' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Удалить">
              <IconButton onClick={handleDeleteTodo}>
                <DeleteIcon sx={{ color: '#ca6702' }} />
              </IconButton>
            </Tooltip>
          </StyledActionTodo>
        </StyledTodoActionContainer>
        <p>{`Создано: ${convertDate(todo.createdAt)}`}</p>
      </StyledTodoContainer>
    </>
  );
};

export default Todo;
