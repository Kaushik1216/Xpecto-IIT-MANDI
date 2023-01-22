import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Razorpay from "../component/payment/Razorpay";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import * as action from "../../../actions/index";
import About from "../component/About/About";
import { useRef } from "react";
import { ReactComponent as FixedLogo } from "../../../svg/xpecto-logo.svg";
import { ReactComponent as BackToTop } from "../../../svg/backtop-btn.svg";

export default function Home() {
  const user = useSelector((state) => state.userinfo);
  const dispatch = useDispatch();
  const [newuser, setnewuser] = useState(user);
  const navigate = useNavigate();
  const [isuser, setisuser] = useState(false);
  const [bool, setbool] = useState(false);
  const getUser = async (props) => {
    try {
      const url = `${process.env.REACT_APP_BACKENDURL}/auth/login`;
      const { data } = await axios.get(url, { withCredentials: true });
      setnewuser((newuser) => ({
        ...newuser,
        email: data.data.email,
        displayname: data.data.displayName,
        image: data.data.image,
        firstname: data.data.firstName,
      }));
      const d = (newuser) => {
        dispatch(action.changeuserinfo(newuser));
      };
      d(newuser);
      setisuser(true);
      if (data.isnewuser) {
        setbool(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //  if(data.isnewuser){
  // 	navigate("/signup");
  //  }
  useEffect(() => {
    getUser();
    const nav = () => {
      if (bool) {
        navigate("/signup");
      }
    };
    nav();
  }, [isuser, user]);

  // const usera = userDetails.user;
  const logout = () => {
    window.open(`${process.env.REACT_APP_BACKENDURL}/auth/logout`, "_self");
  };
  const googleAuth = async () => {
    window.open(
      `${process.env.REACT_APP_BACKENDURL}/auth/google/callback`,
      "_self"
    );
  };

  const [fixedLogoVisible, setFixedLogoVisible] = useState(false);
  useEffect(() => {
    const scrollEvent = () => {
      if (window.scrollY > window.screen.height / 2) {
        setFixedLogoVisible(true);
      } else {
        setFixedLogoVisible(false);
      }
    };
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  // color change on scroll
  const mainLogoRef = useRef(null);
  useEffect(() => {
    const current = mainLogoRef.current;
    const scrollEvent = () => {
      const rect = current.getBoundingClientRect();
      const top = rect.top;
      const bottom = rect.bottom;
      const mid = top + current.clientHeight / 2;
      const midIntersecting =
        top <= 2 && mid <= window.screen.height && mid >= 0;
      const isElementVisible = top <= 2 && bottom >= window.screen.height;
      // console.log(top, bottom, window.screen.height,isElementVisible)
      if (midIntersecting || isElementVisible) {
        // console.log("here",midIntersecting)
        document.body.style.setProperty(
          "--current-page-color",
          current.getAttribute("data-color")
        );
      }
    };
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [mainLogoRef]);
  // console.log("usedetail " ,user)
  return (
    <>
      <div
        className={styles["page"]}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/home/background.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className={`${styles["fixed-logo"]} ${
            fixedLogoVisible && styles["fixed-logo-visible"]
          }`}
        >
          <FixedLogo />
        </div>
        <HashLink
          smooth
          to="/#"
          className={`${styles["back-to-top"]} ${
            fixedLogoVisible && styles["back-to-top-visible"]
          }`}
        >
          <BackToTop />
        </HashLink>
        <Sidebar />
        <div
          ref={mainLogoRef}
          data-color="#faea09"
          className={styles["section1"]}
          id="#"
        >
          <img
            className={styles["section1-plus"]}
            src={`${process.env.PUBLIC_URL}/home/plusplus.svg`}
            alt="plusplusgraphic"
          />
          <img
            className={styles["mainlogo"]}
            src={`${process.env.PUBLIC_URL}/home/mainlogo.svg`}
            alt="XpectoLogo"
          />
          <img
            className={styles["section1-rightrectangle"]}
            src={`${process.env.PUBLIC_URL}/home/rightrectangle.svg`}
            alt="rightrectangle"
          />
          <img
            className={styles["section1-scrolldown"]}
            src={`${process.env.PUBLIC_URL}/home/scrolldown.svg`}
            alt="scrolldown"
          />
          <img
            className={styles["section1-bottomleftgraphic"]}
            src={`${process.env.PUBLIC_URL}/home/lineslines.svg`}
            alt="bottomleftgraphic"
          />
          <img
            className={styles["section1-register"]}
            src={`${process.env.PUBLIC_URL}/home/register.svg`}
            alt="register"
          />
        </div>
        <div className={styles["section1"]} id="about">
          <About />
        </div>
        <div style={{ height: "300vh" }}></div>
      </div>
      <div className={styles["page"]}>
        <Link to="/admin/dashboard">Go to Admin Dashboard</Link>
      </div>
      <Button variant="outlined" onClick={googleAuth} sx={{ m: 5 }}>
        Sign in google
      </Button>
      <Button variant="outlined" onClick={googleAuth} sx={{ m: 5 }}>
        Login with google
      </Button>
      <Button variant="outlined" onClick={logout} sx={{ m: 5 }}>
        Logout
      </Button>
      <h1>Name : {user.firstname}</h1>
      <h1>Name : {user.email}</h1>
      {/* <button onClick={(nav())}> got got </button> */}
      <div>
        <Razorpay />
      </div>
    </>
  );
}
