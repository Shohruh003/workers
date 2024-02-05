
import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, TablePagination, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const columns = [
    { id: 'id', label: '#', minWidth: 10 },
  { id: 'image', label: 'Фото', minWidth: 50 },
  { id: 'name', label: 'Фамилия и имя', minWidth: 170 },
  {
    id: 'phone',
    label: 'Номер телефона',
    minWidth: 100,
  },
  {
    id: 'gmail',
    label: 'Электронная почта',
    minWidth: 100,
  },
  {
    id: 'position',
    label: 'Должность',
    minWidth: 100,
  },
  {
    id: 'editIcon',
    label: '',
    minWidth: 10,
  },
  {
    id: 'deleteIcon',
    label: '',
    minWidth: 10,
  },
];

function createData(id, image, name, phone, gmail, position, editIcon, deleteIcon) {
  return {id, image, name, phone, gmail, position, editIcon, deleteIcon};
}

const rows = [
  createData(1, 'img', 'Shohruh Azimov', '+998942720705', 'shohruhazimov0705@gmail.com', 'developer', <EditIcon sx={{zIndex: 1000, cursor: 'pointer'}}/> ,<DeleteIcon sx={{zIndex: 1000, cursor: 'pointer'}}/>),
  createData(1, 'img', 'Shohruh Azimov', '+998942720705', 'shohruhazimov0705@gmail.com', 'developer', <EditIcon sx={{zIndex: 1000, cursor: 'pointer'}}/> ,<DeleteIcon sx={{zIndex: 1000, cursor: 'pointer'}}/>),
  createData(1, 'img', 'Shohruh Azimov', '+998942720705', 'shohruhazimov0705@gmail.com', 'developer', <EditIcon sx={{zIndex: 1000, cursor: 'pointer'}}/> ,<DeleteIcon sx={{zIndex: 1000, cursor: 'pointer'}}/>),
  createData(1, 'img', 'Shohruh Azimov', '+998942720705', 'shohruhazimov0705@gmail.com', 'developer', <EditIcon sx={{zIndex: 1000, cursor: 'pointer'}}/> ,<DeleteIcon sx={{zIndex: 1000, cursor: 'pointer'}}/>),
  createData(1, 'img', 'Shohruh Azimov', '+998942720705', 'shohruhazimov0705@gmail.com', 'developer', <EditIcon sx={{zIndex: 1000, cursor: 'pointer'}}/> ,<DeleteIcon sx={{zIndex: 1000, cursor: 'pointer'}}/>),
  createData(1, 'img', 'Shohruh Azimov', '+998942720705', 'shohruhazimov0705@gmail.com', 'developer', <EditIcon sx={{zIndex: 1000, cursor: 'pointer'}}/> ,<DeleteIcon sx={{zIndex: 1000, cursor: 'pointer'}}/>),
  createData(1, 'img', 'Shohruh Azimov', '+998942720705', 'shohruhazimov0705@gmail.com', 'developer', <EditIcon sx={{zIndex: 1000, cursor: 'pointer'}}/> ,<DeleteIcon sx={{zIndex: 1000, cursor: 'pointer'}}/>),
  createData(1, 'img', 'Shohruh Azimov', '+998942720705', 'shohruhazimov0705@gmail.com', 'developer', <EditIcon sx={{zIndex: 1000, cursor: 'pointer'}}/> ,<DeleteIcon sx={{zIndex: 1000, cursor: 'pointer'}}/>),
  createData(1, 'img', 'Shohruh Azimov', '+998942720705', 'shohruhazimov0705@gmail.com', 'developer', <EditIcon sx={{zIndex: 1000, cursor: 'pointer'}}/> ,<DeleteIcon sx={{zIndex: 1000, cursor: 'pointer'}}/>),
  createData(1, 'img', 'Shohruh Azimov', '+998942720705', 'shohruhazimov0705@gmail.com', 'developer', <EditIcon sx={{zIndex: 1000, cursor: 'pointer'}}/> ,<DeleteIcon sx={{zIndex: 1000, cursor: 'pointer'}}/>),
  createData(1, 'img', 'Shohruh Azimov', '+998942720705', 'shohruhazimov0705@gmail.com', 'developer', <EditIcon sx={{zIndex: 1000, cursor: 'pointer'}}/> ,<DeleteIcon sx={{zIndex: 1000, cursor: 'pointer'}}/>),
  createData(1, 'img', 'Shohruh Azimov', '+998942720705', 'shohruhazimov0705@gmail.com', 'developer', <EditIcon sx={{zIndex: 1000, cursor: 'pointer'}}/> ,<DeleteIcon sx={{zIndex: 1000, cursor: 'pointer'}}/>),
  createData(1, 'img', 'Shohruh Azimov', '+998942720705', 'shohruhazimov0705@gmail.com', 'developer', <EditIcon sx={{zIndex: 1000, cursor: 'pointer'}}/> ,<DeleteIcon sx={{zIndex: 1000, cursor: 'pointer'}}/>),  
];

export default function AdminComponent() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '540px', height: 'auto'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button sx={{position: 'absolute', margin: '7px 0 0 20px', zIndex: 1}} href="/" variant="contained" color="inherit">
      <ArrowBackIcon sx={{marginRight: "10px"}}/>
      Главная сТРАНИЦА 
      </Button>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        content='sdwnmfkmwfmlk123456789098765vwbjcbwjcn kwmcvlm,wmvl'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}