import React, { useState } from "react";
import ReactRoundedImage from "react-rounded-image";
import { Form } from "react-bootstrap";
import { MdCancel } from "react-icons/md";
import styled from "styled-components";

const StyledIconCancel = styled(MdCancel)`
  position: absolute;
  left: 4.1rem;
  &:hover {
    height: 1.8rem;
    width: 1.8rem;
  }
`;

const ImagePicker = ({ defaultImage, register }) => {
  const [imageFile, setImageFile] = useState();

  const handleClickCancelImage = () => {
    setImageFile(null);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        {imageFile && (
          <StyledIconCancel
            className="text-primary-white"
            size="2rem"
            onClick={handleClickCancelImage}
          ></StyledIconCancel>
        )}
        <ReactRoundedImage
          image={imageFile ? URL.createObjectURL(imageFile) : defaultImage}
          roundedSize="0"
          imageWidth="200"
          imageHeight="200"
        />
      </div>
      <div className="d-flex mt-3 text-primary-white">
        <Form.File
          onChange={(e) => {
            setImageFile(e.target.files[0]);
          }}
          type="file"
          name="cover"
          id="formControlFile"
          ref={register}
          label={imageFile ? imageFile.name : "Seleccionar imagen"}
          data-browse="Buscar"
          custom
        />
      </div>
    </>
  );
};

export default ImagePicker;
