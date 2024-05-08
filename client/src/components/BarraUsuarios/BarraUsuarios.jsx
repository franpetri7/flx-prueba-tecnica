import React, { useState } from "react";
import styles from "./BarraUsuarios.module.css";
import { useDispatch } from "react-redux";
import { Input, Space, Select, Button, Modal } from "antd";
import { searchUsers, filterUsers } from "../../redux/actions";

const BarraUsuarios = () => {
  const dispatch = useDispatch();
  const { Search } = Input;

  const handleSearch = (value) => {
    dispatch(searchUsers(value));
  };
  const handleChange = (value1) => {
    dispatch(filterUsers(value1));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.textcontainer}>
        <span className={styles.usuarios}>Usuarios /</span>{" "}
        <span> Listado de usuarios</span>{" "}
      </div>
      <div className={styles.barracontainer}>
        <div className={styles.filtercontainer}>
          <Space direction="vertical">
            <Search
              placeholder="Buscar usuarios"
              allowClear
              size="large"
              onSearch={handleSearch}
              className={styles.search}
            />
          </Space>
          <Select
            placeholder="Filtrar por estado"
            className={styles.select}
            onChange={handleChange}
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
        <div className={styles.buttoncontainer}>
          <Button
            className={styles.buttonprimary}
            onClick={showModal}
            type="primary"
          >
            Agregar Usuario
          </Button>
        </div>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default BarraUsuarios;
