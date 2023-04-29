import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

export const ModalFliUpdate = ({
  open,
  flight,
  onUpdate,
  onAdd,
  action,
  handleClose,
}) => {
  const [team_id, setTeam_id] = useState(flight.team_id);
  const [departure, setDeparture] = useState(flight.departure);
  const [destination, setDestination] = useState(flight.destination);
  const [passNum, setPassNum] = useState(flight.passengers_number);
  const [plane, setPlane] = useState(flight.plane);

  const clickSave = (e) =>{
    e.preventDefault();
   
    if(action==="UPDATE"){
        const newFlight = {
            id:flight.id,
            team_id:team_id,
            departure:departure,
            destination:destination,
            passengers_number:passNum,
            plane:plane
        }
      onUpdate(newFlight);
    }else{
        const newFlight = {
            team_id:team_id,
            departure:departure,
            destination:destination,
            passengers_number:passNum,
            plane:plane
        }
        onAdd(newFlight);
    }
    
    handleClose();
}
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>UPDATE AIRPORT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To {action} AIRPORT you have to enter new data and click on "Save
            changes"
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="team"
            label="Team ID"
            type="text"
            fullWidth
            variant="standard"
            value={team_id}
            onChange={(e) => setTeam_id(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="departure"
            label="Departure"
            type="text"
            fullWidth
            variant="standard"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="destination"
            label="Destination"
            type="text"
            fullWidth
            variant="standard"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="passNum"
            label="Passengers number"
            type="text"
            fullWidth
            variant="standard"
            value={passNum}
            onChange={(e) => setPassNum(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="plane"
            label="plane"
            type="text"
            fullWidth
            variant="standard"
            value={plane}
            onChange={(e) => setPlane(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => clickSave(e)}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
