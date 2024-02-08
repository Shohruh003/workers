import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, TablePagination, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserContext } from '../../Context/UserContext';
import { useContext } from 'react';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const MonthComponent = () => {
  let currentMonth = dayjs();
  const { month, inDate, users, setChangeRows } = useContext(UserContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const inDates = inDate === undefined ? `${currentMonth.format('YYYY')}-${(currentMonth.month() + 1).toString().padStart(2, '0')}` : inDate
  const months = month === undefined ? dayjs(`${currentMonth.format('YYYY')}-${(currentMonth.month() + 1).toString()}`).daysInMonth() : month;
  const columns = [
    { id: 'id', label: '#', minWidth: 10 },
    { id: 'image', label: 'Фото', minWidth: 50 },
    { id: 'name', label: 'Фамилия и имя', minWidth: 170 },
    ...Array.from({ length: months }, (_, i) => ({ id: `day${i + 1}`, label: `${i + 1}`, minWidth: 10 })),
    { id: 'total', label: 'Всего', minWidth: 10 },
  ];

  function createData(id, image, name, ...days) {
    const rowData = { id, image, name };
    days.forEach((day, index) => {
      rowData[`day${index + 1}`] = day || '';
    });
    rowData['total'] = days[days.length - 1];
    return rowData;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = users?.map((e, index) => {
    const userEvents = [];
    for (let i = 1; i <= months; i++) {
      const eventDate = `${inDates}-${i.toString().padStart(2, '0')}`;
      const firstTime = e?.events[eventDate]?.first?.split(':').slice(0, 2).join(':');
      const lastTime = e?.events[eventDate]?.last?.split(':').slice(0, 2).join(':')
      userEvents.push(`${firstTime === undefined ? '-:-' : firstTime} ${lastTime === undefined ? '-:-' : lastTime}`);
    }

    return createData(
      index + 1,
      <img src={e?.image} alt="User" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />,
      e?.full_name,
      ...userEvents,
      (e?.events?.total_late_time / 60).toFixed(1)
    );
  }) || [];

useEffect(() => {
  setChangeRows(rows)
})

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', maxHeight: '100vh', height: '100vh' }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 120px)', height: 'calc(100vh - 120px)' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                sx={{ textAlign: 'center'}}
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
                        <TableCell sx={{ textAlign: 'center'}} key={column.id} align={column.align}>
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

export default MonthComponent;