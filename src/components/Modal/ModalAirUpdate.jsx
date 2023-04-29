import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react"


export const ModalAirUpdate = ({onAdd,action,handleClose,airport,open,onUpdate}) =>{

    const [flight_id,setFlight] = useState(airport?.flight_id);
    const [name,setName] = useState(airport?.name);
    const [index,setIndex] = useState(airport?.index);

    const clickSave = (e) =>{
        e.preventDefault();
       
        if(action==="UPDATE"){
            const newAirport = {
                id:airport.id,
                flight_id:flight_id,
                name:name,
                index:index,
            }
          onUpdate(newAirport);
        }else{
            const newAirport = {
                flight_id:flight_id,
                name:name,
                index:index,
            }
            onAdd(newAirport);
        }
        
        handleClose();
    }
    return (
        <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>UPDATE AIRPORT</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To {action} AIRPORT you have to enter new data and click on "Save changes"
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="flight"
              label="Flight ID"
              type="text"
              fullWidth
              variant="standard"
              value={flight_id}
              onChange={e=>setFlight(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Fullname"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={e=>setName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="index"
              label="Index"
              type="text"
              fullWidth
              variant="standard"
              value={index}
              onChange={e=>setIndex(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={e=>clickSave(e)}>Save Changes</Button>
          </DialogActions>
        </Dialog>
      </div>
      )
}