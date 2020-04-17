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
        updateInstrument({
          variables: {
            id,
            year,
            brand,
            type,
            price,
          },
          optimisticResponse: {
            __typename: "Mutation",
            updateArtist: {
              __typename: "Artist",
              id,
              year,
              brand,
              type,
              price,
            },
          },
        });
        props.onButtonClick();
      }}
    >
      {/* <TextField
        label="First Name"
        defaultValue={firstName}
        placeholder="i.e. John"
        onChange={(e) => updateStateVariable("firstName", e.target.value)}
        margin="normal"
        varian="outlined"
        style={{ margin: "10px" }}
      /> */}
      <TextField
        fullWidth
        value={year}
        label="Year"
        placeholder="Year"
        onChange={(e) => setYear(e.target.value)}
        margin="normal"
        variant="outlined"
        style={{ margin: "10px" }}
      />
      <TextField
        fullWidth
        value={brand}
        label="Brand"
        placeholder="Brand"
        onChange={(e) => setBrand(e.target.value)}
        margin="normal"
        variant="outlined"
        style={{ margin: "10px" }}
      />

      <TextField
        fullWidth
        value={type}
        label="Type"
        placeholder="Type"
        onChange={(e) => setType(e.target.value)}
        margin="normal"
        variant="outlined"
        style={{ margin: "10px" }}
      />
      <TextField
        fullWidth
        value={price}
        label="Price"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
        margin="normal"
        variant="outlined"
        style={{ margin: "10px" }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
      >
        Update Device
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
