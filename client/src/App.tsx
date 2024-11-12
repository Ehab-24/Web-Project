import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Experiences from "./pages/Experiences";
import HomeLayout from "./layouts/HomeLayout";
import ListingDetails from "./pages/ListingDetails";
import BookListing from "./pages/BookListing";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/listings/:id" element={<ListingDetails />} />
                    <Route path="/experiences" element={<Experiences />} />
                    <Route path="/book/:listingId" element={<BookListing />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
