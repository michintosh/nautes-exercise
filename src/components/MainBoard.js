import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MainBoardHeader from "./MainBoardHeader";
import TableList from "./TableList.js/TableList";
import { Routes, Route, useLocation } from "react-router-dom";


function MainBoard({ data, users }) {
  const location = useLocation();
  const [mainData, setMainData] = useState(data);
  const [doneTasks, setDoneTasks] = useState(
    data.filter((el) => el.done == true)
  );
  const [undoneTasks, setUndoneTasks] = useState(
    data.filter((el) => el.done == false)
  );


  const changeData = (id) => {
    let tmp_arr = [...undoneTasks];
    const resultidx = tmp_arr.findIndex((task) => task.id == id);
    const result = tmp_arr.find((task) => task.id == id);
    tmp_arr.splice(resultidx, 1);
    setUndoneTasks(tmp_arr);
    tmp_arr = [...doneTasks];
    tmp_arr.push(result);
    setDoneTasks(tmp_arr);
  };

  const addTask = (user, task) => {
    const new_id = doneTasks.length + undoneTasks.length + 1;
    let tmp_arr = [...undoneTasks];
    let tmp_obj = {
      firstname: user.firstname,
      task: task,
      done: false,
      id: new_id,
    };
    tmp_arr.push(tmp_obj);
    setUndoneTasks(tmp_arr);
  };

  const handleSort = (type) => {
    let tmp_arr = [];
    if (type == "task") {
      // TO DO - not ideal to use "location.pathname" to resolve the orders filter
      tmp_arr = location.pathname == "/" ? [...undoneTasks] : [...doneTasks];
      tmp_arr = tmp_arr.sort(function (a, b) {
        if (a.task < b.task) {
          return -1;
        }
        if (a.task > b.task) {
          return 1;
        }
        return 0;
      });
      location.pathname == "/" ? setUndoneTasks(tmp_arr) : setDoneTasks(tmp_arr);
      ;
    } else if (type == "user") {
      // TO DO - not ideal to use "location.pathname" to resolve the orders filter
      tmp_arr = location.pathname == "/" ? [...undoneTasks] : [...doneTasks];
      tmp_arr = tmp_arr.sort(function (a, b) {
        if (a.firstname < b.firstname) {
          return -1;
        }
        if (a.firstname > b.firstname) {
          return 1;
        }
        return 0;
      });
      location.pathname == "/" ? setUndoneTasks(tmp_arr) : setDoneTasks(tmp_arr);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#dedede",
        height: "100%",
        minHeight: "100vh",
        width: "85%",
      }}
    >
      <MainBoardHeader />
      <Routes>
        <Route
          path="/"
          element={
            <TableList
              users={users}
              changeData={changeData}
              rowsData={undoneTasks}
              hasButton={true}
              addTask={addTask}
              handleSort={handleSort}
            />
          }
        />
        <Route
          path="done"
          element={
            <TableList
              users={users}
              changeData={changeData}
              rowsData={doneTasks}
              hasButton={false}
              addTask={addTask}
              handleSort={handleSort}
            />
          }
        />
        <Route
          path="*"
          element={
            <TableList
              users={users}
              changeData={changeData}
              rowsData={undoneTasks}
              hasButton={true}
              addTask={addTask}
              handleSort={handleSort}
            />
          }
        />
      </Routes>
    </Box>
  );
}

export default MainBoard;
