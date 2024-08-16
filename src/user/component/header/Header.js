import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../../context/ThemeContext';
import { getCategory } from '../../../redux/action/Category.action';
import { getsubcategory } from '../../../redux/slice/subcategories.slice';
import { logout } from '../../../redux/slice/AuthSlice';

function Header(props) {
    const cart = useSelector(state => state.cart_slice);
    const totalQty = cart.cart.reduce((acc, curr) => acc + curr.qty, 0);

    const categories = useSelector((state) => state.category);
    const allSubcategories = useSelector((state) => state.subcategory);
    const product = useSelector((state) => state.products)
    // console.log(product);
    // console.log(allSubcategories.subcategory);

    const themeContext = useContext(ThemeContext);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategory());
        dispatch(getsubcategory());
    }, [dispatch]);

    const handleThemeToggle = () => {
        themeContext.toggleTheme(themeContext.theme);
    };

    const [currentSubcategories, setCurrentSubcategories] = useState([]);

    const handleCategoryClick = (categoryId) => {
        console.log(categoryId);
        const subcategories = allSubcategories.subcategory.filter(sub => sub.category_id === categoryId);
        console.log(subcategories);
        setCurrentSubcategories(subcategories);
    };
    const {isAuth,user} = useSelector((state) => state.auth)
    // console.log(isAuth,user,"adfadf");
    
    const handleLogout=()=>{
        // console.log(user._id);
        
        dispatch(logout(user._id))
    }

    return (
        <div>
            {/* Navbar start */}
            <div className={`container-fluid fixed-top ${themeContext.theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
                <div className="container topbar bg-primary d-none d-lg-block">
                    <div className="d-flex justify-content-between">
                        <div className="top-info ps-2">
                            <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary" /> <a href="#" className="text-white">123 Street, New York</a></small>
                            <small className="me-3"><i className="fas fa-envelope me-2 text-secondary" /><a href="#" className="text-white">Email@Example.com</a></small>
                        </div>
                        <div className="top-link pe-2">
                            <a href="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
                            <a href="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
                            <a href="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
                        </div>
                    </div>
                </div>
                <div className="container px-0">
                    <nav className={`navbar navbar-expand-xl ${themeContext.theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
                        <a href="index.html" className="navbar-brand"><h1 className="text-primary display-6">Fruitables</h1></a>
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars text-primary" />
                        </button>
                        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                            <div className="navbar-nav mx-auto">
                                <NavLink to="/" className="nav-item nav-link active">Home</NavLink>
                                <NavLink to="/shop" className="nav-item nav-link">Shop</NavLink>
                                <NavLink to="/chat" className="nav-item nav-link">Chat</NavLink>
                                <NavLink to="/shop_detail" className="nav-item nav-link">Shop Detail</NavLink>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                        <NavLink to="/cart" className="dropdown-item">Cart</NavLink>
                                        <NavLink to="/checkout" className="dropdown-item">Checkout</NavLink>
                                        <NavLink to="/testimonial" className="dropdown-item">Testimonial</NavLink>
                                        <NavLink to="/error" className="dropdown-item">404 Page</NavLink>
                                    </div>
                                </div>
                                <NavLink to="/contact" className="nav-item nav-link">Contact</NavLink>
                                {/* Category Dropdown */}
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Categories</a>
                                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                        {categories.category.map((category) => (
                                            <div key={category.id} className="dropdown-item" onClick={() => handleCategoryClick(category._id)}>
                                                {category.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex m-3 me-0">
                                <button
                                    onClick={handleThemeToggle}
                                    className={`btn btn-md-square rounded-circle me-4 ${themeContext.theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
                                >
                                    {themeContext.theme === 'dark' ? <i className="fas fa-sun text-warning" /> : <i className="fas fa-moon text-dark" />}
                                </button>

                                <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal">
                                    <i className="fas fa-search text-primary" />
                                </button>

                                <NavLink to="/cart" className="position-relative me-4 my-auto">
                                    <i className="fa fa-shopping-bag fa-2x" />
                                    <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: '-5px', left: 15, height: 20, minWidth: 20 }}>{totalQty}</span>
                                </NavLink>

                                {
                                    isAuth?
                                    <button onClick={handleLogout}>logout</button>: <NavLink to="/Auth" className="my-auto">
                                    <i className="fas fa-user fa-2x" />
                                </NavLink>
                                }
                               



                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {currentSubcategories.length > 0 && (
                <div className="modal fade show" id="subcategoryModal" style={{ display: 'block' }} tabIndex={-1} aria-labelledby="subcategoryModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fullscreen">
                        <div className="modal-content rounded-0">
                            <div className="modal-header">
                                <h5 className="modal-title" id="subcategoryModalLabel">Subcategories</h5>
                                <button type="button" className="btn-close" onClick={() => setCurrentSubcategories([])} />
                            </div>
                            <div className="modal-body">
                                <ul className="list-group">
                                    {currentSubcategories.map((sub) => (

                                        <li key={sub.id} className="list-group-item">

                                            {sub.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Subcategory Modal End */}
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
        </div>
    );
}

export default Header;
