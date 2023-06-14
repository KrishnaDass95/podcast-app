import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signupPage";
const App = () => {

  return(
    <div>
      <Routes>
        <Route path="/" element={<div><Header /> <SignupPage /> </div>}></Route>
      </Routes>
    </div>
  )
}

export default App;