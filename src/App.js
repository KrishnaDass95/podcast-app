import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signupPage";
import ProfilePage from "./pages/profilePage";


const App = () => {

  return(
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignupPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
    </div>
  )
}

export default App;