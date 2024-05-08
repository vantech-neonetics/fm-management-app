```javascript
// Importing necessary modules and components
import React, { useContext, useEffect, useState } from 'react';
import { Button, Divider, Form, Header, Image, Message, Modal } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { API, copy, showError, showInfo, showNotice, showSuccess } from '../helpers';
import Turnstile from 'react-turnstile';
import { UserContext } from '../context/User';
import { onGitHubOAuthClicked, onLarkOAuthClicked } from './utils';

const PersonalSetting = () => {
  // Using useContext to access the UserContext
  const [userState, userDispatch] = useContext(UserContext);
  // Initializing the navigate function using useNavigate
  let navigate = useNavigate();

  // Setting up state variables using useState
  const [inputs, setInputs] = useState({
    wechat_verification_code: '',
    email_verification_code: '',
    email: '',
    self_account_deletion_confirmation: ''
  });
  const [status, setStatus] = useState({});
  const [showWeChatBindModal, setShowWeChatBindModal] = useState(false);
  const [showEmailBindModal, setShowEmailBindModal] = useState(false);
  const [showAccountDeleteModal, setShowAccountDeleteModal] = useState(false);
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [affLink, setAffLink] = useState("");
  const [systemToken, setSystemToken] = useState("");

  // Using useEffect for initial setup based on local storage data
  useEffect(() => {
    let status = localStorage.getItem('status');
    if (status) {
      status = JSON.parse(status);
      setStatus(status);
      if (status.turnstile_check) {
        setTurnstileEnabled(true);
        setTurnstileSiteKey(status.turnstile_site_key);
      }
    }
  }, []);

  // Using useEffect for countdown and disabling button functionality
  useEffect(() => {
    let countdownInterval = null;
    if (disableButton && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setDisableButton(false);
```Clean up on unmount

Regulate the countdown when the value of `disableButton` or `countdown` changes.

Update the input value when there is a change.

Get a new access token from the server.

Get the affiliate link.

Copy the generated link or token to the clipboard.

Handle the click event for the affiliate link.

Handle the click event for the system token.

Delete the user account after confirmation.

Bind the user's WeChat account with a verification code.setShowWeChatBindModal(false);
    } else {
      showError(message);
    }
  };

  const sendVerificationCode = async () => {
    setDisableButton(true);
    if (inputs.email === '') return;
    if (turnstileEnabled && turnstileToken === '') {
      showInfo('Please retry in a few seconds as Turnstile is checking the user environment!');
      return;
    }
    setLoading(true);
    const res = await API.get(
      `/api/verification?email=${inputs.email}&turnstile=${turnstileToken}`
    );
    const { success, message } = res.data;
    if (success) {
      showSuccess('Verification code sent successfully, please check your email!');
    } else {
      showError(message);
    }
    setLoading(false);
  };

  const bindEmail = async () => {
    if (inputs.email_verification_code === '') return;
    setLoading(true);
    const res = await API.get(
      `/api/oauth/email/bind?email=${inputs.email}&code=${inputs.email_verification_code}`
    );
    const { success, message } = res.data;
    if (success) {
      showSuccess('Email account bound successfully!');
      setShowEmailBindModal(false);
    } else {
      showError(message);
    }
    setLoading(false);
  };

  return (
    <div style={{ lineHeight: '40px' }}>
      <Header as='h3'>General Settings</Header>
      <Message>
        Note that the token generated here is for system management, not for requesting OpenAI-related services, please be aware.
      </Message>
      <Button as={Link} to={`/user/edit/`}>
        Update Personal Information
      </Button>
      <Button onClick={generateAccessToken}>Generate System Access Token</Button>
      <Button onClick={getAffLink}>Copy Invitation Link</Button>
      <Button onClick={() => {
        setShowAccountDeleteModal(true);
      }}>Delete Personal Account</Button>
      
      {systemToken && (
        <Form.Input 
          fluid 
          readOnly 
          value={systemToken} 
          onClick={handleSystemTokenClick}
          style={{ marginTop: '10px' }}
        />
      )}
      {affLink && (
        <Form.Input 
          fluid 
          readOnly 
          value={affLink} 
          onClick={handleAffLinkClick}
          style={{ marginTop: '10px' }}
        />
      )}
      <Divider />
      <Header as='h3'>Account Binding</Header>"Bind WeChat Account
Follow WeChat official account by scanning the QR code, enter 'verification code' to get code (valid for three minutes)
Bind
Bind GitHub Account
Bind Lark Account
Bind Email Address"onChange={handleInputChange}
                name='email'
                type='email'
                action={
                  <Button onClick={sendVerificationCode} disabled={disableButton || loading}>
                    {disableButton ? `Resend(${countdown})` : 'Get Verification Code'}
                  </Button>
                }
              />
              <Form.Input
                fluid
                placeholder='Verification Code'
                name='email_verification_code'
                value={inputs.email_verification_code}
                onChange={handleInputChange}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <Button
                color=''
                fluid
                size='large'
                onClick={bindEmail}
                loading={loading}
              >
                Confirm Binding
              </Button>
              <div style={{ width: '1rem' }}></div> 
              <Button
                fluid
                size='large'
                onClick={() => setShowEmailBindModal(false)}
              >
                Cancel
              </Button>
              </div>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
      <Modal
        onClose={() => setShowAccountDeleteModal(false)}
        onOpen={() => setShowAccountDeleteModal(true)}
        open={showAccountDeleteModal}
        size={'tiny'}
        style={{ maxWidth: '450px' }}
      >
        <Modal.Header>Dangerous Operation</Modal.Header>
        <Modal.Content>
        <Message>You are deleting your account, all data will be cleared and cannot be recovered.</Message>
          <Modal.Description>
            <Form size='large'>
              <Form.Input
                fluid".```jsx
placeholder={`Enter your account name ${userState?.user?.username} to confirm deletion`}
<Button
  color='red'
  fluid
  size='large'
  onClick={deleteAccount}
  loading={loading}
>
  Confirm Deletion
</Button>
<Button
  fluid
  size='large'
  onClick={() => setShowAccountDeleteModal(false)}
>
  Cancel
</Button>
```