// styles.js
const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 20px',
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
      "& .MuiInputBase-input": {
        width: "250px",
      },
    },
    timeFilter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timeFilterText: {
        marginRight: '5px'
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
  