import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FilterUsers from "./FilterUsers";
import AddTodo from "./AddTodo";
import { Typography } from "@mui/material";


import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";



function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;


  const handleChange = (event, page) => {
    console.log(event.target);
    console.log(page);
    onPageChange(event, page);
  };

  return (
    <Box sx={{ flexShrink: 0 }}>
      <Stack spacing={0}>
        <Pagination
          count={Math.max(0, Math.ceil(count / rowsPerPage)) - 1}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}


function TableList({ users, changeData, rowsData, hasButton, addTask }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState("all");
  const [sorted, setSorted] = useState(rowsData)
  const [order, setOrder] = useState("ASC")


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTask = (id) => {
    changeData(id);
  };

  const handleSort = (type) => {
    let tmp_arr = [...rowsData]
    if (type == "task") {
        tmp_arr = tmp_arr.sort(function(a, b){
          if(a.task < b.task) { return -1; }
          if(a.task > b.task) { return 1; }
          return 0;
        })
      
    }
    else if (type == "user") {
      tmp_arr = tmp_arr.sort(function(a, b){
        if(a.firstname < b.firstname) { return -1; }
        if(a.firstname > b.firstname) { return 1; }
        return 0;
      })
    }
    rowsData = tmp_arr
    console.log(rowsData)
  }


  function showElements({ from, to, count }) {
    return `Mostra da ${from} a ${to} di ${
      count !== -1 ? count : `più di ${to}`
    } elementi`;
  }


  return (
    <Box sx={{ padding: "2rem", height: "100%" }}>
      {hasButton && (
        <Typography component="h1" variant="h6" color="inherit">
          Attività da completare
        </Typography>
      )}
      {!hasButton && (
        <Typography component="h1" variant="h6" color="inherit">
          Attività completate
        </Typography>
      )}
      <FilterUsers
        users={users}
        selectedUser={selectedUser}
        setSeletctedUser={setSelectedUser}
      />
      <TableContainer
        sx={{ maxHeight: "50vh", overflow: "auto" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("task")}>Attività</TableCell>
              <TableCell onClick={() => handleSort("user")}>Operatore</TableCell>
              {hasButton && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedUser != "all" &&
              (rowsPerPage > 0
                ? rowsData
                    .filter((row) => row.firstname == selectedUser)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rowsData.filter((row) => row.firstname == selectedUser)
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ width: 160 }}>{row.task}</TableCell>
                  <TableCell style={{ width: 160 }}>{row.firstname}</TableCell>
                  {hasButton && (
                    <TableCell style={{ width: 160 }}>
                      <Button
                        onClick={() => {
                          handleTask(row.id);
                        }}
                        variant="contained"
                      >
                        svolgi
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            {selectedUser == "all" &&
              (rowsPerPage > 0
                ? rowsData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rowsData
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ width: 160 }}>{row.task}</TableCell>
                  <TableCell style={{ width: 160 }}>{row.firstname}</TableCell>
                  {hasButton && (
                    <TableCell align="right" style={{ width: 160 }}>
                      <Button
                        onClick={() => {
                          handleTask(row.id);
                        }}
                        variant="contained"
                        sx={{
                          textTransform: "lowercase",
                          fontSize: ".7rem",
                          width: "100px",
                          backgroundColor: "secondary.dark",
                        }}
                      >
                        svolgi
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          count={
            selectedUser != "all"
              ? rowsData.filter((row) => row.firstname == selectedUser).length
              : rowsData.length
          }
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "Visualizza Elementi",
            },
            native: true,
          }}
          labelDisplayedRows={showElements}
          labelRowsPerPage={"Visualizza Elementi"}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
          sx={{
            position: "absolute",
            bottom: 0,
          }}
        />
      </TableContainer>
      {hasButton && <AddTodo users={users} addTask={addTask} />}
    </Box>
  );
}
export default TableList;