import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography } from "@material-ui/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import FormSubmit from "../form-submit/form-submit";
import { connect } from "react-redux";
import { RegisterStart } from "../../redux/auth/auth.actions";
import { useHistory } from "react-router-dom";

const RegisterSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("This field is required.")
    .min(3, "Please Enter less then 3 letters")
    .max(15, "This field limit 15 letters")
    .test(
      "firstName",
      "This field must not have space.",
      (value) => !value.includes(" ")
    ),
  lastName: yup
    .string()
    .required("This field is required.")
    .min(3, "Please Enter less then 3 letters")
    .max(15, "This field limit 15 letters")
    .test(
      "lastName",
      "This field must not have space. ",
      (value) => !value.includes(" ")
    ),
  email: yup
    .string()
    .email("Invalid email.")
    .required("This field is required."),
  password: yup
    .string()
    .required("This field is required.")
    .min(3, "Please Enter less then 3 letters"),
  confirmPassword: yup
    .string()
    .required("This field is required.")
    .min(3, "This field at least 3 characters.")
    .oneOf([yup.ref("password"), null], "Password not match."),
});

const RegisterForm = ({ handleClose, RegisterStart }) => {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  let history = useHistory();
  const onSubmit = async (data) => {
    const { firstName, lastName, password, email } = data;
    RegisterStart(
      {
        firstName,
        lastName,
        password,
        email,
      },
      history
    );
  };
  return (
    <FormSubmit handleClose={handleClose} handleSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" align="center">
        REGISTER
      </Typography>
      <TextField
        id="firstName"
        label="FirstName"
        name="firstName"
        margin="normal"
        inputProps={{ minLength: 3, maxLength: 15 }}
        inputRef={register}
        error={!!errors.firstName}
        autoComplete="off"
      />
      {errors.firstName && (
        <Typography style={{ color: "red" }}>
          {errors.firstName.message}
        </Typography>
      )}
      <TextField
        id="lastName"
        label="LastName"
        name="lastName"
        margin="normal"
        inputProps={{ minLength: 3, maxLength: 15 }}
        inputRef={register}
        error={!!errors.lastName}
        autoComplete="off"
      />
      {errors.lastName && (
        <Typography style={{ color: "red" }}>
          {errors.lastName.message}
        </Typography>
      )}
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
      <TextField
        id="confirmPassword"
        label="ConfirmPassword"
        name="confirmPassword"
        margin="normal"
        type="password"
        inputRef={register}
        error={!!errors.email}
        autoComplete="off"
      />
      {errors.confirmPassword && (
        <Typography style={{ color: "red" }}>
          {errors.confirmPassword.message}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ margin: "15px 0" }}
      >
        Register
      </Button>
    </FormSubmit>
  );
};

export default connect(null, { RegisterStart })(RegisterForm);
