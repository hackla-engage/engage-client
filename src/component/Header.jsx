import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Responsive, Container, Segment } from 'semantic-ui-react';
import styles from './Header.scss';

styles.link = {
  color: '#FFF',
};

const breakPointSize = 767;
const Header = () => (
  <Menu
    borderless
    attached
    style={{
      paddingLeft: "1rem",
      backgroundColor: "#192a56"
    }}
  >
    <Menu.Item style={styles.link} name="browse" as={Link} to="/">
      Engage
    </Menu.Item>

    <Responsive as={Container} minWidth={breakPointSize}>
      <Menu.Menu position="right">
        <Menu.Item style={styles.link} name="about" href="/about.html">
          About
        </Menu.Item>
        <Menu.Item style={styles.link} name="faq" as={Link} to="/faq">
          FAQ
        </Menu.Item>
        <Menu.Item style={styles.link} name="signin" as={Link} to="/signin">
          Sign In
        </Menu.Item>
      </Menu.Menu>
    </Responsive>

    <Responsive as={Menu.Menu} position="right" maxWidth={breakPointSize}>
      <Dropdown
        style={{ backgroundColor: "#192a56", color: "#fff" }}
        item
        simple
        text="Menu"
      >
        <Dropdown.Menu style={{ color: "#FFF", backgroundColor: "#192a56" }}>
          <Dropdown.Item>
            <Link style={styles.link} to="/about">
              About
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link style={styles.link} to="/faq">
              FAQ
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link style={styles.link} to="/faq">
              Sign In
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Responsive>
  </Menu>
);

export default Header;
