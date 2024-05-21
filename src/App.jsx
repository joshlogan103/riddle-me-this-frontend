import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar/Navbar.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx"
import BrowseHunts from "./pages/BrowseHunts/BrowseHunts.jsx"
import ActiveHuntPage from "./pages/ActiveHuntPage/ActiveHuntPage.jsx"
import CreateHuntTemplate from "./pages/CreateHuntTemplate/CreateHuntTemplate.jsx"
import CreatorControlPanel from "./pages/CreatorControlPanel/CreatorControlPanel.jsx"
import EditProfile from "./pages/EditProfile/EditProfile.jsx"
import HuntDetails from "./pages/HuntDetails/HuntDetails.jsx"
import LaunchHunt from "./pages/LaunchHunt/LaunchHunt.jsx"
import MyProfile from "./pages/MyProfile/MyProfile.jsx"


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/browse" element={<BrowseHunts />} />
        <Route path="/active-hunt" element={<ActiveHuntPage />} />
        <Route path="/create-hunt" element={<CreateHuntTemplate />} />
        <Route path="/creator-control-panel" element={<CreatorControlPanel />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/hunt-details" element={<HuntDetails />} />
        <Route path="/launch-hunt" element={<LaunchHunt />} />
        <Route path="/profile" element={<MyProfile />} />
      </Routes>
    </>
  );
}

export default App;
