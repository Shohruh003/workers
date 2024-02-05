
import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, TablePagination, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import api from '../Api/Api';
import { useState } from 'react';
import axios from 'axios';
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
  const [users, setUsers] = useState()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // useEffect(() => {
  //   const fetchPupils = async () => {
  //     try {
  //       const params = {};
  //       // if (ageRange) {
  //       //   params.age_range = ageRange;
  //       // }
  //       // if (pupilClass) {
  //       //   params.search = pupilClass;
  //       // }
  //       // if (genders.length > 0) {
  //       //   params.gender = genders.join(',');
  //       // }
  //       // if (pupilEmotion) {
  //       //   params.filter_by_emotion = pupilEmotion
  //       // }

  //       let page = 1;
  //   let allData = [];

  //   while (true) {
  //     const response = await api.get(`/Workers/?page=${page}`,{ params
  //        });
  //     const data = response?.data?.results;
      
  //     allData = allData.concat(data);
  //     page++;
  //     setUsers(allData)
  //   }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchPupils();
  // }, [setUsers]);

  useEffect(() => {
    api.get('/Workers/')
    .then((result) => {
      console.log(result.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [])

  console.log(users);
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', maxHeight: '100vh', height: '100vh' }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 120px)', height: 'calc(100vh - 120px)' }}>
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