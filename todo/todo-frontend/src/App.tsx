import { useEffect, useState } from "react";
import axios from "axios";
import {
  CssBaseline,
  Container,
  Paper,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const API_URL = "http://localhost:5000/todos";

interface Todo {
  _id: string;
  task: string;
  completed: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (!newTask.trim()) return;
    try {
      const { data } = await axios.post(API_URL, { task: newTask });
      setTodos([...todos, data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, { completed: !completed });
      setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" style={{ marginTop: 50, textAlign: "center" }}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h4">Todo List</Typography>
          <IconButton onClick={() => setDarkMode(!darkMode)} style={{ float: "right" }}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <TextField
            fullWidth
            variant="outlined"
            label="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={{ marginTop: 10 }}
          />
          <Button variant="contained" color="primary" onClick={addTodo} style={{ marginTop: 10 }}>
            Add Task
          </Button>
          <List>
            {todos.map(({ _id, task, completed }) => (
              <ListItem key={_id} divider>
                <Checkbox checked={completed} onChange={() => toggleComplete(_id, completed)} />
                <ListItemText primary={task} style={{ textDecoration: completed ? "line-through" : "none" }} />
                <IconButton color="secondary" onClick={() => deleteTodo(_id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
