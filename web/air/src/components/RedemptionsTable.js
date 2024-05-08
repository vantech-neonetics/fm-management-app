Import React, {useEffect, useState} from 'react';
Import {API, copy, showError, showSuccess, timestamp2string} from '../helpers';

Import {ITEMS_PER_PAGE} from '../constants';
Import {renderQuota} from '../helpers/render';
Import {Button, Form, Modal, Popconfirm, Popover, Table, Tag} from '@douyinfe/semi-ui';
Import EditRedemption from '../pages/Redemption/EditRedemption';

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
      return <Tag color="green" size="large">Unused</Tag>;
    case 2:
      return <Tag color="red" size="large">Disabled</Tag>;
    case 3:
      return <Tag color="grey" size="large">Used</Tag>;
    default:
      return <Tag color="black" size="large">Unknown Status</Tag>;
  }
}

const RedemptionsTable = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record, index) => {
        return (
          <div>
            {renderStatus(text)}
          </div>
        );
      }
    },
    {
      title: 'Quota',
      dataIndex: 'quota',
      render: (text, record, index) => {
        return (
          <div>
            {renderQuota(parseInt(text))}
          </div>
        );
      }
    },
    {
      title: 'Creation Time',
      dataIndex: 'created_time',
      render: (text, record, index) => {
        return (
          <div>
            {renderTimestamp(text)}
          </div>
        );
      }
    },
    // {
    //   title: 'Redeemer ID',
    //   dataIndex: 'used_user_id',
    //   render: (text, record, index) => {
    //     return (
    //       <div>
    //         {text === 0 ? 'None' : text}
    //       </div>
    //     );
    //   }
    // },
    {
      title: '',
      dataIndex: 'operate',
      render: (text, record, index) => (
        <div>
          <Popover
            content=".""record.key
            }
            style={{ padding: 20 }}
            position="top"
          >
            <Button theme="light" type="tertiary" style={{ marginRight: 1 }}>View</Button>
          </Popover>
          <Button theme="light" type="secondary" style={{ marginRight: 1 }}
                  onClick={async (text) => {
                    await copyText(record.key);
                  }}
          >Copy</Button>
          <Popconfirm
            title="Are you sure you want to delete this redemption code?"
            content="This action is irreversible"
            okType={'danger'}
            position={'left'}
            onConfirm={() => {
              manageRedemption(record.id, 'delete', record).then(
                () => {
                  removeRecord(record.key);
                }
              );
            }}
          >
            <Button theme="light" type="danger" style={{ marginRight: 1 }}>Delete</Button>
          </Popconfirm>
          {
            record.status === 1 ?
              <Button theme="light" type="warning" style={{ marginRight: 1 }} onClick={
                async () => {
                  manageRedemption(
                    record.id,
                    'disable',
                    record
                  );
                }
              }>Disable</Button> :
              <Button theme="light" type="secondary" style={{ marginRight: 1 }} onClick={
                async () => {
                  manageRedemption(
                    record.id,
                    'enable',
                    record
                  );
                }
              } disabled={record.status === 3}>Enable</Button>
          }
          <Button theme="light" type="tertiary" style={{ marginRight: 1 }} onClick={
            () => {
              setEditingRedemption(record);
              setShowEdit(true);
            }
          } disabled={record.status !== 1}>Edit</Button>
        </div>
      )
    }
  ];

  const [redemptions, setRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);".- Comments translated:
// Set the record format of redemptions
// Loop through each redemption to assign a unique key
// Set the token count based on the length of redemptions and current active page
// Load redemptions data from the API
// Remove a record based on its key
// Copy text to the clipboard and show a success message if successful

- Please note that variables, functions, and keywords remain in English as they are.Instructions: Translate the following content to English
while maintaining the original formatting:
"Modal.error({ title: 'Unable to copy to clipboard, please copy manually', content: text });    }
  };

  const onPaginationChange = (e, { activePage }) => {
    (async () => {
      if (activePage === Math.ceil(redemptions.length / ITEMS_PER_PAGE) + 1) {
        // In this case we have to load more data and then append them.
        await loadRedemptions(activePage - 1);
      }
      setActivePage(activePage);
    })();
  };

  useEffect(() => {
    loadRedemptions(0)
      .then()
      .catch((reason) => {
        showError(reason);
      });
  }, []);

  const refresh = async () => {
    await loadRedemptions(activePage - 1);
  };

  const manageRedemption = async (id, action, record) => {
    let data = { id };
    let res;
    switch (action) {
      case 'delete':
        res = await API.delete(`/api/redemption/${id}/`);
        break;
      case 'enable':
        data.status = 1;
        res = await API.put('/api/redemption/?status_only=true', data);
        break;
      case 'disable':
        data.status = 2;
        res = await API.put('/api/redemption/?status_only=true', data);
        break;
    }
    const { success, message } = res.data;
    if (success) {
      showSuccess('Operation completed successfully!');
      let redemption = res.data.data;
      let newRedemptions = [...redemptions];
      // let realIdx = (activePage - 1) * ITEMS_PER_PAGE + idx;
      if (action === 'delete') {

      } else {
        record.status = redemption.status;
      }
      setRedemptions(newRedemptions);
    } else {
      showError(message);
    }
  };

  const searchRedemptions = async () => {
    if (searchKeyword === '') {
      // if keyword is blank, load files instead.
      await loadRedemptions(0);
      setActivePage(1);
      return;
    }
    setSearching(true);
    const res = await API.get(`/api/redemption/search?keyword=${searchKeyword}`);
    const { success, message, data } = res.data;
    if (success) {
      setRedemptions(data);
      setActivePage(1);
    } else {
      showError(message);
    }
    setSearching(false);
  };".```javascript
// In this case we have to load more data and then append them.
```// pageSizeOptions: [10, 20, 50, 100],
formatPageText: (page) => `Showing ${page.currentStart} - ${page.currentEnd} items, total ${redemptions.length} items`,
// onPageSizeChange: (size) => {
//   setPageSize(size);
//   setActivePage(1);
// },
onPageChange: handlePageChange
}} loading={loading} rowSelection={rowSelection} onRow={handleRow}>
</Table>
<Button theme="light" type="primary" style={{ marginRight: 8 }} onClick={
  () => {
    setEditingRedemption({
      id: undefined
    });
    setShowEdit(true);
  }
}>Add Redemption Code</Button>
<Button label="Copy Selected Redemption Code" type="warning" onClick={
  async () => {
    if (selectedKeys.length === 0) {
      showError('Please select at least one redemption code!');
      return;
    }
    let keys = '';
    for (let i = 0; i < selectedKeys.length; i++) {
      keys += selectedKeys[i].name + '    ' + selectedKeys[i].key + '\n';
    }
    await copyText(keys);
  }
}>Copy Selected Redemption Code to Clipboard</Button>
</>;
};

export default RedemptionsTable;