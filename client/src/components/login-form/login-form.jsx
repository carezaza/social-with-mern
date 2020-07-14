import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography } from "@material-ui/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { connect } from "react-redux";
import { LoginStart } from "../../redux/auth/auth.actions";

import FormSubmit from "../form-submit/form-submit";

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email.")
    .required("This field is required."),
  password: yup
    .string()
    .required("This field is required.")
    .min(5, "Please Enter less then 5 letters"),
});

const LoginForm = ({ handleClose, LoginStart }) => {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const onSubmit = async (data) => {
    LoginStart(data);
  };
  return (
    <FormSubmit handleClose={handleClose} handleSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" align="center">
        LOGIN
      </Typography>
      <TextField
        id="email"
        label="Email"
        name="email"
        margin="normal"
        inputRef={register}
        error={!!errors.email}
        autoComplete="off"
      />
      {errors.email && (
        <Typography style={{ color: "red" }}>{errors.email.message}</Typography>
      )}
      <TextField
        id="password"
        label="Password"
        name="password"
        type="password"
        margin="normal"
        inputRef={register}
        error={!!errors.password}
        autoComplete="off"
      />
      {errors.password && (
        <Typography style={{ color: "red" }}>
          {errors.password.message}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ margin: "15px 0" }}
      >
        Login
      </Button>
    </FormSubmit>
  );
};

export default connect(null, { LoginStart })(LoginForm);
