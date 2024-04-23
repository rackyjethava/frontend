import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementCart, incrementCart, removeData } from '../../../../redux/reducer/cart.slice';
import { useFormik } from 'formik';
import { object, string, number, date, InferType } from 'yup';
import { getcoupontdata } from '../../../../redux/slice/coupon.slice';

function Cart(props) {

    const cart = useSelector(state => state.cart_slice)
    const product = useSelector(state => state.products)
    const coupon=useSelector(state=>state.coupon)
    console.log(coupon);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getcoupontdata())
    }, [])

    const productdata = cart.cart.map((v) => {
        const products = product.products.find((v1) => v1.id == v.pid)

        // const totalPrice = v.qty * products.price;

        return { ...products, qty: v.qty, }


    })

    // const subtotal = productdata.reduce((acc, v) => acc + v.totalPrice, 0);


    console.log(productdata);

    const handleAdd = (id) => {
        console.log("yes");
        dispatch(incrementCart(id))
    }

    const handleRemove = (id) => {
        console.log("no");
        dispatch(decrementCart(id))
    }

    const handleDeletProduct = (id) => {
        console.log(id);
        dispatch(removeData(id))
    }

    const handleCoupon = (data) => {
        if(coupon.console){

        }
    }

    let userSchema = object({
        name: string().required(),
        createdOn: date().default(() => new Date()),
      });

    const formik = useFormik({
        initialValues: {
          name: '',
         
        },
        validationSchema: userSchema,
        onSubmit: (values,{resetForm}) => {
            
            handleCoupon(values)
        },  
      });

      const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    return (
        <div>
            {/* Modal Search Start */}
            <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Search End */}
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Cart Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productdata.map((v) => (
                                        <tr>
                                            <th scope="row">
                                                <div className="d-flex align-items-center">
                                                    <img src={v.imgSrc} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                                                </div>
                                            </th>
                                            <td>
                                                <p className="mb-0 mt-4">{v.name}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{v.price}</p>
                                            </td>
                                            <td>
                                                <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                    <div className="input-group-btn">
                                                        <button
                                                            onClick={() => handleRemove(v.id)}
                                                            className="btn btn-sm btn-minus rounded-circle bg-light border"
                                                        >
                                                            <i className="fa fa-minus" />
                                                        </button>
                                                    </div>
                                                    <span className="form-control form-control-sm text-center border-0">
                                                        {v.qty}
                                                    </span>

                                                    <div className="input-group-btn">
                                                        <button
                                                            onClick={() => handleAdd(v.id)}
                                                            className="btn btn-sm btn-plus rounded-circle bg-light border"
                                                        >
                                                            <i className="fa fa-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{v.totalPrice}</p>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleDeletProduct(v.id)}
                                                    className="btn btn-md rounded-circle bg-light border mt-4"
                                                >
                                                    <i className="fa fa-times text-danger" />
                                                </button>
                                            </td>
                                        </tr>

                                    ))

                                }



                            </tbody>
                        </table>
                    </div>
                    <form className="mt-5" onSubmit={handleSubmit}>
                        <input
                           margin="dense"
                           className="border-0 border-bottom rounded me-5 py-3 mb-4"
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

                        <input
                            className="btn border-secondary rounded-pill px-4 py-3 text-primary"
                            type="submit"
                        />
                    </form>

                    <div className="row g-4 justify-content-end">
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0"> $</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">Shipping</h5>
                                        <div className>
                                            <p className="mb-0">Flat rate: $3.00</p>
                                        </div>
                                    </div>
                                    <p className="mb-0 text-end">Shipping to Ukraine.</p>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4"> $</p>
                                </div>
                                <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart Page End */}
        </div>

    );
}

export default Cart;