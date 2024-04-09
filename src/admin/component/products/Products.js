import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DataGrid } from '@mui/x-data-grid';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { add_facilities, edite_facilities, get_facilities, remove_facalty } from '../../../redux/action/facilities.action';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Spinner } from 'reactstrap';
import { addproduct, deletproduct, editeProduct, getproduct } from '../../../redux/action/Product.action';

function Products(props) {
    const [open, setOpen] = React.useState(false);
    const [editing, setEditing] = useState(false);


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getproduct())
    }, [])


    const products = useSelector((state) => state.products)
    // console.log(products);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setEditing(false)
    };

    let facilitySchema = object({
        name: string().required(),
        description: string().required(),
        price: number().required()
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: ''
        },
        validationSchema: facilitySchema,
        onSubmit: (values, { resetForm }) => {
            if (editing) {
                dispatch(editeProduct(values))
            } else {
                dispatch(addproduct(values))
            }

            resetForm();
            handleClose();

        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;
    const columns = [
        { field: 'name', headerName: 'Facility Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'price', headerName: 'price $', width: 200 },
        {
            field: 'action',
            type: 'button',
            renderCell: (params) => {
                return <>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            }
        }
    ];

    const handleDelete = (id) => {
        console.log();
        dispatch(deletproduct(id))
    }

    const handleEdit = (data) => {
        console.log(data);

        formik.setValues(data)
        setOpen(true)
        setEditing(true)
    }


    return (

        <>
            {
                products.isloading ? <p>loading....</p> :
                products.error?<p>{products.error}</p>:
                    <>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Product  data open
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}

                        >
                            <DialogTitle>Facilities  Data</DialogTitle>
                            <form onSubmit={handleSubmit}>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Facilities name"
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
                                        label="description"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        error={touched.description && errors.description ? errors.description : false}
                                        helperText={touched.description && errors.description ? errors.description : ""}
                                    /><TextField
                                        margin="dense"
                                        id="price"
                                        name="price"
                                        label="price"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                        error={touched.price && errors.price ? errors.price : false}
                                        helperText={touched.price && errors.price ? errors.price : ""}
                                    />
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit">{editing ? 'Updat' : 'Add'}</Button>
                                    </DialogActions>
                                </DialogContent>
                            </form>
                        </Dialog>

                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={products.products}
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
                    </>
            }


        </>
    );
}

export default Products;