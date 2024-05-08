Function to handle input change applies to the LogsTable component.```js
setInputs((inputs) => ({ ...inputs, [name]: value }));
};

const getLogSelfStat = async () => {
  let localStartTimestamp = Date.parse(start_timestamp) / 1000;
  let localEndTimestamp = Date.parse(end_timestamp) / 1000;
  let res = await API.get(`/api/log/self/stat?type=${logType}&token_name=${token_name}&model_name=${model_name}&start_timestamp=${localStartTimestamp}&end_timestamp=${localEndTimestamp}`);
  const { success, message, data } = res.data;
  if (success) {
    setStat(data);
  } else {
    showError(message);
  }
};

const getLogStat = async () => {
  let localStartTimestamp = Date.parse(start_timestamp) / 1000;
  let localEndTimestamp = Date.parse(end_timestamp) / 1000;
  let res = await API.get(`/api/log/stat?type=${logType}&username=${username}&token_name=${token_name}&model_name=${model_name}&start_timestamp=${localStartTimestamp}&end_timestamp=${localEndTimestamp}&channel=${channel}`);
  const { success, message, data } = res.data;
  if (success) {
    setStat(data);
  } else {
    showError(message);
  }
};

const handleEyeClick = async () => {
  if (!showStat) {
    if (isAdminUser) {
      await getLogStat();
    } else {
      await getLogSelfStat();
    }
  }
  setShowStat(!showStat);
};

const loadLogs = async (startIdx) => {
  let url = '';
  let localStartTimestamp = Date.parse(start_timestamp) / 1000;
  let localEndTimestamp = Date.parse(end_timestamp) / 1000;
  if (isAdminUser) {
    url = `/api/log/?p=${startIdx}&type=${logType}&username=${username}&token_name=${token_name}&model_name=${model_name}&start_timestamp=${localStartTimestamp}&end_timestamp=${localEndTimestamp}&channel=${channel}`;
  } else {
    url = `/api/log/self/?p=${startIdx}&type=${logType}&token_name=${token_name}&model_name=${model_name}&start_timestamp=${localStartTimestamp}&end_timestamp=${localEndTimestamp}`;
  }
  const res = await API.get(url);
  const { success, message, data } = res.data;
  if (success) {
``````javascript
if (startIdx === 0) {
        setLogs(data);
      } else {
        let newLogs = [...logs];
        newLogs.splice(startIdx * ITEMS_PER_PAGE, data.length, ...data);
        setLogs(newLogs);
      }
    } else {
      showError(message);
    }
    setLoading(false);
  };

  const onPaginationChange = (e, { activePage }) => {
    (async () => {
      if (activePage === Math.ceil(logs.length / ITEMS_PER_PAGE) + 1) {
        // In this case we have to load more data and then append them.
        await loadLogs(activePage - 1);
      }
      setActivePage(activePage);
    })();
  };

  const refresh = async () => {
    setLoading(true);
    setActivePage(1);
    await loadLogs(0);
  };

  useEffect(() => {
    refresh().then();
  }, [logType]);

  const searchLogs = async () => {
    if (searchKeyword === '') {
      // if keyword is blank, load files instead.
      await loadLogs(0);
      setActivePage(1);
      return;
    }
    setSearching(true);
    const res = await API.get(`/api/log/self/search?keyword=${searchKeyword}`);
    const { success, message, data } = res.data;
    if (success) {
      setLogs(data);
      setActivePage(1);
    } else {
      showError(message);
    }
    setSearching(false);
  };

  const handleKeywordChange = async (e, { value }) => {
    setSearchKeyword(value.trim());
  };

  const sortLog = (key) => {
    if (logs.length === 0) return;
    setLoading(true);
    let sortedLogs = [...logs];
    if (typeof sortedLogs[0][key] === 'string') {
      sortedLogs.sort((a, b) => {
        return ('' + a[key]).localeCompare(b[key]);
      });
    } else {
      sortedLogs.sort((a, b) => {
        if (a[key] === b[key]) return 0;
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
      });
    }
    if (sortedLogs[0].id === logs[0].id) {
      sortedLogs.reverse();
    }
    setLogs(sortedLogs);
    setLoading(false);
  };

  return (
    <>
      <Segment>
        <Header as='h3'>
          Logs (Total Quota: {showStat && renderQuota(stat.quota)}".
```{!showStat && <span onClick={handleEyeClick} style={{ cursor: 'pointer', color: 'gray' }}>Click to View</span>}
          )
        </Header>
        <Form>
          <Form.Group>
            <Form.Input fluid label={'Token Name'} width={3} value={token_name}
                        placeholder={'Optional'} name='token_name' onChange={handleInputChange} />
            <Form.Input fluid label='Model Name' width={3} value={model_name} placeholder='Optional'
                        name='model_name'
                        onChange={handleInputChange} />
            <Form.Input fluid label='Start Time' width={4} value={start_timestamp} type='datetime-local'
                        name='start_timestamp'
                        onChange={handleInputChange} />
            <Form.Input fluid label='End Time' width={4} value={end_timestamp} type='datetime-local'
                        name='end_timestamp'
                        onChange={handleInputChange} />
            <Form.Button fluid label='Action' width={2} onClick={refresh}>Search</Form.Button>
          </Form.Group>
          {
            isAdminUser && <>
              <Form.Group>
                <Form.Input fluid label={'Channel ID'} width={3} value={channel}
                            placeholder='Optional' name='channel'
                            onChange={handleInputChange} />
                <Form.Input fluid label={'Username'} width={3} value={username}
                            placeholder={'Optional'} name='username'
                            onChange={handleInputChange} />

              </Form.Group>
            </>
          }
        </Form>
        <Table basic compact size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  sortLog('created_time');
                }}
                width={3}
              >
                Time
              </Table.HeaderCell>
              {
                isAdminUser && <Table.HeaderCell"Channels
User
Token
Type
Model
Prompt
Completion"sortLog('quota');
                }}
                width={1}
              >
                Quota
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  sortLog('content');
                }}
                width={isAdminUser ? 4 : 6}
              >
                Details
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {logs
              .slice(
                (activePage - 1) * ITEMS_PER_PAGE,
                activePage * ITEMS_PER_PAGE
              )
              .map((log, idx) => {
                if (log.deleted) return <></>;
                return (
                  <Table.Row key={log.id}>
                    <Table.Cell>{renderTimestamp(log.created_at)}</Table.Cell>
                    {
                      isAdminUser && (
                        <Table.Cell>{log.channel ? <Label basic>{log.channel}</Label> : ''}</Table.Cell>
                      )
                    }
                    {
                      isAdminUser && (
                        <Table.Cell>{log.username ? <Label>{log.username}</Label> : ''}</Table.Cell>
                      )
                    }
                    <Table.Cell>{log.token_name ? <Label basic>{log.token_name}</Label> : ''}</Table.Cell>
                    <Table.Cell>{renderType(log.type)}</Table.Cell>
                    <Table.Cell>{log.model_name ? <Label basic>{log.model_name}</Label> : ''}</Table.Cell>
                    <Table.Cell>{log.prompt_tokens ? log.prompt_tokens : ''}</Table.Cell>
                    <Table.Cell>{log.completion_tokens ? log.completion_tokens : ''}</Table.Cell>
                    <Table.Cell>{log.quota ? renderQuota(log.quota, 6) : ''}</Table.Cell>
                    <Table.Cell>{log.content}</Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>

          <Table.Footer>"```javascript
<Select
   placeholder='Select detailed classification'
   options={LOG_OPTIONS}
   style={{ marginRight: '8px' }}
   name='logType'
   value={logType}
   onChange={(e, { name, value }) => {
      setLogType(value);
   }}
/>
<Button size='small' onClick={refresh} loading={loading}>Refresh</Button>
```