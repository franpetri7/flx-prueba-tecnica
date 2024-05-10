import React, { useState, useEffect } from "react";
import { Input, InputNumber, Select, Button, Modal, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, createUser, getUsers } from "../../redux/actions";

const ModalForm = ({ userId, visible, onCancel }) => {
  const userById = useSelector((state) => state.auxUsers);
  const user = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: "",
    email: "",
    name: "",
    lastname: "",
    age: "",
    status: "",
  });
  const { Option } = Select;

  const [form] = Form.useForm();
  useEffect(() => {
    if (userId) {
      form.setFieldsValue({
        username: userId.username,
        email: userId.email,
        name: userId.name,
        lastname: userId.lastname,
        age: userId.age,
        status: userId.status,
      });
    }
  }, [form, userId]);

  const validateMessages = {
    required: "Campo Requerido",
    types: {
      email: "Ingrese un email valido",
      number: "ingrese solo numeros",
    },
    number: {
      range: "debe ser entre 0 y 99",
    },
  };

  const handleCancel = () => {
    onCancel();
  };
  const onFinish = (values) => {
    console.log(values);
    // Aquí puedes enviar los datos del formulario
  };

  const handleChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeAge = (value) => {
    setInput({
      ...input,
      age: value,
    });
  };

  const onStatusChange = (value) => {
    setInput({
      ...input,
      status: value,
    });
  };
  const handleOk = async () => {
    const formValues = form.getFieldsValue();
    try {
      let updatedUser;
      if (userId === 0) {
        updatedUser = await dispatch(createUser(formValues));
      } else {
        updatedUser = await dispatch(updateUser(userId.id, formValues));
      }
      form.resetFields();
      onCancel();
      if (updatedUser) {
        await dispatch(getUsers());
      }
    } catch (error) {
      console.error("Error al agregar o editar usuario:", error);
    }
  };
  return (
    <div>
      <Modal
        title={userId === 0 ? "Agregar Usuario" : "Editar Usuario"}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <Form
            autoComplete="off"
            validateMessages={validateMessages}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Usuario"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Ingrese un usuario",
                },
              ]}
            >
              <Input name="username" onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input name="email" onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item
              label="Nombre"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Ingrese su nombre",
                },
              ]}
            >
              <Input name="name" onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item
              label="Apellido"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Ingrese su apellido",
                },
              ]}
            >
              <Input name="lastname" onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item
              label="Edad"
              name="age"
              rules={[
                {
                  required: true,
                  type: "number",
                  min: 0,
                  max: 99,
                },
              ]}
            >
              <InputNumber name="age" onChange={handleChangeAge} />
            </Form.Item>
            <Form.Item
              label="Estado"
              name="status"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Selecciona un estado"
                name="status"
                onChange={onStatusChange}
                allowClear
              >
                <Option value="active" key="activo">
                  Activo
                </Option>
                <Option key="inactivo" value="inactive">
                  Inactivo
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              {userId === 0 ? (
                <Button type="primary" htmlType="submit" onClick={handleOk}>
                  Agregar usuario
                </Button>
              ) : (
                <Button type="primary" htmlType="submit" onClick={handleOk}>
                  Editar usuario
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* <Button type="primary" onClick={() => setVisible(true)}>
        Abrir Modal
      </Button> */}
    </div>
  );
};

export default ModalForm;
