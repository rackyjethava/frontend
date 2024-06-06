import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

export default function Subcategories() {
    const [open, setOpen] = React.useState(false);
    const [categorydata, setcategorydata] = useState([]);
    const [data,setdata]=useState([])
    const [editing, setEditing] = useState(null);
    let contectSchema = object({
        name: string().required(),
        description: string().required().min(10),

    });

    const getdata = async () => {
        console.log("data found");
        try {
            const response = await fetch("http://localhost:8000/api/v1/sub_categories/list-subcategories");
            const data = await response.json()
            console.log(data);
            setdata(data.data)
        } catch (error) {

        }
    }

    const getcategorydata=async ()=>{
        try {
            const response = await fetch("http://localhost:8000/api/v1/categories/list-categories");
            const data = await response.json()
            console.log(data);
            setcategorydata(data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getdata();
        getcategorydata();
    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            category: '',
            Category_id:''
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

    const handleAdd = async (data) => {
        try {
            await fetch("http://localhost:8000/api/v1/sub_categories/add-subcategory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...data, Category_id: values.category })
            })

            getdata()
        } catch (error) {
            console.log(error);
        }

    }

    const handleDelete = async (data) => {
        // let localdata = JSON.parse(localStorage.getItem("category"))

        // const fdata = localdata.filter((v) => v.id !== data.id)

        // localStorage.setItem("category", JSON.stringify(fdata))
        try {
            await fetch("http://localhost:8000/api/v1/sub_categories/delete-subcategory/" + data._id
                , {
                    method: "DELETE",
                })
        } catch (error) {

        }
        getdata()

    };

    const handleEdit = (data) => {
        // console.log(data);

        formik.setValues(data)
        setOpen(true);
        setEditing(data);
    }

    const handleUpdate = async (data) => {
        try {
            await fetch("http://localhost:8000/api/v1/sub_categories/update-subcategory/" + data._id
                , {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
        } catch (error) {

        }

        getdata()
    }

    const columns = [

        { field: 'name', headerName: 'name', width: 130 },
        {
            field: "Category_id",
            headerName: "Category",
            width: 130,
            valueGetter: (params) => {
              const categoryId = params.row.Category_id;
              const category = categorydata.find((category) => category._id === categoryId);
              return category ? category.name : 'unknown';
            },
        },
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
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Subscribe</DialogTitle>
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

                        <select
                            id="category"
                            name="category"
                            onChange={handleChange}
                            value={values.category}
                        >
                            {categorydata.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleClickOpen} type="submit">{editing ? 'Updat' : 'Add'}</Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    getRowId={(row) => row._id}
                />
            </div>
        </React.Fragment>
    );
}

