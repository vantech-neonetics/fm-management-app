```javascript
// Export EditChannel component
``````javascript
const handleInputChange = (e, { name, value }) => {
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    if (name === 'type') {
        let localModels = getChannelModels(value);
        if (inputs.models.length === 0) {
            setInputs((inputs) => ({ ...inputs, models: localModels }));
        }
        setBasicModels(localModels);
    }
};

const handleConfigChange = (e, { name, value }) => {
    setConfig((inputs) => ({ ...inputs, [name]: value }));
};

const loadChannel = async () => {
    let res = await API.get(`/api/channel/${channelId}`);
    const { success, message, data } = res.data;
    if (success) {
        if (data.models === '') {
            data.models = [];
        } else {
            data.models = data.models.split(',');
        }
        if (data.group === '') {
            data.groups = [];
        } else {
            data.groups = data.group.split(',');
        }
        if (data.model_mapping !== '') {
            data.model_mapping = JSON.stringify(JSON.parse(data.model_mapping), null, 2);
        }
        setInputs(data);
        if (data.config !== '') {
            setConfig(JSON.parse(data.config));
        }
        setBasicModels(getChannelModels(data.type));
    } else {
        showError(message);
    }
    setLoading(false);
};

const fetchModels = async () => {
    try {
        let res = await API.get(`/api/channel/models`);
        let localModelOptions = res.data.data.map((model) => ({
            key: model.id,
            text: model.id,
            value: model.id
        }));
        setOriginModelOptions(localModelOptions);
        setFullModels(res.data.data.map((model) => model.id));
    } catch (error) {
        showError(error.message);
    }
};

const fetchGroups = async () => {
    try {
        let res = await API.get(`/api/group/`);
        setGroupOptions(res.data.data.map((group) => ({
            key: group,
            text: group,
            value: group
        })));
    } catch (error) {
        showError(error.message);
    }
};

useEffect(() => {
    let localModelOptions = [...originModelOptions];
```Instructions: Translate the following content to English
while maintaining the original formatting: "inputs.models.forEach((model) => {
      if (!localModelOptions.find((option) => option.key === model)) {
        localModelOptions.push({
          key: model,
          text: model,
          value: model
        });
      }
    });
    setModelOptions(localModelOptions);
  }, [originModelOptions, inputs.models]);

  useEffect(() => {
    if (isEdit) {
      loadChannel().then();
    } else {
      let localModels = getChannelModels(inputs.type);
      setBasicModels(localModels);
    }
    fetchModels().then();
    fetchGroups().then();
  }, []);

  const submit = async () => {
    if (inputs.key === '') {
      if (config.ak !== '' && config.sk !== '' && config.region !== '') {
        inputs.key = `${config.ak}|${config.sk}|${config.region}`;
      }
    }
    if (!isEdit && (inputs.name === '' || inputs.key === '')) {
      showInfo('Please enter the channel name and channel key!');
      return;
    }
    if (inputs.models.length === 0) {
      showInfo('Please select at least one model!');
      return;
    }
    if (inputs.model_mapping !== '' && !verifyJSON(inputs.model_mapping)) {
      showInfo('Model mapping must be in valid JSON format!');
      return;
    }
    let localInputs = {...inputs};
    if (localInputs.base_url && localInputs.base_url.endsWith('/')) {
      localInputs.base_url = localInputs.base_url.slice(0, localInputs.base_url.length - 1);
    }
    if (localInputs.type === 3 && localInputs.other === '') {
      localInputs.other = '2024-03-01-preview';
    }
    if (localInputs.type === 18 && localInputs.other === '') {
      localInputs.other = 'v2.1';
    }
    let res;
    localInputs.models = localInputs.models.join(',');
    localInputs.group = localInputs.groups.join(',');
    localInputs.config = JSON.stringify(config);
    if (isEdit) {
      res = await API.put(`/api/channel/`, { ...localInputs, id: parseInt(channelId) });
    } else {
      res = await API.post(`/api/channel/`, localInputs);
    }
    const { success, message } = res.data;
    if (success) {
      if (isEdit) {
        showSuccess('Channel updated successfully!');
      } else ".showSuccess('Channel created successfully!');
setInputs(originInputs);
}
} else {
  showError(message);
}
};

const addCustomModel = () => {
if (customModel.trim() === '') return;
if (inputs.models.includes(customModel)) return;
let localModels = [...inputs.models];
localModels.push(customModel);
let localModelOptions = [];
localModelOptions.push({
key: customModel,
text: customModel,
value: customModel
});
setModelOptions(modelOptions => {
return [...modelOptions, ...localModelOptions];
});
setCustomModel('');
handleInputChange(null, { name: 'models', value: localModels });
};

return (
<>
<Segment loading={loading}>
<Header as='h3'>{isEdit ? 'Update channel information' : 'Create a new channel'}</Header>
<Form autoComplete='new-password'>
<Form.Field>
<Form.Select
label='Type'
name='type'
required
search
options={CHANNEL_OPTIONS}
value={inputs.type}
onChange={handleInputChange}
/>
</Form.Field>
{
inputs.type === 3 && (
<>
<Message>
Please note that <strong>the model deployment name must be consistent with the model name</strong>, because One API will replace the model parameter in the request body with your deployment name (dots in the model name will be removed), <a target='_blank'
href='https://github.com/songquanpeng/one-api/issues/133?notification_referrer_id=NT_kwDOAmJSYrM2NjIwMzI3NDgyOjM5OTk4MDUw#issuecomment-1571602271'>Image demo</a>.
</Message>
<Form.Field>
<Form.Input
label='AZURE_OPENAI_ENDPOINT'
name='base_url'
placeholder={'Please enter AZURE_OPENAI_ENDPOINT, for example: https://docs-test-001.openai.azure.com'}
onChange={handleInputChange}
value={inputs.base_url}
autoComplete='new-password'
/>".</Form.Field>
                <Form.Field>
                  <Form.Input
                    label='Default API Version'
                    name='other'
                    placeholder={'Please enter the default API version, for example: 2024-03-01-preview. This configuration can be overridden by actual request query parameters'}
                    onChange={handleInputChange}
                    value={inputs.other}
                    autoComplete='new-password'
                  />
                </Form.Field>
              </>
            )
          }
          {
            inputs.type === 8 && (
              <Form.Field>
                <Form.Input
                  label='Base URL'
                  name='base_url'
                  placeholder={'Please enter the Base URL for custom channels, for example: https://openai.justsong.cn'}
                  onChange={handleInputChange}
                  value={inputs.base_url}
                  autoComplete='new-password'
                />
              </Form.Field>
            )
          }
          <Form.Field>
            <Form.Input
              label='Name'
              required
              name='name'
              placeholder={'Please name the channel'}
              onChange={handleInputChange}
              value={inputs.name}
              autoComplete='new-password'
            />
          </Form.Field>
          <Form.Field>
            <Form.Dropdown
              label='Group'
              placeholder={'Please select the group(s) that can use this channel'}
              name='groups'
              required
              fluid
              multiple
              selection
              allowAdditions
              additionLabel={'Please edit group rates in the system settings page to add new groups:'}
              onChange={handleInputChange}
              value={inputs.groups}
              autoComplete='new-password'
              options={groupOptions}
            />
          </Form.Field>
          {
            inputs.type === 18 && (
              <Form.Field>
                <Form.Input
                  label='Model Version'
                  name='other'
                  placeholder={'Please enter the Starfire model version, which is the version number in the API endpoint, for example: v2.1'}".Instructions: Translate the following Chinese text to English 
while maintaining the original formatting: "Knowledge Base ID"
"name='other'"
"Please enter the Knowledge Base ID, for example: 123456"
"Plugin Parameters"
"name='other'"
"Please enter the plugin parameters, which are the values of the X-DashScope-Plugin request header"
"For Coze, the model name is the Bot ID, you can add a prefix `bot-`, for example: `bot-123456`"
"Model"
"Please select the models supported by this channel"
"button"
"models"
"basicModels"}}>Fill in the relevant model</Button>
            <Button type={'button'} onClick={() => {
              handleInputChange(null, { name: 'models', value: fullModels });
            }}>Fill in all models</Button>
            <Button type={'button'} onClick={() => {
              handleInputChange(null, { name: 'models', value: [] });
            }}>Clear all models</Button>
            <Input
              action={
                <Button type={'button'} onClick={addCustomModel}>Fill in</Button>
              }
              placeholder='Enter custom model name'
              value={customModel}
              onChange={(e, { value }) => {
                setCustomModel(value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addCustomModel();
                  e.preventDefault();
                }
              }}
            />
          </div>
          <Form.Field>
            <Form.TextArea
              label='Model Redirect'
              placeholder={`Optional, used to modify the model name in the request body, a JSON string, where the key is the model name in the request and the value is the model name to be replaced, for example:\n${JSON.stringify(MODEL_MAPPING_EXAMPLE, null, 2)}`}
              name='model_mapping'
              onChange={handleInputChange}
              value={inputs.model_mapping}
              style={{ minHeight: 150, fontFamily: 'JetBrains Mono, Consolas' }}
              autoComplete='new-password'
            />
          </Form.Field>
          {
            inputs.type === 33 && (
              <Form.Field>
                <Form.Input
                  label='Region'
                  name='region'
                  required
                  placeholder={'region, e.g. us-west-2'}
                  onChange={handleConfigChange}
                  value={config.region}
                  autoComplete=''
                />
                <Form.Input
                  label='AK'
                  name='ak'
                  required
                  placeholder={'AWS IAM Access Key'}
                  onChange={handleConfigChange}
                  value={config.ak}
                  autoComplete=''"./>
                <Form.Input
                  label='SK'
                  name='sk'
                  required
                  placeholder={'AWS IAM Secret Key'}
                  onChange={handleConfigChange}
                  value={config.sk}
                  autoComplete=''
                />
              </Form.Field>
            )
          }
          {
            inputs.type === 34 && (
              <Form.Input
                label='User ID'
                name='user_id'
                required
                placeholder={'User ID that generated this key'}
                onChange={handleConfigChange}
                value={config.user_id}
                autoComplete=''
              />)
          }
          {
            inputs.type !== 33 && (batch ? <Form.Field>
              <Form.TextArea
                label='Key'
                name='key'
                required
                placeholder={'Please enter keys, one per line'}
                onChange={handleInputChange}
                value={inputs.key}
                style={{ minHeight: 150, fontFamily: 'JetBrains Mono, Consolas' }}
                autoComplete='new-password'
              />
            </Form.Field> : <Form.Field>
              <Form.Input
                label='Key'
                name='key'
                required
                placeholder={type2secretPrompt(inputs.type)}
                onChange={handleInputChange}
                value={inputs.key}
                autoComplete='new-password'
              />
            </Form.Field>)
          }
          {
            inputs.type === 37 && (
              <Form.Field>
                <Form.Input
                  label='Account ID'
                  name='user_id'
                  required
                  placeholder={'Enter Account ID, e.g. d8d7c61dbc334c32d3ced580e4bf42b4'}
                  onChange={handleConfigChange}
                  value={config.user_id}
                  autoComplete=''
                />
              </Form.Field>
            )
          }{
            inputs.type !== 33 && !isEdit && (
              <Form.Checkbox
                checked={batch}
                label='Batch Creation'
                name='batch'
                onChange={() => setBatch(!batch)}
              />
            )
          }
          {
            inputs.type !== 3 && inputs.type !== 33 && inputs.type !== 8 && inputs.type !== 22 && (
              <Form.Field>
                <Form.Input
                  label='Proxy'
                  name='base_url'
                  placeholder={'Optional, used for API calls through a proxy site, please enter the proxy site address, format: https://domain.com'}
                  onChange={handleInputChange}
                  value={inputs.base_url}
                  autoComplete='new-password'
                />
              </Form.Field>
            )
          }
          {
            inputs.type === 22 && (
              <Form.Field>
                <Form.Input
                  label='Private Deployment Address'
                  name='base_url'
                  placeholder={'Please enter the private deployment address, format: https://fastgpt.run/api/openapi'}
                  onChange={handleInputChange}
                  value={inputs.base_url}
                  autoComplete='new-password'
                />
              </Form.Field>
            )
          }
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type={isEdit ? 'button' : 'submit'} positive onClick={submit}>Submit</Button>
        </Form>
      </Segment>
    </>
  );
};

export default EditChannel;