import React from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import useUserForm from "../hooks/useUserForm";

const Register = () => {
  const [
    user,
    ,
    handleChange,
    handleSubmitRegister,
    ,
    errors,
    handleReset,
    handleCloseSnackbar,
    snackbarOpen,
    snackbarMessage,
  ] = useUserForm("register");

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="form_container p-5">
        <h3 className="text-center mb-4">REGISTER</h3>

        <form
          onSubmit={handleSubmitRegister}
          onReset={handleReset}
          className="row g-3"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                className="input"
                variant="outlined"
                label="First Name *"
                name="name.first"
                value={user.name.first}
                onChange={handleChange}
                error={!!errors.first}
                helperText={errors.first}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Middle Name"
                // name="middle"
                name="name.middle"
                value={user.name.middle}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Last Name *"
                // name="last"
                name="name.last"
                value={user.name.last}
                onChange={handleChange}
                error={!!errors.last}
                helperText={errors.last}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Phone *"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email *"
                name="email"
                value={user.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Password *"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Image"
                type="url"
                // name="url"
                name="image.url"
                value={user.image.url}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Image Alt"
                type="text"
                // name="alt"
                name="image.alt"
                value={user.image.alt}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="State"
                type="text"
                // name="state"
                name="address.state"
                value={user.address.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Country *"
                type="text"
                // name="country"
                name="address.country"
                value={user.address.country}
                onChange={handleChange}
                error={!!errors.country}
                helperText={errors.country}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="City *"
                type="text"
                // name="city"
                name="address.city"
                value={user.address.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Street *"
                type="text"
                // name="street"
                name="address.street"
                value={user.address.street}
                onChange={handleChange}
                error={!!errors.street}
                helperText={errors.street}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="House Number *"
                type="number"
                // name="houseNumber"
                name="address.houseNumber"
                value={user.address.houseNumber}
                onChange={handleChange}
                error={!!errors.houseNumber}
                helperText={errors.houseNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Zip Code *"
                type="number"
                // name="zip"
                name="address.zip"
                value={user.address.zip}
                onChange={handleChange}
                error={!!errors.zip}
                helperText={errors.zip}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={user.isBusiness}
                    onChange={handleChange}
                    name="isBusiness"
                  />
                }
                label="Signup as Business"
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                type="reset"
                variant="outlined"
                color="secondary"
                fullWidth
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
          {errors.global && (
            <Grid item xs={12}>
              <div className="error-message" style={{ color: "red" }}>
                {errors.global}
              </div>
            </Grid>
          )}
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity="success"
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Register;
