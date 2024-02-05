import Header from "../../Components/Header/Header";
import MonthComponent from "../../Components/MonthComponent/MonthComponent";


function MonthPage() {
    return (
      <div style={{position: 'fixed', width: "100%"}}>
        <Header/>
        <MonthComponent/>
      </div>
    );
  }
  
  export default MonthPage;
  