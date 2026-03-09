import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";

import Conversations from "./pages/Conversations";
import ListingDetails from "./pages/ListingDetails";
import ConversationsDetails from "./pages/ConversationsDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:listingId" element={<ListingDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }

        />
        <Route path="/users/:userId" //para ver otros profiles
        element={
        <ProtectedRoute>
          <Profile />
          </ProtectedRoute>

        } />
        


        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/listings/create"
          element={
            <ProtectedRoute>
              <CreateListing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/listings/:listingId/edit"
          element={
            <ProtectedRoute>
              <EditListing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/conversations"
          element={
            <ProtectedRoute>
              <Conversations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/conversations/:conversationId"
          element={
            <ProtectedRoute>
              <ConversationsDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;