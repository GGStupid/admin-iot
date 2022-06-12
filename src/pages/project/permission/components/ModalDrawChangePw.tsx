import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormCaptcha } from '@ant-design/pro-form';
import { DrawerForm, ProFormText } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { message } from 'antd';
import React, { useRef } from 'react';
import type { PermissionItem } from '..';

// export type UserEnity = {
//   id: number;
//   name: string;
//   userType: string;
//   classify: string;
//   authorizationState: number;
// };

export type AddUserFormProps = {
  onCancel: (flag: boolean, formVals?: PermissionItem) => void;
  onSubmit: (values?: PermissionItem) => Promise<void>;
  visible: boolean;
  values: Partial<PermissionItem>;
  columns: ProColumns<PermissionItem>[];
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const ModalDrawChangePw: React.FC<AddUserFormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  console.log(props);
  return (
    <DrawerForm<PermissionItem>
      title="修改密码"
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
      <ProDescriptions<PermissionItem>
        column={1}
        title={props.values?.name}
        request={async () => ({
          data: props.values || {},
        })}
        params={{
          id: props.values?.id,
        }}
        columns={props.columns}
      />
      <ProFormCaptcha
        label="验证码"
        // 手机号的 name，onGetCaptcha 会注入这个值
        name="captcha"
        rules={[
          {
            required: true,
            message: '请输入验证码',
          },
        ]}
        placeholder="请输入验证码"
        // 如果需要失败可以 throw 一个错误出来，onGetCaptcha 会自动停止
        // throw new Error("获取验证码错误")
        onGetCaptcha={async (phone) => {
          console.log('>', phone, '>', props.values.account);
          await waitTime(1000);
          message.success(`手机号 ${props.values.account} 验证码发送成功!`);
        }}
      />
      <ProFormText.Password name="contract" label="密码" placeholder="请输入新密码" />
    </DrawerForm>
  );
};

export default ModalDrawChangePw;
