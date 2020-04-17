import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { filter } from "lodash";
import { GET_INSTRUMENTS, REMOVE_INSTRUMENT } from "../../queries";

import Button from "@material-ui/core/Button";

const RemoveInstrument = ({ id, firstName, lastName }) => {
  const [removeInstrument] = useMutation(REMOVE_INSTRUMENT, {
    update(cache, { data: { removeInstrument } }) {
      const { artists } = cache.readQuery({ query: GET_INSTRUMENTS });
      cache.writeQuery({
        query: GET_INSTRUMENTS,
        data: {
          artists: filter(artists, (o) => {
            return o.id !== removeInstrument.id;
          }),
        },
      });
    },
  });

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        removeInstrument({
          variables: {
            id,
          },
          optimisticResponse: {
            __typename: "Mutation",
            removeInstrument: {
              __typename: "Instrument",
              id,
              firstName,
              lastName,
            },
          },
        });
      }}
      variant="contained"
      color="secondary"
      style={{ margin: "10px" }}
    >
      Delete
    </Button>
  );
};

export default RemoveInstrument;
