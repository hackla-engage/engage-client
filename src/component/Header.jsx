import React, { Component } from 'react';
import styles from './Landing.scss';
import { Link } from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<div>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#">Engage</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fa fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link js-scroll-trigger" to="/redux">redux</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#about">about</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#tutorial">tutorial</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#contact">contact</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="./signin">signin</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
			</div>
		)
	}
}

export default Header;
