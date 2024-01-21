import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdvertsThunk } from "../../store/thunk";
import {
  selectAdverts,
  selectAllAdverts,
  selectLoadMore,
} from "../../store/selectors";
import Advert from "../../components/Advert/Advert";
import { CatalogWrapper } from "./CatalogPage.styled";
import { Container } from "../../components/App/App.styled";
import Filter from "../../components/Filter/Filter";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import { StyledLoadMore } from "../../components/LoadMoreBtn/LoadMoreBtn.styled";
import { setLoadMore } from "../../store/slice";

const CatalogPage = () => {
  const adverts = useSelector(selectAdverts);
  const allAdverts = useSelector(selectAllAdverts);
  const isLoadMore = useSelector(selectLoadMore);
  const dispatch = useDispatch();
  const [filteredAdverts, setFilteredAdverts] = useState(adverts);
  const [page, setPage] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    dispatch(getAdvertsThunk(page));
  }, [dispatch, page]);

  useEffect(() => {
    setFilteredAdverts(adverts);
  }, [adverts]);

  function onLoadMoreBtnClick() {
    const nextPage = page + 1;
    setPage(nextPage);
  }

  function onGoBackClick() {
    setFilteredAdverts(adverts);
    setIsFiltered(false);
    if (adverts.length !== allAdverts.length) {
      dispatch(setLoadMore(true));
    }
  }

  return (
    <Container>
      <Filter
        filteredAdverts={setFilteredAdverts}
        isFiltered={setIsFiltered}
      ></Filter>
      <CatalogWrapper>
        {filteredAdverts?.map((advert) => (
          <Advert advert={advert} key={advert.id}></Advert>
        ))}
      </CatalogWrapper>
      {isLoadMore && (
        <LoadMoreBtn downloadMore={onLoadMoreBtnClick}></LoadMoreBtn>
      )}
      {isFiltered && (
        <StyledLoadMore onClick={onGoBackClick}>
          Go back to all advertisements
        </StyledLoadMore>
      )}
    </Container>
  );
};

export default CatalogPage;
