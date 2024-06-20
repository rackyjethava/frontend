import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import { mixed, number, object, string } from 'yup';
import axios from 'axios';
import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { getsubcategory } from '../../../redux/slice/subcategories.slice';
import { getCategory } from '../../../redux/action/Category.action';

const API_URL = 'http://localhost:8000/api/v1/products';

export default function Product() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  const categories = useSelector((state) => state.category);
  const allSubcategories = useSelector((state) => state.subcategory);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getsubcategory());
    fetchProducts();
  }, [dispatch]);

  const productSchema = object({
    name: string().required('Name is required'),
    description: string().required('Description is required').min(10, 'Description must be at least 10 characters'),
    category_id: string().required('Category is required'),
    SubCategory_id: string().required('Subcategory is required'),
    price: number().required('Price is required'),
    image: mixed()
      .required('Image is required')
      .test("fileSize", "The file is too large", (value) => {
        if (value?.size) {
          return value.size <= 2 * 1024 * 1024;
        }
        return true;
      })
      .test("fileType", "Unsupported File Format", (value) => {
        if (value?.type) {
          return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        }
        return true;
      }),
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/list-product`);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      category_id: '',
      SubCategory_id: '',
      price: '',
      image: '',
    },
    validationSchema: productSchema,
    onSubmit:  (values, { resetForm }) => {
      if (editing) {
        handleUpdate(values);
      } else {
         handleAdd(values);
      }
      resetForm();
      handleClose();
    },
  });

  const { handleSubmit, handleChange, handleBlur, setFieldValue, values, touched, errors } = formik;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setEditing(null);
    setSubcategories([]); 
  };

  const handleAdd = async (data) => {
    try {
      await axios.post(`${API_URL}/add-product`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchProducts()
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleDelete = async (data) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/delete-product/${data._id}`);
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleEdit = (data) => {
    const relatedSubcategories = allSubcategories.subcategory.filter((sub) => sub.category_id === data.category_id);
    setSubcategories(relatedSubcategories);

    formik.setValues({
      ...data,
      category_id: data.category_id,
      SubCategory_id: data.SubCategory_id,
    });
    setOpen(true);
    setEditing(data);
  };

  const handleUpdate = async (data) => {
    try {
       await axios.put(`${API_URL}/update-product/${data._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchProducts()
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setFieldValue('category_id', categoryId);

    setFieldValue('SubCategory_id', '');
    const relatedSubcategories = allSubcategories.subcategory.filter((sub) => sub.category_id === categoryId);
    setSubcategories(relatedSubcategories);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    {
      field: 'category_id',
      headerName: 'Category',
      width: 150,
      valueGetter: (params) => {
        const categoryId = params.row.category_id;
        const categoryName = categories.category.find((category) => category._id === categoryId)?.name;
        return categoryName;
      },
    },
    {
      field: 'SubCategory_id',
      headerName: 'Subcategory',
      width: 150,
      valueGetter: (params) => {
        const subcategoryId = params.row.SubCategory_id;
        const subcategoryName = allSubcategories.subcategory.find((subcategory) => subcategory._id === subcategoryId)?.name;
        return subcategoryName;
      },
    },
    { field: 'price', headerName: 'Price', width: 150 },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: ({ row }) => (
        <img src={row.image.url} width="50" height="50" alt={row.name} />
      ),
    },
    {
      field: 'action',
      headerName: 'Actions',
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
        Add Product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{editing ? 'Update' : 'Add'} Product</DialogTitle>
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
            <FormControl fullWidth margin="dense" variant="standard">
              <InputLabel id="categoryId-label">Category</InputLabel>
              <Select
                id="category_id"
                name="category_id"
                value={values.category_id}
                onChange={handleCategoryChange}
                label="Category"
              >
                {categories.category.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense" variant="standard">
              <InputLabel id="subcategoryId-label">Subcategory</InputLabel>
              {values.category_id && (
                <Select
                  labelId="subcategoryId-label"
                  id="SubCategory_id"
                  name="SubCategory_id"
                  value={values.SubCategory_id}
                  onChange={(e) => setFieldValue('SubCategory_id', e.target.value)}
                  label="Subcategory"
                >
                  {subcategories.map((subcategory) => (
                    <MenuItem key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
            <TextField
              margin="dense"
              id="price"
              name="price"
              label="Price"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
              error={touched.price && Boolean(errors.price)}
              helperText={touched.price && errors.price}
            />
            <TextField
              margin="dense"
              id="image"
              name="image"
              label="Image"
              type="file"
              fullWidth
              variant="standard"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
              onBlur={handleBlur}
              error={touched.image && Boolean(errors.image)}
              helperText={touched.image && errors.image}
            />

            {values?.image && (
              <img
                src={
                  values?.image.url
                    ? values?.image.url
                    : URL.createObjectURL(values.image)
                }
                width={50} height={50} alt="Product preview"
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{editing ? 'Update' : 'Add'}</Button>
          </DialogActions>
        </form>
      </Dialog>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>
    </React.Fragment>
  );
}
