import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addSalespeople, deleteSalespeople, getSalespeople, updateSalespeople } from '../../../redux/slice/salsepeople.slice';


export default function Salespeople() {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const salespeopleData = useSelector((state) => state.salespeople.salespeople);
    const dispatch = useDispatch();

    const salespeopleSchema = object({
        SNAME: string().required(),
        CITY: string().required(),
        COMM: number().required().positive(),
    });


    useEffect(() => {
        dispatch(getSalespeople());
    }, [dispatch,editing]);

    const formik = useFormik({
        initialValues: {
            SNAME: '',
            CITY: '',
            COMM: '',
        },
        validationSchema: salespeopleSchema,
        onSubmit: (values, { resetForm }) => {
            if (editing) {
                dispatch(updateSalespeople({ ...values, SNUM: editing.SNUM }));
            } else {
                dispatch(addSalespeople(values));
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
        setEditing(null);
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setEditing(data);
    };

    const columns = [
        { field: 'SNAME', headerName: 'Name', width: 150 },
        { field: 'CITY', headerName: 'City', width: 150 },
        { field: 'COMM', headerName: 'Commission', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => dispatch(deleteSalespeople(params.row.SNUM))}>
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
                    <DialogTitle>{editing ? 'Update' : 'Add'} Salesperson</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="SNAME"
                            name="SNAME"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.SNAME}
                            error={touched.SNAME && Boolean(errors.SNAME)}
                            helperText={touched.SNAME && errors.SNAME ? errors.SNAME : ""}
                        />
                        <TextField
                            margin="dense"
                            id="CITY"
                            name="CITY"
                            label="City"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.CITY}
                            error={touched.CITY && Boolean(errors.CITY)}
                            helperText={touched.CITY && errors.CITY ? errors.CITY : ""}
                        />
                        <TextField
                            margin="dense"
                            id="COMM"
                            name="COMM"
                            label="Commission"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.COMM}
                            error={touched.COMM && Boolean(errors.COMM)}
                            helperText={touched.COMM && errors.COMM ? errors.COMM : ""}
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
                    rows={salespeopleData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    getRowId={(row) => row.SNUM}
                />
            </div>
        </React.Fragment>
    );
}
