// styles.js
const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 20px',
        backgroundColor: '#007DFF'
    },
    adminHeader: {
      display: 'none'
    },
    headerSearch: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    navInput: {
      m: 1,
      marginRight: '50px',
      "& .MuiInputBase-root": {
        backgroundColor: '#F5F5F5',
      },
      "& .MuiInputBase-input": {
        width: "250px",
        // backgroundColor: '#F5F5F5'
      },
      // "& .MuiInputLabel-root": {
      //   backgroundColor: '#F5F5F5'
      // }
    },
    timePicker: {
      width: '40px',
      "& .MuiFormControl-root, & .MuiTextField-root": {
        minWidth: "140px",
        width: '140px'
      },
      "& .MuiInputBase-root": {
        backgroundColor: '#F5F5F5',
      },
    },
    timeFilter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#F5F5F5'
    },
    genderFilter: {
      display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#F5F5F5'
    },
    timeFilterText: {
        marginRight: '5px',
        color: '#F5F5F5'
    },
    time: {
        width: '100%',
    },
    headerButton: {
      display: 'flex',
      alignItems: 'center',
    },
  }
  
  export default styles;
  