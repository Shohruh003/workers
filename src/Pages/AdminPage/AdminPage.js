
import AdminComponent from "../../Components/AdminComponent/AdminComponent";
import Header from "../../Components/Header/Header";


function AdminPage() {
    return (
      <div style={{position: 'fixed', width: "100%"}}>
        <Header/>
        <AdminComponent/>
      </div>
    );
  }
  
  export default AdminPage;
  