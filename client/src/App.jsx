import './App.css'
import { Route, Routes } from "react-router-dom";
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Form from './views/Form/Form';
import Detail from './components/Detail/Detail';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/create" element={<Form/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
      </Routes>
    </div>
  )
}

export default App
