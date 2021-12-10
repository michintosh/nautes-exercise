import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function AddTodo({ users, addTask }) {
  const [user, setUser] = useState({});
  const [task, setTask] = useState("Lorem Ipsum");

    const handleUserChange = (event) => {
        setUser(event.target.value)
        console.log(event.target.value)
  };
    const handleTextChange = (event) => {
      setTask(event.target.value)
  };
    const handleAddTask = () => {
        if (Object.keys(user).length === 0) {
            alert("Inserire operatore")
        } else {

            addTask(user,task)
        }
  };

  return (
    <Box>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, maxHeight: "50px" }}
      >
        Nuova Attività
      </Typography>
      <Stack
        component="form"
        direction="row" 
        noValidate
              autoComplete="off"
              spacing={1}
      >
        <TextField
          required
          id="outlined-required"
          label="Descrizione"
                  defaultValue={task}
                  onChange={handleTextChange}
          sx={{
            flex: 1,
          }}
        />
        <FormControl
          fullWidth
          sx={{
            flex: 1,
          }}
        >
          <InputLabel id="demo-simple-select-label">operatore</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="Operatore"
                      onChange={handleUserChange}
                      required
          >
            {users.map((el) => {
              return <MenuItem value={el}>{el.firstname}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Stack>
      <Stack direction={"row"} spacing={1} sx={{justifyContent:"flex-end", marginTop:".5rem"}}>
        <Button variant="contained">Annulla</Button>
        <Button onClick={handleAddTask} variant="contained">Salva</Button>
      </Stack>
    </Box>
  );
}

export default AddTodo;
