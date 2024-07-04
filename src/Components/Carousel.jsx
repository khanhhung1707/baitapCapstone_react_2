import React, { useState, useEffect } from "react";
import "../assets/css/carousel.css";
import { useNavigate } from "react-router-dom";

const Carousel = (props) => {
    const navigate = useNavigate();

    let { dataCarousel } = props;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleByNow = (id) => {
        navigate(`/detail/${id}`);
    };

    useEffect(() => { }, []);

    return (
        <div className="container position-relative">
            <div
                id="productCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
            >
                <div className="carousel-inner">
                    {dataCarousel.map((product, index) => (
                        <div
                            className={`carousel-item ${index === currentIndex ? "active" : ""
                                }`}
                            key={product.id}
                        >
                            <div className="d-flex w-100 align-items-center carousel-content bg-opacity-75">
                                <img
                                    className="d-block carousel-img"
                                    src={product.image}
                                    alt={`Slide ${index}`}
                                />
                                <div className="ml-4">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleByNow(product.id)}
                                    >
                                        Buy now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            <div className="dots mt-2 text-center">
                {dataCarousel.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
