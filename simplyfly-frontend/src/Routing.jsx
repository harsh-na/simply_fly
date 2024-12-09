import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import About from "./Components/Homepage/About";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import FlightListingPage from "./Components/Listings/FlightListingComponent";
import ReviewStepper from "./Components/Review/ReviewStepper";
import Dashboard from "./Components/OwnerDashboard/Dashboard";
import DashboardAdmin from "./Components/AdminDashboard/Dashboard";
import ManageFlight from "./Components/OwnerDashboard/ManageFlight";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/flightListings" element={<FlightListingPage />} />
      <Route path="/review" element={<ReviewStepper />} />
      <Route path="/flightOwner/">
        <Route path="login" element={<SignIn />} />
        <Route path="home" element={<Dashboard />} />
        <Route path="manageFlight" element={<ManageFlight />} />
        {/* <Route path="manageRoute" element={<ManageRoute />} />
            <Route path="manageSchedule" element={<ManageSchedule />} />
            <Route path="manageBooking" element={<ManageBooking/>}/> */}
      </Route>

      <Route path="/admin/">
        <Route path="dashboard" element={<DashboardAdmin />} />
      </Route>
    </Routes>
  );
}

export default Routing;
