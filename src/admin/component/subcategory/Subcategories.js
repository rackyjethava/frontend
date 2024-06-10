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
import { useDispatch, useSelector } from 'react-redux';
import { addsubcategory, deleteSubcategory, getsubcategory, updateSubCategory } from '../../../redux/slice/subcategories.slice';
import { getCategory } from '../../../redux/action/Category.action';

export default function Subcategories() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [editing, setEditing] = useState(null);
    const categorydata = useSelector((state) => state.category);
    const subcategory = useSelector((state) => state.subcategory);

    let contectSchema = object({
        name: string().required(),
        description: string().required().min(10),
        category_id: string().required(),
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getsubcategory());
        dispatch(getCategory());
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            category_id:'',
        },
        validationSchema: contectSchema,
        onSubmit: (values, { resetForm }) => {
            if (editing) {
                dispatch(updateSubCategory(values));
            } else {
                dispatch(addsubcategory(values));
                console.log(values);

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

    const handleDelete = (id) => {
        dispatch(deleteSubcategory(id));
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setEditing(data);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        {
            field: 'category_id',
            headerName: 'Category',
            width: 130,
            valueGetter: (params) => {
              const categoryId = params.row.category_id;
              const categoryName = categorydata.category.find((category) => category._id === categoryId)?.name;
              return categoryName;
            },
          },
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
                    <IconButton onClick={() => handleDelete(params.row._id)}>
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
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
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
                            helperText={touched.description && errors.description}
                        />
                        <select
                            id="category_id"
                            name="category_id"
                            onChange={handleChange}
                            value={values.category_id}
                        >
                            {categorydata.category.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{editing ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={subcategory.subcategory}
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
