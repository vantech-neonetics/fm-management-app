import React from 'react';
import { Message } from 'semantic-ui-react';

const NotFound = () => (
  <>
    <Message negative>
      <Message.Header>Page Not Found</Message.Header>
      <p>Please check if the browser address is correct</p>
    </Message>
  </>
);

export default NotFound;