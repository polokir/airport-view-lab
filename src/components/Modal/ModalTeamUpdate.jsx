import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react"


export const ModalTeamUpdate = ({open,team,onUpdate,onAdd,handleClose,action}) => {
    const [first_pilot_id,setFirstP] = useState(team.first_pilot_id);
    const [second_pilot_id,setSecondP] = useState(team.second_pilot_id);
    const [first_stuard_id,setFirstS] = useState(team.first_stuard_id);
    const [second_stuard_id,setSecondS] = useState(team.second_pilot_id);
    const [ radio_spec_id,setRad ] = useState(team.radio_spec_id);
    const [shturman_id,setSh] = useState(team.shturman_id);

    const clickSave = (e) =>{
        e.preventDefault();
       
        if(action==="UPDATE"){
            const newTeam = {
                first_pilot_id:first_pilot_id,
                second_pilot_id:second_pilot_id,
                first_stuard_id:first_stuard_id,
                second_stuard_id:second_stuard_id,
                radio_spec_id:radio_spec_id,
                shturman_id:shturman_id,
            }
          onUpdate(newTeam);
        }else{
            const newTeam = {
                first_pilot_id:first_pilot_id,
                second_pilot_id:second_pilot_id,
                first_stuard_id:first_stuard_id,
                second_stuard_id:second_stuard_id,
                radio_spec_id:radio_spec_id,
                shturman_id:shturman_id,
            }
            onAdd(newTeam);
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
              label="first_pilot_id"
              type="text"
              fullWidth
              variant="standard"
              value={first_pilot_id}
              onChange={(e) => setFirstP(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="departure"
              label="second_pilot_id"
              type="text"
              fullWidth
              variant="standard"
              value={second_pilot_id}
              onChange={(e) => setSecondP(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="destination"
              label="first_stuard_id"
              type="text"
              fullWidth
              variant="standard"
              value={first_stuard_id}
              onChange={(e) => setFirstS(e.target.value)}
            />
  
            <TextField
              autoFocus
              margin="dense"
              id="passNum"
              label="second_stuard_id"
              type="text"
              fullWidth
              variant="standard"
              value={second_stuard_id}
              onChange={(e) => setSecondS(e.target.value)}
            />
  
            <TextField
              autoFocus
              margin="dense"
              id="plane"
              label="radio_spec_id"
              type="text"
              fullWidth
              variant="standard"
              value={radio_spec_id}
              onChange={(e) => setRad(e.target.value)}
            />
             <TextField
              autoFocus
              margin="dense"
              id="we"
              label="shturman_id"
              type="text"
              fullWidth
              variant="standard"
              value={shturman_id}
              onChange={(e) => setSh(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={(e) => clickSave(e)}>Save Changes</Button>
          </DialogActions>
        </Dialog>
      </div>
    )

}
