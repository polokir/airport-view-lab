import { useEffect, useState } from "react";
import axios from "../../axios-queries";
import { PageHeader } from "../../components/Header/Header";
import { Button, Container, TableCell, TableRow } from "@mui/material";
import { AppTable } from "../../components/AppTable/AppTable";
import { ModalFliUpdate } from "../../components/Modal/ModalFlightUpdate";
import { ModalInfo } from "../../components/Modal/ModalInfo";

export const FlightTable = () =>{
    const [flights, setFlights] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [openModal, setModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [flightToUpdate, setUpdFlight] = useState({});
  const [action, setAction] = useState("");
  const [infoModal,setInfoModal] = useState(false);
  const [info,setInfo] = useState([]);

  async function fetchAllFlight() {
    const token = localStorage.getItem("accessToken");
    const result = await axios.get("/flights", token);
    console.log(result.data);
    setFlights(result.data);
  }

  async function deleteFlight(id) {
    const token = localStorage.getItem("accessToken");
    const result = await axios.delete(`/flights/${id}`, token);
    console.log("delete flight", result);
    setIsDelete(true);
  }

  async function updateFlight(flight) {
    const token = localStorage.getItem("accessToken");
    const upd_st = await axios.put("/flights", flight, token);
    console.log("update flight", upd_st);
  }

  async function addFlight(flight) {
    const token = localStorage.getItem("accessToken");
    const upd_st = await axios.post("/flights", flight, token);
    console.log("update Airport", upd_st);
  }

  useEffect(() => {
    fetchAllFlight();
    setIsDelete(false);
    setIsUpdate(false);
  }, [isDelete, isUpdate]);

  const handleUpdate = (staff) => {
    setModalOpen(true);
    setUpdFlight(staff);
    setAction("UPDATE");
  };

  const handleAdd = () => {
    setModalOpen(true);
    setAction("ADD");
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsUpdate(true);
    setInfoModal(false);
  };

  const getInfo = async(id) =>{
    const token = localStorage.getItem("accessToken");
    const upd_st = await axios.get(`/flights/team/${id}`, token);
    console.log("update dddd", upd_st.data);
    setInfo(upd_st.data)
    setInfoModal(true)
  }

  return (
    <>
      <PageHeader />
      <Container>
        <Button onClick={handleAdd}> Add Staff</Button>
        <AppTable collection={flights}>
          {flights.map((item) => (
            <TableRow key={item.id}>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center"><Button onClick={()=>getInfo(item.team_id)}>{item.team_id}</Button></TableCell>
              <TableCell align="center">{item.departure}</TableCell>
              <TableCell align="center">{item.destination}</TableCell>
              <TableCell align="center">{item.passengers_number}</TableCell>
              <TableCell align="center">{item.plane}</TableCell>

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
                    onClick={() => deleteFlight(item.id)}
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
        <ModalFliUpdate
          flight={flightToUpdate}
          action={action}
          open={openModal}
          onAdd={addFlight}
          onUpdate={updateFlight}
          handleClose={closeModal}
        />
      )}
      {infoModal && (
        <ModalInfo info={info} open={infoModal} handleClose={closeModal}/>
      )}
    </>
  );
};
