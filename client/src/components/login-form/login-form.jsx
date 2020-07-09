import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography } from "@material-ui/core";

import FormSubmit from "../form-submit/form-submit";

const LoginForm = ({ handleClose }) => {
  const methods = useForm();
  const { handleSubmit, control } = methods;
  const onSubmit = (data) => console.log(data);
  return (
    <FormSubmit handleClose={handleClose} handleSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" align="center">
        LOGIN
      </Typography>
      <Controller
        as={TextField}
        label="Email"
        name="email"
        control={control}
        style={{ margin: "10px 0" }}
        defaultValue=""
      />

      <Controller
        as={TextField}
        label="Password"
        name="password"
        style={{ margin: "10px 0" }}
        control={control}
        defaultValue=""
      />
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

export default LoginForm;
