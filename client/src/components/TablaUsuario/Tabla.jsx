import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, searchUsers, deleteUser } from "../../redux/actions";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Input,
  Spin,
  Space,
  Table,
  Tag,
  Select,
  Button,
  Modal,
  Form,
  InputNumber,
  Pagination,
} from "antd";

import "./Tabla.css";

function Tabla() {
  //Estados Redux
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers.users);
  const usersTotal = useSelector((state) => state.allUsers.total);
  const usersRender = useSelector((state) => state.auxUsers.users);
  const loading = useSelector((state) => state.loading);

  //Estados locales
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editUser, setEditUser] = useState({ status: false, id: null });
  const [input, setInput] = useState({
    username: "",
    email: "",
    name: "",
    lastname: "",
    age: "",
    status: "",
  });

  //Constantes

  const totalPage = usersTotal;
  const data = usersRender;
  const { Search } = Input;
  const { Option } = Select;
  const [form] = Form.useForm();
  const dataForm = form.getFieldValue();
  const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;
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

  //UseEffects
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  //Funciones

  const handleSearch = (value) => {
    dispatch(searchUsers(value));
  };

  const handleChange = (value) => {
    const userFiltered = users.filter((e) => e.status === value.toLowerCase());
    dispatch(searchUsers(userFiltered));
  };

  const handleChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeAge = (e) => {
    setInput({
      ...input,
      age: e,
    });
  };

  const onStatusChange = (e) => {
    setInput({ ...input, status: e });
  };

  const showModal = () => {
    setOpen(true);
  };

  const onFill = (user) => {
    setOpen(true);
    setEditUser({ status: true, id: user.id });
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      age: user.age,
      status: user.status,
    });
  };
  // const updateuser = () => {
  //   setConfirmLoading(true);
  //   dispatch(updateUser(editUser.id, dataForm));
  //   form.resetFields();
  //   setTimeout(() => {
  //     dispatch(getUsers());
  //     setOpen(false);
  //     setConfirmLoading(false);
  //   }, 1000);
  // };
  // const handleOk = () => {
  //   setConfirmLoading(true);
  //   dispatch(createUser(input));
  //   setTimeout(() => {
  //     setOpen(false);
  //     setConfirmLoading(false);
  //     setEditUser({ status: false, id: null });
  //     form.resetFields();
  //   }, 1000);
  // };
  const handleCancel = () => {
    setOpen(false);
    setEditUser({ status: false, id: null });
    form.resetFields();
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    setTimeout(() => {
      dispatch(getUsers());
    }, 1000);
  };

  //--------------------------------------------------------------------------//

  const columns = [
    {
      title: "Usuario",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Estado",
      key: "status",
      dataIndex: "status",
      render: (_, record) => (
        <Tag
          color={record.status === "active" ? "#87d068" : "#f50"}
          key={record}
        >
          {record.status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => onFill(record)}>
            Editar
          </Button>
          <Button type="link" onClick={() => handleDelete(record.id)}>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className="header">
        <img
          className="imgflexx"
          src="https://flexxus.com.ar/wp-content/uploads/logo-flexxus-header.png"
          alt="flexxusIMG"
        />
      </div>
      <div className="contentContainer">
        <Breadcrumb>
          <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Lista de usuarios</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="top-tools-bar">
          <Search
            placeholder="Buscar usuarios"
            onSearch={handleSearch}
            style={{
              width: 276,
              marginBottom: 20,
            }}
          />
          <Select
            defaultValue="Filtrar por estado"
            style={{
              width: 210,
              height: 40,
              marginLeft: 10,
            }}
            onChange={handleChange}
            options={[
              {
                value: "active",
                label: "Activo",
              },
              {
                value: "inactive",
                label: "Inactivo",
              },
            ]}
          />
          <div className="btn-addUser">
            <Button type="primary" onClick={showModal}>
              Agregar usuario
            </Button>
          </div>
        </div>
        <Modal
          title="Agregar Usuario"
          open={open}
          onCancel={handleCancel}
          footer={[,]}
        >
          <div>
            <Form
              autoComplete="off"
              validateMessages={validateMessages}
              form={form}
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
                <Input
                  name="username"
                  value={input.usuario}
                  onChange={handleChangeInput}
                />
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
                <Input
                  name="email"
                  value={input.email}
                  onChange={handleChangeInput}
                />
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
                <Input
                  name="name"
                  value={input.name}
                  onChange={handleChangeInput}
                />
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
                <Input
                  name="lastname"
                  value={input.lastname}
                  onChange={handleChangeInput}
                />
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
                <InputNumber
                  name="age"
                  value={input.age}
                  onChange={handleChangeAge}
                />
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
                {editUser.status ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={confirmLoading}
                    // onClick={updateuser}
                  >
                    Editar usuario
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={confirmLoading}
                    // onClick={handleOk}
                  >
                    Agregar usuario
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </Modal>

        {loading ? (
          <Spin className="ant-spin" indicator={antIcon} />
        ) : (
          <div className="containerTable">
            <Table columns={columns} dataSource={data} total={totalPage} />
            <Pagination
              current={pageIndex}
              total={totalPage}
              onChange={(page, size) => {
                setPageIndex(page);
                setPageSize(size);
              }}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Tabla;
