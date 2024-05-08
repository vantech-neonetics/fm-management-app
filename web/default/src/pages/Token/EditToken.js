import React, { useEffect, useState } from 'react';
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';
import { useNavigate, useParams } from 'react-router-dom';
import { API, copy, showError, showSuccess, timestamp2string } from '../../helpers';
import { renderQuotaWithPrompt } from '../../helpers/render';

const EditToken = () => {
  const params = useParams();
  const tokenId = params.id;
  const isEdit = tokenId !== undefined;
  const [loading, setLoading] = useState(isEdit);
  const [modelOptions, setModelOptions] = useState([]);
  const originInputs = {
    name: '',
    remain_quota: isEdit ? 0 : 500000,
    expired_time: -1,
    unlimited_quota: false,
    models: [],
    subnet: "",
  };
  const [inputs, setInputs] = useState(originInputs);
  const { name, remain_quota, expired_time, unlimited_quota } = inputs;
  const navigate = useNavigate();
  const handleInputChange = (e, { name, value }) => {
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleCancel = () => {
    navigate('/token');
  };
  const setExpiredTime = (month, day, hour, minute) => {
    let now = new Date();
    let timestamp = now.getTime() / 1000;
    let seconds = month * 30 * 24 * 60 * 60;
    seconds += day * 24 * 60 * 60;
    seconds += hour * 60 * 60;
    seconds += minute * 60;
    if (seconds !== 0) {
      timestamp += seconds;
      setInputs({ ...inputs, expired_time: timestamp2string(timestamp) });
    } else {
      setInputs({ ...inputs, expired_time: -1 });
    }
  };

  const setUnlimitedQuota = () => {
    setInputs({ ...inputs, unlimited_quota: !unlimited_quota });
  };

  const loadToken = async () => {
    let res = await API.get(`/api/token/${tokenId}`);
    const { success, message, data } = res.data;
    if (success) {
      if (data.expired_time !== -1) {
        data.expired_time = timestamp2string(data.expired_time);
      }
      if (data.models === '') {
        data.models = [];
      } else {
        data.models = data.models.split(',');
      }```
// Load available models
```
```
// Set token information if it is an edit operation, otherwise show error
// Stop loading
// Execute functions when component mounts
```
```
// Load the available models
// Request data from server to get available models
```
```
// Submit token information
// Check if it is a new token and the name is not empty
// Process the input data before submission
// Handle different cases for editing or creating a token
// Display success message for token update or creation
// Display error message if submission fails
```
```
// Render the form for editing or creating a token
```<Form.Dropdown
              label='Model Scope'
              placeholder={'Please select the models allowed to use. Leave it blank for no restrictions.'}
              name='models'
              fluid
              multiple
              search
              onLabelClick={(e, { value }) => {
                copy(value).then();
              }}
              selection
              onChange={handleInputChange}
              value={inputs.models}
              autoComplete='new-password'
              options={modelOptions}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label='IP Restriction'
              name='subnet'
              placeholder={'Enter the allowed IP subnets, for example: 192.168.0.0/24. Please separate multiple subnets with commas.'}
              onChange={handleInputChange}
              value={inputs.subnet}
              autoComplete='new-password'
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label='Expiration Time'
              name='expired_time'
              placeholder={'Enter the expiration time in the format yyyy-MM-dd HH:mm:ss. -1 indicates no expiration limit.'}
              onChange={handleInputChange}
              value={expired_time}
              autoComplete='new-password'
              type='datetime-local'
            />
          </Form.Field>
          <div style={{ lineHeight: '40px' }}>
            <Button type={'button'} onClick={() => {
              setExpiredTime(0, 0, 0, 0);
            }}>Never Expire</Button>
            <Button type={'button'} onClick={() => {
              setExpiredTime(1, 0, 0, 0);
            }}>Expire in One Month</Button>
            <Button type={'button'} onClick={() => {
              setExpiredTime(0, 1, 0, 0);
            }}>Expire in One Day</Button>
            <Button type={'button'} onClick={() => {
              setExpiredTime(0, 0, 1, 0);
            }}>Expire in One Hour</Button>
            <Button type={'button'} onClick={() => {
              setExpiredTime(0, 0, 0, 1);
            }}>Expire in One Minute</Button>
          </div>
          <Message>Please note that the token limit is only for restricting the maximum usage of the token itself, actual usage is subject to the remaining quota of the account.</Message>
          <Form.Field>
            <Form.Input".label={`Quota ${renderQuotaWithPrompt(remain_quota)}`}
              name='remain_quota'
              placeholder={'Please enter quota'}
              onChange={handleInputChange}
              value={remain_quota}
              autoComplete='new-password'
              type='number'
              disabled={unlimited_quota}
            />
          </Form.Field>
          <Button type={'button'} onClick={() => {
            setUnlimitedQuota();
          }}>{unlimited_quota ? 'Cancel Unlimited Quota' : 'Set as Unlimited Quota'}</Button>
          <Button floated='right' positive onClick={submit}>Submit</Button>
          <Button floated='right' onClick={handleCancel}>Cancel</Button>
        </Form>
      </Segment>
    </>
  );
};

export default EditToken;