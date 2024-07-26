import { useRouter } from 'next/router';
import { Breadcrumb, Button, Checkbox, Divider, Form, FormProps, Input } from 'antd';
import { useSession } from '@/context/session';

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

export default function LoginPage() {
  const router = useRouter();
  const session = useSession();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values: any) => {
    try {
      const { username, password } = values;

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          username,
          password,
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', JSON.stringify(data.token));
        session.setIsLoggedIn(true);
        router.push('/');
      } else {
        // handle login failure
        console.error(data.error);
      }
    } catch (error) {
      console.error('Could not fetch data.', error);
    }
  };

  return (
    <>
      <div className="Login">
        <Breadcrumb style={{ fontSize: 18 }} items={[{ title: 'Entrar' }]} />
      </div>
      <Divider />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Utilizador"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Palavra-passe"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
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
