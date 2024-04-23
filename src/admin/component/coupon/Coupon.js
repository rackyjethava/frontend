

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
import { addcoupontdata, deleteCoupon, editeCoupon, getcoupontdata } from '../../../redux/slice/coupon.slice';

function Products(props) {
    const [open, setOpen] = React.useState(false);
    const [editing, setEditing] = useState(false);

    const coupon=useSelector((state)=> state.coupon)
    console.log(coupon);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getcoupontdata())
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

  
    const handleClose = () => {
        setOpen(false);
        formik.resetForm();

    };

    let couponSchema = object({
        coupon: string().required(),
        persantage: number().required(),
        expairy: date().required()
    });

    const formik = useFormik({
        initialValues: {
            coupon: '',
            persantage: '',
            expairy: ''
        },
        validationSchema: couponSchema,
        onSubmit: (values, { resetForm }) => {
           if(editing){
            dispatch(editeCoupon(values))
           }else{
            dispatch(addcoupontdata(values))
           }
           handleClose();
           formik.resetForm();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;
    const columns = [
        { field: 'coupon', headerName: 'Coupon', width: 130 },
        { field: 'persantage', headerName: 'persantage', width: 200 },
        { field: 'expairy', headerName: 'expairy', width: 200 },
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
        dispatch(deleteCoupon(id))
       
    }

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setEditing(true);
    }


    return (

        <>
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
                                id="coupon"
                                name="coupon"
                                label="coupon"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.coupon}
                                error={touched.coupon && errors.coupon ? errors.coupon : false}
                                helperText={touched.coupon && errors.coupon ? errors.coupon : ""}
                            />
                            <TextField
                                margin="dense"
                                id="persantage"
                                name="persantage"
                                label="persantage"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.persantage}
                                error={touched.persantage && errors.persantage ? errors.persantage : false}
                                helperText={touched.persantage && errors.persantage ? errors.persantage : ""}
                            /><TextField
                                margin="dense"
                                id="expairy"
                                name="expairy"
                                label="expairy"
                                type="date"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.expairy}
                                error={touched.expairy && errors.expairy ? errors.expairy : false}
                                helperText={touched.expairy && errors.expairy ? errors.expairy : ""}
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
                        rows={coupon.coupons}
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

        </>
    );
}

export default Products;