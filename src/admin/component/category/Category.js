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
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getCategory, updateCategory } from '../../../redux/action/Category.action';

export default function Category() {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const categorydata=useSelector((state)=>state.category)

    const contectSchema = object({
        name: string().required(),
        description: string().required().min(10),
    });

    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(getCategory());
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: contectSchema,
        onSubmit: (values, { resetForm }) => {
            if (editing) {
                dispatch(updateCategory({ ...values, _id: editing._id }));
            } else {
                dispatch(addCategory(values));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setEditing(false);
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setEditing(data);
    }



    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => (
                <>
                     <IconButton onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => dispatch(deleteCategory(params.row._id))}>
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
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{editing ? 'Update' : 'Add'} Category</DialogTitle>
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
                            error={touched.name && Boolean(errors.name)}
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
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description ? errors.description : ""}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">{editing ? 'Update' : 'Add'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={categorydata.category}
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
