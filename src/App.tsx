import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Experiences from "./pages/Experiences";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/experiences" element={<Experiences />} />
            </Routes>
        </Router>
    )
}

export default App
