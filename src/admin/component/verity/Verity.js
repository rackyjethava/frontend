import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { number, object, string } from "yup";
import { useFormik } from "formik";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { VerityContext } from "../../../context/VerityContext";



function Verity(props) {
    const VerityContext = useContext(VerityContext)


    useEffect(()=>{
        VerityContext.getVerity()
    },[])


    console.log(VerityContext.verity);
    const [edit, setEdit] = useState(false)
    const columns = [
      { field: "name", headerName: "Name", width: 130 },
      { field: "number", headerName: "Number", width: 130 },
      {
        field: "country",
        headerName: "country",
        type: "text",
        width: 90,
      },
      {
        field: "Action",
        headerName: "Action",
        width: 150,
        renderCell: ({ row }) => (
          <>
            <IconButton onClick={() => handleEdit(row)} variant="contained">
              <EditIcon />
            </IconButton>
  
            <IconButton onClick={() => handleDelete(row.id)} variant="contained">
              <DeleteIcon />
            </IconButton>
          </>
        ),
      },
    ];
  
  
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleDelete = (id) => {
        VerityContext.deketeVerity(id)
    };
  
    const handleEdit = (data) => {
      console.log(data);
      formik.setValues(data)
      setEdit(true)
      setOpen(true);
    }
  
    let introSchema = object({
      name: string().required(),
      number: number().required(),
      country: string().required(),
    });
  
    const formik = useFormik({
      initialValues: {
        name: "",
        number: "",
        country: "",
      },
      validationSchema: introSchema,
      onSubmit: (values,{resetForm}) => {
        if (edit) {
            VerityContext.editeVerty(values)
        } else {
            VerityContext.deketeVerity(values)
        }
        resetForm()
        handleClose();
      },
    });
  
    const { handleBlur, handleChange, handleSubmit, values, touched, errors } =
      formik;
  
    return (
      <div>
        <React.Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
            Open Crud Box
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
              <DialogTitle>Crud</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={touched.name && errors.name ? true : false}
                  helperText={touched.name && errors.name ? errors.name : ""}
                />
                <TextField
                  margin="dense"
                  id="number"
                  name="number"
                  label="Number"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.number}
                  error={touched.number && errors.number ? true : false}
                  helperText={touched.number && errors.number ? errors.number : ""}
                />
                <TextField
                  margin="dense"
                  id="country"
                  name="country"
                  label="Country"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                  error={touched.country && errors.country ? true : false}
                  helperText={touched.country && errors.country ? errors.country : ""}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">{edit ? 'Update' : 'Add'}</Button>
              </DialogActions>
            </form>
          </Dialog>
        </React.Fragment>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={VerityContext.verity}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
    );
}

export default Verity;