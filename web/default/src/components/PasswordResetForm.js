```javascript
// import React, { useEffect, useState } from 'react';
// import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
// import { API, showError, showInfo, showSuccess } from '../helpers';
// import Turnstile from 'react-turnstile';

// Define the PasswordResetForm functional component
// Set up state variables using the useState hook
// Implement two useEffect hooks for specific functionalities
// Define handleChange function to update input values
// Implement handleSubmit function to handle form submission

```Instructions: Translate the following Chinese text to English while maintaining the original formatting: "}

  return (
    <Grid textAlign='center' style={{ marginTop: '48px' }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='' textAlign='center'>
          <Image src='/logo.png' /> Password Reset
        </Header>
        <Form size='large'>
          <Segment>
            <Form.Input
              fluid
              icon='mail'
              iconPosition='left'
              placeholder='Email address'
              name='email'
              value={email}
              onChange={handleChange}
            />
            {turnstileEnabled ? (
              <Turnstile
                sitekey={turnstileSiteKey}
                onVerify={(token) => {
                  setTurnstileToken(token);
                }}
              />
            ) : (
              <></>
            )}
            <Button
              color='green'
              fluid
              size='large'
              onClick={handleSubmit}
              loading={loading}
              disabled={disableButton}
            >
              {disableButton ? `Retry (${countdown})` : 'Submit'}
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default PasswordResetForm;