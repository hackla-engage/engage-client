import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Dropdown,
  Responsive,
  Container,
  Segment
} from 'semantic-ui-react'
import styles from './Header.scss';

styles.link = {
  color: '#FFF',
};

const breakPointSize = 767
const Header = () => (
  <Menu borderless style={{
    paddingLeft: '1rem',
    paddingRight: '1rem',
    margin: 0,
    backgroundColor: '#7FB800'
  }}>
    <Menu.Item name='browse'>
      <Link style={ styles.link } to="/">Engage</Link>
    </Menu.Item>

    <Responsive as={Container} minWidth={breakPointSize}>
      <Menu.Menu position='right'>
        <Menu.Item name='about'>
          <a href="about.html">About</a>
        </Menu.Item>
        <Menu.Item name='about'>
          <Link style={ styles.link } to="/faq">FAQ</Link>
        </Menu.Item>
        <Menu.Item name='signin'>
          <Link style={ styles.link } to="/signin">Sign In</Link>
        </Menu.Item>
      </Menu.Menu>
    </Responsive>

    <Responsive as={ Menu.Menu} position='right' maxWidth={breakPointSize}>
      <Dropdown style={{ backgroundColor: '#7FB800', color: '#fff' }} item simple text='Menu'>
        <Dropdown.Menu style={{color: '#FFF', backgroundColor: '#7FB800'}} >
          <Dropdown.Item>
            <a href="about.html">About</a>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link style={ styles.link } to="/faq">FAQ</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link style={ styles.link } to="/signin">Sign In</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Responsive>   
  </Menu>
)

export default Header;
