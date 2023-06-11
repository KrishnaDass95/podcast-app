import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
const App = () => {

  return(
    <div>
      <Routes>
        <Route path="/" element={<Header />}></Route>  
      </Routes>
    </div>
  )
}

export default App;