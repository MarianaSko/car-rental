import { useSelector } from "react-redux";
import Advert from "../../components/Advert/Advert";
import { CatalogWrapper } from "../CatalogPage/CatalogPage.styled";
import { selectFavorites } from "../../store/selectors";

const FavoritesPage = () => {
  const favorites = useSelector(selectFavorites);

  return (
    <CatalogWrapper>
      {favorites?.map((advert) => (
        <Advert advert={advert} key={advert.id}></Advert>
      ))}
    </CatalogWrapper>
  );
};

export default FavoritesPage;
