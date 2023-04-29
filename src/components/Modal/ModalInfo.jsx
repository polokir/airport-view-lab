import {
  Dialog,
  DialogContent,
  DialogTitle,
  TableCell,
  TableRow,
} from "@mui/material";
import { AppTable } from "../AppTable/AppTable";

export const ModalInfo = ({ info, open, handleClose }) => {
    console.log("infol",info);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>TEAM</DialogTitle>
        <DialogContent>
          <AppTable collection={info} action={false}>
            {info.map((t) => (
              <TableRow>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.speciality}</TableCell>
              </TableRow>
            ))}
          </AppTable>
        </DialogContent>
      </Dialog>
    </div>
  );
};
