import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signupPage";
import ProfilePage from "./pages/profilePage";


const App = () => {

  return(
    <div>
      <Routes>
        <Route path="/" element={<SignupPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
    </div>
  )
}

export default App;