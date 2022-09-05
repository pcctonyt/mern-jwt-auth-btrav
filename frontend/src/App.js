//in React Router v 6, nothing in the Routes tag except each route
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
    
  );
}

export default App;

// We'll have three pages
//1. Dashboard
//2. Login for already registered users
//3. Register a new user

// At 56:56 done 3rd video, see server.js for more info, he shows how to open up both front and back ends with one command