import React, { useState } from "react";
import ProductCard from "../../Components/ProductCard";
import "../../assets/css/productCard.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "../../service/product/productApi";
import { addToCart } from "../../redux/reducers/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import { setCartCount } from "../../redux/reducers/authSlice";

const Detail = () => {
    const params = useParams();
    const { id } = params;

    const { isLoading, data, error } = useQuery({
        queryKey: ["productByIDApi", id],
        queryFn: () => productApi.getProductByID(id),
        staleTime: 5 * 60 * 1000,
        cacheTime: 12 * 60 * 1000,
        refetchOnWindowFocus: true,
    });

    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        dispatch(addToCart(data));
        dispatch(setCartCount());
        navigate("/cart");
    };

    if (isLoading) return <Loading />;
    else
        return (
            <div className="container mt-5">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <img
                            src={data.image}
                            className="img-fluid rounded-start"
                            alt={data.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <h3>{data.name}</h3>
                        <p>{data.description}</p>
                        <p className="text-success">Available size</p>
                        <div className="sizes mb-3">
                            {data.size.map((size) => (
                                <span className="badge bg-secondary mx-1" key={size}>
                                    {size}
                                </span>
                            ))}
                        </div>
                        <p className="text-danger">{data.price}$</p>
                        <div className="quantity-control mb-3">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={handleDecrease}
                            >
                                -
                            </button>

                            <span className="mx-2 text-center">{quantity}</span>
                            <button
                                className="btn btn-outline-secondary"
                                onClick={handleIncrease}
                            >
                                +
                            </button>
                        </div>
                        <button className="btn btn-primary" onClick={handleAddToCart}>
                            Add to cart
                        </button>
                    </div>
                </div>
                <div>
                    <h2 className="text-center mb-4">Relate Product</h2>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {data.relatedProducts.map((product) => (
                            <div key={product.id} className="col mb-4">
                                <ProductCard prod={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
};

export default Detail;
