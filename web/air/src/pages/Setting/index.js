Import React from 'react';
Import SystemSetting from '../../components/SystemSetting';
Import {isRoot} from '../../helpers';
Import OtherSetting from '../../components/OtherSetting';
Import PersonalSetting from '../../components/PersonalSetting';
Import OperationSetting from '../../components/OperationSetting';
Import {Layout, TabPane, Tabs} from "@douyinfe/semi-ui";

const Setting = () => {
    let panes = [
        {
            tab: 'Personal Setting',
            content: <PersonalSetting/>,
            itemKey: '1'
        }
    ];

    if (isRoot()) {
        panes.push({
            tab: 'Operation Setting',
            content: <OperationSetting/>,
            itemKey: '2'
        });
        panes.push({
            tab: 'System Setting',
            content: <SystemSetting/>,
            itemKey: '3'
        });
        panes.push({
            tab: 'Other Setting',
            content: <OtherSetting/>,
            itemKey: '4'
        });
    }

    return (
        <div>
            <Layout>
                <Layout.Content>
                    <Tabs type="line" defaultActiveKey="1">
                        {panes.map(pane => (
                            <TabPane itemKey={pane.itemKey} tab={pane.tab}>
                                {pane.content}
                            </TabPane>
                        ))}
                    </Tabs>
                </Layout.Content>
            </Layout>
        </div>
    );
};

export default Setting;