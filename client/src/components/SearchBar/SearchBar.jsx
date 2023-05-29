import { useState } from "react";
import searchStyles from './SearchBar.module.css'

const SearchBar = () => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSearchPokemon = () => {

  }

  return (
    <div className={searchStyles.searchContainer}>
      <input
        type="search"
        placeholder="Search pokemon by name"
        value={name}
        onChange={handleChange}
      />
      <button onClick={handleSearchPokemon}>Search</button>
    </div>
  );
};

export default SearchBar;
