import React, { useEffect, useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { API, getLogo, showError, showInfo, showSuccess } from '../helpers';
import Turnstile from 'react-turnstile';

const RegisterForm = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    verification_code: ''
  });
  const { username, password, password2 } = inputs;
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [loading, setLoading] = useState(false);
  const logo = getLogo();
  let affCode = new URLSearchParams(window.location.search).get('aff');
  if (affCode) {
    localStorage.setItem('aff', affCode);
  }

  useEffect(() => {
    let status = localStorage.getItem('status');
    if (status) {
      status = JSON.parse(status);
      setShowEmailVerification(status.email_verification);
      if (status.turnstile_check) {
        setTurnstileEnabled(true);
        setTurnstileSiteKey(status.turnstile_site_key);
      }
    }
  });

  let navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  async function handleSubmit(e) {
    if (password.length < 8) {
      showInfo('Password length must not be less than 8 characters!');
      return;
    }
    if (password !== password2) {
      showInfo('The passwords entered twice do not match');
      return;
    }
    if (username && password) {
      if (turnstileEnabled && turnstileToken === '') {
        showInfo('Please wait a few seconds and try again, Turnstile is checking the user environment!');
        return;
      }
      setLoading(true);
      if (!affCode) {
        affCode = localStorage.getItem('aff');
      }
      inputs.aff_code = affCode;const res = await API.post(
      `/api/user/register?turnstile=${turnstileToken}`,
      inputs
    );
    const { success, message } = res.data;
    if (success) {
      navigate('/login');
      showSuccess('Registration successful!');
    } else {
      showError(message);
    }
    setLoading(false);
  }
}

const sendVerificationCode = async () => {
  if (inputs.email === '') return;
  if (turnstileEnabled && turnstileToken === '') {
    showInfo('Please retry in a few seconds, Turnstile is checking the user environment!');
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

return (
  <Grid textAlign='center' style={{ marginTop: '48px' }}>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='' textAlign='center'>
        <Image src={logo} /> New User Registration
      </Header>
      <Form size='large'>
        <Segment>
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='Enter username, up to 12 characters'
            onChange={handleChange}
            name='username'
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Enter password, minimum 8 characters, maximum 20 characters'
            onChange={handleChange}
            name='password'
            type='password'
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Confirm password, minimum 8 characters, maximum 20 characters'
            onChange={handleChange}
            name='password2'
            type='password'
          />
          {showEmailVerification ? (
            <>
              <Form.Input
                fluid
                icon='mail'- `placeholder='Enter email address'`
- `获取验证码` translates to `Get verification code`
- `placeholder='Enter verification code'`
- `注册` translates to `Register`
- `已有账户？` translates to `Already have an account?`
- `点击登录` translates to `Click to log in`