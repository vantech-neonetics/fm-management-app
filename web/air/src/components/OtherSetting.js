import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Grid, Header, Message, Modal } from 'semantic-ui-react';
import { API, showError, showSuccess } from '../helpers';
import { marked } from 'marked';
import { Link } from 'react-router-dom';

const OtherSetting = () => {
  let [inputs, setInputs] = useState({
    Footer: '',
    Notice: '',
    About: '',
    SystemName: '',
    Logo: '',
    HomePageContent: '',
    Theme: ''
  });
  let [loading, setLoading] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    tag_name: '',
    content: ''
  });

  const getOptions = async () => {
    const res = await API.get('/api/option/');
    const { success, message, data } = res.data;
    if (success) {
      let newInputs = {};
      data.forEach((item) => {
        if (item.key in inputs) {
          newInputs[item.key] = item.value;
        }
      });
      setInputs(newInputs);
    } else {
      showError(message);
    }
  };

  useEffect(() => {
    getOptions().then();
  }, []);

  const updateOption = async (key, value) => {
    setLoading(true);
    const res = await API.put('/api/option/', {
      key,
      value
    });
    const { success, message } = res.data;
    if (success) {
      setInputs((inputs) => ({ ...inputs, [key]: value }));
    } else {
      showError(message);
    }
    setLoading(false);
  };

  const handleInputChange = async (e, { name, value }) => {
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const submitNotice = async () => {
    await updateOption('Notice', inputs.Notice);
  };

  const submitFooter = async () => {
    await updateOption('Footer', inputs.Footer);
  };

  const submitSystemName = async () => {
    await updateOption('SystemName', inputs.SystemName);
  };

  const submitTheme = async () => {
    await updateOption('Theme', inputs.Theme);
  };

  const submitLogo = async () => {
    await updateOption('Logo', inputs.Logo);
  };```jsx
        <Form.Input
          label={<label>Theme Name (<Link
            to='https://github.com/songquanpeng/one-api/blob/main/web/README.md'>Available Themes</Link>)</label>}
          placeholder='Enter theme name'
          value={inputs.ThemeName}
          name='ThemeName'
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Button onClick={submitThemeName}>Set Theme Name</Form.Button>
    </Form>
  </Grid.Column>
</Grid>
``````jsx
        <Form.Field
          label='Theme'
          control='select'
          value={inputs.Theme}
          name='Theme'
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Button onClick={submitTheme}>Set Theme (Restart Required)</Form.Button>
      <Form.Group widths='equal'>
        <Form.Input
          label='Logo Image URL'
          placeholder='Enter Logo Image URL here'
          value={inputs.Logo}
          name='Logo'
          type='url'
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Button onClick={submitLogo}>Set Logo</Form.Button>
      <Form.Group widths='equal'>
        <Form.TextArea
          label='Home Page Content'
          placeholder='Enter home page content here, supports Markdown & HTML code. Once set, status information on the homepage will no longer be displayed. If a link is entered, it will be used as the src attribute for the iframe, allowing you to set any webpage as the homepage.'
          value={inputs.HomePageContent}
          name='HomePageContent'
          onChange={handleInputChange}
          style={{ minHeight: 150, fontFamily: 'JetBrains Mono, Consolas' }}
        />
      </Form.Group>
      <Form.Button onClick={() => submitOption('HomePageContent')}>Save Homepage Content</Form.Button>
      <Form.Group widths='equal'>
        <Form.TextArea
          label='About'
          placeholder='Enter new about content here, supports Markdown & HTML code. If a link is entered, it will be used as the src attribute for the iframe, allowing you to set any webpage as the About page.'
          value={inputs.About}
          name='About'
          onChange={handleInputChange}
          style={{ minHeight: 150, fontFamily: 'JetBrains Mono, Consolas' }}
        />
      </Form.Group>
      <Form.Button onClick={submitAbout}>Save About</Form.Button>
      <Message>Removing the copyright notice of One API requires prior authorization. Maintaining this project requires a lot of effort. If this project is meaningful to you, please actively support it.</Message>
      <Form.Group widths='equal'>
        <Form.Input
          label='Footer'
          placeholder='Enter new footer here, leave blank to use the default footer, supports HTML code'
          value={inputs.Footer}
          name='Footer'
          onChange={handleInputChange}
        />
      </Form.Group>
```<Button onClick={submitFooter}>Set Footer</Button>
      </Form>
    </Grid.Column>
    <Modal
      onClose={() => setShowUpdateModal(false)}
      onOpen={() => setShowUpdateModal(true)}
      open={showUpdateModal}
    >
      <Modal.Header>New Version: {updateData.tag_name}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <div dangerouslySetInnerHTML={{ __html: updateData.content }}></div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setShowUpdateModal(false)}>Close</Button>
        <Button
          content='Details'
          onClick={() => {
            setShowUpdateModal(false);
            openGitHubRelease();
          }}
        />
      </Modal.Actions>
    </Modal>
  </Grid>
);
};

export default OtherSetting;