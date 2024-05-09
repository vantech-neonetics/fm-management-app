import React, { useEffect, useState } from 'react';
import { API, copy, isAdmin, showError, showSuccess, timestamp2string } from '../helpers';

import { Avatar, Button, Form, Layout, Modal, Select, Space, Spin, Table, Tag } from '@douyinfe/semi-ui';
import { ITEMS_PER_PAGE } from '../constants';
import { renderNumber, renderQuota, stringToColor } from '../helpers/render';
import Paragraph from '@douyinfe/semi-ui/lib/es/typography/paragraph';

const { Header } = Layout;

function renderTimestamp(timestamp) {
  return (<>
    {timestamp2string(timestamp)}
  </>);
}

const MODE_OPTIONS = [{ key: 'all', text: 'All Users', value: 'all' }, { key: 'self', text: 'Current User', value: 'self' }];

const colors = ['amber', 'blue', 'cyan', 'green', 'grey', 'indigo', 'light-blue', 'lime', 'orange', 'pink', 'purple', 'red', 'teal', 'violet', 'yellow'];

function renderType(type) {
  switch (type) {
    case 1:
      return <Tag color="cyan" size="large"> Recharge </Tag>;
    case 2:
      return <Tag color="lime" size="large"> Consumption </Tag>;
    case 3:
      return <Tag color="orange" size="large"> Management </Tag>;
    case 4:
      return <Tag color="purple" size="large"> System </Tag>;
    default:
      return <Tag color="black" size="large"> Unknown </Tag>;
  }
}

function renderIsStream(bool) {
  if (bool) {
    return <Tag color="blue" size="large"> Stream </Tag>;
  } else {
    return <Tag color="purple" size="large"> Non-stream </Tag>;
  }
}

function renderUseTime(type) {
  const time = parseInt(type);
  if (time < 101) {
    return <Tag color="green" size="large"> {time} s </Tag>;
  } else if (time < 300) {
    return <Tag color="orange" size="large"> {time} s </Tag>;
  } else {
    return <Tag color="red" size="large"> {time} s </Tag>;
  }
}

const LogsTable = () => {
  const columns = [{
    title: 'Time', dataIndex: 'timestamp2string'
  }, {
    title: 'Channel',
    dataIndex: 'channel',
    className: isAdmin() ? 'tableShow' : 'tableHiddle',
    render: (text, record, index) => {
      return (isAdminUser ? record.type === 0 || record.type === 2 ? <div>";```
{<Tag color={colors[parseInt(text) % colors.length]} size="large"> {text} </Tag>}
</div> : <></> : <></>);
}
}, {
title: 'User',
dataIndex: 'username',
className: isAdmin() ? 'tableShow' : 'tableHidden',
render: (text, record, index) => {
  return (isAdminUser ? <div>
    <Avatar size="small" color={stringToColor(text)} style={{ marginRight: 4 }}
      onClick={() => showUserInfo(record.user_id)}>
      {typeof text === 'string' && text.slice(0, 1)}
    </Avatar>
    {text}
  </div> : <></>);
}
}, {
title: 'Token', dataIndex: 'token_name', render: (text, record, index) => {
  return (record.type === 0 || record.type === 2 ? <div>
    <Tag color="grey" size="large" onClick={() => {
      copyText(text);
    }}> {text} </Tag>
  </div> : <></>);
}
}, {
title: 'Type', dataIndex: 'type', render: (text, record, index) => {
  return (<div>
    {renderType(text)}
  </div>);
}
}, {
title: 'Model', dataIndex: 'model_name', render: (text, record, index) => {
  return (record.type === 0 || record.type === 2 ? <div>
    <Tag color={stringToColor(text)} size="large" onClick={() => {
      copyText(text);
    }}> {text} </Tag>
  </div> : <></>);
}
},
{
title: 'Hint', dataIndex: 'prompt_tokens', render: (text, record, index) => {
  return (record.type === 0 || record.type === 2 ? <div>
    {<span> {text} </span>}
  </div> : <></>);
}
}, {
title: 'Completion', dataIndex: 'completion_tokens', render: (text, record, index) => {
  return (parseInt(text) > 0 && (record.type === 0 || record.type === 2) ? <div>
    {<span> {text} </span>}
  </div> : <></>);
}
},
```title: 'Cost', dataIndex: 'quota', render: (text, record, index) => {
      return (record.type === 0 || record.type === 2 ? <div>
        {renderQuota(text, 6)}
      </div> : <></>);
    }
  }, {
    title: 'Details', dataIndex: 'content', render: (text, record, index) => {
      return <Paragraph ellipsis={{ rows: 2, showTooltip: { type: 'popover', opts: { style: { width: 240 } } } }}
        style={{ maxWidth: 240 }}>
        {text}
      </Paragraph>;
    }
  }];

  const [logs, setLogs] = useState([]);
  const [showStat, setShowStat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStat, setLoadingStat] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [logCount, setLogCount] = useState(ITEMS_PER_PAGE);
  const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searching, setSearching] = useState(false);
  const [logType, setLogType] = useState(0);
  const isAdminUser = isAdmin();
  let now = new Date();
  // Initialize start_timestamp as yesterday
  const [inputs, setInputs] = useState({
    username: '',
    token_name: '',
    model_name: '',
    start_timestamp: timestamp2string(now.getTime() / 1000 - 86400),
    end_timestamp: timestamp2string(now.getTime() / 1000 + 3600),
    channel: ''
  });
  const { username, token_name, model_name, start_timestamp, end_timestamp, channel } = inputs;

  const [stat, setStat] = useState({
    quota: 0, token: 0
  });

  const handleInputChange = (value, name) => {
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const getLogSelfStat = async () => {
    let localStartTimestamp = Date.parse(start_timestamp) / 1000;
    let localEndTimestamp = Date.parse(end_timestamp) / 1000;
    let res = await API.get(`/api/log/self/stat?type=${logType}&token_name=${token_name}&model_name=${model_name}&start_timestamp=${localStartTimestamp}&end_timestamp=${localEndTimestamp}`);
    const { success, message, data } = res.data;
    if (success)setStat(data);
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
    setLoadingStat(true);
    if (isAdminUser) {
      await getLogStat();
    } else {
      await getLogSelfStat();
    }
    setShowStat(true);
    setLoadingStat(false);
  };

  const showUserInfo = async (userId) => {
    if (!isAdminUser) {
      return;
    }
    const res = await API.get(`/api/user/${userId}`);
    const { success, message, data } = res.data;
    if (success) {
      Modal.info({
        title: 'User Information', content: <div style={{ padding: 12 }}>
          <p>Username: {data.username}</p>
          <p>Balance: {renderQuota(data.quota)}</p>
          <p>Used quota: {renderQuota(data.used_quota)}</p>
          <p>Request count: {renderNumber(data.request_count)}</p>
        </div>, centered: true
      });
    } else {
      showError(message);
    }
  };

  const setLogsFormat = (logs) => {
    for (let i = 0; i < logs.length; i++) {
      logs[i].timestamp2string = timestamp2string(logs[i].created_at);
      logs[i].key = '' + logs[i].id;
    }
    // data.key = '' + data.id
    setLogs(logs);
    setLogCount(logs.length + ITEMS_PER_PAGE);
    // console.log(logCount);
  };

  const loadLogs = async (startIdx, pageSize, logType = 0) => {
    setLoading(true);

    let url = '';
    let localStartTimestamp = Date.parse(start_timestamp) / 1000;
    let localEndTimestamp = Date.parse(end_timestamp) / 1000;
    if (isAdminUser) {url = `/api/log/?p=${startIdx}&page_size=${pageSize}&type=${logType}&username=${username}&token_name=${token_name}&model_name=${model_name}&start_timestamp=${localStartTimestamp}&end_timestamp=${localEndTimestamp}&channel=${channel}`;
    } else {
      url = `/api/log/self/?p=${startIdx}&page_size=${pageSize}&type=${logType}&token_name=${token_name}&model_name=${model_name}&start_timestamp=${localStartTimestamp}&end_timestamp=${localEndTimestamp}`;
    }
    const res = await API.get(url);
    const { success, message, data } = res.data;
    if (success) {
      if (startIdx === 0) {
        setLogsFormat(data);
      } else {
        let newLogs = [...logs];
        newLogs.splice(startIdx * pageSize, data.length, ...data);
        setLogsFormat(newLogs);
      }
    } else {
      showError(message);
    }
    setLoading(false);
  };

  const pageData = logs.slice((activePage - 1) * pageSize, activePage * pageSize);

  const handlePageChange = page => {
    setActivePage(page);
    if (page === Math.ceil(logs.length / pageSize) + 1) {
      // In this case we have to load more data and then append them.
      loadLogs(page - 1, pageSize).then(r => {
      });
    }
  };

  const handlePageSizeChange = async (size) => {
    localStorage.setItem('page-size', size + '');
    setPageSize(size);
    setActivePage(1);
    loadLogs(0, size)
      .then()
      .catch((reason) => {
        showError(reason);
      });
  };

  const refresh = async (localLogType) => {
    // setLoading(true);
    setActivePage(1);
    await loadLogs(0, pageSize, localLogType);
  };

  const copyText = async (text) => {
    if (await copy(text)) {
      showSuccess('Copied: ' + text);
    } else {
      // setSearchKeyword(text);
      Modal.error({ title: 'Cannot copy to clipboard, please copy manually', content: text });
    }
  };

  useEffect(() => {
    // console.log('default effect')
    const localPageSize = parseInt(localStorage.getItem('page-size')) || ITEMS_PER_PAGE;
    setPageSize(localPageSize);
    loadLogs(0, localPageSize)
      .then()```
.catch((reason) => {
showError(reason);
});
}, []);

const searchLogs = async () => {
if (searchKeyword === '') {
// if keyword is blank, load files instead.
await loadLogs(0, pageSize);
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

return (<>
<Layout>
<Header>
<Spin spinning={loadingStat}>
<h3>Usage Details (Total Consumption Quota:
<span onClick={handleEyeClick} style={{
cursor: 'pointer', color: 'gray'
}}>{showStat ? renderQuota(stat.quota) : 'Click to view'}</span>
)
</h3>
</Spin>
</Header>
<Form layout="horizontal" style={{ marginTop: 10 }}>
<>
<Form.Input field="token_name" label="Token Name" style={{ width: 176 }} value={token_name}
placeholder={'Optional'} name="token_name"
onChange={value => handleInputChange(value, 'token_name')} />
<Form.Input field="model_name" label="Model Name" style={{ width: 176 }} value={model_name}
placeholder="Optional"
name="model_name"
onChange={value => handleInputChange(value, 'model_name')} />
<Form.DatePicker field="start_timestamp" label="Start Time" style={{ width: 272 }}
initValue={start_timestamp}
value={start_timestamp} type="dateTime"
name="start_timestamp"
onChange={value => handleInputChange(value, 'start_timestamp')} />
<Form.DatePicker field="end_timestamp" fluid label="End Time" style={{ width: 272 }}
initValue={end_timestamp}
value={end_timestamp} type="dateTime"
name="end_timestamp"
onChange={value => handleInputChange(value, 'end_timestamp')} />
{isAdminUser && <>".
```<Form.Input field="channel" label="Channel ID" style={{ width: 176 }} value={channel}
              placeholder="Optional value" name="channel"
              onChange={value => handleInputChange(value, 'channel')} />
            <Form.Input field="username" label="Username" style={{ width: 176 }} value={username}
              placeholder={'Optional value'} name="username"
              onChange={value => handleInputChange(value, 'username')} />
          </>}
          <Form.Section>
            <Button label="Search" type="primary" htmlType="submit" className="btn-margin-right"
              onClick={refresh} loading={loading}>Search</Button>
          </Form.Section>
        </>
      </Form>
      <Table style={{ marginTop: 5 }} columns={columns} dataSource={pageData} pagination={{
        currentPage: activePage,
        pageSize: pageSize,
        total: logCount,
        pageSizeOpts: [10, 20, 50, 100],
        showSizeChanger: true,
        onPageSizeChange: (size) => {
          handlePageSizeChange(size).then();
        },
        onPageChange: handlePageChange
      }} />
      <Select defaultValue="0" style={{ width: 120 }} onChange={(value) => {
        setLogType(parseInt(value));
        refresh(parseInt(value)).then();
      }}>
        <Select.Option value="0">All</Select.Option>
        <Select.Option value="1">Recharge</Select.Option>
        <Select.Option value="2">Consumption</Select.Option>
        <Select.Option value="3">Management</Select.Option>
        <Select.Option value="4">System</Select.Option>
      </Select>
    </Layout>
  </>);
};

export default LogsTable;