import "./App.css";
import React from "react";
import { Route, Routes } from "react-router";
//import AdminDeliveryDashboard from "./Components/AdminDeliveryDashboard/AdminDeliveryDashboard"
import DeliveryDetails from "./Components/DeliveryDetails/DeliveryDetails"
import DriverDashboard from "./Components/DriverDashboard/DriverDashboard"


function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element ={<DeliveryDetails/>}/>
          <Route path="/details" element ={<DeliveryDetails/>}/>
          <Route path="/details2" element={<DriverDashboard/>}/>

        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
