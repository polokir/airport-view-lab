import { useEffect, useState } from "react";
import axios from "../../axios-queries";
import { PageHeader } from "../../components/Header/Header";
import { Button, Container, TableCell, TableRow } from "@mui/material";
import { AppTable } from "../../components/AppTable/AppTable";
import { ModalAirUpdate } from "../../components/Modal/ModalAirUpdate";

export const AirportTable = () => {
  const [airpors, setAirports] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [openModal, setModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [airToUpdate, setUpdAir] = useState({});
  const [action, setAction] = useState("");

  async function fetchAllAirport() {
    const token = localStorage.getItem("accessToken");
    const result = await axios.get("/airports", token);
    console.log(result.data);
    setAirports(result.data);
  }

  async function deleteAirport(id) {
    const token = localStorage.getItem("accessToken");
    const result = await axios.delete(`/airports/${id}`, token);
    console.log("delete flight", result);
    setIsDelete(true);
  }

  async function updateAirport(airport) {
    const token = localStorage.getItem("accessToken");
    const upd_st = await axios.put("/airports", airport, token);
    console.log("update flight", upd_st);
  }

  async function addAirport(airport) {
    const token = localStorage.getItem("accessToken");
    const upd_st = await axios.post("/airports", airport, token);
    console.log("update Airport", upd_st);
  }

  useEffect(() => {
    fetchAllAirport();
    setIsDelete(false);
    setIsUpdate(false);
  }, [isDelete, isUpdate]);
  const handleUpdate = (airport) => {
    setModalOpen(true);
    setUpdAir(airport);
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
        <AppTable collection={airpors}>
          {airpors.map((item) => (
            <TableRow key={item.id}>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.flight_id}</TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.index}</TableCell>
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
                    onClick={() => deleteAirport(item.id)}
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
        <ModalAirUpdate
          airport={airToUpdate}
          action={action}
          open={openModal}
          onAdd={addAirport}
          onUpdate={updateAirport}
          handleClose={closeModal}
        />
      )}
    </>
  );
};
