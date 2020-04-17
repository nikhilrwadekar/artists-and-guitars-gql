import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { Button, TextField } from "@material-ui/core";

import { UPDATE_INSTRUMENT } from "../../queries";

const UpdateArtist = (props) => {
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [brand, setBrand] = useState(props.brand);
  const [type, setType] = useState(props.type);
  const [price, setPrice] = useState(props.price);
  const [updateInstrument] = useMutation(UPDATE_INSTRUMENT);

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value);
    switch (variable) {
      case "year":
        setYear(value);
        break;
      case "brand":
        setBrand(value);
        break;
      case "type":
        setType(value);
        break;
      case "price":
        setPrice(value);
        break;
        break;
      default:
        break;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateArtist({
          variables: {
            id,
            firstName,
            lastName,
          },
          optimisticResponse: {
            __typename: "Mutation",
            updateArtist: {
              __typename: "Artist",
              id,
              firstName,
              lastName,
            },
          },
        });
        props.onButtonClick();
      }}
    >
      <TextField
        label="First Name"
        defaultValue={firstName}
        placeholder="i.e. John"
        onChange={(e) => updateStateVariable("firstName", e.target.value)}
        margin="normal"
        varian="outlined"
        style={{ margin: "10px" }}
      />
      <TextField
        label="Last Name"
        defaultValue={lastName}
        placeholder="i.e. Smith"
        onChange={(e) => updateStateVariable("lastName", e.target.value)}
        margin="normal"
        varian="outlined"
        style={{ margin: "10px" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
      >
        Update Artist
      </Button>
      <Button
        onClick={props.onButtonClick}
        variant="contained"
        color="secondary"
        style={{ margin: "10px" }}
      >
        Cancel
      </Button>
    </form>
  );
};

export default UpdateArtist;