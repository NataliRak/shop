import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;
const Button = styled.button`
  margin: 10px 0;
  padding: 10px;
`;

const TextField = ({
  label,
  name,
  value,
  type,
  onChange,
  error,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  const toogleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <Input
          className={getInputClasses()}
          type={showPassword ? "text" : type}
          id={name}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={name}
        />
        {type === "password" && (
          <Button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toogleShowPassword}
          >
            <i
              className={"bi bi-eye" + (showPassword ? "-slash-fill" : "-fill")}
            ></i>
          </Button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};
TextField.defaultProps = {
  type: "text",
};
TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default TextField;
