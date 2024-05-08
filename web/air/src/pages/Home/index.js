Instructions: Translate the following Chinese text to English 
while maintaining the original formatting: "import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row } from '@douyinfe/semi-ui';
import { API, showError, showNotice, timestamp2string } from '../../helpers';
import { StatusContext } from '../../context/Status';
import { marked } from 'marked';". 

import React, { useContext, useEffect, useState } from 'react';
import{ Card, Col, Row } from '@douyinfe/semi-ui';
import{ API, showError, showNotice, timestamp2string } from '../../helpers';
import{ StatusContext } from '../../context/Status';
import{ marked } from 'marked';```jsx
<Row gutter={16}>
                <Col span={12}>
                  <Card
                    title='System Information'
                    headerExtraContent={<span
                      style={{ fontSize: '12px', color: 'var(--semi-color-text-1)' }}>System Information Overview</span>}>
                    <p>Name: {statusState?.status?.system_name}</p>
                    <p>Version: {statusState?.status?.version ? statusState?.status?.version : 'unknown'}</p>
                    <p>
                      Source Code:
                      <a
                        href='https://github.com/songquanpeng/one-api'
                        target='_blank' rel='noreferrer'
                      >
                        https://github.com/songquanpeng/one-api
                      </a>
                    </p>
                    <p>Startup Time: {getStartTimeString()}</p>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    title='System Configuration'
                    headerExtraContent={<span
                      style={{ fontSize: '12px', color: 'var(--semi-color-text-1)' }}>System Configuration Overview</span>}>
                    <p>
                      Email Verification:
                      {statusState?.status?.email_verification === true ? 'Enabled' : 'Disabled'}
                    </p>
                    <p>
                      GitHub Authentication:
                      {statusState?.status?.github_oauth === true ? 'Enabled' : 'Disabled'}
                    </p>
                    <p>
                      WeChat Authentication:
                      {statusState?.status?.wechat_login === true ? 'Enabled' : 'Disabled'}
                    </p>
                    <p>
                      Turnstile User Check:
                      {statusState?.status?.turnstile_check === true ? 'Enabled' : 'Disabled'}
                    </p>
                    {/*<p>*/}
                    {/*  Telegram Authentication:*/}
                    {/*  {statusState?.status?.telegram_oauth === true*/}
                    {/*    ? 'Enabled' : 'Disabled'}*/}
                    {/*</p>*/}
                  </Card>
``````javascript
</Col>
              </Row>
            </Card>

          <>
          : <>
            {
              homePageContent.startsWith('https://') ?
                <iframe src={homePageContent} style={{ width: '100%', height: '100vh', border: 'none' }} /> :
                <div style={{ fontSize: 'larger' }} dangerouslySetInnerHTML={{ __html: homePageContent }}></div>
            }
          </>
      }

    </>
  );
};

export default Home;
```