import { useState, useRef } from "react";
import searchStyles from "./SearchBar.module.css";
import { useSearchByName } from "../../hooks/useSearchByName";



const SearchBar = () => {
  const [name, setName] = useState("");
  const { getDataByName } = useSearchByName();
  const searchinput = useRef()

  const handleSearch = () => {
    setName(searchinput.current.value);
  };

  const handleSearchPokemon = () => {
    if (name) {
      getDataByName(name)
    }
  };

  return (
    <div className={searchStyles.searchContainer}>
      <input
        type="search"
        placeholder="Search pokemon by name"
        value={name}
        ref={searchinput}
        onChange={handleSearch}
      />
      <button onClick={handleSearchPokemon}>Search</button>
    </div>
  );
};

export default SearchBar;
