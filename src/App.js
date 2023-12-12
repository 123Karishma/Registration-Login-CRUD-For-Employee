import Login from "./Login/Login";
import Ragistration from "./Ragistration/Ragistration";
import Employegrid from "./Employee/Employee";
import { Route ,Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="Ragistration" element={< Ragistration />} />
    <Route path="Employee" element={<Employegrid/>} />
  </Routes>
  </div>
  
  
  )
}

export default App;