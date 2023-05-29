import React from "react";
import layoutStyles from "./Layout.module.css";
import introVideo from "../../assets/video_intro_home.mp4";
import Nav from "../Nav/Nav";

function Layout({ children }) {
  return (
    <section className={layoutStyles.layoutContainer}>
      <Nav />
      <div className={layoutStyles["layoutContainer-video"]}>
        <video autoPlay loop muted>
          <source src={introVideo} type="video/mp4" />
        </video>
      </div>
      <section className={layoutStyles['layoutContainer-wrapper']}>{children}</section>
    </section>
  );
}

export default Layout;
