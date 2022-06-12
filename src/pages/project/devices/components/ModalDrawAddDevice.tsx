import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { DrawerForm, ProFormText } from '@ant-design/pro-form';
import { message } from 'antd';
import React, { useRef } from 'react';
import type { DeviceItem } from '..';

export type AddDeviceFormProps = {
  onCancel: (flag: boolean, formVals?: DeviceItem) => void;
  onSubmit: (values: DeviceItem) => Promise<void>;
  deviceModalVisible: boolean;
  values: Partial<API.RuleListItem>;
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const ModalDrawAddDevice: React.FC<AddDeviceFormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();

  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      title="添加设备"
      width={300}
      formRef={formRef}
      visible={props.deviceModalVisible}
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
        console.log(values.name);
        message.success('提交成功');
        props.onSubmit(values as any);
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText name="name" width="md" label="设备名称" placeholder="请输入设备名称" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="contract" label="设备类型" placeholder="请输入设备类型" />
      </ProForm.Group>
    </DrawerForm>
  );
};

export default ModalDrawAddDevice;
