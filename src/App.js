import React, { useState, useEffect } from 'react';
import './style.css';
import Header from './components/Header';
import Popup from './components/Popup';
import Tasks from './components/Tasks';
import Notif from './components/Notif';

const App = () => {
  // hooks
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [tasks, setTasks] = useState([]); // array for tasks
  const [task, setTask] = useState({
    title: '',
    desc: '',
    deadline: null,
    priority: '',
    isComplete: false,
  });

  const [openNotif, setOpenNotif] = useState(false);
  const [notifType, setNotifType] = useState('success');
  const [notifMsg, setNotifMsg] = useState('');

  // for the add button on the header
  const handleAddClick = () => {
    setDialogTitle('Add Task');
    setOpenDialog(true);
  };

  // for updating/editing task
  const handleUpdate = (task) => {
    setTask(task)
    setDialogTitle('Edit Task')
    setOpenDialog(true)
  }

  return (
    <div>
      <Notif
        open={openNotif}
        setOpen={setOpenNotif}
        severity={notifType}
        message={notifMsg}
      />
      <div>
        <Header handleAddClick={handleAddClick} />
      </div>
      <div>
        <Popup
          open={openDialog}
          dialogTitle={dialogTitle}
          setOpen={setOpenDialog}
          tasks={tasks}
          setTasks={setTasks}
          task={task}
          setTask={setTask}
          setOpenNotif={setOpenNotif}
          setNotifType={setNotifType}
          setNotifMsg={setNotifMsg}
          
        />
      </div>
      <div>
        <Tasks
          dialogTitle={dialogTitle}
          setDialogTitle={setDialogTitle}
          tasks={tasks}
          setTasks={setTasks}
          handleUpdate={handleUpdate}
          setOpenNotif={setOpenNotif}
          setNotifType={setNotifType}
          setNotifMsg={setNotifMsg}
        />
      </div>
    </div>
  );
};

export default App;
