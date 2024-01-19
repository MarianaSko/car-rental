// import React from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdvertsThunk } from "../../store/thunk";
import { selectAdverts } from "../../store/selectors";
import Advert from "../../components/Advert/Advert";
import { CatalogWrapper } from "./CatalogPage.styled";
import { Container } from "../../components/App/App.styled";

const CatalogPage = () => {
  const adverts = useSelector(selectAdverts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdvertsThunk());
  }, [dispatch]);

  console.log(adverts);
  return (
    <Container>
      <CatalogWrapper>
        {adverts.map((advert) => (
          <Advert advert={advert} key={advert.id}></Advert>
        ))}
      </CatalogWrapper>
    </Container>
  );
};

export default CatalogPage;
