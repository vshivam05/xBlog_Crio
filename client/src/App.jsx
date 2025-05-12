import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
// import Footer from './components/Footer';
import UserProfile from "./components/UserProfile";
import "./App.css";
function App() {
  return (
    <div className="App  ">
      <Navbar />
      <AppRoutes />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
