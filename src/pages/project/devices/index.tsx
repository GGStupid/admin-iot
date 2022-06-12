import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Popconfirm, Tag } from 'antd';
import { useRef } from 'react';
// import ModalDrawAddDevice from './components/ModalDrawAddDevice';

export type DeviceItem = {
  name: string;
  id: number;
  toAssets: string;
  state: number;
  type: string;
  devicePermission: string;
};

const columns: ProColumns<DeviceItem>[] = [
  {
    title: '设备名称',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '设备ID',
    dataIndex: 'id',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '资产归属',
    dataIndex: 'toAssets',
    ellipsis: true,
    valueType: 'treeSelect',
    fieldProps: {
      options: [
        {
          title: 'Node2',
          value: '0-1',
          key: '0-1',
          children: [
            {
              title: 'Child Node3',
              value: '0-1-0',
              key: '0-1-0',
            },
            {
              title: 'Child Node4',
              value: '0-1-1',
              key: '0-1-1',
            },
            {
              title: 'Child Node5',
              value: '0-1-2',
              key: '0-1-2',
            },
          ],
        },
      ],
    },
  },
  {
    title: '在线状态',
    dataIndex: 'state',
    ellipsis: true,
    hideInSearch: true,
    render: (_, record) =>
      record.state === 1 ? (
        <span style={{ color: '#87d068' }}>在线</span>
      ) : (
        <span style={{ color: '#f50' }}>离线</span>
      ),
  },
  {
    title: '设备类型',
    dataIndex: 'type',
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'all' },
      type1: {
        text: '插座',
      },
    },
  },
  {
    title: '设备权限',
    dataIndex: 'devicePermission',
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'all' },
      read: {
        text: '读',
        status: 'read',
      },
      write: {
        text: '写',
        status: 'write',
      },
      manage: {
        text: '管理',
        status: 'manage',
      },
    },
    render: (_, record) => <Tag color={'blue'}>{record.devicePermission}</Tag>,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (_, record) => [
      <a key={1} onClick={() => console.log('tiaoshi', record)}>
        调试
      </a>,
      <a key={2} onClick={() => console.log('tiaoshi', record)}>
        移除
      </a>,
      <Popconfirm
        key={3}
        title="你确定删除此项设备？"
        onConfirm={() => console.log('删除', record)}
        onCancel={() => {}}
        okText="删除"
        cancelText="取消"
      >
        <a href="#">删除</a>
      </Popconfirm>,
    ],
  },
];

const Devices: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // const [deviceModalVisible, handleDeviceModalVisible] = useState<boolean>(false);
  return (
    <PageContainer
      content="您可以通过 IoT 配网工具将设备添加到项目的资产下"
      tabList={[
        {
          tab: '全部设备',
          key: 'all',
        },
      ]}
    >
      <ProTable<DeviceItem>
        columns={columns}
        actionRef={actionRef}
        request={async (_params = {}, sort, filter) => {
          console.log(sort, filter, _params);
          return {
            data: [
              {
                name: '设备1',
                id: 1,
                toAssets: '1-2-3',
                state: 1,
                type: '擦坐',
                devicePermission: '读、写、管理',
              },
            ],
            success: true,
            page: 1,
            total: 2,
          };
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        options={false}
        tableStyle={{ paddingTop: '40px' }}
        toolBarRender={() => [
          // <Button key="button" type="primary" onClick={() => handleDeviceModalVisible(true)}>
          //   添加设备
          // </Button>,
        ]}
      />
      {/* <ModalDrawAddDevice
        deviceModalVisible={deviceModalVisible}
        onCancel={(flag) => handleDeviceModalVisible(flag)}
        onSubmit={async () => handleDeviceModalVisible(false)}
        values={{}}
      /> */}
    </PageContainer>
  );
};

export default Devices;
