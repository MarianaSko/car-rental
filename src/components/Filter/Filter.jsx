import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllAdverts } from "../../store/selectors";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Button } from "../App/App.styled";
import DropdownIndicator from "./DropdownIndicator";
import selectStyle from "./selectStyles";
import {
  InputWrapper,
  SelectContainer,
  StyledForm,
  StyledPlaceholderOne,
  StyledPlaceholderTwo,
} from "./Filter.styled";
import { getAllAdverts } from "../../store/thunk";
import { setLoadMore } from "../../store/slice";
import { getArrayOfPrices } from "../../helpers/helpers";

const Filter = ({ filteredAdverts, isFiltered }) => {
  const allAdverts = useSelector(selectAllAdverts);
  const [brandsList, setBrandsList] = useState([]);
  const dispatch = useDispatch();
  const { register, handleSubmit, control } = useForm({
    mode: "onChange",
  });

  const options = brandsList.map((brand) => {
    return { value: brand, label: brand };
  });

  useEffect(() => {
    dispatch(getAllAdverts());
  }, [dispatch]);

  useEffect(() => {
    function getArrayOfBrands() {
      const brands = [];
      allAdverts.map((advert) => {
        brands.push(advert.make);
      });
      const uniqueBrands = [...new Set(brands)];
      setBrandsList(uniqueBrands);
    }

    getArrayOfBrands();
  }, [allAdverts]);

  function submit(e) {
    function getFilteredAdverts() {
      if (e.price || e.from || e.to) {
        const filtered = allAdverts.filter(({ make, rentalPrice, mileage }) => {
          const isBrandMatch = make === e.brand;
          const isPriceMatch =
            !e.price || Number(rentalPrice.replace("$", "")) <= e.price;
          const isMileageMatch =
            (!e.from && !e.to) ||
            (!e.from && mileage <= e.to) ||
            (!e.to && mileage >= e.from) ||
            (mileage >= e.from && mileage <= e.to);

          return isBrandMatch && isPriceMatch && isMileageMatch;
        });

        filteredAdverts(filtered);
      } else {
        const filtered = allAdverts.filter(({ make }) => make === e.brand);
        filteredAdverts(filtered);
      }
    }

    getFilteredAdverts();
    dispatch(setLoadMore(false));
    isFiltered(true);
  }

  const prices = getArrayOfPrices();

  return (
    <StyledForm action="" onSubmit={handleSubmit(submit)}>
      <SelectContainer>
        <label id="brandLabel">Car brand</label>
        <Controller
          name="brand"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              required
              name="brand"
              {...register("brand")}
              aria-labelledby="brandLabel"
              options={options}
              components={{
                DropdownIndicator,
                IndicatorSeparator: () => null,
              }}
              placeholder="Enter the text"
              styles={selectStyle}
              isSearchable={false}
              onChange={(option) => field.onChange(option.value)}
            />
          )}
        />
      </SelectContainer>
      <SelectContainer>
        <label id="priceLabel">Price/ 1 hour</label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Select
              name="price"
              {...register("price")}
              aria-labelledby="priceLabel"
              options={prices}
              components={{
                DropdownIndicator,
                IndicatorSeparator: () => null,
              }}
              placeholder="To $"
              styles={selectStyle}
              isSearchable={false}
              onChange={(option) => field.onChange(option.value)}
            />
          )}
        />
      </SelectContainer>
      <SelectContainer>
        <label id="mileageLabel">Сar mileage / km</label>
        <InputWrapper>
          <input
            type="number"
            {...register("from")}
            aria-labelledby="mileageLabel"
          />
          <StyledPlaceholderOne>From</StyledPlaceholderOne>
          <input
            type="number"
            {...register("to")}
            aria-labelledby="mileageLabel"
          />
          <StyledPlaceholderTwo>To</StyledPlaceholderTwo>
        </InputWrapper>
      </SelectContainer>
      <Button type="submit">Search</Button>
    </StyledForm>
  );
};

export default Filter;
