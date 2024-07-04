import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducers/authSlice";

const HeaderHome = () => {
    const dispatch = useDispatch();

    const { isLogin, userEmail, cartCount } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    const renderLoginLink = () => {
        if (isLogin) {
            return (
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item position-relative">
                        <NavLink className="nav-link" to="/cart">
                            <i className="fa fa-shopping-cart" />
                            <span
                                style={{
                                    position: "absolute",
                                    top: "-5px",
                                    right: "-10px",
                                    backgroundColor: "black",
                                    color: "white",
                                    borderRadius: "50%",
                                    padding: "2px 6px",
                                    fontSize: 12,
                                }}
                            >
                                {cartCount}
                            </span>
                        </NavLink>
                    </li>
                    <li className="nav-item" style={{ color: "white" }}>
                        <NavLink className="nav-link" to="/profile">
                            {userEmail}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            );
        }
        return (
            <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                        Login
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                        Register
                    </NavLink>
                </li>
            </ul>
        );
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-dark " style={{ backgroundColor: '#1B02B5' }}>
            <div className="container">
                <NavLink className="navbar-brand mb-2 mb-lg-0" to="/">
                    Shoes Shop
                </NavLink>
                <button
                    className="navbar-toggler d-lg-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId"
                    aria-controls="collapsibleNavId"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                />
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item d-flex align-items-center">
                            <NavLink className="text-decoration-none p-4" to="/search">
                                <i className="fas fa-search text-white me-2" />
                                <span className="text-white">Search</span>
                            </NavLink>
                        </li>
                    </ul>
                    {renderLoginLink()}
                </div>
            </div>
        </nav>
    );
};

export default HeaderHome;
