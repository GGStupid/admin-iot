import { EyeOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';

const Dashbord: React.FC = () => {
  return (
    <PageContainer>
      <ProCard
        title="基础信息"
        headerBordered
        extra={<Button type="link">编辑</Button>}
        direction="column"
      >
        <ProCard gutter={16} colSpan={24}>
          <ProCard title="项目名称" hoverable bordered>
            test
          </ProCard>
          <ProCard title="项目ID" hoverable extra={<EyeOutlined />} bordered>
            12312312312
          </ProCard>
          <ProCard title="Appsecret" hoverable extra={<EyeOutlined />} bordered>
            234234
          </ProCard>
        </ProCard>
        <ProCard gutter={16} colSpan={24}>
          <ProCard title="项目描述" hoverable bordered>
            test
          </ProCard>
          <ProCard title="Access key" hoverable extra={<EyeOutlined />} bordered>
            123123123
          </ProCard>
          <ProCard title="行业分类" hoverable bordered>
            酒店
          </ProCard>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default Dashbord;
