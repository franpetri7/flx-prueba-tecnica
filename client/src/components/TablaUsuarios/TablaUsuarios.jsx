import React, { useEffect, useState } from "react";
import { Pagination, Modal, Input, Select, Form, Button } from "antd";
import BarraUsuarios from "../BarraUsuarios/BarraUsuarios";

import styles from "../TablaUsuarios/TablaUsuarios.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser, getUserById } from "../../redux/actions";

const TablaUsuarios = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers(pageIndex, pageSize));
    } else {
      setPageSize(Math.ceil(users.length / pageSize));
      console.log(users.length);
    }
  }, [dispatch, users, pageIndex, pageSize]);

  const hitCount = users.length;

  const showModal = (userId) => {
    setSelectedUserId(userId);
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const handleUser = () => {
    console.log(selectedUserId);
    if (selectedUserId) {
      dispatch(getUserById(selectedUserId));
      setIsModalOpenDelete(false);
    }
  };

  const showModalDelete = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpenDelete(true);
  };
  const handleDeleteUser = () => {
    console.log(selectedUserId);
    if (selectedUserId) {
      dispatch(deleteUser(selectedUserId));
      setIsModalOpenDelete(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpenDelete(false);
  };
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values:", values);
    // Aquí puedes enviar los valores a tu endpoint
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  return (
    <>
      <BarraUsuarios />
      <div className={styles.container}>
        <div class={styles.tablecontainer}>
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) &&
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>
                      <span
                        className={
                          user.status === "active"
                            ? styles.active
                            : styles.inactive
                        }
                      >
                        {" "}
                        {user.status}{" "}
                      </span>
                    </td>
                    <td>
                      <button
                        className={styles.editButton}
                        onClick={() => showModal(user.id)}
                      >
                        Editar
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => showModalDelete(user.id)}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className={styles.pagination}>
          <Pagination
            current={pageIndex}
            total={hitCount}
            onChange={(page, size) => {
              setPageIndex(page);
              setPageSize(size);
            }}
          />
        </div>
        <Modal
          open={isModalOpen}
          onOk={handleUser}
          onCancel={handleCancel}
          okText="Editar Usuario"
        >
          <span className={styles.titlemodal}>Editar usuario</span>

          <Form
            validateMessages={validateMessages}
            form={form}
            name="editUserForm"
            onFinish={onFinish}
            className={styles.modalinputcontainer}
          >
            <Form.Item
              value={selectedUser.email}
              className={styles.formitem}
              onValuesChange={selectedUser.username}
              label="Name"
              name="username"
              rules={[{ required: true }]}
            >
              <Input
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    username: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              className={styles.formitem}
              name="username"
              label="Usuario"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <div className={styles.spantext}>
              <span>Email</span>
              <Input
                placeholder="Basic usage"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
            </div>
            <div className={styles.spantext}>
              <span>Nombre</span>
              <Input
                placeholder="Basic usage"
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
              />
            </div>
            <div className={styles.spantext}>
              <span>Apellido</span>
              <Input
                placeholder="Basic usage"
                value={selectedUser.lastname}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, lastname: e.target.value })
                }
              />
            </div>
            <div className={styles.selectcontainer}>
              <span>Estado</span>
              <Select
                onChange={(value) =>
                  setSelectedUser({ ...selectedUser, status: value })
                }
                placeholder="Filtrar por estado"
                className={styles.select}
                value={selectedUser.status}
                options={[
                  {
                    value: "active",
                    label: "Active",
                  },
                  {
                    value: "inactive",
                    label: "Inactive",
                  },
                ]}
              />
            </div>
            <div className={styles.spantext}>
              <span>Edad</span>
              <Input
                placeholder="Basic usage"
                value={selectedUser.age}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, age: e.target.value })
                }
              />
            </div>
          </Form>
        </Modal>
        <Modal
          open={isModalOpenDelete}
          onOk={handleDeleteUser}
          onCancel={handleCancel}
          cancelButtonProps={{ children: "Cancelar" }}
          okButtonProps={{
            children: "Eliminar",
            style: {
              backgroundColor: "rgba(226, 51, 54, 1",
              borderColor: "rgba(226, 51, 54, 1",
            },
          }}
          okText="Eliminar"
          cancelText="Cancelar"
        >
          <div class={styles.deletemodal}>
            <span className={styles.titlemodal}>Eliminar usuario</span>
            <div className={styles.modalcontainer}>
              <p>
                ¿Está seguro que quiere eliminar el usuario
                <span class={styles.deleteuser}>
                  {" "}
                  {selectedUser && selectedUser.name}
                </span>
                {"?"}
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default TablaUsuarios;
