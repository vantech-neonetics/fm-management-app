```javascript
import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Grid, Header, Modal, Message } from 'semantic-ui-react';
import { API, removeTrailingSlash, showError } from '../helpers';

const SystemSetting = () => {
  let [inputs, setInputs] = useState({
    PasswordLoginEnabled: '',
    PasswordRegisterEnabled: '',
    EmailVerificationEnabled: '',
    GitHubOAuthEnabled: '',
    GitHubClientId: '',
    GitHubClientSecret: '',
    LarkClientId: '',
    LarkClientSecret: '',
    Notice: '',
    SMTPServer: '',
    SMTPPort: '',
    SMTPAccount: '',
    SMTPFrom: '',
    SMTPToken: '',
    ServerAddress: '',
    Footer: '',
    WeChatAuthEnabled: '',
    WeChatServerAddress: '',
    WeChatServerToken: '',
    WeChatAccountQRCodeImageURL: '',
    MessagePusherAddress: '',
    MessagePusherToken: '',
    TurnstileCheckEnabled: '',
    TurnstileSiteKey: '',
    TurnstileSecretKey: '',
    RegisterEnabled: '',
    EmailDomainRestrictionEnabled: '',
    EmailDomainWhitelist: ''
  });
  const [originInputs, setOriginInputs] = useState({});
  let [loading, setLoading] = useState(false);
  const [EmailDomainWhitelist, setEmailDomainWhitelist] = useState([]);
  const [restrictedDomainInput, setRestrictedDomainInput] = useState('');
  const [showPasswordWarningModal, setShowPasswordWarningModal] = useState(false);

  const getOptions = async () => {
    const res = await API.get('/api/option/');
    const { success, message, data } = res.data;
    if (success) {
      let newInputs = {};
      data.forEach((item) => {
        newInputs[item.key] = item.value;
      });
      setInputs({
        ...newInputs,
        EmailDomainWhitelist: newInputs.EmailDomainWhitelist.split(',')
      });
      setOriginInputs(newInputs);

      setEmailDomainWhitelist(newInputs.EmailDomainWhitelist.split(',').map((item) => {
        return { key: item, text: item, value: item };
      }));
    } else {
      showError(message);
    }
  };

  useEffect(() => {
    getOptions().then();
  }, []);
``````javascript
const updateOption = async (key, value) => {
    setLoading(true);
    switch (key) {
      case 'PasswordLoginEnabled':
      case 'PasswordRegisterEnabled':
      case 'EmailVerificationEnabled':
      case 'GitHubOAuthEnabled':
      case 'WeChatAuthEnabled':
      case 'TurnstileCheckEnabled':
      case 'EmailDomainRestrictionEnabled':
      case 'RegisterEnabled':
        value = inputs[key] === 'true' ? 'false' : 'true';
        break;
      default:
        break;
    }
    const res = await API.put('/api/option/', {
      key,
      value
    });
    const { success, message } = res.data;
    if (success) {
      if (key === 'EmailDomainWhitelist') {
        value = value.split(',');
      }
      setInputs((inputs) => ({
        ...inputs, [key]: value
      }));
    } else {
      showError(message);
    }
    setLoading(false);
  };

  const handleInputChange = async (e, { name, value }) => {
    if (name === 'PasswordLoginEnabled' && inputs[name] === 'true') {
      // block disabling password login
      setShowPasswordWarningModal(true);
      return;
    }
    if (
      name === 'Notice' ||
      name.startsWith('SMTP') ||
      name === 'ServerAddress' ||
      name === 'GitHubClientId' ||
      name === 'GitHubClientSecret' ||
      name === 'LarkClientId' ||
      name === 'LarkClientSecret' ||
      name === 'WeChatServerAddress' ||
      name === 'WeChatServerToken' ||
      name === 'WeChatAccountQRCodeImageURL' ||
      name === 'TurnstileSiteKey' ||
      name === 'TurnstileSecretKey' ||
      name === 'EmailDomainWhitelist'
    ) {
      setInputs((inputs) => ({ ...inputs, [name]: value }));
    } else {
      await updateOption(name, value);
    }
  };

  const submitServerAddress = async () => {
    let ServerAddress = removeTrailingSlash(inputs.ServerAddress);
    await updateOption('ServerAddress', ServerAddress);
  };

  const submitSMTP = async () => {
    if (originInputs['SMTPServer'] !== inputs.SMTPServer) {
      await updateOption('SMTPServer', inputs.SMTPServer);
    }
``````javascript
// Submit email domain whitelist 
// 提交电子邮件域名白名单

// Submit WeChat settings 
// 提交微信设置

// Submit message pusher settings 
// 提交消息推送者设置
```const submitGitHubOAuth = async () => {
    if (originInputs['GitHubClientId'] !== inputs.GitHubClientId) {
      await updateOption('GitHubClientId', inputs.GitHubClientId);
    }
    if (
      originInputs['GitHubClientSecret'] !== inputs.GitHubClientSecret &&
      inputs.GitHubClientSecret !== ''
    ) {
      await updateOption('GitHubClientSecret', inputs.GitHubClientSecret);
    }
  };

  const submitLarkOAuth = async () => {
    if (originInputs['LarkClientId'] !== inputs.LarkClientId) {
      await updateOption('LarkClientId', inputs.LarkClientId);
    }
    if (
      originInputs['LarkClientSecret'] !== inputs.LarkClientSecret &&
      inputs.LarkClientSecret !== ''
    ) {
      await updateOption('LarkClientSecret', inputs.LarkClientSecret);
    }
  };

  const submitTurnstile = async () => {
    if (originInputs['TurnstileSiteKey'] !== inputs.TurnstileSiteKey) {
      await updateOption('TurnstileSiteKey', inputs.TurnstileSiteKey);
    }
    if (
      originInputs['TurnstileSecretKey'] !== inputs.TurnstileSecretKey &&
      inputs.TurnstileSecretKey !== ''
    ) {
      await updateOption('TurnstileSecretKey', inputs.TurnstileSecretKey);
    }
  };

  const submitNewRestrictedDomain = () => {
    const localDomainList = inputs.EmailDomainWhitelist;
    if (restrictedDomainInput !== '' && !localDomainList.includes(restrictedDomainInput)) {
      setRestrictedDomainInput('');
      setInputs({
        ...inputs,
        EmailDomainWhitelist: [...localDomainList, restrictedDomainInput],
      });
      setEmailDomainWhitelist([...EmailDomainWhitelist, {
        key: restrictedDomainInput,
        text: restrictedDomainInput,
        value: restrictedDomainInput,
      }]);
    }
  }

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Form loading={loading}>
          <Header as='h3'>General Settings</Header>
          <Form.Group widths='equal'>
            <Form.Input
              label='Server Address'
              placeholder='For example: https://yourdomain.com'
              value={inputs.ServerAddress}".name='ServerAddress'
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Button onClick={submitServerAddress}>
            Update Server Address
          </Form.Button>
          <Divider />
          <Header as='h3'>Configure Login and Register</Header>
          <Form.Group inline>
            <Form.Checkbox
              checked={inputs.PasswordLoginEnabled === 'true'}
              label='Allow login with password'
              name='PasswordLoginEnabled'
              onChange={handleInputChange}
            />
            {
              showPasswordWarningModal &&
              <Modal
                open={showPasswordWarningModal}
                onClose={() => setShowPasswordWarningModal(false)}
                size={'tiny'}
                style={{ maxWidth: '450px' }}
              >
                <Modal.Header>Warning</Modal.Header>
                <Modal.Content>
                  <p>Disabling password login will prevent all users (including administrators) without other login methods from logging in with password. Are you sure to disable?</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => setShowPasswordWarningModal(false)}>Cancel</Button>
                  <Button
                    color='yellow'
                    onClick={async () => {
                      setShowPasswordWarningModal(false);
                      await updateOption('PasswordLoginEnabled', 'false');
                    }}
                  >
                    Confirm
                  </Button>
                </Modal.Actions>
              </Modal>
            }
            <Form.Checkbox
              checked={inputs.PasswordRegisterEnabled === 'true'}
              label='Allow registration with password'
              name='PasswordRegisterEnabled'
              onChange={handleInputChange}
            />
            <Form.Checkbox
              checked={inputs.EmailVerificationEnabled === 'true'}
              label='Require email verification when registering with password'
              name='EmailVerificationEnabled'
              onChange={handleInputChange}
            />
            <Form.Checkboxchecked={inputs.GitHubOAuthEnabled === 'true'}
              label='Allow login and registration via GitHub account'
              name='GitHubOAuthEnabled'
              onChange={handleInputChange}
            />
            <Form.Checkbox
              checked={inputs.WeChatAuthEnabled === 'true'}
              label='Allow login and registration via WeChat account'
              name='WeChatAuthEnabled'
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group inline>
            <Form.Checkbox
              checked={inputs.RegisterEnabled === 'true'}
              label='Allow new user registration (if set to "no", new users will not be able to register in any way)'
              name='RegisterEnabled'
              onChange={handleInputChange}
            />
            <Form.Checkbox
              checked={inputs.TurnstileCheckEnabled === 'true'}
              label='Enable Turnstile user verification'
              name='TurnstileCheckEnabled'
              onChange={handleInputChange}
            />
          </Form.Group>
          <Divider />
          <Header as='h3'>
            Configure Email Domain Whitelist
            <Header.Subheader>Used to prevent malicious users from registering in bulk using temporary email addresses</Header.Subheader>
          </Header>
          <Form.Group widths={3}>
            <Form.Checkbox
              label='Enable Email Domain Whitelist'
              name='EmailDomainRestrictionEnabled'
              onChange={handleInputChange}
              checked={inputs.EmailDomainRestrictionEnabled === 'true'}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Dropdown
              label='Allowed Email Domains'
              placeholder='Allowed Email Domains'
              name='EmailDomainWhitelist'
              required
              fluid
              multiple
              selection
              onChange={handleInputChange}
              value={inputs.EmailDomainWhitelist}
              autoComplete='new-password'
              options={EmailDomainWhitelist}
            />
            <Form.Input
              label='Add new allowed Email Domain'
              action={
                <Button type='button' onClick={() => {".Instructions: Translate the following Chinese text to English 
while maintaining the original formatting: "Enter</Button>
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  submitNewRestrictedDomain();
                }
              }}
              autoComplete='new-password'
              placeholder='Enter new allowed email domain'
              value={restrictedDomainInput}
              onChange={(e, { value }) => {
                setRestrictedDomainInput(value);
              }}
            />
          </Form.Group>
          <Form.Button onClick={submitEmailDomainWhitelist}>Save Email Domain Whitelist Settings</Form.Button>
          <Divider />
          <Header as='h3'>
            Configure SMTP
            <Header.Subheader>Used to support system email sending</Header.Subheader>
          </Header>
          <Form.Group widths={3}>
            <Form.Input
              label='SMTP Server Address'
              name='SMTPServer'
              onChange={handleInputChange}
              autoComplete='new-password'
              value={inputs.SMTPServer}
              placeholder='Example: smtp.qq.com'
            />
            <Form.Input
              label='SMTP Port'
              name='SMTPPort'
              onChange={handleInputChange}
              autoComplete='new-password'
              value={inputs.SMTPPort}
              placeholder='Default: 587'
            />
            <Form.Input
              label='SMTP Account'
              name='SMTPAccount'
              onChange={handleInputChange}
              autoComplete='new-password'
              value={inputs.SMTPAccount}
              placeholder='Usually an email address'
            />
          </Form.Group>
          <Form.Group widths={3}>
            <Form.Input
              label='SMTP Sender Email'
              name='SMTPFrom'
              onChange={handleInputChange}
              autoComplete='new-password'
              value={inputs.SMTPFrom}
              placeholder='Usually consistent with email address'
            />
            <Form.Input
              label='SMTP Access Token'
              name='SMTPToken'
              onChange={handleInputChange>".```jsx
type='password'
              autoComplete='new-password'
              checked={inputs.RegisterEnabled === 'true'}
              placeholder='Sensitive information will not be sent to the frontend for display'
            />
          </Form.Group>
          <Form.Button onClick={submitSMTP}>Save SMTP settings</Form.Button>
          <Divider />
          <Header as='h3'>
            Configure GitHub OAuth App
            <Header.Subheader>
              To support logging in and registering through GitHub,
              <a href='https://github.com/settings/developers' target='_blank'>
                click here
              </a>
              to manage your GitHub OAuth App
            </Header.Subheader>
          </Header>
          <Message>
            Fill in Homepage URL with <code>{inputs.ServerAddress}</code>
            , and Authorization callback URL with{' '}
            <code>{`${inputs.ServerAddress}/oauth/github`}</code>
          </Message>
          <Form.Group widths={3}>
            <Form.Input
              label='GitHub Client ID'
              name='GitHubClientId'
              onChange={handleInputChange}
              autoComplete='new-password'
              value={inputs.GitHubClientId}
              placeholder='Enter the ID of your registered GitHub OAuth APP'
            />
            <Form.Input
              label='GitHub Client Secret'
              name='GitHubClientSecret'
              onChange={handleInputChange}
              type='password'
              autoComplete='new-password'
              value={inputs.GitHubClientSecret}
              placeholder='Sensitive information will not be sent to the frontend for display'
            />
          </Form.Group>
          <Form.Button onClick={submitGitHubOAuth}>
            Save GitHub OAuth settings
          </Form.Button>
          <Divider />
          <Header as='h3'>
            Configure Feishu authorization login
            <Header.Subheader>
              To support logging in and registering through Feishu,
              <a href='https://open.feishu.cn/app' target='_blank'>
                click here
              </a>
              to manage your Feishu application
            </Header.Subheader>
          </Header>
          <Message>
            Fill in the homepage link with <code>{inputs.ServerAddress}</code>
```，redirect URL填{' '}
    <code>{`${inputs.ServerAddress}/oauth/lark`}</code>
  </Message>
  <Form.Group widths={3}>
    <Form.Input
      label='App ID'
      name='LarkClientId'
      onChange={handleInputChange}
      autoComplete='new-password'
      value={inputs.LarkClientId}
      placeholder='Enter App ID'
    />
    <Form.Input
      label='App Secret'
      name='LarkClientSecret'
      onChange={handleInputChange}
      type='password'
      autoComplete='new-password'
      value={inputs.LarkClientSecret}
      placeholder="Sensitive information won't be displayed on the frontend"
    />
  </Form.Group>
  <Form.Button onClick={submitLarkOAuth}>
    Save Lark OAuth Settings
  </Form.Button>
  <Divider />
  <Header as='h3'>
    Configure WeChat Server
    <Header.Subheader>
      To support login and registration via WeChat,
      <a
        href='https://github.com/songquanpeng/wechat-server'
        target='_blank'
      >
        Click here
      </a>
      to learn about WeChat Server
    </Header.Subheader>
  </Header>
  <Form.Group widths={3}>
    <Form.Input
      label='WeChat Server Address'
      name='WeChatServerAddress'
      placeholder='For example: https://yourdomain.com'
      onChange={handleInputChange}
      autoComplete='new-password'
      value={inputs.WeChatServerAddress}
    />
    <Form.Input
      label='WeChat Server Access Token'
      name='WeChatServerToken'
      type='password'
      onChange={handleInputChange}
      autoComplete='new-password'
      value={inputs.WeChatServerToken}
      placeholder="Sensitive information won't be displayed on the frontend"
    />
    <Form.Input
      label='WeChat Official Account QR Code Image URL'Instructions: Translate the following Chinese text to English
while maintaining the original formatting:
"onChange={handleInputChange}
              autoComplete='new-password'
              value={inputs.WeChatAccountQRCodeImageURL}
              placeholder='Enter an image link'
            />
          </Form.Group>
          <Form.Button onClick={submitWeChat}>
            Save WeChat Server Settings
          </Form.Button>
          <Divider />
          <Header as='h3'>
            Configure Message Pusher
            <Header.Subheader>
              Used to push alarm messages,
              <a
                href='https://github.com/songquanpeng/message-pusher'
                target='_blank'
              >
                Click here
              </a>
              to learn about Message Pusher
            </Header.Subheader>
          </Header>
          <Form.Group widths={3}>
            <Form.Input
              label='Message Pusher Push Address'
              name='MessagePusherAddress'
              placeholder='For example: https://msgpusher.com/push/your_username'
              onChange={handleInputChange}
              autoComplete='new-password'
              value={inputs.MessagePusherAddress}
            />
            <Form.Input
              label='Message Pusher Access Token'
              name='MessagePusherToken'
              type='password'
              onChange={handleInputChange}
              autoComplete='new-password'
              value={inputs.MessagePusherToken}
              placeholder='Sensitive information will not be sent to the front end for display'
            />
          </Form.Group>
          <Form.Button onClick={submitMessagePusher}>
            Save Message Pusher Settings
          </Form.Button>
          <Divider />
          <Header as='h3'>
            Configure Turnstile
            <Header.Subheader>
              Used to support user verification,
              <a href='https://dash.cloudflare.com/' target='_blank'>
                Click here
              </a>
              to manage your Turnstile Sites, it is recommended to choose Invisible Widget Type
            </Header.Subheader>
          </Header>
          <Form.Group widths={3}>
            <Form.Input
              label='Turnstile Site Key'
              name='TurnstileSiteKey'".onChange={handleInputChange}  // Translate: onChange={handleInputChange}
autoComplete='new-password'  // Translate: autoComplete='new-password'
value={inputs.TurnstileSiteKey}  // Translate: value={inputs.TurnstileSiteKey}
placeholder='输入你注册的 Turnstile Site Key'  // Translate: placeholder='Enter your registered Turnstile Site Key'

label='Turnstile Secret Key'  // Translate: label='Turnstile Secret Key'
name='TurnstileSecretKey'  // Translate: name='TurnstileSecretKey'
onChange={handleInputChange}  // Translate: onChange={handleInputChange}
type='password'  // Translate: type='password'
autoComplete='new-password'  // Translate: autoComplete='new-password'
value={inputs.TurnstileSecretKey}  // Translate: value={inputs.TurnstileSecretKey}
placeholder='敏感信息不会发送到前端显示'  // Translate: placeholder='Sensitive information will not be sent to the front end for display'

<Form.Button onClick={submitTurnstile}>  // Translate: <Form.Button onClick={submitTurnstile}>
保存 Turnstile 设置  // Translate: Save Turnstile settings