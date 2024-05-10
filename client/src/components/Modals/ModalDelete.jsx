import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import styles from "./ModalDelete.module.css";
import { deleteUser } from "../../redux/actions";

const ModalDelete = ({ userId, visible, onCancel }) => {
  const users = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const handleCancel = () => {
    onCancel();
  };
  const handleDeleteUser = () => {
    if (userId) {
      dispatch(deleteUser(userId.id, users));
    }
  };

  return (
    <div>
      <Modal
        visible={visible}
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
              <span class={styles.deleteuser}> {userId && userId.name}</span>
              {"?"}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDelete;
