import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Home } from "./pages/Home/Home";
import { useSelector } from "react-redux";
import { UserTable } from "./pages/UserTable/UserTable";
import { AirportTable } from "./pages/AirportTable/AirportTable";
import { FlightTable } from "./pages/FlightTable/FlightTable";
import { TeamTable } from "./pages/TeamTable/TeamTable";
import { StaffTable } from "./pages/Staff/StaffTable";


function App() {
  const role = useSelector((state) => state.users.role);
  console.log("role", role);
  console.log(role === "DISPATCHER");
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/usertable" element={<UserTable />} />
        <Route path="/airporttable" element={<AirportTable />} />
        <Route path="/flighttable" element={<FlightTable />} />
        <Route path="/teamtable" element={<TeamTable />} />
        <Route path="/stafftable" element={<StaffTable/>} />
      </Routes>
    </>
  );
}

export default App;
