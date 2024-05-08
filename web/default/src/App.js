import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import User from './pages/User';
import { PrivateRoute } from './components/PrivateRoute';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import NotFound from './pages/NotFound';
import Setting from './pages/Setting';
import EditUser from './pages/User/EditUser';
import AddUser from './pages/User/AddUser';
import { API, getLogo, getSystemName, showError, showNotice } from './helpers';
import PasswordResetForm from './components/PasswordResetForm';
import GitHubOAuth from './components/GitHubOAuth';
import PasswordResetConfirm from './components/PasswordResetConfirm';
import { UserContext } from './context/User';
import { StatusContext } from './context/Status';
import Channel from './pages/Channel';
import Token from './pages/Token';
import EditToken from './pages/Token/EditToken';
import EditChannel from './pages/Channel/EditChannel';
import Redemption from './pages/Redemption';
import EditRedemption from './pages/Redemption/EditRedemption';
import TopUp from './pages/TopUp';
import Log from './pages/Log';
import Chat from './pages/Chat';
import LarkOAuth from './components/LarkOAuth';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
  const [userState, userDispatch] = useContext(UserContext);
  const [statusState, statusDispatch] = useContext(StatusContext);

  const loadUser = () => {
    let user = localStorage.getItem('user');
    if (user) {
      let data = JSON.parse(user);
      userDispatch({ type: 'login', payload: data });
    }
  };
  const loadStatus = async () => {
    const res = await API.get('/api/status');
    const { success, data } = res.data;
    if (success) {
      localStorage.setItem('status', JSON.stringify(data));
      statusDispatch({ type: 'set', payload: data });
    }- Update local storage with system information such as system name, logo, footer HTML, quota per unit, and display in currency. If chat link data is provided, set it in local storage; otherwise, remove it.
- If the API version is different from the React app version and both are not empty, show a notification with the new version information.
- If there is an error connecting to the server, show an error message.
- In the `useEffect` hook, load user and status information. Update the document title with the system name, and set the favicon with the logo if available.
- Define routes for different paths like homepage, channel, token, and their respective components like Home, Channel, EditChannel, and Token. Use Suspense with Loading component for async loading. Use PrivateRoute for restricted access.<Route
    path='/token/add'
    element={
      <Suspense fallback={<Loading></Loading>}>
        <EditToken />
      </Suspense>
    }
  />
  <Route
    path='/redemption'
    element={
      <PrivateRoute>
        <Redemption />
      </PrivateRoute>
    }
  />
  <Route
    path='/redemption/edit/:id'
    element={
      <Suspense fallback={<Loading></Loading>}>
        <EditRedemption />
      </Suspense>
    }
  />
  <Route
    path='/redemption/add'
    element={
      <Suspense fallback={<Loading></Loading>}>
        <EditRedemption />
      </Suspense>
    }
  />
  <Route
    path='/user'
    element={
      <PrivateRoute>
        <User />
      </PrivateRoute>
    }
  />
  <Route
    path='/user/edit/:id'
    element={
      <Suspense fallback={<Loading></Loading>}>
        <EditUser />
      </Suspense>
    }
  />
  <Route
    path='/user/edit'
    element={
      <Suspense fallback={<Loading></Loading>}>
        <EditUser />
      </Suspense>
    }
  />
  <Route
    path='/user/add'
    element={
      <Suspense fallback={<Loading></Loading>}>
        <AddUser />
      </Suspense>
    }
  />
  <Route
    path='/user/reset'
    element={
      <Suspense fallback={<Loading></Loading>}>
        <PasswordResetConfirm />
      </Suspense>
    }
  />
  <Route
    path='/login'
    element={
      <Suspense fallback={<Loading></Loading>}>
        <LoginForm />
      </Suspense>
    }
  />
  <Route
    path='/register'
    element={
      <Suspense fallback={<Loading></Loading>}>
        <RegisterForm />
      </Suspense>
    }
  />
  <RouteInstructions: Translate the following Chinese text to English while maintaining the original formatting: "路径='/reset'
        元素={
          <悬念 fallback={<Loading></Loading>}>
            <密码重置表单 />
          </悬念>
        }
      />
      <路由
        路径='/oauth/github'
        元素={
          <悬念 fallback={<Loading></Loading>}>
            <GitHub认证 />
          </悬念>
        }
      />
      <路由
        路径='/oauth/lark'
        元素={
          <悬念 fallback={<Loading></Loading>}>
            <Lark认证 />
          </悬念>
        }
      />
      <路由
        路径='/设置'
        元素={
          <私人路由>
            <悬念 fallback={<Loading></Loading>}>
              <设置 />
            </悬念>
          </私人路由>
        }
      />
      <路由
        路径='/充值'
        元素={
        <私人路由>
          <悬念 fallback={<Loading></Loading>}>
            <充值 />
          </悬念>
        </私人路由>
        }
      />
      <路由
        路径='/日志'
        元素={
          <私人路由>
            <日志 />
          </私人路由>
        }
      />
      <路由
        路径='/关于'
        元素={
          <悬念 fallback={<Loading></Loading>}>
            <关于 />
          </悬念>
        }
      />
      <路由
        路径='/聊天'
        元素={
          <悬念 fallback={<Loading></Loading>}>
            <聊天 />
          </悬念>
        }
      />
      <路由 路径='*' 元素={
          <未找到 />
      } />
    </路由>
  );
}

导出 默认 App;"