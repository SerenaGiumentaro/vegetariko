import React from "react";
import { useRecipeContext } from "./RecipesContext";
import InputGroup from "rsuite/esm/InputGroup";
import Input from "rsuite/esm/Input";
import SearchIcon from "@rsuite/icons/Search";

const SearchForm = () => {
  const { setQuery } = useRecipeContext();

  const [localQuery, setLocalQuery] = React.useState("");

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setQuery(localQuery);
  };

  const handleChange = (value: string) => {
    setLocalQuery(value);
  };

  return (
    <div>
      <InputGroup size="lg">
        <Input
          placeholder="Search..."
          value={localQuery}
          onChange={handleChange}
          onPressEnter={handleSubmit}
        />
        <InputGroup.Addon onClick={handleSubmit} style={{ cursor: "pointer" }}>
          <SearchIcon />
        </InputGroup.Addon>
      </InputGroup>
    </div>
  );
};

export default SearchForm;
