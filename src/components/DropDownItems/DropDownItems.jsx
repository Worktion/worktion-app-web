
import React from "react";
import { Dropdown } from "react-bootstrap";

const DropDownItems = ({values, setValue}) => {
  return (
    <>
      {values.map((value) => {
        return (
          <Dropdown.Item
            id={value}
            key={value}
            as="button"
            onClick={(e) => {
              e.preventDefault();
              setValue(e.target.id);
            }}
          >
            {value}
          </Dropdown.Item>
        );
      })}
    </>
  );
};


export default DropDownItems;