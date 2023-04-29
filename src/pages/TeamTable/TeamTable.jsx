import { useEffect, useState } from "react";
import axios from "../../axios-queries";
import { PageHeader } from "../../components/Header/Header";
import { Button, Container, TableCell, TableRow } from "@mui/material";
import { AppTable } from "../../components/AppTable/AppTable";
import { ModalTeamUpdate } from "../../components/Modal/ModalTeamUpdate";

export const TeamTable = () => {
  const [teams, setTeams] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [openModal, setModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [teamToUpdate, setUpdteam] = useState({});
  const [action, setAction] = useState("");

  async function fetchAllTeam() {
    const token = localStorage.getItem("accessToken");
    const result = await axios.get("/teams", token);
    console.log(result.data);
    setTeams(result.data);
  }

  async function deleteTeam(id) {
    const token = localStorage.getItem("accessToken");
    const result = await axios.delete(`teams/${id}`, token);
    console.log("delete flight", result);
    setIsDelete(true);
  }

  async function updateTeam(team) {
    const token = localStorage.getItem("accessToken");
    const upd_fli = await axios.put("/teams", team, token);
    console.log("update flight", upd_fli);
  }

  async function addTeam(team) {
    const token = localStorage.getItem("accessToken");
    const upd_fli = await axios.post("/teams", team, token);
    console.log("update Airport", upd_fli);
  }

  useEffect(() => {
    fetchAllTeam();
    setIsDelete(false);
    setIsUpdate(false);
  }, [isDelete, isUpdate]);

  const handleUpdate = (team) => {
    setModalOpen(true);
    setUpdteam(team);
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

  console.log(teams);
  return (
    <>
      <PageHeader />
      <Container>
        <Button variant="contained" onClick={handleAdd}>
          Add team
        </Button>
        <AppTable collection={teams}>
          {teams.map((item) => (
            <TableRow key={item.id}>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.first_pilot_id}</TableCell>
              <TableCell align="center">{item.second_pilot_id}</TableCell>
              <TableCell align="center">{item.first_stuard_id}</TableCell>
              <TableCell align="center">{item.second_stuard_id}</TableCell>
              <TableCell align="center">{item.radio_spec_id}</TableCell>
              <TableCell align="center">{item.shturman_id}</TableCell>
              <TableCell align="center">
                <div style={{ display: "flex", flexDirection:"column", gap: "10px" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleUpdate(item)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteTeam(item.id)}
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
        <ModalTeamUpdate
          open={openModal}
          team={teamToUpdate}
          onUpdate={updateTeam}
          onAdd={addTeam}
          action={action}
          handleClose={closeModal}
        />
      )}
    </>
  );
};
