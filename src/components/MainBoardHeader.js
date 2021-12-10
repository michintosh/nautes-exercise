import React from 'react'
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Typography } from "@mui/material";

function MainBoardHeader() {
    return (
        <Box sx={{ height: "8vh", backgroundColor: "white", textAlign: "right", display:"flex", justifyContent:"flex-end" }}>
            <Stack direction={"row"} spacing={2} sx={{alignItems: "center", padding:"2rem"}}>
                <Box>
                    <Typography component="b" variant="b">
                        Alessandro Bianchi
                    </Typography>
                    <Typography component="p" variant="p">
                        Admin
                    </Typography>
            </Box>
            <Avatar alt="Admin User" src="https ://www.machinecurve.com/wp-content/uploads/2019/07/thispersondoesnotexist-1.jpg" />
            </Stack>
        </Box>
    )
}

export default MainBoardHeader
