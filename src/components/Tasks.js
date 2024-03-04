import React from 'react';
import '../style.css';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import moment from 'moment';

const Tasks = ({
  tasks,
  setTasks,
  handleUpdate,
  setOpenNotif,
  setNotifType,
  setNotifMsg,
}) => {
  // toggling checkbox
  const updateCheckbox = (taskId, taskStatus) => {
    setTasks(
      tasks.map((task) =>
        task.title === taskId ? { ...task, isComplete: !taskStatus } : task
      )
    );
    console.log(taskStatus);
  };

  // delete button for a task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.title !== taskId);
    setTasks(updatedTasks);
    setOpenNotif(true);
    setNotifType('success');
    setNotifMsg('Task successfully deleted');
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Deadline</TableCell>
            <TableCell align="center">Priority</TableCell>
            <TableCell align="center">Is Complete</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.title}
              </TableCell>
              <TableCell align="center">{row.desc}</TableCell>
              <TableCell align="center">
                {moment(row.deadline).format('MM/DD/YYYY')}
              </TableCell>
              <TableCell align="center">{row.priority}</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={row.isComplete}
                  onChange={() => updateCheckbox(row.title, row.isComplete)}
                />
              </TableCell>

              <TableCell>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {!row.isComplete && (
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => handleUpdate(row)}
                    >
                      <span>UPDATE</span>
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    startIcon={<HighlightOffIcon />}
                    style={{ backgroundColor: 'red' }}
                    onClick={() => handleDeleteTask(row.title)}
                  >
                    <span>DELETE</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tasks;
