import React, { useEffect, useState } from 'react';
import { API, copy, isAdmin, showError, showSuccess, timestamp2string } from '../helpers';

import { Banner, Button, Form, ImagePreview, Layout, Modal, Progress, Table, Tag, Typography } from '@douyinfe/semi-ui';
import { ITEMS_PER_PAGE } from '../constants';


const colors = ['amber', 'blue', 'cyan', 'green', 'grey', 'indigo',
  'light-blue', 'lime', 'orange', 'pink',
  'purple', 'red', 'teal', 'violet', 'yellow'
];

function renderType(type) {
  switch (type) {
    case 'IMAGINE':
      return <Tag color="blue" size="large">Drawing</Tag>;
    case 'UPSCALE':
      return <Tag color="orange" size="large">Zoom</Tag>;
    case 'VARIATION':
      return <Tag color="purple" size="large">Transformation</Tag>;
    case 'HIGH_VARIATION':
      return <Tag color="purple" size="large">Intense Transformation</Tag>;
    case 'LOW_VARIATION':
      return <Tag color="purple" size="large">Weak Transformation</Tag>;
    case 'PAN':
      return <Tag color="cyan" size="large">Pan</Tag>;
    case 'DESCRIBE':
      return <Tag color="yellow" size="large">Image and Text</Tag>;
    case 'BLEND':
      return <Tag color="lime" size="large">Image Blending</Tag>;
    case 'SHORTEN':
      return <Tag color="pink" size="large">Abbreviation</Tag>;
    case 'REROLL':
      return <Tag color="indigo" size="large">Redraw</Tag>;
    case 'INPAINT':
      return <Tag color="violet" size="large">Partial Redraw - Submit</Tag>;
    case 'ZOOM':
      return <Tag color="teal" size="large">Zoom</Tag>;
    case 'CUSTOM_ZOOM':
      return <Tag color="teal" size="large">Custom Zoom - Submit</Tag>;
    case 'MODAL':
      return <Tag color="green" size="large">Modal Handling</Tag>;
    case 'SWAP_FACE':
      return <Tag color="light-green" size="large">Face Swap</Tag>;
    default:
      return <Tag color="white" size="large">Unknown</Tag>;
  }
}


function renderCode(code) {
  switch (code) {
    case 1:
      return <Tag color="green" size="large">Submitted</Tag>;
    case 21:
      return <Tag color="lime" size="large">Waiting</Tag>;
    case 22:
      return <Tag color="orange" size="large">Duplicate Submission</Tag>;
    case 0:Ensure all cases are string literals by adding quotes.
Get the year.
Translate from seconds to milliseconds.
Get the month, add 1 since it starts from 0, and ensure two digits.
Get the date, and ensure two digits.
Get the hour, and ensure two digits.
Get the minute, and ensure two digits.
Get the second, and ensure two digits.
Format for output.```jsx
copyText(text); // Assume copyText is a function for text copying
            }}> {text} </Tag>
          </div>

        );
      }
    },
    {
      title: 'Type',
      dataIndex: 'action',
      render: (text, record, index) => {
        return (
          <div>
            {renderType(text)}
          </div>
        );
      }
    },
    {
      title: 'Task ID',
      dataIndex: 'mj_id',
      render: (text, record, index) => {
        return (
          <div>
            {text}
          </div>
        );
      }
    },
    {
      title: 'Submission Result',
      dataIndex: 'code',
      className: isAdmin() ? 'tableShow' : 'tableHiddle',
      render: (text, record, index) => {
        return (
          <div>
            {renderCode(text)}
          </div>
        );
      }
    },
    {
      title: 'Task Status',
      dataIndex: 'status',
      className: isAdmin() ? 'tableShow' : 'tableHiddle',
      render: (text, record, index) => {
        return (
          <div>
            {renderStatus(text)}
          </div>
        );
      }
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      render: (text, record, index) => {
        return (
          <div>
            {
              // Convert, for example, 100% to the number 100, return 0 if text is undefined
              <Progress stroke={record.status === 'FAILURE' ? 'var(--semi-color-warning)' : null}
                        percent={text ? parseInt(text.replace('%', '')) : 0} showInfo={true}
                        aria-label="drawing progress" />
            }
          </div>
        );
      }
    },
    {
      title: 'Result Image',
      dataIndex: 'image_url',
      render: (text, record, index) => {
        if (!text) {
          return 'None';
        }
        return (
          <Button
            onClick={() => {
              setModalImageUrl(text);  // Update image URL state
              setIsModalOpenurl(true);    // Open modal
            }}
          >
            View Image
          </Button>
        );
      }
    },
    {
      title: 'Prompt',
      dataIndex: 'prompt',
      render: (text, record, index) => ".
```// If text is undefined, return alternative text, such as an empty string '' or others
if (!text) {
  return 'None';
}

return (
  <Typography.Text
    ellipsis={{ showTooltip: true }}
    style={{ width: 100 }}
    onClick={() => {
      setModalContent(text);
      setIsModalOpen(true);
    }}
  >
    {text}
  </Typography.Text>
);
},
{
  title: 'Prompt (English)',
  dataIndex: 'prompt_en',
  render: (text, record, index) => {
    // If text is undefined, return alternative text, such as an empty string '' or others
    if (!text) {
      return 'None';
    }

    return (
      <Typography.Text
        ellipsis={{ showTooltip: true }}
        style={{ width: 100 }}
        onClick={() => {
          setModalContent(text);
          setIsModalOpen(true);
        }}
      >
        {text}
      </Typography.Text>
    );
  }
},
{
  title: 'Failure Reason',
  dataIndex: 'fail_reason',
  render: (text, record, index) => {
    // If text is undefined, return alternative text, such as an empty string '' or others
    if (!text) {
      return 'None';
    }

    return (
      <Typography.Text
        ellipsis={{ showTooltip: true }}
        style={{ width: 100 }}
        onClick={() => {
          setModalContent(text);
          setIsModalOpen(true);
        }}
      >
        {text}
      </Typography.Text>
    );
  }
}

];

const [logs, setLogs] = useState([]);
const [loading, setLoading] = useState(true);
const [activePage, setActivePage] = useState(1);
const [logCount, setLogCount] = useState(ITEMS_PER_PAGE);
const [logType, setLogType] = useState(0);
const isAdminUser = isAdmin();
const [isModalOpenurl, setIsModalOpenurl] = useState(false);
const [showBanner, setShowBanner] = useState(false);

// Define the state and update function for modal box image URL
const [modalImageUrl, setModalImageUrl] = useState('');
let now = new Date();
// Initialize start_timestamp to the previous day
const [inputs, setInputs] = useState({".```javascript
// Get default values for inputs
// Initialize channel_id, mj_id, start_timestamp, and end_timestamp
// Assign values to stat object with quota and token properties
// Define a function to handle input changes
// Set timestamp and key properties for each log item in logs array
// Load logs data with specified start index
// Generate data for the current page based on ITEMS_PER_PAGE
// Handle page change event, load more data if necessary
``````
const refresh = async () => {
    // setLoading(true);
    setActivePage(1);
    await loadLogs(0);
  };

  const copyText = async (text) => {
    if (await copy(text)) {
      showSuccess('Copied: ' + text);
    } else {
      // setSearchKeyword(text);
      Modal.error({ title: 'Unable to copy to clipboard, please copy manually', content: text });
    }
  };

  useEffect(() => {
    refresh().then();
  }, [logType]);

  useEffect(() => {
    const mjNotifyEnabled = localStorage.getItem('mj_notify_enabled');
    if (mjNotifyEnabled !== 'true') {
      setShowBanner(true);
    }
  }, []);

  return (
    <>

      <Layout>
        {isAdminUser && showBanner ? <Banner
          type="info"
          description="Midjourney callbacks are currently disabled, some projects may not receive drawing results, you can enable it in the operation settings."
        /> : <></>
        }
        <Form layout="horizontal" style={{ marginTop: 10 }}>
          <>
            <Form.Input field="channel_id" label="Channel ID" style={{ width: 176 }} value={channel_id}
                        placeholder={'Optional value'} name="channel_id"
                        onChange={value => handleInputChange(value, 'channel_id')} />
            <Form.Input field="mj_id" label="Task ID" style={{ width: 176 }} value={mj_id}
                        placeholder="Optional value"
                        name="mj_id"
                        onChange={value => handleInputChange(value, 'mj_id')} />
            <Form.DatePicker field="start_timestamp" label="Start Time" style={{ width: 272 }}
                             initValue={start_timestamp}
                             value={start_timestamp} type="dateTime"
                             name="start_timestamp"
                             onChange={value => handleInputChange(value, 'start_timestamp')} />
            <Form.DatePicker field="end_timestamp" fluid label="End Time" style={{ width: 272 }}
                             initValue={end_timestamp}
                             value={end_timestamp} type="dateTime"
                             name="end_timestamp"".
``````jsx
          <Button label="Search" type="primary" htmlType="submit" className="btn-margin-right"
                      onClick={refresh}>Search</Button>
          <Table style={{ marginTop: 5 }} columns={columns} dataSource={pageData} pagination={{
          currentPage: activePage,
          pageSize: ITEMS_PER_PAGE,
          total: logCount,
          pageSizeOpts: [10, 20, 50, 100],
          onPageChange: handlePageChange
        }} loading={loading} />
          bodyStyle={{ height: '400px', overflow: 'auto' }} // Set style for modal content area
          width={800} // Set modal width
          <p style={{ whiteSpace: 'pre-line' }}>{modalContent}</p>
```