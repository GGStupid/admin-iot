import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormCaptcha, ProFormSelect } from '@ant-design/pro-form';
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
  addUserModalVisible: boolean;
  values: Partial<UserItem>;
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const ModalDrawAddUser: React.FC<AddUserFormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  return (
    <DrawerForm<UserItem>
      title="新建用户"
      width={300}
      formRef={formRef}
      visible={props.addUserModalVisible}
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
      <ProFormText name="phone" width="md" label="手机号" placeholder="请输入正确的手机号" />
      <ProFormCaptcha
        label="验证码"
        // 手机号的 name，onGetCaptcha 会注入这个值
        phoneName="phone"
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
          console.log('>', phone, '>');
          await waitTime(1000);
          message.success(`手机号 ${phone} 验证码发送成功!`);
        }}
      />
      <ProFormText.Password name="contract" label="密码" placeholder="请输入新密码" />
      <ProFormSelect
        name="select2"
        label="用户类型"
        request={async () => [
          { label: '访客', value: 'guest' },
          { label: '管理员', value: 'admin' },
          { label: '智优居员工', value: 'employee' },
        ]}
        placeholder="请选择用户类型"
      />
    </DrawerForm>
  );
};

export default ModalDrawAddUser;
