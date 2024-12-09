import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Homepage/Navbar";
import FlightSearch from "./Components/Homepage/FlightSearch";
import TextOnImage from "./Components/Homepage/TextOnImage";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";

import Homepage from "./Components/Homepage/Homepage";
import Routing from "./Routing";
import PassengerSelector from "./Components/Homepage/PassengerSelector";
import Dashboard from "./Components/OwnerDashboard/Dashboard";


function App() {
  return (
    <>
      {/* <Homepage /> */}
      {/* <h1>WELCOME FROM APP</h1> */}
      {/* <Navbar /> */}
      {/* <FlightSearch />
      <TextOnImage /> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}

      {/* <Navbar /> */}
      {/* <FlightSearch /> */}
      {/* <TextOnImage /> */}
      {/* <SignIn /> */}
      <Routing />
      {/* <Dashboard /> */}
      {/* <PassengerSelector /> */}
    </>
  );
}

export default App;
