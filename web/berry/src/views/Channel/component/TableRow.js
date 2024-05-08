Import PropTypes from "prop-types";
Import { useState } from "react";

Import { showInfo, showError, renderNumber } from "utils/common";
Import { API } from "utils/api";
Import { CHANNEL_OPTIONS } from "constants/ChannelConstants";

Import {
  Popover,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  Button,
} from "@mui/material";

Import Label from "ui-component/Label";
Import TableSwitch from "ui-component/Switch";

Import ResponseTimeLabel from "./ResponseTimeLabel";
Import GroupLabel from "./GroupLabel";
Import NameLabel from "./NameLabel";

Import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";

Export default function ChannelTableRow({
  item,
  manageChannel,
  handleOpenModal,
  setModalChannelId,
}) {
  Const [open, setOpen] = useState(null);
  Const [openDelete, setOpenDelete] = useState(false);
  Const [statusSwitch, setStatusSwitch] = useState(item.status);
  Const [priorityValve, setPriority] = useState(item.priority);
  Const [responseTimeData, setResponseTimeData] = useState({
    test_time: item.test_time,
    response_time: item.response_time,
  });
  Const [itemBalance, setItemBalance] = useState(item.balance);

  Const handleDeleteOpen = () => {
    handleCloseMenu();
    setOpenDelete(true);
  };

  Const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  Const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  Const handleCloseMenu = () => {
    setOpen(null);
  };

  Const handleStatus = async () => {
    Const switchValue = statusSwitch === 1 ? 2 : 1;
    Const { success } = await manageChannel(item.id, "status", switchValue);
    If (success) {
      setStatusSwitch(switchValue);
    }
  };

  Const handlePriority = async (event) => {
    Const currentValue = parseInt(event.target.value);
    If (isNaN(currentValue) || currentValue === priorityValve) {
      Return;
    }

    If (currentValue < 0) {
      showError("Priority cannot be less than 0");```javascript
return;
    }

    await manageChannel(item.id, "priority", currentValue);
    setPriority(currentValue);
  };

  const handleResponseTime = async () => {
    const { success, time } = await manageChannel(item.id, "test", "");
    if (success) {
      setResponseTimeData({
        test_time: Date.now() / 1000,
        response_time: time * 1000,
      });
      showInfo(`Channel ${item.name} test successful, time taken ${time.toFixed(2)} seconds.`);
    }
  };

  const updateChannelBalance = async () => {
    const res = await API.get(`/api/channel/update_balance/${item.id}`);
    const { success, message, balance } = res.data;
    if (success) {
      setItemBalance(balance);

      showInfo(`Balance update successful!`);
    } else {
      showError(message);
    }
  };

  const handleDelete = async () => {
    handleCloseMenu();
    await manageChannel(item.id, "delete", "");
  };

  return (
    <>
      <TableRow tabIndex={item.id}>
        <TableCell>{item.id}</TableCell>

        <TableCell>
          <NameLabel name={item.name} models={item.models} />
        </TableCell>

        <TableCell>
          <GroupLabel group={item.group} />
        </TableCell>

        <TableCell>
          {!CHANNEL_OPTIONS[item.type] ? (
            <Label color="error" variant="outlined">
              Unknown
            </Label>
          ) : (
            <Label color={CHANNEL_OPTIONS[item.type].color} variant="outlined">
              {CHANNEL_OPTIONS[item.type].text}
            </Label>
          )}
        </TableCell>

        <TableCell>
          <Tooltip
            title={(() => {
              switch (statusSwitch) {
                case 1:
                  return "Enabled";
                case 2:
                  return "Manually disabled for this channel";
                case 3:
                  return "Automatically disabled for this channel by the system";
                default:
                  return "Unknown";
              }
            })()}
            placement="top"
          >
            <TableSwitch
              id={`switch-${item.id}`}
              checked={statusSwitch === 1}".
```onChange={handleStatus}
          />
        </Tooltip>
      </TableCell>

      <TableCell>
        <ResponseTimeLabel
          test_time={responseTimeData.test_time}
          response_time={responseTimeData.response_time}
          handle_action={handleResponseTime}
        />
      </TableCell>
      <TableCell>{renderNumber(item.used_quota)}</TableCell>
      <TableCell>
        <Tooltip
          title={"Click to update balance"}
          placement="top"
          onClick={updateChannelBalance}
        >
          {renderBalance(item.type, itemBalance)}
        </Tooltip>
      </TableCell>
      <TableCell>
        <TextField
          id={`priority-${item.id}`}
          onBlur={handlePriority}
          type="number"
          label="Priority"
          variant="standard"
          defaultValue={item.priority}
          inputProps={{ min: "0" }}
          sx={{ width: 80 }}
        />
      </TableCell>

      <TableCell>
        <IconButton
          onClick={handleOpenMenu}
          sx={{ color: "rgb(99, 115, 129)" }}
        >
          <IconDotsVertical />
        </IconButton>
      </TableCell>
    </TableRow>

    <Popover
      open={!!open}
      anchorEl={open}
      onClose={handleCloseMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: { width: 140 },
      }}
    >
      <MenuItem
        onClick={() => {
          handleCloseMenu();
          handleOpenModal();
          setModalChannelId(item.id);
        }}
      >
        <IconEdit style={{ marginRight: "16px" }} />
        Edit
      </MenuItem>
      <MenuItem onClick={handleDeleteOpen} sx={{ color: "error.main" }}>
        <IconTrash style={{ marginRight: "16px" }} />
        Delete
      </MenuItem>
    </Popover>

    <Dialog open={openDelete} onClose={handleDeleteClose}<DialogTitle>Delete Channel</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete channel {item.name}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Close</Button>
          <Button onClick={handleDelete} sx={{ color: "error.main" }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ChannelTableRow.propTypes = {
  item: PropTypes.object,
  manageChannel: PropTypes.func,
  handleOpenModal: PropTypes.func,
  setModalChannelId: PropTypes.func,
};

function renderBalance(type, balance) {
  switch (type) {
    case 1: // OpenAI
      return <span>${balance.toFixed(2)}</span>;
    case 4: // CloseAI
      return <span>¥{balance.toFixed(2)}</span>;
    case 8: // Custom
      return <span>${balance.toFixed(2)}</span>;
    case 5: // OpenAI-SB
      return <span>¥{(balance / 10000).toFixed(2)}</span>;
    case 10: // AI Proxy
      return <span>{renderNumber(balance)}</span>;
    case 12: // API2GPT
      return <span>¥{balance.toFixed(2)}</span>;
    case 13: // AIGC2D
      return <span>{renderNumber(balance)}</span>;
    default:
      return <span>Not supported</span>;
  }
}