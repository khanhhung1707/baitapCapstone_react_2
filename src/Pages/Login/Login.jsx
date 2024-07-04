import React, { useState } from "react";
import "../../assets/css/loginPage.css";
import { useNavigate, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userApi } from "../../service/user/userApi";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login, setCartCount } from "../../redux/reducers/authSlice";

const Login = () => {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: userApi.postLoginUser,
        onSuccess: (data) => { },
        onError: (error) => { },
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Please enter email"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Please enter password"),
        }),
        onSubmit: (values) => {
            mutation.mutate(values);
            dispatch(login(values.email));
            dispatch(setCartCount());
            navigate("/");
        },
    });

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h3 className="mb-3">Login</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <small className="text-danger">{formik.errors.email}</small>
                            )}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{ marginTop: "0" }}
                                />
                                <div
                                    className="input-group-text"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ cursor: "pointer", width: "10%" }}
                                >
                                    <i
                                        className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                    ></i>
                                </div>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <small className="text-danger">{formik.errors.password}</small>
                            )}
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <NavLink
                                to="/register"
                                className="text-primary text-decoration-none"
                            >
                                Register now ?
                            </NavLink>
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
