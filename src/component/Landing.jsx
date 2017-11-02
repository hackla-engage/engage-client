import React, { Component } from 'react';
import styles from './Landing.scss'

const Landing = (props) =>{
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="#page-top">Engage</a>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fa fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
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
      <header className="masthead">
        <div className="container">
          <img className="img-fluid" src="http://d33wubrfki0l68.cloudfront.net/ac40c001c60109040dc17c9b42d270616cd9e711/2ac65/images/logo-hfla.svg"/>
          <span className="name">Engage</span>
          <hr className="star-light"/>
          <span className="description">Engage helps you voice your opinions at local goverment meetings</span>
        </div>
      </header>
      <section className="about" id="about">
        <div className="container">
          <h2 className="text-center">About</h2>
          <hr className="star-light" />
          <div className="row">
            <div className="col-lg-4 ml-auto">
              <p>Engage helps you voice your opinions at local goverment meetings</p>
            </div>
            <div className="col-lg-8 mx-auto text-center">
              <a href="#" className="btn btn-lg btn-outline">
                <i className="fa fa-download"></i>
                How Do I Start?
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="tutorial" id="tutorial">
        <div className="container">
          <h2 className="text-center">How does City Council work?</h2>
          <hr className="star-light" />
          <div className="row">
            <div className="col-lg-4 ml-auto">
              <p>It's a bit daunting but we are here to help</p>
            </div>
            <div className="col-lg-8 mx-auto text-center">
              <a href="#" className="btn btn-lg btn-outline">
                <i className="fa fa-download"></i>
                Tutorial
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="text-center">
        <div className="footer-above">
          <div className="container">
            <div className="row">
              <div className="footer-col col-md-4">
                <h3>Contact</h3>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a className="btn-social btn-outline" href="#">
                      <i className="fa fa-fw fa-facebook"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="btn-social btn-outline" href="#">
                      <i className="fa fa-fw fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="btn-social btn-outline" href="#">
                      <i className="fa fa-fw fa-dribbble"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-below">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                Copyright &copy; Your Website 2017
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Landing;
