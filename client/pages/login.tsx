import { useRouter } from 'next/router';
import { Breadcrumb, Button, Checkbox, Divider, Form, FormProps, Input, message } from 'antd';
import { useSession } from '@/context/session';
import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

export default function LoginPage() {
  const router = useRouter();
  const session = useSession();
  const [form] = useForm();

  useEffect(() => {
    const user = getCookie('username');
    const rememberMe = getCookie('rememberMe') === 'true';

    if (rememberMe) {
      form.setFieldsValue({ username: user, remember: rememberMe });
    }
  }, [form]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values: any) => {
    try {
      const { username, password, remember } = values;

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          username: username,
          password: password,
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (data.success) {
        setCookie('token', data.token, { maxAge: 60 * 60 * 24, secure: true, path: '/', sameSite: 'strict' });
        session.setLogin(data);

        if (remember) {
          setCookie('rememberMe', 'true', { maxAge: 60 * 60 * 24 });
          setCookie('username', username, { maxAge: 60 * 60 * 24 });
        } else {
          deleteCookie('rememberMe');
        }

        router.push('/');
      } else {
        // handle login failure
        console.error(data.error);
        message.error('Autenticação inválida. Por favor verifique o seu nome de utilizador e a sua palavra-passe.');
      }
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
