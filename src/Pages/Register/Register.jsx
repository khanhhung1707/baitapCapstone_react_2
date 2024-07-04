import React, { useState } from "react";
import "../../assets/css/registrationForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userApi } from "../../service/user/userApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const initialValues = {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: true,
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Please enter email"),
        name: Yup.string().required("Please enter name"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Please enter password"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Please enter confirm password"),
        phone: Yup.string().required("Please enter phone"),
        gender: Yup.string().required("Please choose gender"),
    });

    const mutation = useMutation({
        mutationFn: userApi.postRegisterUser,
        onSuccess: (data) => { },
        onError: (error) => { },
    });

    const handleSubmit = (values) => {
        mutation.mutate(values);
        navigate("/login");
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Register</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <span className="validation">{formik.errors.email}</span>
                                )}
                            </div>
                            <div className="form-group col-md-6">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <span className="validation">{formik.errors.name}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Password</label>
                                <div className="password-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="form-control"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <span className="validation">{formik.errors.password}</span>
                                )}
                            </div>
                            <div className="form-group col-md-6">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <span className="validation">{formik.errors.phone}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Password Confirm</label>
                                <div className="password-container">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        className="form-control"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />

                                </div>
                                {formik.touched.confirmPassword &&
                                    formik.errors.confirmPassword && (
                                        <span className="validation">
                                            {formik.errors.confirmPassword}
                                        </span>
                                    )}
                            </div>
                            <div className="form-group d-flex col-md-6 align-items-center">
                                <label>Gender</label>
                                <div className="form-check form-check-inline ms-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={true}
                                        className="form-check-input"
                                        checked={formik.values.gender === true}
                                        onChange={() => formik.setFieldValue("gender", true)}
                                    />
                                    <label className="form-check-label">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={false}
                                        className="form-check-input"
                                        checked={formik.values.gender === false}
                                        onChange={() => formik.setFieldValue("gender", false)}
                                    />
                                    <label className="form-check-label">Female</label>
                                </div>
                                {formik.touched.gender && formik.errors.gender && (
                                    <span className="validation">{formik.errors.gender}</span>
                                )}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary submit-button">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
