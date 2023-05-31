import React from "react";
import Layout from "../../components/Layout/Layout";
import landing_image from "../../assets/landing_image.jpg";
import landingStyles from "./Landing.module.css";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Landing(props) {
  return (
    // <Layout>
    <div className={landingStyles.landingContainer}>
      <div className={landingStyles['landingContainer-title']}>
        <h1>Welcome to the world</h1>
      </div>
      <figure>
        <img src={landing_image} alt="landing-image" />
      </figure>
      <button><Link className={landingStyles.linkToHome} to='/home'>go to Home</Link></button>
    </div>
    // </Layout>
  );
}

Landing.propTypes = {};

export default Landing;
