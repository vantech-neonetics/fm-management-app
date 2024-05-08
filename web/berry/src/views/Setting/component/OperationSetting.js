import { useState, useEffect } from "react";
import SubCard from "ui-component/cards/SubCard";
import {
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  Button,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { showSuccess, showError, verifyJSON } from "utils/common";
import { API } from "utils/api";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
require("dayjs/locale/zh-cn");

const OperationSetting = () => {
  let now = new Date();
  let [inputs, setInputs] = useState({
    QuotaForNewUser: 0,
    QuotaForInviter: 0,
    QuotaForInvitee: 0,
    QuotaRemindThreshold: 0,
    PreConsumedQuota: 0,
    ModelRatio: "",
    CompletionRatio: "",
    GroupRatio: "",
    TopUpLink: "",
    ChatLink: "",
    QuotaPerUnit: 0,
    AutomaticDisableChannelEnabled: "",
    AutomaticEnableChannelEnabled: "",
    ChannelDisableThreshold: 0,
    LogConsumeEnabled: "",
    DisplayInCurrencyEnabled: "",
    DisplayTokenStatEnabled: "",
    ApproximateTokenEnabled: "",
    RetryTimes: 0,
  });
  const [originInputs, setOriginInputs] = useState({});
  let [loading, setLoading] = useState(false);
  let [historyTimestamp, setHistoryTimestamp] = useState(
    now.getTime() / 1000 - 30 * 24 * 3600
  ); // a month ago new Date().getTime() / 1000 + 3600

  const getOptions = async () => {
    const res = await API.get("/api/option/");
    const { success, message, data } = res.data;
    if (success) {
      let newInputs = {};
      data.forEach((item) => {
        if (item.key === "ModelRatio" || item.key === "GroupRatio" || item.key === "CompletionRatio") {
          item.value = JSON.stringify(JSON.parse(item.value), null, 2);
        }
        if (item.value === '{}') {
          item.value = '';
        }
        newInputs[item.key] = item.value;
      });
      setInputs(newInputs);Set the updated inputs;
    }
    else {
      Show error message;
    }
  };

  Use effect(() => {
    Get options().then();
  }, []);

  Const updateOption = async (key, value) => {
    Set loading to true;
    If the key ends with "Enabled", 
      Set value based on whether inputs[key] is "true", then set to "false" if true, else set to "true";
    const response = await API.put("/api/option/", {
      key,
      value,
    });
    extract success and message from response's data;
    If success is true, 
      Update inputs by merging current inputs with new key-value pair;
    else {
      Show error message;
    }
    Set loading to false;
  };

  Const handleInputChange = async (event) => {
    extract name and value from the event target;

    If the name ends with "Enabled",
      Invoke updateOption with name and value, then show success message "Settings saved!";
    else {
      Update inputs by merging current inputs with new key-value pair;
    }
  };

  Const submitConfig = async (group) => {
    switch (group) {
      case "monitor":
        Check if ChannelDisableThreshold has been changed, if so,
          Invoke updateOption for "ChannelDisableThreshold" with new value;
        Check if QuotaRemindThreshold has been changed, if so,
          Invoke updateOption for "QuotaRemindThreshold" with new value;
        break;
      case "ratio":
        Check if ModelRatio has been changed, if so,
          If ModelRatio is not a valid JSON string,
            Show error message "The model ratio is not a valid JSON string" and return;
          Invoke updateOption for "ModelRatio" with new value;
        Check if GroupRatio has been changed, if so,
          If GroupRatio is not a valid JSON string,
            Show error message "The group ratio is not a valid JSON string" and return;
          Invoke updateOption for "GroupRatio" with new value;
        """.```javascript
if (originInputs['CompletionRatio'] !== inputs.CompletionRatio) {
  if (!verifyJSON(inputs.CompletionRatio)) {
    showError('Completion ratio is not a valid JSON string');
    return;
  }
  await updateOption('CompletionRatio', inputs.CompletionRatio);
}
break;
case "quota":
  if (originInputs["QuotaForNewUser"] !== inputs.QuotaForNewUser) {
    await updateOption("QuotaForNewUser", inputs.QuotaForNewUser);
  }
  if (originInputs["QuotaForInvitee"] !== inputs.QuotaForInvitee) {
    await updateOption("QuotaForInvitee", inputs.QuotaForInvitee);
  }
  if (originInputs["QuotaForInviter"] !== inputs.QuotaForInviter) {
    await updateOption("QuotaForInviter", inputs.QuotaForInviter);
  }
  if (originInputs["PreConsumedQuota"] !== inputs.PreConsumedQuota) {
    await updateOption("PreConsumedQuota", inputs.PreConsumedQuota);
  }
  break;
case "general":
  if (originInputs["TopUpLink"] !== inputs.TopUpLink) {
    await updateOption("TopUpLink", inputs.TopUpLink);
  }
  if (originInputs["ChatLink"] !== inputs.ChatLink) {
    await updateOption("ChatLink", inputs.ChatLink);
  }
  if (originInputs["QuotaPerUnit"] !== inputs.QuotaPerUnit) {
    await updateOption("QuotaPerUnit", inputs.QuotaPerUnit);
  }
  if (originInputs["RetryTimes"] !== inputs.RetryTimes) {
    await updateOption("RetryTimes", inputs.RetryTimes);
  }
  break;
}

showSuccess("Saved successfully!");
};

const deleteHistoryLogs = async () => {
  const res = await API.delete(
    `/api/log/?target_timestamp=${Math.floor(historyTimestamp)}`
  );
  const { success, message, data } = res.data;
  if (success) {
    showSuccess(`${data} logs have been cleared!`);
    return;
  }
  showError("Failed to clear logs: " + message);
};

return (
  <Stack spacing={2}>
    <SubCard title="General settings">"
```<Stack justifyContent="flex-start" alignItems="flex-start" spacing={2}>
          <Stack
            direction={{ sm: "column", md: "row" }}
            spacing={{ xs: 3, sm: 2, md: 4 }}
          >
            <FormControl fullWidth>
              <InputLabel htmlFor="TopUpLink">Recharge Link</InputLabel>
              <OutlinedInput
                id="TopUpLink"
                name="TopUpLink"
                value={inputs.TopUpLink}
                onChange={handleInputChange}
                label="Recharge Link"
                placeholder="For example, the purchase link of the card issuing website"
                disabled={loading}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="ChatLink">Chat Link</InputLabel>
              <OutlinedInput
                id="ChatLink"
                name="ChatLink"
                value={inputs.ChatLink}
                onChange={handleInputChange}
                label="Chat Link"
                placeholder="For example, the deployment address of ChatGPT Next Web"
                disabled={loading}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="QuotaPerUnit">Unit Quota</InputLabel>
              <OutlinedInput
                id="QuotaPerUnit"
                name="QuotaPerUnit"
                value={inputs.QuotaPerUnit}
                onChange={handleInputChange}
                label="Unit Quota"
                placeholder="The amount that one unit of currency can be exchanged for"
                disabled={loading}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="RetryTimes">Retry Times</InputLabel>
              <OutlinedInput
                id="RetryTimes"
                name="RetryTimes"
                value={inputs.RetryTimes}
                onChange={handleInputChange}
                label="Retry Times"
                placeholder="Retry times"
                disabled={loading}
              />
            </FormControl>
          </Stack>
          <Stack
            direction={{ sm: "column", md: "row" }}"spacing={{ xs: 3, sm: 2, md: 4 }}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <FormControlLabel
              sx={{ marginLeft: "0px" }}
              label="Display amount in currency format"
              control={
                <Checkbox
                  checked={inputs.DisplayInCurrencyEnabled === "true"}
                  onChange={handleInputChange}
                  name="DisplayInCurrencyEnabled"
                />
              }
            />

            <FormControlLabel
              label="Show token amounts instead of user amounts in Billing related APIs"
              control={
                <Checkbox
                  checked={inputs.DisplayTokenStatEnabled === "true"}
                  onChange={handleInputChange}
                  name="DisplayTokenStatEnabled"
                />
              }
            />

            <FormControlLabel
              label="Estimate token numbers in an approximate way to reduce computational load"
              control={
                <Checkbox
                  checked={inputs.ApproximateTokenEnabled === "true"}
                  onChange={handleInputChange}
                  name="ApproximateTokenEnabled"
                />
              }
            />
          </Stack>
          <Button
            variant="contained"
            onClick={() => {
              submitConfig("general").then();
            }}
          >
            Save general settings
          </Button>
        </Stack>
      </SubCard>
      <SubCard title="Log Settings">
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <FormControlLabel
            label="Enable log consumption"
            control={
              <Checkbox
                checked={inputs.LogConsumeEnabled === "true"}
                onChange={handleInputChange}
                name="LogConsumeEnabled"
              />
            }
          />

          <FormControl>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={"zh-cn"}.Instructions: Translate the following Chinese text to English 
while maintaining the original formatting: ">
              <DateTimePicker
                label="Log Cleaning Time"
                placeholder="Log Cleaning Time"
                ampm={false}
                name="historyTimestamp"
                value={
                  historyTimestamp === null
                    ? null
                    : dayjs.unix(historyTimestamp)
                }
                disabled={loading}
                onChange={(newValue) => {
                  setHistoryTimestamp(
                    newValue === null ? null : newValue.unix()
                  );
                }}
                slotProps={{
                  actionBar: {
                    actions: ["today", "clear", "accept"],
                  },
                }}
              />
            </LocalizationProvider>
          </FormControl>
          <Button
            variant="contained"
            onClick={() => {
              deleteHistoryLogs().then();
            }}
          >
            Clean History Logs
          </Button>
        </Stack>
      </SubCard>
      <SubCard title="Monitoring Settings">
        <Stack justifyContent="flex-start" alignItems="flex-start" spacing={2}>
          <Stack
            direction={{ sm: "column", md: "row" }}
            spacing={{ xs: 3, sm: 2, md: 4 }}
          >
            <FormControl fullWidth>
              <InputLabel htmlFor="ChannelDisableThreshold">
                Maximum Response Time
              </InputLabel>
              <OutlinedInput
                id="ChannelDisableThreshold"
                name="ChannelDisableThreshold"
                type="number"
                value={inputs.ChannelDisableThreshold}
                onChange={handleInputChange}
                label="Maximum Response Time"
                placeholder="Unit is seconds. When all test channels are running, channels will be automatically disabled if exceeding this time"
                disabled={loading}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="QuotaRemindThreshold">
                Quota Reminder Threshold
              </InputLabel>
              <OutlinedInput
                id="QuotaRemindThreshold"Instructions: Translate the following Chinese text to English 
while maintaining the original formatting: 
```             
              name="QuotaRemindThreshold"
              type="number"
              value={inputs.QuotaRemindThreshold}
              onChange={handleInputChange}
              label="Threshold for quota reminder"
              placeholder="An email will be sent to remind users when the quota is below this threshold"
              disabled={loading}
            />
          </FormControl>
        </Stack>
        <FormControlLabel
          label="Automatically disable channel on failure"
          control={
            <Checkbox
              checked={inputs.AutomaticDisableChannelEnabled === "true"}
              onChange={handleInputChange}
              name="AutomaticDisableChannelEnabled"
            />
          }
        />
        <FormControlLabel
          label="Automatically enable channel on success"
          control={
            <Checkbox
              checked={inputs.AutomaticEnableChannelEnabled === "true"}
              onChange={handleInputChange}
              name="AutomaticEnableChannelEnabled"
            />
          }
        />
        <Button
          variant="contained"
          onClick={() => {
            submitConfig("monitor").then();
          }}
        >
          Save monitoring settings
        </Button>
      </Stack>
    </SubCard>
    <SubCard title="Quota Settings">
      <Stack justifyContent="flex-start" alignItems="flex-start" spacing={2}>
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={{ xs: 3, sm: 2, md: 4 }}
        >
          <FormControl fullWidth>
            <InputLabel htmlFor="QuotaForNewUser">Initial quota for new users</InputLabel>
            <OutlinedInput
              id="QuotaForNewUser"
              name="QuotaForNewUser"
              type="number"
              value={inputs.QuotaForNewUser}
              onChange={handleInputChange}
              label="Initial quota for new users"
              placeholder="For example: 100"
              disabled={loading}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="PreConsumedQuota">Request pre-deducted quota</InputLabel>``````
<OutlinedInput
                id="PreConsumedQuota"
                name="PreConsumedQuota"
                type="number"
                value={inputs.PreConsumedQuota}
                onChange={handleInputChange}
                label="Pre-deducted quota for requests"
                placeholder="Refund or top-up after request completion"
                disabled={loading}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="QuotaForInviter">
                Quota for inviting new users
              </InputLabel>
              <OutlinedInput
                id="QuotaForInviter"
                name="QuotaForInviter"
                type="number"
                label="Quota for inviting new users"
                value={inputs.QuotaForInviter}
                onChange={handleInputChange}
                placeholder="Example: 2000"
                disabled={loading}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="QuotaForInvitee">
                Quota for new users using invitation code
              </InputLabel>
              <OutlinedInput
                id="QuotaForInvitee"
                name="QuotaForInvitee"
                type="number"
                label="Quota for new users using invitation code"
                value={inputs.QuotaForInvitee}
                onChange={handleInputChange}
                autoComplete="new-password"
                placeholder="Example: 1000"
                disabled={loading}
              />
            </FormControl>
          </Stack>
          <Button
            variant="contained"
            onClick={() => {
              submitConfig("quota").then();
            }}
          >
            Save Quota Settings
          </Button>
        </Stack>
      </SubCard>
      <SubCard title="Multiplier Settings">
        <Stack justifyContent="flex-start" alignItems="flex-start" spacing={2}>
          <FormControl fullWidth>
            <TextField
              multiline
              maxRows={15}
              id="channel-ModelRatio-label"
              label="Model Ratio"
              value={inputs.ModelRatio}
```"placeholder="For a JSON text, with keys as model names and values as ratios"
              />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              multiline
              maxRows={15}
              id="channel-CompletionRatio-label"
              label="Completion Ratio"
              value={inputs.CompletionRatio}
              name="CompletionRatio"
              onChange={handleInputChange}
              aria-describedby="helper-text-channel-CompletionRatio-label"
              minRows={5}
              placeholder="For a JSON text, with keys as model names and values as ratios, the ratio setting here is the ratio of model completion compared to prompt ratio. Using this setting can enforce overriding the internal ratio of One API"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              multiline
              maxRows={15}
              id="channel-GroupRatio-label"
              label="Group Ratio"
              value={inputs.GroupRatio}
              name="GroupRatio"
              onChange={handleInputChange}
              aria-describedby="helper-text-channel-GroupRatio-label"
              minRows={5}
              placeholder="For a JSON text, with keys as group names and values as ratios"
            />
          </FormControl>
          <Button
            variant="contained"
            onClick={() => {
              saveRatioSetting("ratio").then();
            }}
          >
            Save Ratio Settings
          </Button>
        </Stack>
      </SubCard>
    </Stack>
  );
};

export default OperationSetting;"