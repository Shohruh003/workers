import { Route, Routes } from "react-router-dom";
import AdminPage from "./Pages/AdminPage/AdminPage";
import DayPage from "./Pages/DayPage.js/DayPage";
import MonthPage from "./Pages/MonthPage/MonthPage";


function Private () {

     <div>
      <Routes>
        <Route path="/*" element={<AdminPage/>} />
        <Route path="/day/*" element={<DayPage/>} />
        <Route path="/month/*" element={<MonthPage/>} />
      </Routes>
      </div>
}

export default Private;