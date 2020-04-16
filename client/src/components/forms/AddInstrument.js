import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { v4 as uuidv4 } from "uuid";

import { ADD_INSTRUMENT, GET_INSTRUMENTS } from "../../queries/index";

const AddInstrument = () => {
  const [id] = useState(uuidv4());
  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [artistID, setArtistID] = useState("");

  const [addInstrument] = useMutation(ADD_INSTRUMENT, {
    update(cache, { data: { addInstrument } }) {
      const { instruments } = cache.readQuery({ query: GET_INSTRUMENTS });
      cache.writeQuery({
        query: GET_INSTRUMENTS,
        data: { instruments: instruments.concat([addInstrument]) },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addInstrument({
          variables: {
            id,
            year,
            brand,
            type,
            price,
            artistID,
          },
          optimisticResponse: {
            __typename: "Mutation",
            addInstrument: {
              __typename: "Instrument",
              id,
              year,
              brand,
              type,
              price,
              artistID,
            },
          },
          update: (proxy, { data: { addInstrument } }) => {
            const data = proxy.readQuery({ query: GET_INSTRUMENTS });
            proxy.writeQuery({
              query: GET_INSTRUMENTS,
              data: {
                ...data,
                instruments: [...data.instruments, addInstrument],
              },
            });
          },
        });
      }}
    >
      <TextField
        fullWidth
        label="Year"
        placeholder="Year"
        onChange={(e) => setYear(e.target.value)}
        margin="normal"
        variant="outlined"
        style={{ margin: "10px" }}
      />
      <TextField
        fullWidth
        label="Brand"
        placeholder="Brand"
        onChange={(e) => setBrand(e.target.value)}
        margin="normal"
        variant="outlined"
        style={{ margin: "10px" }}
      />

      <TextField
        fullWidth
        label="Type"
        placeholder="Type"
        onChange={(e) => setType(e.target.value)}
        margin="normal"
        variant="outlined"
        style={{ margin: "10px" }}
      />
      <TextField
        fullWidth
        label="Price"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
        margin="normal"
        variant="outlined"
        style={{ margin: "10px" }}
      />

      {/* Select for Artists */}
      <Select
        fullWidth
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={artistID}
        variant="outlined"
        style={{ margin: "10px" }}
        onChange={() => {}}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "20px", alignItems: "center", marginLeft: "10px" }}
      >
        Add Instrument
      </Button>

      <Button
        onClick={() => {}}
        variant="contained"
        color="secondary"
        style={{ marginTop: "20px", alignItems: "center", marginLeft: "10px" }}
      >
        Cancel
      </Button>
    </form>
  );
};

export default AddInstrument;
