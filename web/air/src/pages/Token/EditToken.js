import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, isMobile, showError, showSuccess, timestamp2string } from '../../helpers';
import { renderQuotaWithPrompt } from '../../helpers/render';
import {
    AutoComplete,
    Banner,
    Button,
    Checkbox,
    DatePicker,
    Input,
    Select,
    SideSheet,
    Space,
    Spin,
    Typography
} from '@douyinfe/semi-ui';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import { Divider } from 'semantic-ui-react';

const EditToken = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const originInputs = {
    name: '',
    remain_quota: isEdit ? 0 : 500000,
    expired_time: -1,
    unlimited_quota: false,
    model_limits_enabled: false,
    model_limits: []
  };
  const [inputs, setInputs] = useState(originInputs);
  const { name, remain_quota, expired_time, unlimited_quota, model_limits_enabled, model_limits } = inputs;
  // const [visible, setVisible] = useState(false);
  const [models, setModels] = useState({});
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleCancel = () => {
    props.handleClose();
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

  // const loadModels = async () => {
  //   let res = await API.get(`/api/user/models`);
  //   const { success, message, data } = res.data;//   if (success) {
//     let localModelOptions = data.map((model) => ({
//       label: model,
//       value: model
//     }));
//     setModels(localModelOptions);
//   } else {
//     showError(message);
//   }
// };

const loadToken = async () => {
  setLoading(true);
  let res = await API.get(`/api/token/${props.editingToken.id}`);
  const { success, message, data } = res.data;
  if (success) {
    if (data.expired_time !== -1) {
      data.expired_time = timestamp2string(data.expired_time);
    }
    // if (data.model_limits !== '') {
    //   data.model_limits = data.model_limits.split(',');
    // } else {
    //   data.model_limits = [];
    // }
    setInputs(data);
  } else {
    showError(message);
  }
  setLoading(false);
};
useEffect(() => {
  setIsEdit(props.editingToken.id !== undefined);
}, [props.editingToken.id]);

useEffect(() => {
  if (!isEdit) {
    setInputs(originInputs);
  } else {
    loadToken().then(
      () => {
        // console.log(inputs);
      }
    );
  }
  // loadModels();
}, [isEdit]);

// Add a state variable tokenCount to record the number of tokens the user wants to create, default is 1
const [tokenCount, setTokenCount] = useState(1);

// Add a function to handle changes in tokenCount
const handleTokenCountChange = (value) => {
  // Make sure the user inputs a positive integer
  const count = parseInt(value, 10);
  if (!isNaN(count) && count > 0) {
    setTokenCount(count);
  }
};

// Generate a random six-character alphanumeric string
const generateRandomSuffix = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const submit = async () => {
  setLoading(true);
  if (isEdit) {
    // Keep the logic for editing tokens unchanged
    let localInputs = { ...inputs };
    localInputs.remain_quota = parseInt(localInputs.remain_quota);
    if (localInputs.expired_time !== -1) {```javascript
let time = Date.parse(localInputs.expired_time);
if (isNaN(time)) {
  showError('Expiration time format error!');
  setLoading(false);
  return;
}
localInputs.expired_time = Math.ceil(time / 1000);
}
// localInputs.model_limits = localInputs.model_limits.join(',');
let res = await API.put(`/api/token/`, { ...localInputs, id: parseInt(props.editingToken.id) });
const { success, message } = res.data;
if (success) {
  showSuccess('Token updated successfully!');
  props.refresh();
  props.handleClose();
} else {
  showError(message);
}
} else {
// Handling the scenario of adding multiple tokens
let successCount = 0; // Record the number of successfully created tokens
for (let i = 0; i < tokenCount; i++) {
  let localInputs = { ...inputs };
  if (i !== 0) {
    // If the user wants to create multiple tokens, give each token a sequential suffix
    localInputs.name = `${inputs.name}-${generateRandomSuffix()}`;
  }
  localInputs.remain_quota = parseInt(localInputs.remain_quota);

  if (localInputs.expired_time !== -1) {
    let time = Date.parse(localInputs.expired_time);
    if (isNaN(time)) {
      showError('Expiration time format error!');
      setLoading(false);
      break;
    }
    localInputs.expired_time = Math.ceil(time / 1000);
  }
  // localInputs.model_limits = localInputs.model_limits.join(',');
  let res = await API.post(`/api/token/`, localInputs);
  const { success, message } = res.data;

  if (success) {
    successCount++;
  } else {
    showError(message);
    break; // Terminate the loop if creation fails
  }
}

if (successCount > 0) {
  showSuccess(`${successCount} tokens created successfully. Please click Copy on the list page to obtain tokens!`);
  props.refresh();
  props.handleClose();
}
}
setLoading(false);
setInputs(originInputs); // Reset the form
setTokenCount(1); // Reset the quantity to the default value
};


return (
<>
<SideSheet
placement={isEdit ? 'right' : 'left'}".
```"Updating token information" OR "Creating a new token"
"Submit"
"Cancel"
"Name"
"Enter name"
"Expiration time" OR "Expire time"
"Select expiration time"<Banner type={'warning'}
                  description={'Attention, the quota of the token is only used to limit the maximum usage amount of the token itself, the actual usage is restricted by the remaining quota of the account.'}></Banner>
          <div style={{ marginTop: 20 }}>
            <Typography.Text>{`Quota ${renderQuotaWithPrompt(remain_quota)}`}</Typography.Text>
          </div>
          <AutoComplete
            style={{ marginTop: 8 }}
            name="remain_quota"
            placeholder={'Please enter the quota'}
            onChange={(value) => handleInputChange('remain_quota', value)}
            value={remain_quota}
            autoComplete="new-password"
            type="number"
            // position={'top'}
            data={[
              { value: 500000, label: '1$' },
              { value: 5000000, label: '10$' },
              { value: 25000000, label: '50$' },
              { value: 50000000, label: '100$' },
              { value: 250000000, label: '500$' },
              { value: 500000000, label: '1000$' }
            ]}
            disabled={unlimited_quota}
          />

          {!isEdit && (
            <>
              <div style={{ marginTop: 20 }}>
                <Typography.Text>New Token Count</Typography.Text>
              </div>
              <AutoComplete
                style={{ marginTop: 8 }}
                label="Count"
                placeholder={'Please select or enter the number of tokens to create'}
                onChange={(value) => handleTokenCountChange(value)}
                onSelect={(value) => handleTokenCountChange(value)}
                value={tokenCount.toString()}
                autoComplete="off"
                type="number"
                data={[
                  { value: 10, label: '10 units' },
                  { value: 20, label: '20 units' },
                  { value: 30, label: '30 units' },
                  { value: 100, label: '100 units' }
                ]}
                disabled={unlimited_quota}
              />
            </>
          )}

          <div>
            <Button style={{ marginTop: 8 }} type={'warning'} onClick={() => {
              setUnlimitedQuota();```js
{/* <Divider />
          <div style={{ marginTop: 10, display: 'flex' }}>
            <Space>
              <Checkbox
                name="model_limits_enabled"
                checked={model_limits_enabled}
                onChange={(e) => handleInputChange('model_limits_enabled', e.target.checked)}
              >
              </Checkbox>
              <Typography.Text>Enable model limits (not necessary, not recommended)</Typography.Text>
            </Space>
          </div>

          <Select
            style={{ marginTop: 8 }}
            placeholder={'Select the models supported by this channel'}
            name="models"
            required
            multiple
            selection
            onChange={value => {
              handleInputChange('model_limits', value);
            }}
            value={inputs.model_limits}
            autoComplete="new-password"
            optionList={models}
            disabled={!model_limits_enabled}
          /> */}
```