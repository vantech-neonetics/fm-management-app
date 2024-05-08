import React, {useEffect, useState} from 'react';
import {API, isMobile, showError, showInfo, showSuccess} from '../../helpers';
import {renderNumber, renderQuota} from '../../helpers/render';
import {Col, Layout, Row, Typography, Card, Button, Form, Divider, Space, Modal} from "@douyinfe/semi-ui";
import Title from "@douyinfe/semi-ui/lib/es/typography/title";
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { Link } from 'react-router-dom';

const TopUp = () => {
    const [redemptionCode, setRedemptionCode] = useState('');
    const [topUpCode, setTopUpCode] = useState('');
    const [topUpCount, setTopUpCount] = useState(10);
    const [minTopupCount, setMinTopUpCount] = useState(1);
    const [amount, setAmount] = useState(0.0);
    const [minTopUp, setMinTopUp] = useState(1);
    const [topUpLink, setTopUpLink] = useState('');
    const [enableOnlineTopUp, setEnableOnlineTopUp] = useState(false);
    const [userQuota, setUserQuota] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const [payWay, setPayWay] = useState('');

    const topUp = async () => {
        if (redemptionCode === '') {
            showInfo('Please enter the redemption code!')
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await API.post('/api/user/topup', {
                key: redemptionCode
            });
            const {success, message, data} = res.data;
            if (success) {
                showSuccess('Redeemed successfully!');
                Modal.success({title: 'Redeemed successfully!', content: 'Successfully redeemed quota: ' + renderQuota(data), centered: true});
                setUserQuota((quota) => {
                    return quota + data;
                });
                setRedemptionCode('');
            } else {
                showError(message);
            }
        } catch (err) {
            showError('Request failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const openTopUpLink = () => {format: "if (!topUpLink) {
            showError('Super administrators have not set up the recharge link!');
            return;
        }
        window.open(topUpLink, '_blank');
    };

    const preTopUp = async (payment) => {
        if (!enableOnlineTopUp) {
            showError('Administrator has not enabled online top-up!');
            return;
        }
        if (amount === 0) {
            await getAmount();
        }
        
        if (topUpCount < minTopUp) {
            showInfo('Top-up count cannot be less than' + minTopUp);
            return;
        }
        
        setPayWay(payment)
        setOpen(true);
    }

    const onlineTopUp = async () => {
        if (amount === 0) {
            await getAmount();
        }
        
        if (topUpCount < minTopUp) {
            showInfo('Top-up count cannot be less than' + minTopUp);
            return;
        }
        
        setOpen(false);
        
        try {
            const res = await API.post('/api/user/pay', {
                amount: parseInt(topUpCount),
                top_up_code: topUpCode,
                payment_method: payWay
            });
            
            if (res !== undefined) {
                const {message, data} = res.data;
                // showInfo(message);
                
                if (message === 'success') {
                    let params = data
                    let url = res.data.url
                    let form = document.createElement('form')
                    form.action = url
                    form.method = 'POST'
                    
                    // Determine if it is Safari browser
                    let isSafari = navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 1;
                    if (!isSafari) {
                        form.target = '_blank'
                    }
                    
                    for (let key in params) {
                        let input = document.createElement('input')
                        input.type = 'hidden'
                        input.name = key
                        input.value = params[key]
                        form.appendChild(input)
                    }
                    document.body.appendChild(form)".Instructions: Translate the following Chinese text to English 
while maintaining the original formatting: 
```javascript
                    // setTopUpCount(parseInt(res.data.count));
                    // setAmount(parseInt(data));
                }
            } else {
                showError(res);
            }
        } catch (err) {
            console.log(err);
        } finally {
        }
    }
    const getUserQuota = async () => {
        let res = await API.get(`/api/user/self`);
        const {success, message, data} = res.data;
        if (success) {
            setUserQuota(data.quota);
        } else {
            showError(message);
        }
    }
    useEffect(() => {
        let status = localStorage.getItem('status');
        if (status) {
            status = JSON.parse(status);
            if (status.top_up_link) {
                setTopUpLink(status.top_up_link);
            }
            if (status.min_topup) {
                setMinTopUp(status.min_topup);
            }
            if (status.enable_online_topup) {
                setEnableOnlineTopUp(status.enable_online_topup);
            }
        }
        getUserQuota().then();
    }, []);
    const renderAmount = () => {
        // console.log(amount);
        return amount + '元';
    }
    const getAmount = async (value) => {
        if (value === undefined) {
            value = topUpCount;
        }
        try {
            const res = await API.post('/api/user/amount', {
                amount: parseFloat(value),
                top_up_code: topUpCode
            });
            if (res !== undefined) {
                const {message, data} = res.data;
                // showInfo(message);
                if (message === 'success') {
                    setAmount(parseFloat(data));
                } else {
                    showError(data);
                    // setTopUpCount(parseInt(res.data.count));
                    // setAmount(parseInt(data));
                }
```
Translate: 
```javascript
                    // Set the top-up count using the integer value from res.data.count.
                    // Set the amount using the integer value from data.
                }
            } else {
                showError(res);
            }
        } catch (err) {
            console.log(err);
        } finally {
        }
    }
    const getUserQuota = async () => {
        let res = await API.get(`/api/user/self`);
        const {success, message, data} = res.data;
        if (success) {
            setUserQuota(data.quota);
        } else {
            showError(message);
        }
    }
    useEffect(() => {
        let status = localStorage.getItem('status');
        if (status) {
            status = JSON.parse(status);
            if (status.top_up_link) {
                setTopUpLink(status.top_up_link);
            }
            if (status.min_topup) {
                setMinTopUp(status.min_topup);
            }
            if (status.enable_online_topup) {
                setEnableOnlineTopUp(status.enable_online_topup);
            }
        }
        getUserQuota().then();
    }, []);
    const renderAmount = () => {
        // console.log(amount);
        return amount + '元';
    }
    const getAmount = async (value) => {
        if (value === undefined) {
            value = topUpCount;
        }
        try {
            const res = await API.post('/api/user/amount', {
                amount: parseFloat(value),
                top_up_code: topUpCode
            });
            if (res !== undefined) {
                const {message, data} = res.data;
                // showInfo(message);
                if (message === 'success') {
                    setAmount(parseFloat(data));
                } else {
                    showError(data);
                    // setTopUpCount(parseInt(res.data.count));
                    // setAmount(parseInt(data));
                }
```Instructions: Translate the following Chinese text to English 
while maintaining the original formatting: "} else {
                showError(res);
            }
        } catch (err) {
            console.log(err);
        } finally {
        }
    }

    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <div>
            <Layout>
                <Layout.Header>
                    <h3>Top-up Amount</h3>
                </Layout.Header>
                <Layout.Content>
                    <Modal
                        title="Confirm Top-up"
                        visible={open}
                        onOk={onlineTopUp}
                        onCancel={handleCancel}
                        maskClosable={false}
                        size={'small'}
                        centered={true}
                    >
                        <p>Top-up amount: {topUpCount}$</p>
                        <p>Actual amount paid: {renderAmount()}</p>
                        <p>Do you confirm the top-up?</p>
                    </Modal>
                    <div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
                        <Card
                            style={{width: '500px', padding: '20px'}}
                        >
                            <Title level={3} style={{textAlign: 'center'}}>Balance {renderQuota(userQuota)}</Title>
                            <div style={{marginTop: 20}}>
                                <Divider>
                                    Redeem Balance
                                </Divider>
                                <Form>
                                    <Form.Input
                                        field={'redemptionCode'}
                                        label={'Redemption Code'}
                                        placeholder='Redemption Code'
                                        name='redemptionCode'
                                        value={redemptionCode}
                                        onChange={(value) => {
                                            setRedemptionCode(value);
                                        }}
                                    />".<Button type={'primary'} theme={'solid'} onClick={openTopUpLink}>
    Get Redemption Code
</Button> : null
<Button type={"warning"} theme={'solid'} onClick={topUp}
        disabled={isSubmitting}>
    {isSubmitting ? 'Redeeming...' : 'Redeem'}
</Button>

<Divider>
    Online Top-up
</Divider>
<Form.Input
    disabled={!enableOnlineTopUp}
    field={'redemptionCount'}
    label={'Amount Paid: ' + renderAmount()}
    placeholder={'Top-up amount, minimum ' + minTopUp + '$'}
    name='redemptionCount'
    type={'number'}
    value={topUpCount}
    suffix={'$'}
    min={minTopUp}
    defaultValue={minTopUp}
    max={100000}
    onChange={async (value) => {
        if (value < 1) {
            value = 1;
        }Instructions: Translate the following Chinese text to English 
while maintaining the original formatting: "if (value > 100000) {
                                                value = 100000;
                                            }
                                            setTopUpCount(value);
                                            await getAmount(value);
                                        }}
                                    />
                                    <Space>
                                        <Button type={'primary'} theme={'solid'} onClick={
                                            async () => {
                                                preTopUp('zfb')
                                            }
                                        }>
                                            Alipay
                                        </Button>
                                        <Button style={{backgroundColor: 'rgba(var(--semi-green-5), 1)'}}
                                                type={'primary'}
                                                theme={'solid'} onClick={
                                            async () => {
                                                preTopUp('wx')
                                            }
                                        }>
                                            WeChat
                                        </Button>
                                    </Space>
                                </Form>
                            </div> */}
                            {/*<div style={{ display: 'flex', justifyContent: 'right' }}>*/}
                            {/*    <Text>*/}
                            {/*        <Link onClick={*/}
                            {/*            async () => {*/}
                            {/*                window.location.href = '/topup/history'*/}
                            {/*            }*/}
                            {/*        }>Top-up History</Link>*/}
                            {/*    </Text>*/}".```javascript
{/*</div>*/}
                        </Card>
                    </div>

                </Layout.Content>
            </Layout>
        </div>

    );
};

export default TopUp;
```