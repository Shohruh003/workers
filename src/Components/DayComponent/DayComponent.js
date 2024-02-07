
import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, TablePagination, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useEffect } from 'react';
const columns = [
    { id: 'id', label: '#', minWidth: 10 },
  { id: 'image', label: 'Фото', minWidth: 50 },
  { id: 'name', label: 'Фамилия и имя', minWidth: 170 },
  {
    id: 'firstTime',
    label: 'Пришел',
    minWidth: 100,
  },
  {
    id: 'lastTime',
    label: 'Ушел',
    minWidth: 100,
  },
];

function createData(id, image, name, firstTime, lastTime) {
  return {id, image, name, firstTime, lastTime };
}

export default function DayComponent() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { users, setChangeRows } = useContext(UserContext);

  const currentDate = dayjs();
  const currentDateString = currentDate.format('YYYY-MM-DD');

  const rows = users?.map((user, index) => {
    const { image, full_name, events } = user;
    const firstEventTime = events[currentDateString]?.first || '-:-';
    const lastEventTime = events[currentDateString]?.last || '-:-';

    return createData(
      index + 1,
      <img src={image} alt="User" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />,
      full_name,
      firstEventTime.split(':').slice(0, 2).join(':'),
      lastEventTime.split(':').slice(0, 2).join(':'), 
    );
  }) || [];

  useEffect(() => {
    setChangeRows(rows)
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
      <Button sx={{position: 'absolute', margin: '7px 0 0 20px', zIndex: 1}} href="/admin" variant="contained" color="inherit">
      <ArrowBackIcon sx={{marginRight: "10px"}}/>
      сТРАНИЦА аДМИНИСТРАТОРА
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