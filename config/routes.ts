export default [
  { path: '/project', name: '项目概况', icon: 'smile', component: './project/dashbord/index' },
  { path: '/assets', name: '资产管理', icon: 'smile', component: './project/assets/index' },
  { path: '/permission', name: '用户权限', icon: 'smile', component: './project/permission/index' },
  { path: '/devices', name: '设备管理', icon: 'smile', component: './project/devices/index' },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      {
        name: 'register-result',
        icon: 'smile',
        path: '/user/register-result',
        component: './user/register-result',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './user/register',
      },
      { component: './404' },
    ],
  },
  { path: '/', redirect: '/project' },
  { component: './404' },
];
