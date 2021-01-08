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

const ImagePicker = ({ defaultImage, register, shape, width, height }) => {
  const [imageFile, setImageFile] = useState();

  const cutName = (name) => {
    let shortname = "";
    if (name.length <= 21) {
      shortname = name;
    } else {
      shortname = name.substr(0, 18) + "...";
    }
    return shortname;
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        {imageFile && (
          <StyledIconCancel
            className="text-primary-white"
            size="1.5rem"
            onClick={() => {
              setImageFile(null);
            }}
          ></StyledIconCancel>
        )}
        <Image
          src={imageFile ? URL.createObjectURL(imageFile) : defaultImage}
          alt="Foto de perfil"
          style={{
            height: height ? height : "200px",
            width: width ? width : "200px",
          }}
          className={shape ? shape : "rounded-circle"}
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
          label={imageFile ? cutName(imageFile.name) : "Seleccionar imagen"}
          data-browse="Buscar"
          accept=".jpg, .jpeg, .png"
          custom
        />
      </div>
    </>
  );
};

export default ImagePicker;
