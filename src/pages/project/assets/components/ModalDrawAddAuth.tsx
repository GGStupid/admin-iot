import { ProFormInstance, ProFormSelect } from '@ant-design/pro-form';
import { DrawerForm, ProFormText } from '@ant-design/pro-form';
import { message } from 'antd';
import React, { useRef } from 'react';

type UserItem = {
  phone: string;
  code: string;
  password: string;
  userType: string;
};

export type AddUserFormProps = {
  onCancel: (flag: boolean, formVals?: UserItem) => void;
  onSubmit: (values?: UserItem) => Promise<void>;
  visible: boolean;
  values: Partial<API.RuleListItem>;
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const ModalDrawAddAuth: React.FC<AddUserFormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  console.log(props);
  return (
    <DrawerForm<UserItem>
      title="用户授权"
      width={300}
      formRef={formRef}
      visible={props.visible}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      onVisibleChange={(flag) => {
        props.onCancel(flag);
      }}
      submitter={{
        searchConfig: {
          submitText: '一键授权',
        },
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
        props.onSubmit(values as any);
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <ProFormSelect.SearchSelect
        options={[
          { label: '14', value: 's14tring' },
          { label: '1144', value: 's142tring' },
          { label: '143', value: 's134tring' },
          { label: '144', value: 's144tring' },
        ]}
        mode="single"
      />
    </DrawerForm>
  );
};

export default ModalDrawAddAuth;
