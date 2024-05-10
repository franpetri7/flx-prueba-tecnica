import React, { useEffect, useState } from "react";
import { Pagination, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import BarraUsuarios from "../BarraUsuarios/BarraUsuarios";
import ModalForm from "../Modals/ModalForm";
import ModalDelete from "../Modals/ModalDelete";
import styles from "../TablaUsuarios/TablaUsuarios.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions";

const TablaUsuarios = () => {
  //Constantes y estados Globales
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);
  const usersTotal = useSelector((state) => state.allUsers.total);
  const loading = useSelector((state) => state.loading);

  //Estados locales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserDelete, setselectedUserDelete] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    dispatch(getUsers(pageIndex, pageSize));
  }, [dispatch]);

  //Variables
  const hitCount = usersTotal;
  const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;

  //Funciones
  const showModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const showModalDelete = (userId) => {
    setselectedUserDelete(userId);
    setIsModalOpenDelete(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpenDelete(false);
  };

  const handlePage = (page, limit) => {
    setPageIndex(page);
    setPageSize(limit);
    dispatch(getUsers(page, limit));
  };
  return (
    <>
      <BarraUsuarios pageIndex={pageIndex} pageSize={pageSize} />
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spin className={styles.ant_spin} indicator={antIcon} />
        </div>
      ) : (
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
                {Array.isArray(users.users) &&
                  users.users.map((user, index) => (
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
                          onClick={() => showModal(user)}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => showModalDelete(user)}
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
              style={{
                paddingBottom: 30,
              }}
              onChange={(page, limit) => {
                handlePage(page, limit);
              }}
            />
          </div>
          <ModalForm
            userId={selectedUserId}
            visible={isModalOpen}
            onCancel={handleCancel}
          />
          <ModalDelete
            userId={selectedUserDelete}
            visible={isModalOpenDelete}
            onCancel={handleCancel}
          />
        </div>
      )}
    </>
  );
};

export default TablaUsuarios;
