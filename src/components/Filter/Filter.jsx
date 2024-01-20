import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAdverts } from "../../store/selectors";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Button } from "../App/App.styled";
import DropdownIndicator from "./DropdownIndicator";
import selectStyle from "./selectStyles";
import { SelectContainer, StyledForm } from "./Filter.styled";

const Filter = ({ filteredAdverts }) => {
  const adverts = useSelector(selectAdverts);
  const [brandsList, setBrandsList] = useState([]);

  const options = brandsList.map((brand) => {
    return { value: brand, label: brand };
  });

  useEffect(() => {
    function getArrayOfBrands() {
      const brands = [];
      adverts.map((advert) => {
        brands.push(advert.make);
      });
      const uniqueBrands = [...new Set(brands)];
      setBrandsList(uniqueBrands);
    }

    getArrayOfBrands();
  }, [adverts]);

  function submit(e) {
    function getFilteredAdverts() {
      const filtered = adverts.filter(({ make }) => make === e.brand);
      filteredAdverts(filtered);
    }

    getFilteredAdverts();
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
