import React from 'react'
import logo from '../../assets/pokebola_logo.png'
import SearchBar from '../SearchBar/SearchBar'
import navStyles from './Nav.module.css'
import { Link } from 'react-router-dom'


const Nav = () => {
  return (
    <div className={navStyles.navContainer}>
        <ul className={navStyles['navContainer-routes']}>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/createPokemon'>Create Pokemon</Link></li>
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