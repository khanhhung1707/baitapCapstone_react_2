import React from "react";
import HeaderHome from "../Components/HeaderHome";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import Menu from "../Components/Menu";

const HomeTemplate = () => {
    return (
        <div>
            <HeaderHome />
            <Menu />
            <div className="content" style={{ minHeight: 650 }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default HomeTemplate;
