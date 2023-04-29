import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const AppTable = ({ collection, children,action=true }) => {
  
  const getTableHeader = () => {
    const tableHeaderKeys = collection.map((item) => Object.keys(item));
    const tableHeader = tableHeaderKeys
      .flat()
      .filter((item, i, arr) => arr.indexOf(item) === i)
      .map((item) => item.toUpperCase());
    return tableHeader;
  };

  console.log("App Table collection", collection);
  return (
    <Container>
      <TableContainer component={Paper} >
        <Table style={{textAlign:"center"}} sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              {getTableHeader().map((head, i) => (
                <TableCell key={i} component="th" style={{fontWeight:"bold"}}>
                  {head}
                </TableCell>
              ))}
              {action && <TableCell component="th">ACTION</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
