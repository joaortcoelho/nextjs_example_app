import { useRouter } from 'next/router';
import { Breadcrumb, Button, Checkbox, Divider, Form, FormProps, Input, message } from 'antd';
import { useSession } from '@/context/sessionContext';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

export default function LoginPage() {
  const router = useRouter();
  const { setLogin } = useSession();
  const [form] = useForm();

  useEffect(() => {
    const user = getCookie('username');
    const rememberMe = getCookie('rememberMe');

    if (rememberMe === 'true') {
      form.setFieldsValue({ username: user, remember: rememberMe });
    }
  }, [form]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values: any) => {
    try {
      // call sessionContext: setLogin
      setLogin(values);
      router.push('/');
    } catch (error) {
      console.error('Could not fetch data.', error);
      message.error('Ocorreu um erro na autenticação. Tente novamente.');
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = async () => {
    message.open({ type: 'error', content: 'Erro ao submeter o formulário.' });
  };

  return (
    <>
      <div className="Login">
        <Breadcrumb style={{ fontSize: 18 }} items={[{ title: 'Entrar' }]} />
      </div>
      <Divider />
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Utilizador"
          name="username"
          rules={[{ required: true, message: 'Por favor, introduza o seu nome de utilizador!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Palavra-passe"
          name="password"
          rules={[{ required: true, message: 'Por favor, introduza a sua palavra-passe!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Lembrar-se de mim</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
