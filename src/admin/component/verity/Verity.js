import React, { useContext, useEffect, useState } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { VerityContext } from '../../../context/VerityContext';
import axios from 'axios';


function Verity(props) {
    const [editing, setEditing] = useState(false);
    const[verity,setverity]=useState();
    console.log(verity);
    const  { coupons, addCoupon, updateCoupon, deleteCoupon } = useContext(VerityContext);

    const [open, setOpen] = React.useState(false);
    // const [editing, setEditing] = useState(false);

    const coupon = useSelector((state) => state.coupon)
    // console.log(coupon);

    const dispatch = useDispatch()


    useEffect(() => {
        axios.get('http://localhost:8000/verity')
         .then(response => {
            setverity(response.data);
          })
         .catch(error => {
            console.log(error);
          });
      }, []);
    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
        formik.resetForm();

    };

    let nameSchema = object({
        name: string().required(),
        description: string().required(),

    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: nameSchema,
        onSubmit: (values, { resetForm }) => {

            axios.post('http://localhost:8000/verity', values)
            .then(response => {
               console.log(response.data);
               dispatch(addCoupon(response.data))
             })
            .catch(error => {
               console.log(error);
             });

            console.log(values);
            if (editing) {
                dispatch(updateCoupon(values))
            } else {
     
            }

            resetForm();
            handleClose();
            formik.resetForm();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;
    const columns = [
        { field: 'name', headerName: 'name', width: 130 },
        { field: 'description', headerName: 'description', width: 200 },
        {
            field: 'action',
            type: 'button',
            renderCell: (params) => {
                return <>
                    <IconButton >
                        <DeleteIcon onClick={() => handleDelete(params.row.id)} />
                    </IconButton>
                    <IconButton >
                        <EditIcon onClick={() => handleEdit(params.row)} />
                    </IconButton>
                </>
            }
        }
    ];


    const handleDelete = (id) => {
        dispatch(deleteCoupon(id));

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
                                id="name"
                                name="name"
                                label="name"
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
                            />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit" >{editing ? 'Updat' : 'Add'}</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>
                </Dialog>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={verity}
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

export default Verity;