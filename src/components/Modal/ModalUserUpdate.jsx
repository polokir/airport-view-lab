import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModalUserUpdate({handleClose, user, open,onUpdate }) {
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [name, setName] = useState(user.fullname);
  const [role, setRole] = useState(user.role);
  
  const clickSave = (e) =>{
    e.preventDefault();
    const newUser = {
        id:user.id,
        email:email,
        fullname:name,
        password:password,
        role:role,
    }
    onUpdate(newUser);
    handleClose();
  }


  return (
    <div>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>UPDATE USER</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To update user you have to enter new data and click on "Save changes"
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={e=>setEmail(e.target.value)}
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
          id="pass"
          label="Password"
          type="text"
          fullWidth
          variant="standard"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="role"
          label="Role"
          type="text"
          fullWidth
          variant="standard"
          value={role}
          onChange={e=>setRole(e.target.value)}
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
