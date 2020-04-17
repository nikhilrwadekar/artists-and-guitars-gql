import React, { Fragment, useState } from "react";

import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import RemoveInstrument from "../buttons/RemoveInstrument";
import DisplayCard from "../cards/DisplayCard";
import InstrumentCard from "../cards/InstrumentCard";
import UpdateInstrument from "../forms/UpdateInstrument";

const useStyles = makeStyles({
  label: {
    textDecoration: "none",
  },
});

const Instrument = (props) => {
  const classes = useStyles();

  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [brand, setBrand] = useState(props.brand);
  const [type, setType] = useState(props.type);
  const [price, setPrice] = useState(props.price);
  const [artistId, setArtistId] = useState(props.artistId);
  const [editMode, setEditMode] = useState(false);

  const fullName = () => {
    return `${year} ${brand} ${type}`;
  };

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
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

      default:
        break;
    }
  };

  return (
    <DisplayCard>
      <Fragment>
        {editMode ? (
          <UpdateInstrument
            id={props.id}
            firstName={props.firstName}
            lastName={props.lastName}
            onButtonClick={handleButtonClick}
            updateStateVariable={updateStateVariable}
          />
        ) : (
          <ListItem>
            <ListItemText primary={fullName()} />
            <Button
              onClick={() => setEditMode(true)}
              variant="contained"
              style={{ margin: "5px" }}
            >
              Edit
            </Button>
            <RemoveInstrument
              id={props.id}
              firstName={props.firstName}
              lastName={props.lastName}
            />
          </ListItem>
        )}
      </Fragment>
    </DisplayCard>
  );
};

export default Instrument;
