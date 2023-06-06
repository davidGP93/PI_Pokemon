import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home.jsx";
import "./App.css";
import CreatePokemonForm from "./pages/CreatePokemonForm/CreatePokemonForm";
import Detail from "./components/Detail/Detail";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/createPokemon" element={<CreatePokemonForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
