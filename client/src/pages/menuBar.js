import React, { useState } from 'react'
import {  Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


const MenuBar = () => {

    const [ activeItem, setActiveItem ] = useState('home')
    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <Menu secondary>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/home"

        />
        <Menu.Item
          name='posts'
          active={activeItem === 'posts'}
          onClick={handleItemClick}
          as={Link}
          to="/post"
        />
        <Menu.Item
          name='friends'
          active={activeItem === 'friends'}
          onClick={handleItemClick}
          as={Link}
          to="/friends"
        />
      </Menu>
    )

}

export default MenuBar;
