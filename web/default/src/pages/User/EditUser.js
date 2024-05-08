import React, { useEffect, useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useParams, useNavigate } from 'react-router-dom';
import { API, showError, showSuccess } from '../../helpers';
import { renderQuota, renderQuotaWithPrompt } from '../../helpers/render';

const EditUser = () => {
  const params = useParams();
  const userId = params.id;
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({
    username: '',
    display_name: '',
    password: '',
    github_id: '',
    wechat_id: '',
    email: '',
    quota: 0,
    group: 'default'
  });
  const [groupOptions, setGroupOptions] = useState([]);
  const { username, display_name, password, github_id, wechat_id, email, quota, group } =
    inputs;
  const handleInputChange = (e, { name, value }) => {
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const fetchGroups = async () => {
    try {
      let res = await API.get(`/api/group/`);
      setGroupOptions(res.data.data.map((group) => ({
        key: group,
        text: group,
        value: group,
      })));
    } catch (error) {
      showError(error.message);
    }
  };
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/setting");
  }
  const loadUser = async () => {
    let res = undefined;
    if (userId) {
      res = await API.get(`/api/user/${userId}`);
    } else {
      res = await API.get(`/api/user/self`);
    }
    const { success, message, data } = res.data;
    if (success) {
      data.password = '';
      setInputs(data);
    } else {
      showError(message);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadUser().then();
    if (userId) {
      fetchGroups().then();
    }
  }, []);

  const submit = async () => {
    let res = undefined;
    if (userId) {
      let data = { ...inputs, id: parseInt(userId) };
      if (typeof data.quota === 'string') {
        data.quota = parseInt(data.quota);
      }Update user information
Please enter a new username
Please enter a new password, minimum 8 characters
Please enter a new display name
Select group
Please edit group rate in system settings to add a new group.Instructions: Translate the following Chinese text to English 
while maintaining the original formatting: "name='quota'
                  placeholder={'Please enter the new remaining quota'}
                  onChange={handleInputChange}
                  value={quota}
                  type={'number'}
                  autoComplete='new-password'
                />
              </Form.Field>
            </>
          }
          <Form.Field>
            <Form.Input
              label='Linked GitHub Account'
              name='github_id'
              value={github_id}
              autoComplete='new-password'
              placeholder='This field is read-only. Users need to bind via the relevant binding button on the personal settings page and cannot directly modify.'
              readOnly
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label='Linked WeChat Account'
              name='wechat_id'
              value={wechat_id}
              autoComplete='new-password'
              placeholder='This field is read-only. Users need to bind via the relevant binding button on the personal settings page and cannot directly modify.'
              readOnly
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label='Linked Email Account'
              name='email'
              value={email}
              autoComplete='new-password'
              placeholder='This field is read-only. Users need to bind via the relevant binding button on the personal settings page and cannot directly modify.'
              readOnly
            />
          </Form.Field>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button positive onClick={submit}>Submit</Button>
        </Form>
      </Segment>
    </>
  );
};

export default EditUser;".