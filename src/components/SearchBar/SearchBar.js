import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function SearchBar(props) {
  const { searchData, searchField, handleSearch } = props;
  const defaultProps = {
    options: searchData,
    getOptionLabel: (option) => option[searchField],
  };

  function handleOnChangeAuto(event) {
    // setValue(event.target.value);
    handleSearch(event.target.innerHTML.toLowerCase());
  }
  function handleOnChange(event) {
    handleSearch(event.target.value.toLowerCase());
  }

  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        {...defaultProps}
        onChange={handleOnChangeAuto}
        clearOnBlur={false}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search..."
            margin="normal"
            onChange={handleOnChange}
          />
        )}
      />
    </div>
  );
}

export default SearchBar;
