import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography } from "@material-ui/core";

import FormSubmit from "../form-submit/form-submit";

const RegisterForm = ({ handleClose }) => {
  const methods = useForm();
  const { handleSubmit, control } = methods;
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <FormSubmit handleClose={handleClose} handleSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" align="center">
        REGISTER
      </Typography>
      <Controller
        as={TextField}
        label="Username"
        name="username"
        control={control}
        style={{ margin: "10px 0" }}
        defaultValue=""
        type="text"
        required
      />
      <Controller
        as={TextField}
        label="Email"
        name="email"
        control={control}
        style={{ margin: "10px 0" }}
        defaultValue=""
        type="email"
        required
      />
      <Controller
        as={TextField}
        label="Password"
        name="password"
        style={{ margin: "10px 0" }}
        control={control}
        defaultValue=""
        required
      />
      <Controller
        as={TextField}
        label="ConfirmPassword"
        name="confirmPassword"
        style={{ margin: "10px 0" }}
        control={control}
        defaultValue=""
        required
      />
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

export default RegisterForm;
