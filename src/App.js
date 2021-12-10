import  React from "react";
import Box from "@mui/material/Box";
import Sidebar from "./components/Sidebar";
import MainBoard from "./components/MainBoard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { itIT as coreitIT } from '@mui/material/locale';
import { gql, useQuery } from "@apollo/client";
import LinearProgress from '@mui/material/LinearProgress';
import './App.css'

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#be0010",
    },
    secondary: {
      main: "#2a3948",
    },
  },
  coreitIT
});

const MAIN_DATA = gql`
  query {
    users {
      id
      firstname
    }
    todos {
      id
      task
      done
      user {
        id
      }
    }
  }
`;
let rowsCleaned = [];
let users = [];

export default function App() {
  const { loading, error, data } = useQuery(MAIN_DATA);

  if (!loading) {
    rowsCleaned = []
    data.todos.map((todo) => {
      // clean the data linking the user firstname
      let tmp_obj = {};
      const result = data.users.find((user) => user.id == todo.user.id);
      tmp_obj.firstname = result.firstname;
      tmp_obj.task = todo.task;
      tmp_obj.done = todo.done;
      tmp_obj.id = todo.id
      rowsCleaned.push(tmp_obj);
    });
    users = [...data.users]
  }
  if (error) return `Error! ${error}`;

 

  return (
    <ThemeProvider theme={theme}>
      {loading &&
        <Box >
          <LinearProgress />
        </Box>
      }
      {!loading && (
        <Box sx={{ display: "flex", height:"100%" }}>
          <Sidebar />
          <MainBoard users={users} data={rowsCleaned} />
        </Box>
      )}

    </ThemeProvider>
  );
}
