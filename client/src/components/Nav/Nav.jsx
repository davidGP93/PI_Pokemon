import React from 'react'
import logo from '../../assets/pokebola_logo.png'
import SearchBar from '../SearchBar/SearchBar'
import navStyles from './Nav.module.css'
import { NavLink } from 'react-router-dom'


const Nav = () => {
  return (
    <div className={navStyles.navContainer}>
        <ul className={navStyles['navContainer-routes']}>
            <li><NavLink className={({ isActive }) =>
              isActive ? navStyles["navContainer-routes__pathActive"] : navStyles["navContainer-routes__pathDisable"]
            } to='/home'>Home</NavLink></li>
            <li><NavLink className={({ isActive }) =>
              isActive ? navStyles["navContainer-routes__pathActive"] : navStyles["navContainer-routes__pathDisable"]
            } to='/createPokemon'>Create Pokemon</NavLink></li>
        </ul>
        <figure >
            <img src={logo} alt="pokebola_logo" />
        </figure>
        <div>
            <SearchBar/>
        </div>
    </div>
  )
}

export default Nav