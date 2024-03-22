import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

export default function Category() {
    const [open, setOpen] = React.useState(false);
    const [categorydata, setdata] = useState([]);
    const [editing, setEditing] = useState(null);
    let contectSchema = object({
        name: string().required(),
        description: string().required().min(10),

    });

    const getdata = () => {
        let localdata = JSON.parse(localStorage.getItem('category'));

        if (localdata) {
            setdata(localdata)
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: contectSchema,
        onSubmit: (values, { resetForm }) => {
            if (editing) {
                handleUpdate(values)
            } else {
                handleAdd(values)
            }
            resetForm()
            handleClose(true)
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const rno = Math.floor(Math.random() * 10000);

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setEditing(null)
    };

    const handleAdd = (data) => {
        let localdata = JSON.parse(localStorage.getItem("category"))

        if (localdata) {
            localdata.push({ ...data, id: rno });
            localStorage.setItem("category", JSON.stringify(localdata))

        } else {
            localStorage.setItem("category", JSON.stringify([{ ...data, id: rno }]))
        }

        getdata()
    }

    const handleDelete = (data) => {
        let localdata = JSON.parse(localStorage.getItem("category"))

        const fdata = localdata.filter((v) => v.id !== data.id)

        localStorage.setItem("category", JSON.stringify(fdata))
        getdata()

    };

    const handleEdit = (data) => {
        // console.log(data);

        formik.setValues(data)
        setOpen(true);
        setEditing(data);
    }

    const handleUpdate = (data) => {
        let localdata = JSON.parse(localStorage.getItem("category"))

        const index = localdata.findIndex((v) => v.id === data.id)
        localdata[index] = data

        localStorage.setItem("category", JSON.stringify(localdata))

        getdata()
    }

    const columns = [

        { field: 'name', headerName: 'name', width: 130 },
        { field: 'description', headerName: 'description', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row)}>
                        <Delete />
                    </IconButton>
                </>
            ),
        },

    ];



    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Subscribe</DialogTitle>
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
                            error={touched.name && errors.name ? errors.name : false}
                            helperText={touched.name && errors.name ? errors.name : ""}
                        />

                        <TextField
                            margin="dense"
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            error={touched.description && errors.description ? errors.description : false}
                            helperText={touched.description && errors.description ? errors.description : ""}

                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleClickOpen} type="submit">{editing ?'Updat':'Add'}</Button>
                        </DialogActions>
                    </DialogContent>
                </form>

            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={categorydata}
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
        </React.Fragment>
    );
}

