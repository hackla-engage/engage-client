import React, { Component } from 'react';
import styles from './Landing.scss';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

const Header = ()=> {
  return (
    <Menu>
      <Menu.Item name='browse'>
        <Link to="/">Engage</Link>
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item name='redux'>
          <Link to="/redux">redux</Link>
        </Menu.Item>
        <Menu.Item name='preference'>
          <Link to="/preference">preference</Link>
        </Menu.Item>
        <Menu.Item name='about'>
          <Link to="/about">about</Link>
        </Menu.Item>
        <Menu.Item name='tutorial'>
          <Link to="/tutorial">tutorial</Link>
        </Menu.Item>
        <Menu.Item name='contact'>
          <Link to="/contact">contact</Link>
        </Menu.Item>
        <Menu.Item name='signin'>
          <Link to="/signin">signin</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default Header;
