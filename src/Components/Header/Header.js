import { Box, Button, Checkbox, TextField } from "@mui/material";
import styles from "./styles"
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DatePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import api from "../Api/Api";
import { useState } from "react";
import * as XLSX from 'xlsx';
import AddUsersModal from "../Modal/AddUsersModal";

function Header() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const {search, setSearch, genders, setGenders, setUsers, setMonth, setInDate, changeRows} = useContext(UserContext)
    const [addUsersModal, setAddUsersModal] = useState(false)


    const isAdminEndpoint = () => {
      const currentPath = window.location.pathname;
      return currentPath.endsWith('/admin');
    };

    const isDayEndpoint = () => {
      const currentPath = window.location.pathname;
      return currentPath.endsWith('/');
    };

    const isMonthEndpoint = () => {
      const currentPath = window.location.pathname;
      return currentPath.endsWith('/month');
    };

    const handleSearchChange = (event) => {
      const searchTerm = event.target.value;
      console.log(searchTerm);
      setSearch(searchTerm);
    };

    const handleGenderChange = (event) => {
      const target = event.target;
      const checkboxValue = target.value;
      const isChecked = target.checked;
    
      setGenders((prevGenders) => {
        if (isChecked) {
          return [...prevGenders, checkboxValue];
        } else {
          return prevGenders.filter((gender) => gender !== checkboxValue);
        }
      });
    };
    const [firstDayOfMonth, setFirstDayOfMonth] = useState('');
    const [lastDayOfMonth, setLastDayOfMonth] = useState('');
    const handleDateChange = (values) => {
      const year = values.format('YYYY');
      const month = (values.month() + 1).toString().padStart(2, '0');
      const daysInMonth = dayjs(`${year}-${month}`).daysInMonth();
  
      setInDate(`${year}-${month}`);
      setFirstDayOfMonth(`${year}-${month}-01`);
      setLastDayOfMonth(`${year}-${month}-${daysInMonth}`);
      setMonth(daysInMonth);
    };

    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const handleTimeChange1 = (values) => {
      setStartTime(values.format('HH:mm:ss'))
    }
    const handleTimeChange2 = (values) => {
      setEndTime(values.format('HH:mm:ss'))
    }

    const handleAddUsers = () => {
      setAddUsersModal(true)
    }
  
    useEffect(() => {
      const newDate = dayjs();
      const currentYear = newDate.format('YYYY');
      const currentMonth = (newDate.month() + 1).toString().padStart(2, '0');
      const daysInCurrentMonth = dayjs(`${currentYear}-${currentMonth}`).daysInMonth();
  
      setFirstDayOfMonth(`${currentYear}-${currentMonth}-01`);
      setLastDayOfMonth(`${currentYear}-${currentMonth}-${daysInCurrentMonth}`);
    }, []);

    

    useEffect(() => {
      const isMonthPage = window.location.pathname.endsWith('/month');

      const fetchPupils = async () => {
        try {
          const params = {};
          if (search) {
            params.search = search;
          }
          if (genders && genders.length > 0) {
            params.gender = genders.join(',');
          }
          if (isMonthPage) {
            if (firstDayOfMonth) {
              params.event_date_gt = firstDayOfMonth;
            }
  
            if (lastDayOfMonth) {
              params.event_date_lt = lastDayOfMonth;
            }
          }

            if (startTime) {
              params.event_time_gte = startTime;
            }
  
            if (endTime) {
              params.event_time_lte = endTime;
            }
  
          let page = 1;
      let allData = [];
  
      while (true) {
        const response = await api.get(`/Workers/?page=${page}`,{ params
          });
        const data = response?.data?.results;
        
        allData = allData.concat(data);
        page++;
        setUsers(allData)
      }
        } catch (error) {
          console.error(error);
        }
      };
      fetchPupils();
    }, [search,setUsers,genders, firstDayOfMonth, lastDayOfMonth, startTime, endTime]);
    const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(changeRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const fileName = 'exported_data.xlsx';
      XLSX.writeFile(wb, fileName);
    };

    const currentDate = dayjs();
    const todayStart = currentDate.startOf('day').format('YYYY-MM-DDTHH:mm');
    const tomorrowEnd = currentDate.add(1, 'day').startOf('day').subtract(1, 'minute').format('YYYY-MM-DDTHH:mm');

    return (
      <Box sx={styles.header}>
         <Box sx={styles.headerSearch}>
            <Box
          component="form"
          sx={styles.navInput}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" onChange={handleSearchChange} label="Глобальный поиск" size="small" variant="outlined" />
        </Box>

          <Box sx={isAdminEndpoint() ? styles.genderFilter : styles.adminHeader}>
              <span style={{fontWait: 700}}>по полу:</span>
              <Checkbox 
              {...label}
              color="default" 
              sx={{color: "#F5F5F5"}}
              className="radio_button"
              id="maleCheckbox"
              type="checkbox"
              checked={genders?.includes("true")}
              onChange={handleGenderChange}
              value="true" />
              <span style={{fontWait: 700}}>М</span>
              <Checkbox 
              {...label} 
              color="default" 
              sx={{color: "#F5F5F5"}}
              className="radio_button"
              id="femaleCheckbox"
              type="checkbox"
              checked={genders?.includes("false")}
              onChange={handleGenderChange}
              value="false" />
              <span style={{fontWait: 700}}>Ж</span>
          </Box>
         </Box>

    <Box sx={isAdminEndpoint() ? styles.adminHeader : styles.timeFilter}>
            <Box sx={styles.timeFilterText}>Фильтр по: времени</Box>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {isMonthEndpoint() ?  <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
              <DatePicker
        sx={styles.timePicker}
        slotProps={{ textField: { size: 'small' } }}
        views={['month', 'year']}
        defaultValue={dayjs()}
        onChange={handleDateChange}
      />
      </DemoContainer> : <DemoContainer components={['TimePicker', 'TimePicker']}>
              <TimePicker
        sx={styles.timePicker}
        slotProps={{ textField: { size: 'small' } }}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
          }}
          defaultValue={dayjs(todayStart)}
          onChange={handleTimeChange1}
        />
                       <TimePicker
        sx={styles.timePicker}
        slotProps={{ textField: { size: 'small' } }}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
          }}
          defaultValue={dayjs(tomorrowEnd)}
          onChange={handleTimeChange2}
        />
              </DemoContainer>}
              
            </LocalizationProvider>
          </Box>
    <Box style={isAdminEndpoint() ? { display: 'none' } : null}>
        <NavLink sx={styles.navlink} style={isDayEndpoint() ? {textDecoration: 'none',color: "#F5F5F5", fontWait: 700, marginRight: '10px', borderBottom: '2px solid red', padding: '20px 0'} : {textDecoration: 'none',color: "#B2D8FF", fontWait: 700, marginRight: '10px', padding: '20px 0'}} to='/'>Сегодня</NavLink>
        <NavLink style={isMonthEndpoint() ? {textDecoration: 'none',color: "#F5F5F5", fontWait: 700, borderBottom: '2px solid red', padding: '20px 0'} : {textDecoration: 'none', color: "#B2D8FF", fontWait: 700, padding: '20px 0'}} to='/month'>За месяц</NavLink>
    </Box>

    <Box sx={isAdminEndpoint() ? styles.adminHeader : styles.genderFilter}>
        <span style={{fontWait: 700}}>по полу:</span>
        <Checkbox 
              {...label}
              color="default" 
              sx={{color: "#F5F5F5"}}
              className="radio_button"
              id="maleCheckbox"
              type="checkbox"
              checked={genders?.includes("true")}
              onChange={handleGenderChange}
              value="true" />
              <span style={{fontWait: 700}}>М</span>
              <Checkbox 
              {...label} 
              color="default" 
              sx={{color: "#F5F5F5"}}
              className="radio_button"
              id="femaleCheckbox"
              type="checkbox"
              checked={genders?.includes("false")}
              onChange={handleGenderChange}
              value="false" />
        <span style={{fontWait: 700}}>Ж</span>
    </Box>

    <AddUsersModal addUsersModal={addUsersModal} setAddUsersModal={setAddUsersModal}/>

    {isAdminEndpoint() ? <Button onClick={handleAddUsers} sx={styles.headerButton} variant="contained" color="success">
    <span style={{marginRight: '5px'}}>Добавить</span>
    <AddCircleIcon/>
      </Button> :     <Button sx={styles.headerButton} onClick={exportToExcel} variant="contained" color="success">
    <span style={{marginRight: '5px'}}>Экспорт в  xls</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="#F5F5F5" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50"
>
<path d="M 28.8125 0.03125 L 0.8125 5.34375 C 0.339844 5.433594 0 5.863281 0 6.34375 L 0 43.65625 C 0 44.136719 0.339844 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 28.875 49.980469 28.9375 50 29 50 C 29.230469 50 29.445313 49.929688 29.625 49.78125 C 29.855469 49.589844 30 49.296875 30 49 L 30 1 C 30 0.703125 29.855469 0.410156 29.625 0.21875 C 29.394531 0.0273438 29.105469 -0.0234375 28.8125 0.03125 Z M 32 6 L 32 13 L 34 13 L 34 15 L 32 15 L 32 20 L 34 20 L 34 22 L 32 22 L 32 27 L 34 27 L 34 29 L 32 29 L 32 35 L 34 35 L 34 37 L 32 37 L 32 44 L 47 44 C 48.101563 44 49 43.101563 49 42 L 49 8 C 49 6.898438 48.101563 6 47 6 Z M 36 13 L 44 13 L 44 15 L 36 15 Z M 6.6875 15.6875 L 11.8125 15.6875 L 14.5 21.28125 C 14.710938 21.722656 14.898438 22.265625 15.0625 22.875 L 15.09375 22.875 C 15.199219 22.511719 15.402344 21.941406 15.6875 21.21875 L 18.65625 15.6875 L 23.34375 15.6875 L 17.75 24.9375 L 23.5 34.375 L 18.53125 34.375 L 15.28125 28.28125 C 15.160156 28.054688 15.035156 27.636719 14.90625 27.03125 L 14.875 27.03125 C 14.8125 27.316406 14.664063 27.761719 14.4375 28.34375 L 11.1875 34.375 L 6.1875 34.375 L 12.15625 25.03125 Z M 36 20 L 44 20 L 44 22 L 36 22 Z M 36 27 L 44 27 L 44 29 L 36 29 Z M 36 35 L 44 35 L 44 37 L 36 37 Z"></path>
</svg>
    
      </Button>}
      
      </Box>

    );
  }
  
  export default Header;
  