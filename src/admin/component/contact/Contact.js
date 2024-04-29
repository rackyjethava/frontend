

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
import { contactContext } from '../../../context/ContactContext';




function Contact(props) {
    const [open, setOpen] = React.useState(false);
    const [editing, setEditing] = useState(false);


    const dispatch = useDispatch()

    useEffect(() => {
        contact.getContact()
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

  
    const handleClose = () => {
        setOpen(false);
        formik.resetForm();

    };

    const contact=useContext(contactContext)

    let contactSchema = object({
        address: string().required(),
        email: string().email().required(),
        telephon: number().required()
    });

    const formik = useFormik({
        initialValues: {
            address: '',
            email: '',
            telephon: ''
        },
        validationSchema: contactSchema,
        onSubmit: (values, { resetForm }) => {
           if(editing){
        
           }else{
            contact.addContact(values)
           }
           handleClose();
           formik.resetForm();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;
    const columns = [
        { field: 'address', headerName: 'Address', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'telephon', headerName: 'Telephon', width: 200 },
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
                    Contact  data open
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}

                >
                    <DialogTitle>Contact  Data</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="address"
                                name="address"
                                label="address"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                error={touched.address && errors.address ? errors.address : false}
                                helperText={touched.address && errors.address ? errors.address : ""}
                            />
                            <TextField
                                margin="dense"
                                id="email"
                                name="email"
                                label="email"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={touched.email && errors.email ? errors.email : false}
                                helperText={touched.email && errors.email ? errors.email : ""}
                            /><TextField
                                margin="dense"
                                id="telephon"
                                name="telephon"
                                label="telephon"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.telephon}
                                error={touched.telephon && errors.telephon ? errors.telephon : false}
                                helperText={touched.telephon && errors.telephon ? errors.telephon : ""}
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
                        rows={contact.contact}
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

export default Contact;