import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Experiences from "./pages/Experiences";
import HomeLayout from "./layouts/HomeLayout";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/experiences" element={<Experiences />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
