import React, { useState } from "react";
import { Form, Image } from "react-bootstrap";
import { MdCancel } from "@meronex/icons/md";
import styled from "styled-components";

const StyledIconCancel = styled(MdCancel)`
  position: absolute;
  left: 4.1rem;
  &:hover {
    opacity: 50%;
    height: 1.4rem;
    width: 1.4rem;
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
            size="1.5rem"
            onClick={handleClickCancelImage}
          ></StyledIconCancel>
        )}
        <Image
          src={imageFile ? URL.createObjectURL(imageFile) : defaultImage}
          alt="Foto de perfil"
          style={{
            height: "200px",
            width: "200px",
          }}
          roundedCircle
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
