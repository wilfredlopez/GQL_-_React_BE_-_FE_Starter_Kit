import React from "react";
import { CircularProgress } from "@material-ui/core";

interface Props {}

export const BigSpinner: React.FC<Props> = () => {
  return (
    <div
      style={{
        textAlign: "center",
        margin: "4rem",
        padding: "1rem",
        maxWidth: "90vw"
      }}
    >
      <CircularProgress
        color="secondary"
        title="Loading ..."
        size={100}
        variant="indeterminate"
        thickness={5}
      />
    </div>
  );
};
