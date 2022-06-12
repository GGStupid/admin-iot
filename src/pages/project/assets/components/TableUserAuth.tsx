import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, Tag } from 'antd';
import { useRef, useState } from 'react';
import ModalDrawAddAuth from './ModalDrawAddAuth';
import ModalDrawAdvancedSetup from './ModalDrawAdvancedSetup';

export type PermissionItem = {
  name: string;
  id: string;
  classify: string;
  account: string;
  accountType: string;
  authState: number;
};

const TableUserAuth: React.FC = () => {
  const userActionRef = useRef<ActionType>();

  const [userAddAuthVisible, handleUserAddAuthVisible] = useState<boolean>(false);

  const [userAdvanceSetupVisible, handleUserAdvanceSetup] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<PermissionItem>();

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
      width: 280,
      title: '操作',
      valueType: 'option',
      key: 'option',
      hideInDescriptions: true,
      render: (_, record) => [
        <a
          key={1}
          onClick={() => {
            console.log('一键授权', record);
          }}
        >
          一键授权
        </a>,
        <a
          key={2}
          onClick={() => {
            setCurrentRow(record);
            handleUserAdvanceSetup(true);
          }}
        >
          高级设置
        </a>,
        <Popconfirm
          key={3}
          title="你确定取消授权？"
          onConfirm={() => console.log('取消授权', record)}
          onCancel={() => {}}
          okText="确定"
          cancelText="取消"
        >
          <a href="#">取消授权</a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <>
      <ProTable<PermissionItem>
        columns={columns}
        actionRef={userActionRef}
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
            total: 0,
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
          <Button key="button" type="primary" onClick={() => handleUserAddAuthVisible(true)}>
            添加授权
          </Button>,
        ]}
      />
      <ModalDrawAdvancedSetup
        visible={userAdvanceSetupVisible}
        onCancel={(falg) => handleUserAdvanceSetup(falg)}
        onSubmit={async () => {
          handleUserAdvanceSetup(false);
        }}
        values={currentRow || {}}
      />
      <ModalDrawAddAuth
        visible={userAddAuthVisible}
        onCancel={(falg) => handleUserAddAuthVisible(falg)}
        onSubmit={async () => {
          handleUserAddAuthVisible(false);
        }}
        values={currentRow || {}}
      />
    </>
  );
};

export default TableUserAuth;
