// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';

// import DialogTitle from '@mui/material/DialogTitle';
// import { DataGrid } from '@mui/x-data-grid';
// import { useFormik } from 'formik';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { date, number, object, string } from 'yup';


// export default function Coupon() {
//     const [open, setOpen] = React.useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

// let couponSchema = object({
//     Coupon: string().required(),
//     persantage: number().required(),
//     expairy: date().required()
// });

//     const formik = useFormik({
//         initialValues: {
//             Coupon: '',
//             persantage: '',
//             expairy: '',
//         },
//         validationSchema: couponSchema,
//         onSubmit:(values, { resetForm }) => {
//             console.log(values);
//         },
//     });

//     const handleDelete=()=>{

//     }

//     const handleEdit=()=>{

//     }


//     const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;


//     const columns = [
//         { field: 'Coupon', headerName: 'Coupon', width: 70 },
//         { field: 'persantage', headerName: ' persantage', width: 130 },
//         { field: 'expairy', headerName: 'expairy', width: 130 },
//         {
//             field: 'action',
//             type: 'button',
//             renderCell: (params) => {
//                 return <>
//                     <IconButton onClick={() => handleDelete()}>
//                         <DeleteIcon />
//                     </IconButton>
//                     <IconButton onClick={() => handleEdit()}>
//                         <EditIcon />
//                     </IconButton>
//                 </>
//             }
//         }

//     ];

//     const rows = [
//         { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//         { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//         { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//         { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//         { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//         { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//         { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//         { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//         { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//     ];

//     return (
//         <React.Fragment>
//             <Button variant="outlined" onClick={handleClickOpen}>
//                 Open form dialog
//             </Button>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 PaperProps={{
//                     component: 'form',
//                     onSubmit: (event) => {

//                     },
//                 }}
//             >
//                 <DialogTitle>Subscribe</DialogTitle>
//                 <form onSubmit={handleSubmit}>
//                     <DialogContent>

//                         <TextField

//                             margin="dense"
//                             id="coupon"
//                             name="coupon"
//                             label="coupon"
//                             type="text"
//                             fullWidth
//                             variant="standard"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.Coupon}
//                             error={touched.Coupon && errors.Coupon ? errors.Coupon : false}
//                             helperText={touched.Coupon && errors.Coupon ? errors.Coupon : ""}
//                         />

//                         <TextField

//                             margin="dense"
//                             id="persanteg"
//                             name="persanteg"
//                             label="persanteg"
//                             type="number"
//                             fullWidth
//                             variant="standard"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.persantage}
//                             error={touched.persantage && errors.persantage ? errors.persantage : false}
//                             helperText={touched.persantage && errors.persantage ? errors.persantage : ""}
//                         />

//                         <TextField

//                             margin="dense"
//                             id="expairy"
//                             name="expairy"
//                             label="expairy"
//                             type="date"
//                             fullWidth
//                             variant="standard"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.expairy}
//                             error={touched.expairy && errors.expairy ? errors.expairy : false}
//                             helperText={touched.expairy && errors.expairy ? errors.expairy : ""}
//                         />
//                         <DialogActions>
//                             <Button onClick={handleClose}>Cancel</Button>
//                             <Button type="submit">Subscribe</Button>
//                         </DialogActions>
//                     </DialogContent>
//                 </form>
//             </Dialog>
//             <div style={{ height: 400, width: '100%' }}>
//                 <DataGrid
//                     rows={rows}
//                     columns={columns}
//                     initialState={{
//                         pagination: {
//                             paginationModel: { page: 0, pageSize: 5 },
//                         },
//                     }}
//                     pageSizeOptions={[5, 10]}
//                     checkboxSelection
//                 />
//             </div>
//         </React.Fragment>

//     );
// }

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
import { addcoupontdata } from '../../../redux/slice/coupon.slice';

function Products(props) {
    const [open, setOpen] = React.useState(false);
    const [editing, setEditing] = useState(false);


    const dispatch = useDispatch()




    // console.log(products);

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
            console.log(values);
            dispatch(addcoupontdata(values))
            resetForm();
            handleClose();

        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;
    const columns = [
        { field: 'Coupon', headerName: 'Coupon', width: 130 },
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

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];

    const handleDelete = () => {
        console.log();
       
    }

    const handleEdit = () => {


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
                        rows={rows}
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