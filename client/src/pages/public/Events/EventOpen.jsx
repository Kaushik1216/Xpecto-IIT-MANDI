import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import LayoutPage from "../component/Layout/Layout";
import { ReactComponent as FixedLogo } from "../../../svg/xpecto-logo.svg";
import styles from "./eventopen.module.css";
export default function EventOpen(props) {
  const params = useParams();
  const navigate = useNavigate();

  const [eventdata, seteventdata] = useState(undefined);

  const getevent = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKENDURL}/api/events/${params.id}`;
      const data = await axios.get(url);
      seteventdata(data.data.data);
      console.log(data.data.data);
    } catch {
      // go to 404 page
      navigate("/events");
      //  console.log("data saved sifnufreb");
    }
  };
  useEffect(() => {
    getevent();
  }, []);
  if (eventdata === undefined) {
    // change to loader
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  return (
    <>
      <Sidebar />
      <LayoutPage dataColor="#F8C456">
        <div className={styles["header"]}>
          <h1 className={styles["events-page-heading"]}>{eventdata.name}</h1>
          <h2 className={styles["events-page-teamsize"]}>
            Team Size:{" "}
            {`${eventdata.teamMinSize} ${
              eventdata.teamMinSize !== eventdata.teamMaxSize
                ? ` - ${eventdata.teamMaxSize}`
                : ""
            }`}
          </h2>
          <div
            className={`${styles["fixed-logo"]} ${styles["fixed-logo-visible"]}`}
          >
            <FixedLogo />
          </div>
        </div>
        {/* main */}
        <div className={styles["main"]}>
          <p className={styles["eventdesc"]}>{eventdata.description}</p>
          <br />
          <div className={styles["event-btns"]}>
            {eventdata.rulebook_link !== "" && (
              <a
                className={styles["eventbutton"]}
                href={eventdata.rulebook_link}
                target="_blank"
              >
                Rulebook
              </a>
            )}
            <br />
            {eventdata.problemset_link !== "" && (
              <a
                className={styles["eventbutton"]}
                href={eventdata.rulebook_link}
                target="_blank"
              >
                Problem Statement
              </a>
            )}
          </div>

          <br />
          <div className={styles["prizes"]}>
            <h2 className={styles["eventprize"]}>Prizes</h2>
            <p className={styles["prize"]}>First : {eventdata.prices.first}</p>
            <p className={styles["prize"]}>
              Second : {eventdata.prices.Second}
            </p>
            <p className={styles["prize"]}>third : {eventdata.prices.third}</p>
          </div>
        </div>
      </LayoutPage>
    </>
  );
}
