import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdvertsThunk } from "../../store/thunk";
import { selectAdverts, selectLoadMore } from "../../store/selectors";
import Advert from "../../components/Advert/Advert";
import { CatalogWrapper } from "./CatalogPage.styled";
import { Container } from "../../components/App/App.styled";
import Filter from "../../components/Filter/Filter";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

const CatalogPage = () => {
  const adverts = useSelector(selectAdverts);
  const isLoadMore = useSelector(selectLoadMore);
  const dispatch = useDispatch();
  const [filteredAdverts, setFilteredAdverts] = useState(adverts);
  const [page, setPage] = useState(1);

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

  return (
    <Container>
      <Filter filteredAdverts={setFilteredAdverts}></Filter>
      <CatalogWrapper>
        {filteredAdverts?.map((advert) => (
          <Advert advert={advert} key={advert.id}></Advert>
        ))}
      </CatalogWrapper>
      {isLoadMore && (
        <LoadMoreBtn downloadMore={onLoadMoreBtnClick}></LoadMoreBtn>
      )}
    </Container>
  );
};

export default CatalogPage;
