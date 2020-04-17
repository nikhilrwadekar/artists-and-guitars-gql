import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import RemoveArtist from "../buttons/RemoveArtist";
import DisplayCard from "../cards/DisplayCard";
import Instruments from "../lists/Instruments";
import UpdateArtist from "../forms/UpdateArtist";

const useStyles = makeStyles({
  label: {
    textDecoration: "none",
  },
});

const Artist = (props) => {
  let history = useHistory();

  function learnMoreAboutArtists() {
    history.push(`/artists/${props.id}/`);
  }
  const classes = useStyles();

  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);

  const fullName = () => {
    return `${firstName} ${lastName}`;
  };

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  return (
    <DisplayCard>
      <Fragment>
        {editMode ? (
          <UpdateArtist
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
            <RemoveArtist
              id={props.id}
              firstName={props.firstName}
              lastName={props.lastName}
            />
          </ListItem>
        )}

        {/* Instruments Go Here */}
        <Instruments artistId={props.id} />

        <CardActions>
          <Button
            onClick={learnMoreAboutArtists}
            color="primary"
            size="small"
            variant="outlined"
          >
            Learn More
          </Button>
        </CardActions>
      </Fragment>
    </DisplayCard>
  );
};

export default Artist;
