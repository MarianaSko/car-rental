import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllAdverts } from "../../store/selectors";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Button } from "../App/App.styled";
import DropdownIndicator from "./DropdownIndicator";
import selectStyle from "./selectStyles";
import { SelectContainer, StyledForm } from "./Filter.styled";
import { getAllAdverts } from "../../store/thunk";
import { setLoadMore } from "../../store/slice";

const Filter = ({ filteredAdverts, isFiltered }) => {
  const allAdverts = useSelector(selectAllAdverts);
  const [brandsList, setBrandsList] = useState([]);
  const dispatch = useDispatch();

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
      const filtered = allAdverts.filter(({ make }) => make === e.brand);
      filteredAdverts(filtered);
    }

    getFilteredAdverts();
    dispatch(setLoadMore(false));
    isFiltered(true);

    console.log("hello");
  }

  const { register, handleSubmit, control } = useForm({
    mode: "onChange",
  });

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
      <Button type="submit">Search</Button>
    </StyledForm>
  );
};

export default Filter;
