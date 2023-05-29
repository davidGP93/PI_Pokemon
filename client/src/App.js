// import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home.jsx";
import "./App.css";


function App() {
  // const [allPokemons, setAllPokemons] = useState([]);

  // useEffect(() => {
  //   const getPokemons = async () => {
  //     const URL_BASE = "http://localhost:3001/pokemons";
  //     try {
  //       const { data } = await axios.get(`${URL_BASE}`);
  //       if (data.detailData) {
  //         setAllPokemons(data.detailData);
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   getPokemons();
  // }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
