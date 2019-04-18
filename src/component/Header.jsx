import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Responsive, Container } from 'semantic-ui-react';
import styles from './Header.scss';

styles.link = {
  color: '#FFF',
};

const breakPointSize = 767;
const Header = () => (
  <Menu
    attached
    style={{
      paddingLeft: '1rem',
      backgroundColor: '#192a56',
      border: 'none',
      width: '100%',
      padding: '0.5em',
    }}
    id="menu">
    <Container text>
      <Menu.Menu id="brand-logo">
        <Menu.Item
          style={{
            fontFamily: 'Pacifico, cursive',
            color: '#fff',
            fontSize: '1.1em',
          }}
          name="browse"
          as={Link}
          to="/">
          Engage
        </Menu.Item>
      </Menu.Menu>

      <Responsive as={Container} minWidth={breakPointSize}>
        <Menu.Menu position="right">
          <Menu.Item
            style={styles.link}
            name="about"
            as={Link}
            to="/about"
            position="right">
            About
          </Menu.Item>
          <Menu.Item style={styles.link} name="howto" as={Link} to="/howto">
            How To
          </Menu.Item>
        </Menu.Menu>
      </Responsive>

      <Responsive as={Menu.Menu} position="right" maxWidth={breakPointSize}>
        <Dropdown
          style={{
            backgroundColor: '#192a56',
            color: '#fff',
          }}
          item
          simple
          text="Menu">
          <Dropdown.Menu
            style={{
              color: '#FFF',
              backgroundColor: '#192a56',
            }}>
            <Dropdown.Item>
              <Link style={styles.link} to="/about">
                About
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link style={styles.link} to="/howto">
                How To
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Responsive>
    </Container>
  </Menu>
);

export default Header;
