
import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, TablePagination, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import DeleteModal from '../Modal/DeleteModal';
import EditUsersModal from '../Modal/EditUserModal';
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



export default function AdminComponent() {
  const { users, setUserIds } = useContext(UserContext)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false)
  const [editUsersModal, setEditUsersModal] = useState(false)
  const [editUsers, setEditUsers] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOpen = (userId) => {
    setOpen(true);
    setUserIds(userId)
  };

  const handleEditUser = (user) => {
    setEditUsersModal(true)
    setEditUsers(user)
  }
  const rows = users?.map((e, index) => createData(
    index + 1,
    <img src={e?.image} alt="User" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />,
    e?.full_name,
    e?.phone_number,
    e?.email,
    e?.status,
    <EditIcon sx={{ zIndex: 1000, cursor: 'pointer' }} onClick={() => handleEditUser(e)}/>,
    <DeleteIcon
      sx={{ zIndex: 1000, cursor: 'pointer' }}
      onClick={() => handleOpen(e?.id)}
    />
  )) || [];
  
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
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
      <DeleteModal open={open} setOpen={setOpen} />
      <EditUsersModal editUsersModal={editUsersModal} setEditUsersModal={setEditUsersModal} editUsers={editUsers} setEditUsers={setEditUsers} />
    </Paper>
  );
}