import React, { useState } from "react";
import { Formik } from "formik";
import { object, ref, string } from "yup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";

import Spinner from "./Spinner";
import Alert from "./Alert";

const useStyles = makeStyles({
  App: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: " 1 0 auto",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    flex: "1 1 auto",
  },

  formWrapper: {
    margin: "100px auto",
  },

  formError: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});

export default function ChangePassword(props) {
  const [passChangeSuccess, setPassChangeSuccess] = useState(false);
  const classes = useStyles();
  const handleModalClose = () => {
    this.setState(() => ({
      passChangeSuccess: false,
    }));
  };

  const renderModal = () => {
    const onClick = () => {
      setPassChangeSuccess(false);
    };

    return (
      <Alert
        isOpen={passChangeSuccess}
        onClose={handleModalClose}
        handleSubmit={onClick}
        title="Password Reset"
        text="Your password was changed successfully"
        submitButtonText="Done"
      />
    );
  };

  const handleSubmit = ({
    currentPass,
    newPass,
    confirmPass,
    setSubmitting,
    resetForm,
  }) => {
    // fake async login
    setTimeout(async () => {
      setSubmitting(false);

      setPassChangeSuccess(true);

      resetForm();
    }, 1000);
  };

  return (
    <Formik
      initialValues={{
        currentPass: "",
        newPass: "",
        confirmPass: "",
      }}
      validationSchema={object().shape({
        currentPass: string().required("Current password is required"),
        newPass: string().required("New password is required"),
        confirmPass: string()
          .oneOf([ref("newPass")], "Passwords do not match")
          .required("Password is required"),
      })}
      onSubmit={(
        { currentPass, newPass, confirmPass },
        { setSubmitting, resetForm }
      ) =>
        handleSubmit({
          currentPass,
          newPass,
          confirmPass,
          setSubmitting,
          resetForm,
        })
      }
      render={(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          isSubmitting,
        } = props;
        return isSubmitting ? (
          <Spinner />
        ) : (
          <Paper
            className={`${classes.form} ${classes.formWrapper}`}
            elevation={10}
          >
            <form className={classes.form} onSubmit={handleSubmit}>
              <FormControl fullWidth margin="dense">
                <InputLabel
                  htmlFor="password-current"
                  error={Boolean(touched.currentPass && errors.currentPass)}
                >
                  {"Current Password"}
                </InputLabel>
                <Input
                  id="password-current"
                  name="currentPass"
                  type="password"
                  value={values.currentPass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.currentPass && errors.currentPass)}
                />
                <FormHelperText
                  error={Boolean(touched.currentPass && errors.currentPass)}
                >
                  {touched.currentPass && errors.currentPass
                    ? errors.currentPass
                    : ""}
                </FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                margin="dense"
                error={Boolean(touched.newPass && errors.newPass)}
              >
                <InputLabel
                  htmlFor="password-new"
                  error={Boolean(touched.newPass && errors.newPass)}
                >
                  {"New Password"}
                </InputLabel>
                <Input
                  id="password-new"
                  name="newPass"
                  type="password"
                  value={values.newPass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.newPass && errors.newPass)}
                />
                <FormHelperText
                  error={Boolean(touched.newPass && errors.newPass)}
                >
                  {touched.newPass && errors.newPass ? errors.newPass : ""}
                </FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                margin="dense"
                error={Boolean(touched.confirmPass && errors.confirmPass)}
              >
                <InputLabel
                  htmlFor="password-confirm"
                  error={Boolean(touched.confirmPass && errors.confirmPass)}
                >
                  {"Confirm Password"}
                </InputLabel>
                <Input
                  id="password-confirm"
                  name="confirmPass"
                  type="password"
                  value={values.confirmPass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.confirmPass && errors.confirmPass)}
                />
                <FormHelperText
                  error={Boolean(touched.confirmPass && errors.confirmPass)}
                >
                  {touched.confirmPass && errors.confirmPass
                    ? errors.confirmPass
                    : ""}
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={Boolean(!isValid || isSubmitting)}
                style={{ margin: "16px" }}
              >
                {"Reset Password"}
              </Button>
            </form>
            {renderModal()}
          </Paper>
        );
      }}
    />
  );
}
