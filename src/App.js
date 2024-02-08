import { Route, Routes } from "react-router-dom";
import AdminPage from "./Pages/AdminPage/AdminPage";
import DayPage from "./Pages/DayPage.js/DayPage";
import MonthPage from "./Pages/MonthPage/MonthPage";


function App() {
  return (
    <>
    <Routes>
        <Route path="/admin/*" element={<AdminPage/>} />
        <Route path="/*" element={<DayPage/>} />
        <Route path="/month/*" element={<MonthPage/>} />
      </Routes>
      </>
  );
}

export default App;
