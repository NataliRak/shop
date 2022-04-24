import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const SearchInput = ({ search, value }) => {
  return (
  

    <div className="search-box">
      <button className="btn-search">
        <i className="bi bi-search"></i>
      </button>
      <input
        className="input-search"
        type="text"
        name=""
        id=""
        value={value}
        onChange={(e) => search(e)}
        placeholder="  Search..."
      />
    </div>
  );
};
SearchInput.propTypes = {
  search: PropTypes.func,
  value: PropTypes.string,
};
export default SearchInput;
