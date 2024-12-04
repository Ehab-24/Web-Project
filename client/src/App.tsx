import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Experiences from "./pages/Experiences";
import HomeLayout from "./layouts/HomeLayout";
import ListingDetails from "./pages/ListingDetails";
import SignupPage from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import Page404 from "./pages/Page404";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./lib/AuthContext";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route element={<HomeLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/listings/:id" element={<ListingDetails />} />
                        <Route path="/experiences" element={<Experiences />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/book/:listingId" element={<BookingPage />} />
                            <Route path="/bookings" element={<BookingsPage />} />
                            <Route path="/settings" element={<UserSettingsPage />} />
                        </Route>
                    </Route>
                    <Route element={<UnauthenticatedRoute />}>
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Route>
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
