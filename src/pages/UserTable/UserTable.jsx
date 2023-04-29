import { useEffect, useState } from "react";
import axios from "../../axios-queries";
import { useSelector } from "react-redux";
import { isAuthUser } from "../../redux/slices/user-slice";
import { PageHeader } from "../../components/Header/Header";
import { Navigate } from "react-router-dom";
import { AppTable } from "../../components/AppTable/AppTable";
import { Button, TableCell, TableRow } from "@mui/material";
import ModalUserUpdate from "../../components/Modal/ModalUserUpdate";


export const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const isAuth = useSelector(isAuthUser);
  const [openModal, setModalOpen] = useState(false);
  const [userUpdate, setUserUpd] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  
  async function fetchAllUsers() {
    const params = localStorage.getItem("accessToken");
    const result = await axios.get("/users", params);
    setUsers(result.data);
    console.log("ohsgfijkv", result.data);
  }

  async function deleteUser(id) {
    const params = localStorage.getItem("accessToken");
    const res = await axios.delete(`/users/${id}`, params);
    console.log("delete USER", res);
    setIsDelete(true);
  }

  async function updateUser(user) {
    const params = localStorage.getItem("accessToken");
    const upd_user = await axios.put("/users", user, params);
    console.log("update USER", upd_user);
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    fetchAllUsers(token).catch((error) => console.log(error));
    setIsDelete(false);
    setIsUpdate(false);
  }, [isDelete,isUpdate]);

  const handleUpdate = (user) => {
    setModalOpen(true);
    setUserUpd(user);
  };
  const closeModal = () => {
    setModalOpen(false);
    setIsUpdate(true);
  };
  if (!isAuth) {
    <Navigate to="/" />;
  }

  return (
    <>
      <PageHeader />
      <AppTable collection={users}>
        {users.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.fullname}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.password}</TableCell>
            <TableCell>{item.role}</TableCell>
            <TableCell>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button variant="contained" onClick={() => handleUpdate(item)}>
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteUser(item.id)}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </AppTable>
      {openModal && (
          <ModalUserUpdate
            open={openModal}
            user={userUpdate}
            onUpdate={updateUser}
            handleClose={closeModal}
          />
      )}
    </>
  );
};
