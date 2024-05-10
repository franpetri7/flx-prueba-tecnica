import React, { useState, useEffect } from "react";
import styles from "./BarraUsuarios.module.css";
import ModalForm from "../Modals/ModalForm";
import { useDispatch } from "react-redux";
import { Input, Select, Button } from "antd";
import { searchUsers, filterUsers } from "../../redux/actions";

const BarraUsuarios = ({ pageIndex, pageSize }) => {
  //Estados y variables
  const dispatch = useDispatch();
  const { Search } = Input;
  const [nameValue, setNameValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //UseEffects para el paginado
  useEffect(() => {
    if (nameValue !== "") dispatch(searchUsers(nameValue, pageIndex, pageSize));
  }, [nameValue, pageIndex, pageSize]);

  useEffect(() => {
    if (statusValue !== "")
      dispatch(searchUsers(statusValue, pageIndex, pageSize));
  }, [statusValue, pageIndex, pageSize]);

  //Funciones
  const handleSearch = (value) => {
    setNameValue(value);
    dispatch(searchUsers(value, pageIndex, pageSize));
  };

  const handleChange = (value1) => {
    setStatusValue(value1);
    dispatch(filterUsers(value1, pageIndex, pageSize));
  };
  const showModal = () => {
    setIsModalOpen(true);
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
          <Search
            placeholder="Buscar usuarios"
            onSearch={handleSearch}
            style={{
              width: 276,
              marginBottom: 20,
            }}
          />
          <Select
            placeholder="Filtrar por estado"
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
      <ModalForm userId={0} visible={isModalOpen} onCancel={handleCancel} />
    </div>
  );
};

export default BarraUsuarios;
