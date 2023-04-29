import { useEffect, useState } from "react";
import axios from "../../axios-queries";
import { PageHeader } from "../../components/Header/Header";
import { Button, Container, TableCell, TableRow } from "@mui/material";
import { AppTable } from "../../components/AppTable/AppTable";
import { ModalStaffUpdate } from "../../components/Modal/ModallStaffUpdate";

export const StaffTable = () => {
  const [staff, setStaff] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [openModal, setModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [staffToUpdate, setUpdStaff] = useState({});
  const [action, setAction] = useState("");

  async function fetchAllStaff() {
    const token = localStorage.getItem("accessToken");
    const result = await axios.get("/staff", token);
    console.log(result.data);
    setStaff(result.data);
  }

  async function deleteStaff(id) {
    const token = localStorage.getItem("accessToken");
    const result = await axios.delete(`staff/${id}`, token);
    console.log("delete flight", result);
    setIsDelete(true);
  }

  async function updateStaff(staff) {
    const token = localStorage.getItem("accessToken");
    const upd_st = await axios.put("/staff", staff, token);
    console.log("update flight", upd_st);
  }

  async function addStaff(staff) {
    const token = localStorage.getItem("accessToken");
    const upd_st = await axios.post("/staff", staff, token);
    console.log("update Airport", upd_st);
  }

  useEffect(() => {
    fetchAllStaff();
    setIsDelete(false);
    setIsUpdate(false);
  }, [isDelete, isUpdate]);

  const handleUpdate = (staff) => {
    setModalOpen(true);
    setUpdStaff(staff);
    setAction("UPDATE");
  };

  const handleAdd = () => {
    setModalOpen(true);
    setAction("ADD");
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsUpdate(true);
  };
  return (
    <>
      <PageHeader />
      <Container>
        <Button onClick={handleAdd}> Add Staff</Button>
        <AppTable collection={staff}>
          {staff.map((item) => (
            <TableRow key={item.id}>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.speciality_id}</TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.salary}$</TableCell>
              <TableCell align="center">
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleUpdate(item)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteStaff(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </AppTable>
      </Container>

      {openModal && (
        <ModalStaffUpdate
          staff={staffToUpdate}
          action={action}
          open={openModal}
          onAdd={addStaff}
          onUpdate={updateStaff}
          handleClose={closeModal}
        />
      )}
    </>
  );
};
