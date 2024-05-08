import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form, Label, Pagination, Popup, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API, copy, showError, showSuccess, showWarning, timestamp2string } from '../helpers';

import { ITEMS_PER_PAGE } from '../constants';
import { renderQuota } from '../helpers/render';

const COPY_OPTIONS = [
  { key: 'next', text: 'ChatGPT Next Web', value: 'next' },
  { key: 'ama', text: 'BotGem', value: 'ama' },
  { key: 'opencat', text: 'OpenCat', value: 'opencat' },
];

const OPEN_LINK_OPTIONS = [
  { key: 'next', text: 'ChatGPT Next Web', value: 'next' },
  { key: 'ama', text: 'BotGem', value: 'ama' },
  { key: 'opencat', text: 'OpenCat', value: 'opencat' },
];

function renderTimestamp(timestamp) {
  return (
    <>
      {timestamp2string(timestamp)}
    </>
  );
}

function renderStatus(status) {
  switch (status) {
    case 1:
      return <Label basic color='green'>Enabled</Label>;
    case 2:
      return <Label basic color='red'> Disabled </Label>;
    case 3:
      return <Label basic color='yellow'> Expired </Label>;
    case 4:
      return <Label basic color='grey'> Depleted </Label>;
    default:
      return <Label basic color='black'> Unknown Status </Label>;
  }
}

const TokensTable = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searching, setSearching] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [targetTokenIdx, setTargetTokenIdx] = useState(0);
  const [orderBy, setOrderBy] = useState('');

  const loadTokens = async (startIdx) => {
    const res = await API.get(`/api/token/?p=${startIdx}&order=${orderBy}`);
    const { success, message, data } = res.data;
    if (success) {
      if (startIdx === 0) {
        setTokens(data);
      } else {
        let newTokens = [...tokens];```jsx
// In this case we have to load more data and then append them.
    showSuccess('已复制到剪贴板！');
    showWarning('无法复制到剪贴板，请手动复制，已将令牌填入搜索框。');
``````javascript
if (serverAddress === '') {
      serverAddress = window.location.origin;
    }
    let encodedServerAddress = encodeURIComponent(serverAddress);
    const chatLink = localStorage.getItem('chat_link');
    let defaultUrl;
  
    if (chatLink) {
      defaultUrl = chatLink + `/#/?settings={"key":"sk-${key}","url":"${serverAddress}"}`;
    } else {
      defaultUrl = `https://app.nextchat.dev/#/?settings={"key":"sk-${key}","url":"${serverAddress}"}`;
    }
    let url;
    switch (type) {
      case 'ama':
        url = `ama://set-api-key?server=${encodedServerAddress}&key=sk-${key}`;
        break;
  
      case 'opencat':
        url = `opencat://team/join?domain=${encodedServerAddress}&token=sk-${key}`;
        break;
        
      default:
        url = defaultUrl;
    }
  
    window.open(url, '_blank');
  }

  useEffect(() => {
    loadTokens(0, orderBy)
      .then()
      .catch((reason) => {
        showError(reason);
      });
  }, [orderBy]);

  const manageToken = async (id, action, idx) => {
    let data = { id };
    let res;
    switch (action) {
      case 'delete':
        res = await API.delete(`/api/token/${id}/`);
        break;
      case 'enable':
        data.status = 1;
        res = await API.put('/api/token/?status_only=true', data);
        break;
      case 'disable':
        data.status = 2;
        res = await API.put('/api/token/?status_only=true', data);
        break;
    }
    const { success, message } = res.data;
    if (success) {
      showSuccess('Operation completed successfully!');
      let token = res.data.data;
      let newTokens = [...tokens];
      let realIdx = (activePage - 1) * ITEMS_PER_PAGE + idx;
      if (action === 'delete') {
        newTokens[realIdx].deleted = true;
      } else {
        newTokens[realIdx].status = token.status;
      }
      setTokens(newTokens);
    } else {
      showError(message);
    }
  };

  const searchTokens = async () => {
    if (searchKeyword === '') {
      // if keyword is blank, load files instead.
      await loadTokens(0);
``````javascript
setActivePage(1);
setOrderBy('');
return;
}
setSearching(true);
const res = await API.get(`/api/token/search?keyword=${searchKeyword}`);
const { success, message, data } = res.data;
if (success) {
  setTokens(data);
  setActivePage(1);
} else {
  showError(message);
}
setSearching(false);
};

const handleKeywordChange = async (e, { value }) => {
  setSearchKeyword(value.trim());
};

const sortToken = (key) => {
  if (tokens.length === 0) return;
  setLoading(true);
  let sortedTokens = [...tokens];
  sortedTokens.sort((a, b) => {
    if (!isNaN(a[key])) {
      // If the value is numeric, subtract to sort
      return a[key] - b[key];
    } else {
      // If the value is not numeric, sort as strings
      return ('' + a[key]).localeCompare(b[key]);
    }
  });
  if (sortedTokens[0].id === tokens[0].id) {
    sortedTokens.reverse();
  }
  setTokens(sortedTokens);
  setLoading(false);
};

const handleOrderByChange = (e, { value }) => {
  setOrderBy(value);
  setActivePage(1);
};

return (
  <>
    <Form onSubmit={searchTokens}>
      <Form.Input
        icon='search'
        fluid
        iconPosition='left'
        placeholder='Search for token name ...'
        value={searchKeyword}
        loading={searching}
        onChange={handleKeywordChange}
      />
    </Form>

    <Table basic compact size='small'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            style={{ cursor: 'pointer' }}
            onClick={() => {
              sortToken('name');
            }}
          >
            Name
          </Table.HeaderCell>
          <Table.HeaderCell
            style={{ cursor: 'pointer' }}
            onClick={() => {
              sortToken('status');
            }}
          >
            Status
          </Table.HeaderCell>
          <Table.HeaderCell
            style={{ cursor: 'pointer' }}```Expire Time
Remaining Quota
Creation Time
Used Quota
ActiononClick={async () => {
                            await onCopy('', token.key);
                          }}
                        >
                          Copy
                        </Button>
                        <Dropdown
                          className='button icon'
                          floating
                          options={COPY_OPTIONS.map(option => ({
                            ...option,
                            onClick: async () => {
                              await onCopy(option.value, token.key);
                            }
                          }))}
                          trigger={<></>}
                        />
                      </Button.Group>
                      {' '}
                      <Button.Group color='blue' size={'small'}>
                        <Button
                            size={'small'}
                            positive
                            onClick={() => {     
                              onOpenLink('', token.key);       
                            }}>
                            Chat
                          </Button>
                          <Dropdown   
                            className="button icon"       
                            floating
                            options={OPEN_LINK_OPTIONS.map(option => ({
                              ...option,
                              onClick: async () => {
                                await onOpenLink(option.value, token.key);
                              }
                            }))}       
                            trigger={<></>}   
                          />
                      </Button.Group>
                      {' '}
                      <Popup
                        trigger={
                          <Button size='small' negative>
                            Delete
                          </Button>
                        }
                        on='click'
                        flowinghoverable
                      >
                        <Button
                          negative
                          onClick={() => {
                            manageToken(token.id, 'delete', idx);
                          }}
                        >
                          Delete Token {token.name}
                        </Button>
                      </Popup>
                      <Button
                        size={'small'}
                        onClick={() => {
                          manageToken(
                            token.id,
                            token.status === 1 ? 'disable' : 'enable',
                            idx
                          );
                        }}
                      >
                        {token.status === 1 ? 'Disable' : 'Enable'}
                      </Button>
                      <Button
                        size={'small'}
                        as={Link}
                        to={'/token/edit/' + token.id}
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
            <Table.HeaderCell colSpan='7'>
              <Button size='small' as={Link} to='/token/add' loading={loading}>
                Add New Token
              </Button>
              <Button size='small' onClick={refresh} loading={loading}>Refresh</Button>
              <Dropdown
                placeholder='Sort method'
                selection
                options={[
                  { key: '', text: 'Default sorting', value: '' },
                  { key: 'remain_quota', text: 'Sort by remaining quota', value: 'remain_quota' },
                  { key: 'used_quota', text: 'Sort by used quota', value: 'used_quota' },
                ]}
                value={orderBy}
                onChange={handleOrderByChange}
                style={{ marginLeft: '10px' }}
              />"TokensTable.js

```javascript
            <Pagination
                floated='right'
                activePage={activePage}
                onPageChange={onPaginationChange}
                size='small'
                siblingRange={1}
                totalPages={
                  Math.ceil(tokens.length / ITEMS_PER_PAGE) +
                  (tokens.length % ITEMS_PER_PAGE === 0 ? 1 : 0)
                }
```