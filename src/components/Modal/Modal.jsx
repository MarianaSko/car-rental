import { nanoid } from "@reduxjs/toolkit";
import { getCityAndCountry } from "../../helpers/helpers";
import { Backdrop, CloseBtn, ModalBackground } from "./Modal.styled";
import { useCallback, useEffect } from "react";
import modalBtn from "../../images/closeBtn.svg";

const Modal = ({ advert, close }) => {
  const {
    year,
    img,
    make,
    model,
    rentalPrice,
    address,
    type,
    id,
    functionalities,
    fuelConsumption,
    engineSize,
    description,
    accessories,
    rentalConditions,
    mileage,
  } = advert;

  const shortenedAddress = getCityAndCountry(address);
  const { city, country } = shortenedAddress;
  const rentalConditionsArray = rentalConditions.split("\n");

  function useEscapeKey(close) {
    const handleEscKey = useCallback(
      (event) => {
        if (event.key === "Escape") {
          close(false);
        }
      },
      [close]
    );

    useEffect(() => {
      document.addEventListener("keydown", handleEscKey);
      return () => {
        document.removeEventListener("keydown", handleEscKey);
      };
    }, [handleEscKey]);
  }

  return (
    <Backdrop onKeyDown={useEscapeKey(close)}>
      <ModalBackground>
        <CloseBtn onClick={() => close(false)}>
          <img alt="" src={modalBtn}></img>
        </CloseBtn>
        <img src={img} alt={make} width="461" height="248"></img>
        <h2>
          {make}, <span>{model}</span>, {year}
        </h2>
        <ul>
          <li>{country}</li>
          <li>{city}</li>
          <li>Id: {id}</li>
          <li>Year: {year}</li>
          <li>Type: {type}</li>
          <li>Fuel consumption: {fuelConsumption}</li>
          <li>Engine size: {engineSize}</li>
        </ul>
        <p>{description}</p>
        <h3>Accessories and functionalities:</h3>
        <ul>
          {accessories.map((accessory) => (
            <li key={nanoid()}>{accessory}</li>
          ))}
          {functionalities.map((functionality) => (
            <li key={nanoid()}>{functionality}</li>
          ))}
        </ul>
        <h3> Rental conditions:</h3>
        <ul>
          {rentalConditionsArray.map((condition) => (
            <li key={nanoid()}>{condition}</li>
          ))}
          <li>Mileage: {mileage}</li>
          <li>Price: {rentalPrice}</li>
        </ul>
        <a href="tel:+380730000000">Rental car</a>
      </ModalBackground>
    </Backdrop>
  );
};

export default Modal;
