import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, Tag } from 'antd';
import { useRef, useState } from 'react';
import ModalDrawAddUser from './components/ModalDrawAddUser';
import ModalDrawChangePw from './components/ModalDrawChangePw';

export type PermissionItem = {
  name: string;
  id: string;
  classify: string;
  account: string;
  accountType: string;
  authState: number;
};

const Permission: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<PermissionItem>();

  const [addUserModalVisible, handleAddUserModalVisible] = useState<boolean>(false);

  const [userPwModalVisible, handleUserPwModalVisible] = useState<boolean>(false);

  const columns: ProColumns<PermissionItem>[] = [
    {
      title: '用户名称',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: true,
      hideInSearch: true,
      hideInDescriptions: true,
    },
    {
      title: '用户ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '用户分类',
      dataIndex: 'classify',
      sorter: (a, b) => a.classify.localeCompare(b.classify),
      ellipsis: true,
      hideInSearch: true,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        访客: {
          text: '访客',
        },
        管理员: {
          text: '管理员',
        },
        智优居员工: {
          text: '智优居员工',
        },
      },
    },
    {
      title: '账号类型',
      dataIndex: 'accountType',
      ellipsis: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '账号',
      dataIndex: 'account',
      ellipsis: true,
      hideInTable: true,
    },
    {
      title: '用户授权状态',
      dataIndex: 'authState',
      sorter: (a, b) => a.authState - b.authState,
      ellipsis: true,
      hideInSearch: true,
      hideInDescriptions: true,
      render: (_, record) => [
        record.authState == 1 && (
          <Tag key={record.id} color="green">
            全部启用
          </Tag>
        ),
        record.authState == 2 && (
          <Tag key={record.id} color="default">
            停用
          </Tag>
        ),
        record.authState == 3 && (
          <Tag key={record.id} color="volcano">
            可更新
          </Tag>
        ),
      ],
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      hideInDescriptions: true,
      render: (_, record) => [
        <a
          key={1}
          onClick={() => {
            setCurrentRow(record);
            handleUserPwModalVisible(true);
          }}
        >
          修改密码
        </a>,
        <Popconfirm
          key={2}
          title="你确定删除此项设备？"
          onConfirm={() => console.log('删除', record)}
          onCancel={() => {}}
          okText="删除"
          cancelText="取消"
        >
          <a href="#">删除用户</a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <PageContainer
      content={
        '用户是具备资产使用权限的账号密码组合。新创建的用户默认没有任何资产的使用权限，需要通过资产管理为用户授权。'
      }
    >
      <ProTable<PermissionItem>
        columns={columns}
        actionRef={actionRef}
        request={async (_params = {}, sort, filter) => {
          console.log(sort, filter, _params);
          return {
            data: [
              {
                name: '访客001',
                id: '18646019039',
                classify: '访客',
                account: '18646019039',
                accountType: '手机号',
                authState: 1,
              },
              {
                name: '访客002',
                id: '18646019032',
                classify: '管理员',
                account: '18646019032',
                accountType: '手机号',
                authState: 2,
              },
              {
                name: '访客003',
                id: '18646019033',
                classify: '智优居员工',
                account: '18646019033',
                accountType: '手机号',
                authState: 3,
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
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        options={false}
        toolBarRender={() => [
          <Button key="button" type="primary" onClick={() => handleAddUserModalVisible(true)}>
            新建用户
          </Button>,
        ]}
      />
      <ModalDrawAddUser
        addUserModalVisible={addUserModalVisible}
        onCancel={(falg) => handleAddUserModalVisible(falg)}
        onSubmit={async () => {
          handleAddUserModalVisible(false);
        }}
        values={{}}
      />
      <ModalDrawChangePw
        onCancel={(falg) => handleUserPwModalVisible(falg)}
        onSubmit={async () => {
          handleUserPwModalVisible(false);
        }}
        visible={userPwModalVisible}
        values={currentRow || {}}
        columns={columns}
      />
    </PageContainer>
  );
};

export default Permission;
