import React, { useState } from 'react'
import {  Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


const MenuBar = () => {

    const [ activeItem, setActiveItem ] = useState('home')
    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <Menu secondary>
        <Menu.Item
          name='Home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to='/home'

        />
        <Menu.Item
          name='Posts'
          active={activeItem === 'posts'}
          onClick={handleItemClick}
          as={Link}
          to='/post'
        />
        <Menu.Item
          name='Friends'
          active={activeItem === 'friends'}
          onClick={handleItemClick}
          as={Link}
          to='/friends'
        />
         <Menu.Item position='right'
          name='Login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
         <Menu.Item 
          name='Register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
      </Menu>
    )

}

export default MenuBar;
