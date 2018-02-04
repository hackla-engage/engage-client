import React, { Component } from 'react';
import styles from './Footer.scss';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Responsive, Container } from 'semantic-ui-react'

const breakPointSize = 767
const Footer = () => (
  <footer>
    <div className="social-links">
      <h2 className="social-links__title">Follow us</h2>
      <div className="social-links__links_container">
        <a className="social-links__link">
          <img src="https://cdn.now.howstuffworks.com/media-content/907e7b10-b3dd-4176-bb04-27234713cd39-640-360.jpg" className="social-links__icon icon-meetup"/>

        </a>
        <a className="social-links__link" href="https://www.meetup.com/hackforla/" target="_blank">
          <div className="social-links__icon-wrapper">
          <img className="social-links__icon icon-meetup"/>
          </div>
        </a>
        <a className="social-links__link" href="https://hackforla-slack.herokuapp.com/" target="_blank">
          <div className="social-links__icon icon-slack"/>
        </a>
        <a className="social-links__link" href="https://github.com/hackforla" target="_blank">
          <div className="social-links__icon icon-github"/>
        </a>
      </div>
    </div>
  </footer>
)

export default Footer;
