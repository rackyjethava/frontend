
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
import { object, string } from 'yup';
import axios from 'axios';
import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { getsubcategory } from '../../../redux/slice/subcategories.slice';
import { getCategory } from '../../../redux/action/Category.action';

const API_URL = 'http://localhost:8000/api/v1/variants';
const PRODUCTS_API_URL = 'http://localhost:8000/api/v1/products';

export default function Variant() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [variants, setVariants] = useState([]);
  const [editing, setEditing] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [attributes, setAttributes] = useState({});
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);

  const categories = useSelector((state) => state.category);
  const allSubcategories = useSelector((state) => state.subcategory);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getsubcategory());
    fetchVariants();
    fetchProducts();
  }, [dispatch]);

  const variantSchema = object({
    category_id: string().required('Category is required'),
    SubCategory_id: string().required('Subcategory is required'),
    product_id: string().required('Product is required'),
  });

  const fetchVariants = async () => {
    try {
      const response = await axios.get(`${API_URL}/list-variant`);
      setVariants(response.data.data);
    } catch (error) {
      console.error('Failed to fetch variants:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${PRODUCTS_API_URL}/list-product`);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setEditing(null);
    setSubcategories([]);
    setFilteredProducts([]);
    setAttributes({});
    setImages([]); // Clear images
  };

  const formik = useFormik({
    initialValues: {
      category_id: '',
      SubCategory_id: '',
      product_id: '',
    },
    validationSchema: variantSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('Form values on submit:', values);
      const transformedValues = {
        ...values,
        attributes,
      };
      console.log('Transformed values:', transformedValues);

      if (editing) {
        transformedValues._id = editing._id;
        handleUpdate(transformedValues);
      } else {
        handleAdd(transformedValues);
      }
      resetForm();
      handleClose();
    },
  });

  const { handleSubmit, handleChange, setFieldValue, values } = formik;

  const handleAdd = async (data) => {
    try {
      console.log('Adding variant:', data);
      const formData = new FormData();
  
      // Append form data
      formData.append('category_id', data.category_id);
      formData.append('SubCategory_id', data.SubCategory_id);
      formData.append('product_id', data.product_id);
      formData.append('attributes', JSON.stringify(data.attributes));
  
      // Append images
      images.forEach((image) => {
        formData.append('variantImg', image);
      });
  
      console.log('FormData:', formData);
  
      await axios.post(`${API_URL}/add-variant`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchVariants();
    } catch (error) {
      console.error('Failed to add variant:', error);
    }
  };
  const handleDelete = async (data) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this variant?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/delete-variant/${data._id}`);
      fetchVariants();
    } catch (error) {
      console.error('Failed to delete variant:', error);
    }
  };

  const handleEdit = (data) => {
    console.log('Editing data:', data);
    const relatedSubcategories = allSubcategories.subcategory.filter((sub) => sub.category_id === data.category_id);
    const relatedProducts = products.filter((prod) => prod.SubCategory_id === data.SubCategory_id);
    setSubcategories(relatedSubcategories);
    setFilteredProducts(relatedProducts);

    let attributesAsObject = {};
    if (Array.isArray(data.attributes)) {
      attributesAsObject = data.attributes.reduce((acc, attr) => {
        acc[attr.key] = attr.value;
        return acc;
      }, {});
    } else if (typeof data.attributes === 'object' && data.attributes !== null) {
      attributesAsObject = data.attributes;
    }

    formik.setValues({
      category_id: data.category_id,
      SubCategory_id: data.SubCategory_id,
      product_id: data.product_id,
    });

    setAttributes(attributesAsObject);
    setOpen(true);
    setEditing(data);
  };

  const handleUpdate = async (data) => {
    try {
      const formData = new FormData();

      // Append form data
      formData.append('category_id', data.category_id);
      formData.append('SubCategory_id', data.SubCategory_id);
      formData.append('product_id', data.product_id);
      formData.append('attributes', JSON.stringify(data.attributes));

      // Append images if they exist
      if (images.length > 0) {
        images.forEach((image) => {
          formData.append('variantImg', image);
        });
      }

      console.log('Updating data:', data);
      await axios.put(`${API_URL}/update-variant/${data._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchVariants();
    } catch (error) {
      console.error('Failed to update variant:', error);
    }
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setFieldValue('category_id', categoryId);
    setFieldValue('SubCategory_id', '');

    const relatedSubcategories = allSubcategories.subcategory.filter((sub) => sub.category_id === categoryId);
    setSubcategories(relatedSubcategories);
    setFilteredProducts([]);
  };

  const handleSubCategoryChange = (event) => {
    const subCategoryId = event.target.value;
    setFieldValue('SubCategory_id', subCategoryId);

    const relatedProducts = products.filter((prod) => prod.SubCategory_id === subCategoryId);
    setFilteredProducts(relatedProducts);
  };

  const handleProductChange = (event) => {
    const productId = event.target.value;
    setFieldValue('product_id', productId);
  };

  const handleAttributesChange = (key, value) => {
    const updatedAttributes = { ...attributes, [key]: value };
    setAttributes(updatedAttributes);
    setFieldValue('attributes', updatedAttributes);
  };

  const addAttribute = () => {
    setAttributes({ ...attributes, '': '' });
  };

  const removeAttribute = (key) => {
    const updatedAttributes = { ...attributes };
    delete updatedAttributes[key];
    setAttributes(updatedAttributes);
    setFieldValue('attributes', updatedAttributes);
  };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const columns = [
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
    {
      field: 'product_id',
      headerName: 'Product',
      width: 150,
      valueGetter: (params) => {
        const productId = params.row.product_id;
        const productName = products.find((product) => product._id === productId)?.name;
        return productName;
      },
    },
    {
      field: 'attributes',
      headerName: 'Attributes',
      width: 500,
      valueGetter: (params) => {
        return Object.entries(params.row.attributes)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ');
      },
    },
    {
      field: 'variantImg',
      headerName: 'Images',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {params.row.variantImg.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={`Variant Image ${index}`}
              style={{ width: '50px', height: '50px', objectFit: 'cover', marginBottom: '5px' }}
            />
          ))}
        </div>
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
        Add Variant
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{editing ? 'Update' : 'Add'} Variant</DialogTitle>
          <DialogContent>
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
                  id="SubCategory_id"
                  name="SubCategory_id"
                  value={values.SubCategory_id}
                  onChange={handleSubCategoryChange}
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
            <FormControl fullWidth margin="dense" variant="standard">
              <InputLabel id="productId-label">Product</InputLabel>
              {values.SubCategory_id && (
                <Select
                  id="product_id"
                  name="product_id"
                  value={values.product_id}
                  onChange={handleProductChange}
                  label="Product"
                >
                  {filteredProducts.map((product) => (
                    <MenuItem key={product._id} value={product._id}>
                      {product.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
            {values.product_id && (
              <>
                <h3>Attributes</h3>
                {Object.entries(attributes).map(([key, value], index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      margin="dense"
                      label="Key"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={key}
                      onChange={(e) => {
                        const newKey = e.target.value;
                        const newAttributes = { ...attributes };
                        newAttributes[newKey] = newAttributes[key];
                        delete newAttributes[key];
                        setAttributes(newAttributes);
                        setFieldValue('attributes', newAttributes);
                      }}
                      style={{ marginRight: '10px' }}
                    />
                    <TextField
                      margin="dense"
                      label="Value"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={value}
                      onChange={(e) => handleAttributesChange(key, e.target.value)}
                    />
                    <Button onClick={() => removeAttribute(key)} style={{ marginLeft: '10px' }}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button onClick={addAttribute} style={{ marginTop: '10px' }}>
                  Add Attribute
                </Button>
              </>
            )}

            <input
              accept="image/*"
              id="variantImg"
              type="file"
              multiple
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="variantImg">
              <Button variant="outlined" component="span">
                Upload Images
              </Button>
            </label>

            {images.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                {images.map((image, index) => (
                  <div key={index} style={{ marginRight: '10px', marginBottom: '10px' }}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <Button onClick={() => removeImage(index)} style={{ display: 'block', marginTop: '5px' }}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
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
          rows={variants}
          columns={columns}
          pageSizeOptions={[5, 10, 100]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>
    </React.Fragment>
  );
}
