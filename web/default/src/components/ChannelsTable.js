import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Label, Message, Pagination, Popup, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {
  API,
  loadChannelModels,
  setPromptShown,
  shouldShowPrompt,
  showError,
  showInfo,
  showSuccess,
  timestamp2string
} from '../helpers';

import { CHANNEL_OPTIONS, ITEMS_PER_PAGE } from '../constants';
import { renderGroup, renderNumber } from '../helpers/render';

function renderTimestamp(timestamp) {
  return (
    <>
      {timestamp2string(timestamp)}
    </>
  );
}

let type2label = undefined;

function renderType(type) {
  if (!type2label) {
    type2label = new Map;
    for (let i = 0; i < CHANNEL_OPTIONS.length; i++) {
      type2label[CHANNEL_OPTIONS[i].value] = CHANNEL_OPTIONS[i];
    }
    type2label[0] = { value: 0, text: 'Unknown Type', color: 'grey' };
  }
  return <Label basic color={type2label[type]?.color}>{type2label[type] ? type2label[type].text : type}</Label>;
}

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

const ChannelsTable = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searching, setSearching] = useState(false);
  const [updatingBalance, setUpdatingBalance] = useState(false);// Define a state variable showPrompt and a function setShowPrompt using the useState hook to show a prompt if shouldShowPrompt("channel-test") returns true.

  // Define an asynchronous function loadChannels that fetches channels data from the API based on the provided start index. Update the state variable channels with the fetched data and handle errors accordingly.

  // Define a function onPaginationChange that triggers a data load when the active page is the last page. Update the active page state variable accordingly.

  // Define an asynchronous function refresh that sets loading to true and reloads data for the active page.

  // Implement side effects using the useEffect hook to load initial channel data and channel models data when the component mounts.

  // Define an asynchronous function manageChannel that performs different actions (delete, enable, disable, priority, weight) on a specified channel based on the action and value provided. Update the channel data accordingly.```javascript
const { success, message } = res.data;
    if (success) {
      showSuccess('Operation completed successfully!');
      let channel = res.data.data;
      let newChannels = [...channels];
      let realIdx = (activePage - 1) * ITEMS_PER_PAGE + idx;
      if (action === 'delete') {
        newChannels[realIdx].deleted = true;
      } else {
        newChannels[realIdx].status = channel.status;
      }
      setChannels(newChannels);
    } else {
      showError(message);
    }
  };

  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return <Label basic color='green'>Enabled</Label>;
      case 2:
        return (
          <Popup
            trigger={<Label basic color='red'>
              Disabled
            </Label>}
            content='This channel is manually disabled'
            basic
          />
        );
      case 3:
        return (
          <Popup
            trigger={<Label basic color='yellow'>
              Disabled
            </Label>}
            content='This channel is automatically disabled by the program'
            basic
          />
        );
      default:
        return (
          <Label basic color='grey'>
            Unknown status
          </Label>
        );
    }
  };

  const renderResponseTime = (ResponseTime) => {
    let time = responseTime / 1000;
    time = time.toFixed(2) + ' seconds';
    if (responseTime === 0) {
      return <Label basic color='grey'>Not tested</Label>;
    } else if (responseTime <= 1000) {
      return <Label basic color='green'>{time}</Label>;
    } else if (responseTime <= 3000) {
      return <Label basic color='olive'>{time}</Label>;
    } else if (responseTime <= 5000) {
      return <Label basic color='yellow'>{time}</Label>;
    } else {
      return <Label basic color='red'>{time}</Label>;
    }
  };

  const searchChannels = async () => {
    if (searchKeyword === '') {
      // If the keyword is blank, load files instead.
      await loadChannels(0);
      setActivePage(1);
      return;
    }
    setSearching(true);
    const res = await API.get(`/api/channel/search?keyword=${searchKeyword}`);
```const { success, message, data } = res.data;
    if (success) {
      setChannels(data);
      setActivePage(1);
    } else {
      showError(message);
    }
    setSearching(false);
  };

  const testChannel = async (id, name, idx) => {
    const res = await API.get(`/api/channel/test/${id}/`);
    const { success, message, time } = res.data;
    if (success) {
      let newChannels = [...channels];
      let realIdx = (activePage - 1) * ITEMS_PER_PAGE + idx;
      newChannels[realIdx].response_time = time * 1000;
      newChannels[realIdx].test_time = Date.now() / 1000;
      setChannels(newChannels);
      showInfo(`Channel ${name} test successful, took ${time.toFixed(2)} seconds.`);
    } else {
      showError(message);
    }
  };

  const testChannels = async (scope) => {
    const res = await API.get(`/api/channel/test?scope=${scope}`);
    const { success, message } = res.data;
    if (success) {
      showInfo('Successfully started testing channels, please refresh the page to view results.');
    } else {
      showError(message);
    }
  };

  const deleteAllDisabledChannels = async () => {
    const res = await API.delete(`/api/channel/disabled`);
    const { success, message, data } = res.data;
    if (success) {
      showSuccess(`All disabled channels have been deleted, total of ${data} were removed`);
      await refresh();
    } else {
      showError(message);
    }
  };

  const updateChannelBalance = async (id, name, idx) => {
    const res = await API.get(`/api/channel/update_balance/${id}/`);
    const { success, message, balance } = res.data;
    if (success) {
      let newChannels = [...channels];
      let realIdx = (activePage - 1) * ITEMS_PER_PAGE + idx;
      newChannels[realIdx].balance = balance;
      newChannels[realIdx].balance_updated_time = Date.now() / 1000;
      setChannels(newChannels);
      showInfo(`Channel ${name} balance updated successfully!`);
    } else {
      showError(message);
    }
  };

  const updateAllChannelsBalance = async () => {
    setUpdatingBalance(true);
    const res = await API.get(`/api/channel/update_balance`);
    const { success, message } = res.data;
    if (success) `".```javascript
showInfo('All enabled channel balances have been updated!');
    } else {
      showError(message);
    }
    setUpdatingBalance(false);
  };

  const handleKeywordChange = async (e, { value }) => {
    setSearchKeyword(value.trim());
  };

  const sortChannel = (key) => {
    if (channels.length === 0) return;
    setLoading(true);
    let sortedChannels = [...channels];
    sortedChannels.sort((a, b) => {
      if (!isNaN(a[key])) {
        // If the value is numeric, subtract to sort
        return a[key] - b[key];
      } else {
        // If the value is not numeric, sort as strings
        return ('' + a[key]).localeCompare(b[key]);
      }
    });
    if (sortedChannels[0].id === channels[0].id) {
      sortedChannels.reverse();
    }
    setChannels(sortedChannels);
    setLoading(false);
  };


  return (
    <>
      <Form onSubmit={searchChannels}>
        <Form.Input
          icon='search'
          fluid
          iconPosition='left'
          placeholder='Search channel ID, name, and key ...'
          value={searchKeyword}
          loading={searching}
          onChange={handleKeywordChange}
        />
      </Form>
      {
        showPrompt && (
          <Message onDismiss={() => {
            setShowPrompt(false);
            setPromptShown("channel-test");
          }}>
            OpenAI channels no longer support getting balance via key, so balance shows as 0. For supported channel types, click on balance to refresh.
            <br/>
            Channel testing only supports the chat model, prioritizing gpt-3.5-turbo; if that model is unavailable, the first model in your configured model list will be used.
          </Message>
        )
      }
      <Table basic compact size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              style={{ cursor: 'pointer' }}
              onClick={() => {
                sortChannel('id');
              }}
            >
              ID
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ cursor: 'pointer' }}
              onClick={() => {
                sortChannel('name');
              }}
            >
              Name
            </Table.HeaderCell>
```- The text inside the Table header cells is translated as follows:
  - "Group" 
  - "Type" 
  - "Status" 
  - "Response Time" 
  - "Balance" 
  - "Priority"
- The text inside the Table Rows and Cells remains in English.<Table.Cell>{renderStatus(channel.status)}</Table.Cell>
<Table.Cell>
  <Popup
    content={channel.test_time ? renderTimestamp(channel.test_time) : 'Not tested'}
    key={channel.id}
    trigger={renderResponseTime(channel.response_time)}
    basic
  />
</Table.Cell>
<Table.Cell>
  <Popup
    trigger={<span onClick={() => {
      updateChannelBalance(channel.id, channel.name, idx);
    }} style={{ cursor: 'pointer' }}>
    {renderBalance(channel.type, channel.balance)}
  </span>}
    content='Click to update'
    basic
  />
</Table.Cell>
<Table.Cell>
  <Popup
    trigger={<Input type='number' defaultValue={channel.priority} onBlur={(event) => {
      manageChannel(
        channel.id,
        'priority',
        idx,
        event.target.value
      );
    }}>
      <input style={{ maxWidth: '60px' }} />
    </Input>}
    content='Channel selection priority, the higher the better'
    basic
  />
</Table.Cell>
<Table.Cell>
  <div>
    <Button
      size={'small'}
      positive
      onClick={() => {
        testChannel(channel.id, channel.name, idx);
      }}
    >
      Test
    </Button>
    {/*<Button*/}
    {/*  size={'small'}*/}
    {/*  positive*/}{/*  loading={updatingBalance}*/}
                      {/*  onClick={() => {*/}
                      {/*    updateChannelBalance(channel.id, channel.name, idx);*/}
                      {/*  }}*/}
                      {/*>*/}
                      {/*  Update Balance*/}
                      {/*</Button>*/}
                      <Popup
                        trigger={
                          <Button size='small' negative>
                            Delete
                          </Button>
                        }
                        on='click'
                        flowing
                        hoverable
                      >
                        <Button
                          negative
                          onClick={() => {
                            manageChannel(channel.id, 'delete', idx);
                          }}
                        >
                          Delete Channel {channel.name}
                        </Button>
                      </Popup>
                      <Button
                        size={'small'}
                        onClick={() => {
                          manageChannel(
                            channel.id,
                            channel.status === 1 ? 'disable' : 'enable',
                            idx
                          );
                        }}
                      >
                        {channel.status === 1 ? 'Disable' : 'Enable'}
                      </Button>
                      <Button
                        size={'small'}
                        as={Link}
                        to={'/channel/edit/' + channel.id}
                      >
                        Edit
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='9'>
              <Button size='small' as={Link} to='/channel/add' loading={loading}:".Add new channel
Test all channels
Test disabled channels
{/*<Button size='small' onClick={updateAllChannelsBalance*/}
{/*loading={loading || updatingBalance}>Update balance for enabled channels</Button>*/}
Delete disabled channels
Confirm deletion
Refresh