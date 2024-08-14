import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login, register } from "../../../redux/slice/AuthSlice";


function Auth(props) {
    const [mode, setMode] = useState("login");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()

    const auth = useSelector((state) => state.auth)




    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "login") {
            dispatch(login({
                email,
                password
            }))

        } else if (mode === "register") {
            dispatch(register({
                name,
                email,
                password,
                role: "user"

            }))
        } else if (mode === "forgot-password") {

        }
    };
    if(auth.isAuth){
        return <Navigate to="/" />
    }   
    
    return (
        <div>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">
                    {mode === "login"
                        ? "Login"
                        : mode === "register"
                            ? "Register"
                            : "Forgot Password"}
                </h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="#">Pages</a>
                    </li>
                    <li className="breadcrumb-item active text-white">
                        {mode === "login"
                            ? "Login"
                            : mode === "register"
                                ? "Register"
                                : "Forgot Password"}
                    </li>
                </ol>
            </div>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="d-none d-lg-flex col-lg-4 col-xl-6 align-items-center justify-content-center bg-primary p-5">
                        <div className="p-5 w-75">
                            <h1 className="text-white mb-4">Welcome To Fruitable</h1>
                            <h4 className="text-white mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
                                lacus et eros commodo dapibus.
                            </h4>
                            <img
                                src={
                                    mode === "login"
                                        ? "img/login.jpg"
                                        : mode === "register"
                                            ? "img/register.jpg"
                                            : "img/forgot-password.jpg"
                                }
                                className="img-fluid w-100 mb-4 p-4"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col-lg-8 col-xl-6">
                        <div className="position-relative overflow-hidden">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                                        <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                                            <div className="d-flex align-items-center mb-3">
                                                <h3 className="font-weight-semi-bold">
                                                    {mode === "login"
                                                        ? "Login"
                                                        : mode === "register"
                                                            ? "Register"
                                                            : "Forgot Password"}
                                                </h3>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                {mode === "register" && (
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control bg-light border-0 p-4"
                                                            placeholder="Name"
                                                            name="name"
                                                            value={name}
                                                            onChange={(e) =>
                                                                setName(e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        className="form-control bg-light border-0 p-4"
                                                        placeholder="Email Address"
                                                        name="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                {mode !== "forgot-password" && (
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            className="form-control bg-light border-0 p-4"
                                                            placeholder="Password"
                                                            name="password"
                                                            value={password}
                                                            onChange={(e) =>
                                                                setPassword(e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                <div className="form-group">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-block border-0 py-3"
                                                    >
                                                        {mode === "login"
                                                            ? "Login"
                                                            : mode === "register"
                                                                ? "Register"
                                                                : "Reset Password"}
                                                    </button>
                                                </div>
                                            </form>
                                            <div className="d-flex justify-content-between align-items-center my-3">
                                                {mode === "login" ? (
                                                    <>
                                                        <p className="mb-0">
                                                            Don't have an Account?{" "}
                                                            <Link
                                                                to="#"
                                                                className="text-primary"
                                                                onClick={() =>
                                                                    setMode("register")
                                                                }
                                                            >
                                                                Register
                                                            </Link>
                                                        </p>
                                                        <Link
                                                            to="#"
                                                            className="text-primary"
                                                            onClick={() =>
                                                                setMode("forgot-password")
                                                            }
                                                        >
                                                            Forgot Password?
                                                        </Link>
                                                    </>
                                                ) : mode === "register" ? (
                                                    <p className="mb-0">
                                                        Already have an Account?{" "}
                                                        <Link
                                                            to="#"
                                                            className="text-primary"
                                                            onClick={() => setMode("login")}
                                                        >
                                                            Login
                                                        </Link>
                                                    </p>
                                                ) : (
                                                    <p className="mb-0">
                                                        Remembered your password?{" "}
                                                        <Link
                                                            to="#"
                                                            className="text-primary"
                                                            onClick={() => setMode("login")}
                                                        >
                                                            Login
                                                        </Link>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
