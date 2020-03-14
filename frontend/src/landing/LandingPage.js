import React from "react";
import style from "./LandingPage.module.css";
import messages from "../general/textHolder";
import RestaurantTile from "./RestaurantTile";

const landingText = messages.landingPage;

const LandingPage = (props) => {
  const { setRestaurant } = props;

  return (
    <div className={style.landingPageContainer}>
      <div className={style.header}>
        {landingText.header}
      </div>
      <div className={style.searchContainer}>
        {landingText.search}
      </div>
      <RestaurantTile setRestaurant={setRestaurant} />
      {/* Probably make it it's own component */}
      <div className={style.footer}>
        {landingText.footer}
      </div>
    </div>
  );
};

export default LandingPage;
