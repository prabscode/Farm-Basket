import "./App.css";
import "./index.css";
import FarmersDashboard from "./Pages/FamersDashboard";

import FarmersWork from "./Pages/FarmersWork";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route , useNavigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import DetailCard from "./Pages/DetailCard";

function App() {

  


  return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home></Home>} />
    <Route path="/farmersWork" element={<FarmersWork></FarmersWork>} />
    <Route path="/dashboard"element={<FarmersDashboard></FarmersDashboard>} />
    <Route path="/signup" element ={<Signup></Signup>} />
    <Route path="/work/:id" element ={<DetailCard></DetailCard>} />
  </Routes>
</BrowserRouter>

  );
}

export default App;
