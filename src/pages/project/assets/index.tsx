import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Input, Popconfirm, Tree } from 'antd';
import type { DataNode } from 'antd/lib/tree';
import RcResizeObserver from 'rc-resize-observer';
import { useMemo, useRef, useState } from 'react';
import type { DeviceItem } from '../devices';
import ModalDrawAddDevice from '../devices/components/ModalDrawAddDevice';
import TableUserAuth from './components/TableUserAuth';
const { Search } = Input;

const x = 3;
const y = 2;
const z = 1;
const defaultData: DataNode[] = [];

const generateData = (_level: number, _preKey?: React.Key, _tns?: DataNode[]) => {
  const preKey = _preKey || '0';
  const tns = _tns || defaultData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList: { key: React.Key; title: string }[] = [];
const generateList = (data: DataNode[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key as string });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(defaultData);

const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};

const deviceColumns: ProColumns<DeviceItem>[] = [
  {
    title: '????????????',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '??????ID',
    dataIndex: 'id',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '????????????',
    dataIndex: 'type',
    ellipsis: true,
  },
  {
    title: '????????????',
    dataIndex: 'state',
    ellipsis: true,
    hideInSearch: true,
    render: (_, record) =>
      record.state === 1 ? (
        <span style={{ color: '#87d068' }}>??????</span>
      ) : (
        <span style={{ color: '#f50' }}>??????</span>
      ),
  },
  {
    title: '??????',
    valueType: 'option',
    key: 'option',
    render: (_, record) => [
      <a key={1} onClick={() => console.log('tiaoshi', record)}>
        ??????
      </a>,
      <a key={2} onClick={() => console.log('tiaoshi', record)}>
        ??????
      </a>,
      <Popconfirm
        key={3}
        title="??????????????????????????????"
        onConfirm={() => console.log('??????', record)}
        onCancel={() => {}}
        okText="??????"
        cancelText="??????"
      >
        <a href="#">??????</a>
      </Popconfirm>,
    ],
  },
];

const Assets: React.FC = () => {
  const [responsive, setResponsive] = useState(false);

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const handleTreeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(newExpandedKeys as React.Key[]);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const treeData = useMemo(() => {
    const loop = (data: DataNode[]): DataNode[] =>
      data.map((item) => {
        const strTitle = item.title as string;
        const index = strTitle.indexOf(searchValue);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }

        return {
          title,
          key: item.key,
        };
      });

    return loop(defaultData);
  }, [searchValue]);

  const onSelect = (selectedKeys: React.Key[]) => {
    console.log('onSelect', selectedKeys);
  };

  const [tab, setTab] = useState('tab1');

  const deviceActionRef = useRef<ActionType>();
  const [deviceModalVisible, handleDeviceModalVisible] = useState<boolean>(false);

  return (
    <PageContainer
      content={
        '????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
      }
    >
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset: { width: number }) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard split={responsive ? 'horizontal' : 'vertical'}>
          <ProCard title="????????????" colSpan="20%">
            <div style={{ minHeight: 460 }}>
              <Search
                style={{ marginBottom: 20 }}
                placeholder="????????????"
                onChange={handleTreeSearch}
              />
              <Tree
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={treeData}
                onSelect={onSelect}
              />
            </div>
          </ProCard>
          <ProCard title="????????????">
            <div style={{ minHeight: 460 }}>
              <ProCard
                tabs={{
                  tabPosition: 'top',
                  activeKey: tab,
                  onChange: (key) => {
                    setTab(key);
                  },
                }}
              >
                <ProCard.TabPane key="tab1" tab="????????????">
                  <ProTable<DeviceItem>
                    columns={deviceColumns}
                    actionRef={deviceActionRef}
                    request={async (_params = {}, sort, filter) => {
                      console.log(sort, filter, _params);
                      return {
                        data: [
                          {
                            name: '??????1',
                            id: 1,
                            toAssets: '??????1',
                            state: 1,
                            type: '??????1',
                            devicePermission: '??????1',
                          },
                          {
                            name: '??????2',
                            id: 2,
                            toAssets: '??????2',
                            state: 2,
                            type: '??????2',
                            devicePermission: '??????2',
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
                      // ??????????????? transform????????????????????????????????????????????????????????????
                      syncToUrl: (values, type) => {
                        if (type === 'get') {
                          return {
                            ...values,
                            created_at: [values.startTime, values.endTime],
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
                      <Button
                        key="button"
                        type="primary"
                        onClick={() => handleDeviceModalVisible(true)}
                      >
                        ????????????
                      </Button>,
                    ]}
                  />
                  <ModalDrawAddDevice
                    deviceModalVisible={deviceModalVisible}
                    onCancel={(flag) => handleDeviceModalVisible(flag)}
                    onSubmit={async () => handleDeviceModalVisible(false)}
                    values={{}}
                  />
                </ProCard.TabPane>
                <ProCard.TabPane key="tab2" tab="????????????">
                  <TableUserAuth />
                </ProCard.TabPane>
              </ProCard>
            </div>
          </ProCard>
        </ProCard>
      </RcResizeObserver>
    </PageContainer>
  );
};

export default Assets;
