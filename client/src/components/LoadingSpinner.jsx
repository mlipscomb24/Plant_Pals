import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const LoadingSpinner = () => (
  <Dimmer active>
    <Loader size="large">Loading</Loader>
  </Dimmer>
);

export default LoadingSpinner;
