import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_INSTRUMENTS } from "../../queries/index";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";

import Instrument from "../listItems/Instrument";

const Instruments = ({ artistId }) => {
  const { loading, error, data } = useQuery(GET_INSTRUMENTS, {
    variables: { artistId: artistId },
  });
  if (loading) return "Loading...";
  if (error) return `Errror! ${error.message}`;
  return (
    <ul>
      {data.instruments.map(({ id, year, brand, type, price }) => (
        <Container key={id}>
          <List key={id}>
            <Instrument
              key={id}
              id={id}
              year={year}
              brand={brand}
              type={type}
              price={price}
              artistId={artistId}
            />
          </List>
        </Container>
      ))}
    </ul>
  );
};

export default Instruments;
