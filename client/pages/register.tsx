import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Breadcrumb, Button, Divider, Form, Input, Typography } from 'antd';
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem';

type FieldType = {
  username?: string;
  password?: string;
  confPass?: string;
  remember?: boolean;
};

export default function RegisterPage() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    const confPass = formData.get('confPass');

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, confPass }),
    });

    if (response.ok) {
      router.push('/login');
    } else {
      // Handle errors
    }
  }

  return (
    <>
      <div className="Registar">
        <Breadcrumb style={{ fontSize: 18 }}>
          <BreadcrumbItem>Criar conta</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Divider />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
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

        <Form.Item<FieldType>
          label="Confirmar palavra-passe"
          name="confPass"
          rules={[{ required: true, message: 'Por favor, confirme a palavra-passe!' }]}
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
