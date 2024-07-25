import { useRouter } from 'next/router';
import { Breadcrumb, Button, Divider, Form, FormProps, Input } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
  confirm?: string;
  remember?: boolean;
};

export default function RegisterPage() {
  const router = useRouter();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values: any) => {
    try {
      const { username, password, confirm } = values;

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          username,
          password,
          confirm,
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data));
        // handle registration success
        router.push('/login');
      } else {
        // handle registration failure
        console.error(data.error);
      }
    } catch (error) {
      console.error('Could not fetch data.', error);
    }
  };

  return (
    <>
      <div className="Registar">
        <Breadcrumb style={{ fontSize: 18 }} items={[{ title: 'Registar' }]} />
      </div>
      <Divider />
      <Form
        name="register"
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
          rules={[{ required: true, message: 'Por favor, introduza um nome de utilizador!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Palavra-passe"
          name="password"
          rules={[{ required: true, message: 'Por favor, introduza uma palavra-passe!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirmar palavra-passe"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Por favor, confirme a sua palavra-passe!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('As palavras-passe não correspondem!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submeter
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
