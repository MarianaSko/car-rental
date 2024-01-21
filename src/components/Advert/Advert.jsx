import { useState } from "react";
import Modal from "../Modal/Modal";
import { getCityAndCountry } from "../../helpers/helpers";
import { Button } from "../App/App.styled";
import favoriteBtn from "../../images/favorite.svg";
import favoriteChecked from "../../images/favoriteChecked.svg";

import {
  AdvertItem,
  AdvertWrapper,
  CatalogImg,
  CatalogList,
  FavoriteBtn,
  PriceWrapper,
} from "./Advert.styled";
import { removeFavorites, setFavorites } from "../../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../../store/selectors";

const Advert = ({ advert }) => {
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

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

  const shortenedAddress = getCityAndCountry(address);
  const { city, country } = shortenedAddress;

  function onFavoriteBtnClick() {
    setIsChecked(!isChecked);
    if (!isChecked) {
      dispatch(setFavorites(advert));
    } else {
      dispatch(removeFavorites(id));
    }
  }

  return (
    <AdvertWrapper>
      <AdvertItem>
        <CatalogImg src={img} alt={make} />
        <FavoriteBtn onClick={onFavoriteBtnClick}>
          {isChecked ? (
            <img src={favoriteChecked} alt="" />
          ) : (
            <img src={favoriteBtn} alt="" />
          )}
        </FavoriteBtn>
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
