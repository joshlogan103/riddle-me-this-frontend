import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar/Navbar.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx"
import BrowseHunts from "./pages/BrowseHunts/BrowseHunts.jsx"
import ActiveHuntPage from "./pages/ActiveHuntPage/ActiveHuntPage.jsx"
import CreateHuntTemplate from "./pages/CreateHuntTemplate/CreateHuntTemplate.jsx"
import CreatorControlPanel from "./pages/CreatorControlPanel/CreatorControlPanel.jsx"
import HuntDetails from "./pages/HuntDetails/HuntDetails.jsx"
import LaunchHunt from "./pages/LaunchHunt/LaunchHunt.jsx"
import MyProfile from "./pages/MyProfile/MyProfile.jsx"
import ProtectedRoutes from "./protected_routes/ProtectedRoutes.jsx";
import "./App.css"

function App() {

  return (
    <div className="main-container">
      <Navbar />
      <div className="body-container">
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/browse" element={<BrowseHunts />} />
          <Route path="/active-hunt/:huntTemplateId/:huntInstanceId/:participationId" element={<ProtectedRoutes><ActiveHuntPage /></ProtectedRoutes>} />
          <Route path="/create-hunt" element={<ProtectedRoutes><CreateHuntTemplate /></ProtectedRoutes>} />
          <Route path="/creator-control-panel" element={<ProtectedRoutes><CreatorControlPanel /></ProtectedRoutes>} />
          <Route path="/hunt-details/:huntInstanceId/:huntTemplateId" element={<ProtectedRoutes><HuntDetails /></ProtectedRoutes>} />
          <Route path="/launch-hunt/:huntTemplateId" element={<ProtectedRoutes><LaunchHunt /></ProtectedRoutes>} />
          <Route path="/profile" element={<ProtectedRoutes><MyProfile /></ProtectedRoutes>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
