// import React from "react";

import { useState } from "react";
import Modal from "../Modal/Modal";
import { getCityAndCountry } from "../../helpers/helpers";
import { Button } from "../App/App.styled";
import {
  AdvertItem,
  AdvertWrapper,
  CatalogImg,
  CatalogList,
  PriceWrapper,
} from "./Advert.styled";

const Advert = ({ advert }) => {
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);

  const {
    year,
    img,
    make,
    model,
    rentalPrice,
    address,
    rentalCompany,
    type,
    id,
    functionalities,
  } = advert;

  // const addressParts = address.split(", ");
  // const city = addressParts[addressParts.length - 2];
  // const country = addressParts[addressParts.length - 1];
  const shortenedAddress = getCityAndCountry(address);
  const { city, country } = shortenedAddress;

  return (
    <AdvertWrapper>
      <AdvertItem>
        <CatalogImg src={img} alt={make} />
        <PriceWrapper>
          <h2>
            {make}, <span>{model}</span>, {year}
          </h2>
          <p>{rentalPrice}</p>
        </PriceWrapper>
        <CatalogList>
          <li>{country}</li>
          <li>{city}</li>
          <li>{rentalCompany}</li>
          <li>{type}</li>
          <li>{model}</li>
          <li>{id}</li>
          <li>{functionalities[0]}</li>
        </CatalogList>
        <Button onClick={() => setIsLearnMoreOpen(true)}>Learn more</Button>
      </AdvertItem>
      {isLearnMoreOpen && (
        <Modal advert={advert} close={setIsLearnMoreOpen}></Modal>
      )}
    </AdvertWrapper>
  );
};

export default Advert;
