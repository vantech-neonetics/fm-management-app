import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { CHANNEL_OPTIONS } from "constants/ChannelConstants";
import { useTheme } from "@mui/material/styles";
import { API } from "utils/api";
import { showError, showSuccess } from "utils/common";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  ButtonGroup,
  Container,
  Autocomplete,
  FormHelperText,
  Switch,
  Checkbox,
} from "@mui/material";

import { Formik } from "formik";
import * as Yup from "yup";
import { defaultConfig, typeConfig } from "../type/Config"; //typeConfig
import { createFilterOptions } from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const filter = createFilterOptions();
const validationSchema = Yup.object().shape({
  is_edit: Yup.boolean(),
  name: Yup.string().required("Name cannot be empty"),
  type: Yup.number().required("Channel cannot be empty"),
  key: Yup.string().when("is_edit", {
    is: false,
    then: Yup.string().required("Key cannot be empty"),
  }),
  other: Yup.string(),
  models: Yup.array().min(1, "Models cannot be empty"),
  groups: Yup.array().min(1, "User groups cannot be empty"),
  base_url: Yup.string().when("type", {
    is: (value) => [3, 8].includes(value),
    then: Yup.string().required("Channel API Address cannot be empty"),
    otherwise: Yup.string(),
  }),
  model_mapping: Yup.string().test(
    "is-json",
    "Must be a valid JSON string",
    function (value) {
      try {
        if (value === "" || value === null || value === undefined) {
          return true;
        }
        const parsedValue = JSON.parse(value);
        if (typeof parsedValue === "object") {
          return true;
        }
      } catch (e) {
        return false;
      }
      return false;
    }
  ),
};The EditModal component receives props open, channelId, onCancel, and onOk.  
The initialInput state is set to defaultConfig.input.  
The inputLabel state is set to defaultConfig.inputLabel.  
The inputPrompt state is set to defaultConfig.prompt.  
The groupOptions state is an empty array.  
The modelOptions state is an empty array.  
The batchAdd state is set to false.  
The initChannel function initializes the inputLabel and inputPrompt based on the typeValue provided.  
The handleTypeChange function handles changes in typeValue and updates the form values accordingly.  
The basicModels function returns a list of models based on the channelType.  
The models are filtered based on modelGroup from typeConfig.// First, sort the data
      // 先对 data 排序
      // Return only the translated content, not including the original text.Instructions: Translate the following Chinese text to English 
while maintaining the original formatting: "setStatus({ success: false });
      showError(message);
      setErrors({ submit: message });
    }
  };

  function initialModel(channelModel) {
    if (!channelModel) {
      return [];
    }

    // If channelModel is a string
    if (typeof channelModel === "string") {
      channelModel = channelModel.split(",");
    }
    let modelList = channelModel.map((model) => {
      const modelOption = modelOptions.find((option) => option.id === model);
      if (modelOption) {
        return modelOption;
      }
      return { id: model, group: "Custom: Click or press enter to input" };
    });
    return modelList;
  }

  const loadChannel = async () => {
    let res = await API.get(`/api/channel/${channelId}`);
    const { success, message, data } = res.data;
    if (success) {
      if (data.models === "") {
        data.models = [];
      } else {
        data.models = initialModel(data.models);
      }
      if (data.group === "") {
        data.groups = [];
      } else {
        data.groups = data.group.split(",");
      }
      if (data.model_mapping !== "") {
        data.model_mapping = JSON.stringify(
          JSON.parse(data.model_mapping),
          null,
          2
        );
      }
      data.base_url = data.base_url ?? "";
      data.is_edit = true;
      initChannel(data.type);
      setInitialInput(data);
    } else {
      showError(message);
    }
  };

  useEffect(() => {
    fetchGroups().then();
    fetchModels().then();
  }, []);

  useEffect(() => {
    setBatchAdd(false);
    if (channelId) {
      loadChannel().then();
    } else {
      initChannel(1);
      setInitialInput({ ...defaultConfig.input, is_edit: false });
    }
  }, [channelId]);

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth={"md"}>
      <DialogTitle
        sx={{
          margin: "0px",
          fontWeight: 700,
          lineHeight: "1.55556",
          padding: "24px",
          fontSize: "1.125rem",
        }}
      >""Edit Channel" : "Create Channel"- Channel Type: Display error message if there is an error, otherwise show input prompt.
- Channel Name: Indicates error if there is an error, else shows input prompt.
- Base URL: Show error message if there is an error, otherwise display input prompt.```
type="text"
value={values.base_url}
name="base_url"
onBlur={handleBlur}
onChange={handleChange}
inputProps={{}}
aria-describedby="helper-text-channel-base_url-label"
/>
{touched.base_url && errors.base_url ? (
<FormHelperText error id="helper-tex-channel-base_url-label">
{errors.base_url}
</FormHelperText>
) : (
<FormHelperText id="helper-tex-channel-base_url-label">
{inputPrompt.base_url}
</FormHelperText>
)}
</FormControl>

{inputPrompt.other && (
<FormControl
fullWidth
error={Boolean(touched.other && errors.other)}
sx={{ ...theme.typography.otherInput }}
>
<InputLabel htmlFor="channel-other-label">
{inputLabel.other}
</InputLabel>
<OutlinedInput
id="channel-other-label"
label={inputLabel.other}
type="text"
value={values.other}
name="other"
onBlur={handleBlur}
onChange={handleChange}
inputProps={{}}
aria-describedby="helper-text-channel-other-label"
/>
{touched.other && errors.other ? (
<FormHelperText error id="helper-tex-channel-other-label">
{errors.other}
</FormHelperText>
) : (
<FormHelperText id="helper-tex-channel-other-label">
{inputPrompt.other}
</FormHelperText>
)}".
```Autocomplete component to select channel groups. Renders input fields for groups. Renders error or prompt messages accordingly. 
Autocomplete component to select channel models. Renders input fields for models.format: Return only the translated content, not including the original text.Fill in channel support model
Fill in all modelsSwitch to English, "aria-describedby="helper-text-channel-key-label"
                    />
                  </>
                ) : (
                  <TextField
                    multiline
                    id="channel-key-label"
                    label={inputLabel.key}
                    value={values.key}
                    name="key"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    aria-describedby="helper-text-channel-key-label"
                    minRows={5}
                    placeholder={inputPrompt.key + "，one key per line"}
                  />
                )}

                {touched.key && errors.key ? (
                  <FormHelperText error id="helper-tex-channel-key-label">
                    {errors.key}
                  </FormHelperText>
                ) : (
                  <FormHelperText id="helper-tex-channel-key-label">
                    {" "}
                    {inputPrompt.key}{" "}
                  </FormHelperText>
                )}
              </FormControl>
              {channelId === 0 && (
                <Container
                  sx={{
                    textAlign: "right",
                  }}
                >
                  <Switch
                    checked={batchAdd}
                    onChange={(e) => setBatchAdd(e.target.checked)}
                  />
                  Batch add
                </Container>
              )}
              <FormControl
                fullWidth
                error={Boolean(touched.model_mapping && errors.model_mapping)}
                sx={{ ...theme.typography.otherInput }}
              >
                {/* <InputLabel htmlFor="channel-model_mapping-label">{inputLabel.model_mapping}</InputLabel> */}
                <TextField
                  multiline
                  id="channel-model_mapping-label"
                  label={inputLabel.model_mapping}
                  value={values.model_mapping}
                  name="model_mapping"".Instructions: 
"onBlur={handleBlur}
                  onChange={handleChange}
                  aria-describedby="helper-text-channel-model_mapping-label"
                  minRows={5}
                  placeholder={inputPrompt.model_mapping}
                />
                {touched.model_mapping && errors.model_mapping ? (
                  <FormHelperText
                    error
                    id="helper-tex-channel-model_mapping-label"
                  >
                    {errors.model_mapping}
                  </FormHelperText>
                ) : (
                  <FormHelperText id="helper-tex-channel-model_mapping-label">
                    {" "}
                    {inputPrompt.model_mapping}{" "}
                  </FormHelperText>
                )}
              </FormControl>
              <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;

EditModal.propTypes = {
  open: PropTypes.bool,
  channelId: PropTypes.number,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
};"