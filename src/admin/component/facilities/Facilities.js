import React from "react";
import { useFormik } from "formik";
import { object, string, date, mixed } from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function Form() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Validation schema using Yup
  const validationSchema = object({
    name: string()
      .required("Name is required")
      .trim()
      .matches(/[a-zA-Z]+/, "Only alphabets are allowed"),
    age: date()
      .required("Date of Birth is required")
      .test("age-year-check", "You must be over 18 years old", (val) => {
        if (!val) return false;
        const today = new Date();
        const birthDate = new Date(val);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      }),
    email: string().email("Invalid email address").required("Email is required"),
    password: string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must contain 8 characters, one uppercase, one lowercase, one number, and one special character"
      ),
    apointment_date: date()
      .required("Appointment date is required")
      .min(new Date(), "Appointment date cannot be in the past"),
    message: string()
      .required("Message is required")
      .matches(/^(\S+\s?)*\S+$/, "Please add only one space in your message"),
    file: mixed()
      .required("File is required")
      .test("file-size", "File size should be less than 2MB", (val) => val && val.size <= 2 * 1024 * 1024)
      .test(
        "file-type",
        "Only JPEG, PDF, PNG, and SVG files are allowed",
        (val) => val && ["image/jpeg", "application/pdf", "image/png", "image/svg+xml"].includes(val.type)
      ),
    country: string()
      .required("Country is required")
      .oneOf(["INDIA", "USA", "CANADA"], "Invalid country"),
    gender: string()
      .required("Gender is required")
      .oneOf(["male", "female"], "Invalid gender"),
    hobbies: string()
      .required("Hobbies are required")
      .matches(/^[\w\s,]+$/, "Invalid format for hobbies"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      password: "",
      apointment_date: "",
      message: "",
      file: null,
      country: "",
      gender: "",
      hobbies: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Form</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
            />
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
            />
            <TextField
              required
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
            />
            <FormControl component="fieldset" margin="dense" fullWidth>
              <InputLabel>Gender</InputLabel>
              <FormControlLabel
                control={<Checkbox name="gender" value="male" checked={formik.values.gender === "male"} onChange={formik.handleChange} />}
                label="Male"
              />
              <FormControlLabel
                control={<Checkbox name="gender" value="female" checked={formik.values.gender === "female"} onChange={formik.handleChange} />}
                label="Female"
              />
              {formik.touched.gender && formik.errors.gender ? (
                <div style={{ color: "red", fontSize: "12px" }}>{formik.errors.gender}</div>
              ) : null}
            </FormControl>
            <TextField
              required
              margin="dense"
              id="age"
              name="age"
              label="Date of Birth"
              type="date"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age ? formik.errors.age : ""}
            />
            <TextField
              required
              margin="dense"
              id="apointment_date"
              name="apointment_date"
              label="Appointment Date"
              type="date"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.apointment_date}
              error={formik.touched.apointment_date && Boolean(formik.errors.apointment_date)}
              helperText={formik.touched.apointment_date && formik.errors.apointment_date ? formik.errors.apointment_date : ""}
            />
            <TextField
              id="message"
              name="message"
              label="Message"
              multiline
              rows={4}
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message ? formik.errors.message : ""}
            />
            <TextField
              required
              margin="dense"
              id="file"
              name="file"
              type="file"
              fullWidth
              variant="standard"
              onChange={(event) => {
                formik.setFieldValue("file", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.file && Boolean(formik.errors.file)}
              helperText={formik.touched.file && formik.errors.file ? formik.errors.file : ""}
            />
            <FormControl margin="dense" fullWidth variant="standard">
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                id="country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="INDIA">INDIA</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="CANADA">CANADA</MenuItem>
              </Select>
              {formik.touched.country && formik.errors.country ? (
                <div style={{ color: "red", fontSize: "12px" }}>{formik.errors.country}</div>
              ) : null}
            </FormControl>
            <TextField
              required
              margin="dense"
              id="hobbies"
              name="hobbies"
              label="Hobbies"
              type="text"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hobbies}
              error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}
              helperText={formik.touched.hobbies && formik.errors.hobbies ? formik.errors.hobbies : ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default Form;
