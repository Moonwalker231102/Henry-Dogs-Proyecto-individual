import './App.css'
import { Route, Routes } from "react-router-dom";
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import CreateBreedForm from './views/Form/CreateBreedForm';
import Detail from './components/Detail/Detail';
const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/create" element={<CreateBreedForm/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
      </Routes>
    
  )
}

export default App
