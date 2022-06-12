import type { ProFormInstance } from '@ant-design/pro-form';
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

const ModalDrawAdvancedSetup: React.FC<AddUserFormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  console.log(props);
  return (
    <DrawerForm<UserItem>
      title="高级设置"
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
      <ProFormText name="name" width="md" label="手机号" placeholder="请输入正确的手机号" />
      <ProFormText width="md" name="contract" label="设备类型" placeholder="请输入设备类型" />
    </DrawerForm>
  );
};

export default ModalDrawAdvancedSetup;
