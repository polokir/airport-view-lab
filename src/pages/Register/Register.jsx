import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LoginIcon from "@mui/icons-material/Login";
import logo from "../../img/airplane _logo.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { isAuthUser, registerUser } from "../../redux/slices/user-slice";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
    },
    mode: "onChange",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitForm = async (values) => {
    const data = await dispatch(registerUser(values));
    if ("accessToken" in data.payload) {
      window.localStorage.setItem("accessToken", data.payload.accessToken);
      window.localStorage.setItem("refreshToken", data.payload.refreshToken);

    }else {
        alert("Something wrong");
    }
  };
  const isSucces = useSelector(isAuthUser);
  if(isSucces){
    navigate('/')
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
        Sign up
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
          className={styles.field}
          label="Fullname"
          error={!!errors.fullname?.message}
          {...register("fullname", { required: "Enter fullname" })}
          helperText={errors.fullname?.message}
          fullWidth
        />
        <TextField
          label="Password"
          className={styles.field}
          error={!!errors.email?.message}
          type="password"
          {...register("password", { required: "Enter password" })}
          helperText={errors.password?.message}
          fullWidth
        />
        <Box className={styles.button} textAlign="center">
          <Button
            type="submit"
            size="large"
            variant="contained"
            endIcon={<PersonAddAltIcon />}
          >
            Sign up
          </Button>
          <Link className={styles.link} to="/login">
            <Button size="large" variant="contained" endIcon={<LoginIcon />}>
              Sign in
            </Button>
          </Link>
        </Box>
      </form>
    </Paper>
  );
};
