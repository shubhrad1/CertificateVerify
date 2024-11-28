import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminDash from "./pages/AdminDash";
import StudentDash from "./pages/StudentDash";

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/admin" element={<AdminDash />} />
                    <Route path="/user" element={<StudentDash />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
