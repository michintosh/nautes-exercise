import React from 'react'

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";


function TablePaginationActions(props) {
    const { count, page, rowsPerPage, onPageChange } = props;
  

    const handleChange = (event, page) => {
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

export default TablePaginationActions
