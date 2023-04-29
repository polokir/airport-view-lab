import { useDispatch, useSelector } from "react-redux";
import { isAuthUser, logout } from "../../redux/slices/user-slice";
import { Link } from "react-router-dom";
import { Button, Container } from "@mui/material";
import styles from "./Header.module.css";
import logo from "../../img/airplane_logo.svg";
export const PageHeader = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthUser);
  const role = useSelector((state) => state.users.role);

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.clear();
  };
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>AIRCOMPANY CRM</div>
          </Link>
          {isAuth && (
            <div className="panel-button">
              {role === "ADMIN" && (
                <>
                  <Link to="/usertable">
                    <Button>User Table</Button>
                  </Link>
                  <Link to="/airporttable">
                    <Button>Airport Table</Button>
                  </Link>
                  <Link to="/flighttable">
                    <Button>Flight table</Button>
                  </Link>
                </>
              )}
              {(role === "ADMIN" || role === "DISPATCHER") && (
                <>
                  <Link to="/teamtable">
                    <Button>Team Table</Button>
                  </Link>
                  <Link to="/stafftable">
                    <Button>Staff Table</Button>
                  </Link>
                </>
              )}
            </div>
          )}

          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/register">
                  <Button variant="contained">Create account</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
