import React from 'react'
import logo from '../../assets/pokebola_logo.png'
import SearchBar from '../SearchBar/SearchBar'
import navStyles from './Nav.module.css'


const Nav = () => {
  return (
    <div className={navStyles.navContainer}>
        <ul className={navStyles['navContainer-routes']}>
            <li>Home</li>
            <li>Create Pokemon</li>
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