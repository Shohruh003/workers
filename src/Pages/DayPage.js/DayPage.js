import DayComponent from "../../Components/DayComponent/DayComponent";
import Header from "../../Components/Header/Header";


function DayPage() {
    return (
      <div style={{position: 'fixed', width: "100%"}}>
        <Header/>
        <DayComponent/>
      </div>
    );
  }
  
  export default DayPage;
  