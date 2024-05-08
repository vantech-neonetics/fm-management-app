"Import React from 'react';
Import UsersTable from '../../components/UsersTable';
Import {Layout} from "@douyinfe/semi-ui";

const User = () => (
  <>
    <Layout>
        <Layout.Header>
            <h3>Manage Users</h3>
        </Layout.Header>
        <Layout.Content>
            <UsersTable/>
        </Layout.Content>
    </Layout>
  </>
);

Export default User;"