import React from "react";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

function FilterUsers({ users, selectedUser, setSeletctedUser }) {
  const handleChange = (event) => {
    setSeletctedUser(event.target.value);
  };
  return (
    <FormControl fullWidth sx={{marginBottom:"1rem"}}>
      <InputLabel id="demo-simple-select-label">filtra per operatore</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedUser}
        label="filtra per operatore"
        sx={{backgroundColor:"white"}}
        onChange={handleChange}
          >
              <MenuItem value={"all"}>Tutti/e</MenuItem>
        {users.map((user) => {
          return <MenuItem value={user.firstname}>{user.firstname}</MenuItem>;
        })}
              
      </Select>
    </FormControl>
  );
}

export default FilterUsers;
