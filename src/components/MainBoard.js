import React, {useState, useEffect} from 'react'
import Box from "@mui/material/Box";
import MainBoardHeader from './MainBoardHeader';
import TableList from './TableList.js/TableList';
import { Routes, Route } from "react-router-dom";



function MainBoard({data, users}) {
    const [mainData, setMainData] = useState(data)
    const [doneTasks, setDoneTasks] = useState(data.filter(el => el.done == true))
    const [undoneTasks, setUndoneTasks] = useState(data.filter(el => el.done == false))
    console.log(mainData)
    const changeData = (id) => {
        let tmp_arr = [...undoneTasks]
        const resultidx = tmp_arr.findIndex(task => task.id == id)
        const result = tmp_arr.find(task => task.id == id)
        console.log(resultidx)
        tmp_arr.splice(resultidx, 1)
        setUndoneTasks(tmp_arr)
        tmp_arr = [...doneTasks]
        tmp_arr.push(result)
        setDoneTasks(tmp_arr)
    }

    const addTask = (user,task) => {
        const new_id = doneTasks.length + undoneTasks.length + 1
        let tmp_arr = [...undoneTasks]
        let tmp_obj = {
            firstname: user.firstname,
            task: task,
            done: false,
            id: new_id
        }
        tmp_arr.push(tmp_obj)
        setUndoneTasks(tmp_arr)
    }

    


    return (
        <Box sx={{ bgcolor: "#dedede", height: "100%", minHeight:"100vh", width: "85%" }}>
            <MainBoardHeader />
            <Routes>
                <Route path="/" element={<TableList users={users} changeData={changeData} rowsData={undoneTasks} hasButton={true} addTask={addTask}/>} />
                <Route path="done" element={<TableList users={users} changeData={changeData} rowsData={doneTasks} hasButton={false} addTask={addTask}/>} />
                <Route path="*" element={<TableList users={users} changeData={changeData} rowsData={undoneTasks} hasButton={true} addTask={addTask}/>} />
            </Routes>
            
        </Box>
    )
}

export default MainBoard
