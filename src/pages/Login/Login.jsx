import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, isAuthUser } from "../../redux/slices/user-slice";
import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Paper from "@mui/material/Paper";
import LoginIcon from '@mui/icons-material/Login';
import { Box, Button, TextField, Typography } from "@mui/material";
import logo from '../../img/airplane _logo.png'
import { Link, Navigate } from "react-router-dom";
export const Login = () => {
  const isAuth = useSelector(isAuthUser);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });


  const handleSubmitForm = async (values) => {
    const data  = await dispatch(fetchUserData(values));
    if ("accessToken" in data.payload) {
      window.localStorage.setItem("accessToken", data.payload.accessToken);
      window.localStorage.setItem("refreshToken", data.payload.refreshToken);
    }else {
      alert("Something wrong");
    }
  };
  if(isAuth){
    return <Navigate to='/'/>
  }
  return (
    <Paper elevation={1} classes={{ root: styles.root }}>
      <Box
        component="img"
        sx={{
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="The house from the offer."
        src={logo}
      />
      <Typography classes={{ root: styles.title }} variant="h4">
        Sign in
      </Typography>
      <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={!!errors.email?.message}
          {...register("email", { required: "Enter email" })}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          label="Password"
          className={styles.field}
          error={!!errors.email?.message}
          {...register("password", { required: "Enter password" })}
          helperText={errors.password?.message}
          type="password"
          fullWidth
        />
        <Box className={styles.button} textAlign="center">
          <Button type="submit" size="large" variant="contained" endIcon={<LoginIcon/>}>Sign in</Button>
          <Link className={styles.link} to='/register'>
          <Button size="large" variant="contained" endIcon={<PersonAddAltIcon/>}>Sign up</Button>
          </Link>
        </Box>
      </form>
    </Paper>
  );
};
