import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
  FormHelperText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import EditIcon from '@mui/icons-material/Edit';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/de';
import '../css/Popup.css';

const Popup = ({
  task,
  setTask,
  tasks,
  setTasks,
  open,
  setOpen,
  dialogTitle,
  setOpenNotif,
  setNotifType,
  setNotifMsg,
}) => {
  // hooks
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDesc, setTaskDesc] = useState(task.desc);
  const [taskDeadline, setTaskDeadline] = useState(task.deadline);
  const [taskPriority, setTaskPriority] = useState(task.priority);

  const [isDuplicateTitle, setIsDuplicateTitle] = useState(false);
  const [taskTitleError, setTaskTitleError] = useState('');

  const [taskTitleTouched, setTaskTitleTouched] = useState(false);
  const [taskDescTouched, setTaskDescTouched] = useState(false);
  const [taskDeadlineTouched, setTaskDeadlineTouched] = useState(false);
  const [taskPriorityTouched, setTaskPriorityTouched] = useState(false);

  useEffect(() => {
    setTaskTitle(task.title);
    setTaskDesc(task.desc);
    setTaskDeadline(task.deadline);
    setTaskPriority(task.priority);
  }, [task]);

  useEffect(() => {
    if (isDuplicateTitle) {
      setTaskTitleError('Task title cannot be duplicate');
    } else {
      setTaskTitleError('');
    }
  }, [isDuplicateTitle]);

  // close popup
  const handleClose = () => {
    setOpen(false);
    setTaskTitleTouched(false);
    setTaskDescTouched(false);
    setTaskDeadlineTouched(false);
    setTaskPriorityTouched(false);
    setTaskTitleError('');
    setTimeout(() => {
      setTaskTitle('');
      setTaskDesc('');
      setTaskDeadline(null);
      setTask({
        title: '',
        desc: '',
        deadline: null,
        priority: '',
        isComplete: false,
      });
    }, 100);
  };

  // for adding new tasks
  const handleAdd = () => {
    // all entries are valid
    if (
      !isDuplicateTitle &&
      taskTitle &&
      taskDesc &&
      taskDeadline !== null &&
      taskPriority
    ) {
      const newTask = {
        title: taskTitle,
        desc: taskDesc,
        deadline: taskDeadline,
        priority: taskPriority,
        isComplete: false,
      };

      setTasks(tasks.concat(newTask));
      setNotifMsg('Task successfully added');
      setNotifType('success');
      setOpenNotif(true);
      handleClose();
    } else {
      // title is empty case
      if (!isDuplicateTitle && !taskTitle) {
        setTaskTitleError('Task title cannot be empty');
      }

      // will help trigger error around input field if needed
      setTaskTitleTouched(true);
      setTaskDescTouched(true);
      setTaskDeadlineTouched(true);
      setTaskPriorityTouched(true);
    }
  };

  // for editing a task
  const handleEdit = () => {
    if (taskDesc && taskDeadline) {
      const updatedTask = {
        title: taskTitle,
        desc: taskDesc,
        deadline: taskDeadline,
        priority: taskPriority,
        isComplete: false,
      };
      const taskToUpdateIdx = tasks.findIndex(
        (task) => task.title === taskTitle
      );
      tasks[taskToUpdateIdx] = { ...tasks[taskToUpdateIdx], ...updatedTask };
      setTasks(tasks);
      setOpenNotif(true);
      setNotifType('success');
      setNotifMsg('Task successfully edited');
      handleClose();
    }
  };

  // checking if title is duplicate or empty
  const handleSetTaskTitle = (title) => {
    setTaskTitleTouched(true);
    setIsDuplicateTitle(false);

    tasks.map((task) => {
      if (task.title === title) {
        setIsDuplicateTitle(true);
      }
    });

    if (!isDuplicateTitle && title) {
      setTaskTitleError('');
      setTaskTitle(title);
    }

    if (!title) {
      setTaskTitleError('Task title cannot be empty');
    }

    if (isDuplicateTitle) {
      setTaskTitleError('Task title cannot be duplicate');
    }
  };

  const handleSetTaskDesc = (desc) => {
    setTaskDesc(desc);
    setTaskDescTouched(true);
  };

  const isDateValid = (date) => {
    return moment(date, 'MM/DD/YYYY', true).isValid();
  };

  const handleSetTaskDeadline = (deadline) => {
    console.log(deadline);
    setTaskDeadlineTouched(true);
    if (isDateValid(deadline)) {
      setTaskDeadline(deadline);
    } else {
      setTaskDeadline(null);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          color: 'white',
          backgroundColor: 'primary.dark',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {dialogTitle === 'Add Task' ? <AddCircleIcon /> : <EditIcon />}
          <span style={{ marginLeft: '2px' }}>{dialogTitle}</span>
        </div>
      </DialogTitle>

      <DialogContent>
        <div style={{ width: '300px' }}>
          <FormControl
            sx={{ padding: '5%', justifyContent: 'center', display: 'flex' }}
          >
            {dialogTitle === 'Add Task' && (
              <TextField
                label="Title"
                variant="outlined"
                sx={{ my: '5%' }}
                error={taskTitleError !== '' && taskTitleTouched}
                helperText={taskTitleTouched ? taskTitleError : ''}
                onChange={({ target }) => handleSetTaskTitle(target.value)}
              />
            )}

            <TextField
              label="Description"
              variant="outlined"
              value={taskDesc}
              sx={{ my: '5%' }}
              error={taskDesc === '' && taskDescTouched}
              helperText={
                taskDesc === '' && taskDescTouched
                  ? 'Task description cannot be empty'
                  : ''
              }
              onChange={({ target }) => handleSetTaskDesc(target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Deadline"
                format="MM/DD/YYYY"
                sx={{ my: '5%' }}
                value={taskDeadline ? moment.utc(taskDeadline) : null}
                slotProps={{
                  textField: {
                    error: taskDeadline === null && taskDeadlineTouched,
                    helperText:
                      taskDeadline === null && taskDeadlineTouched
                        ? 'Task deadline is required'
                        : '',
                  },
                }}
                onChange={(date) => handleSetTaskDeadline(date)}
              />
            </LocalizationProvider>

            <FormLabel id="task-priority">Priority</FormLabel>
            <RadioGroup
              row
              aria-labelledby="task-priority"
              value={taskPriority}
              name="task-priority-buttons"
              onChange={(event) => setTaskPriority(event.target.value)}
            >
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel value="med" control={<Radio />} label="Med" />
              <FormControlLabel value="high" control={<Radio />} label="High" />
            </RadioGroup>
            {!taskPriority && taskPriorityTouched && (
              <FormHelperText error>Priority is required</FormHelperText>
            )}
          </FormControl>

          <div
            style={{
              justifyContent: 'right',
              display: 'flex',
              marginTop: '20px',
            }}
          >
            {dialogTitle === 'Add Task' ? (
              <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={handleAdd}
              >
                <span>ADD</span>
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                <span>EDIT</span>
              </Button>
            )}

            <Button
              variant="contained"
              startIcon={<DoNotDisturbAltIcon />}
              sx={{ marginLeft: '5px', color: 'white', backgroundColor: 'red' }}
              onClick={handleClose}
            >
              <span>CANCEL</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
