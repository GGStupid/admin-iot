import { projectInfo } from '../src/projectConfig';
import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: projectInfo.name,
  pwa: false,
  logo: './logo.png',
  iconfontUrl: '',
  "headerHeight": 48,
  "splitMenus": false,
  "footerRender": false,
};

export default Settings;
