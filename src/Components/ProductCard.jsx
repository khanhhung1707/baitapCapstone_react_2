import React, { useState, useEffect } from "react";
import "../assets/css/productCard.css";
import { NavLink } from "react-router-dom";
import {
    USER_LOGIN,
    isTokenExpired,
    TOKEN_AUTHOR,
    getDataTextStorage,
} from "../util/utilMethod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { userApi } from "../service/user/userApi";
import Loading from "./Loading";

const ProductCard = (props) => {
    let { prod } = props;

    const isLogin =
        USER_LOGIN && !isTokenExpired(getDataTextStorage(TOKEN_AUTHOR));

    const [productfavoriteUserList, setProductfavoriteUserList] = useState([]);

    const { isLoading, isPending, data, error, refetch } = useQuery({
        queryKey: ["productfavoriteUserListApi"],
        queryFn: userApi.getProductfavoriteUser,
        staleTime: 5 * 60 * 1000,
        cacheTime: 12 * 60 * 1000,
        refetchOnWindowFocus: true,
        enabled: isLogin,
    });

    const mutationLike = useMutation({
        mutationFn: userApi.getLikeProductUser,
        onSuccess: (data) => {
            refetch();
        },
        onError: (error) => { },
    });

    const mutationUnLike = useMutation({
        mutationFn: userApi.getUnLikeProductUser,
        onSuccess: (data) => {
            refetch();
        },
        onError: (error) => { },
    });

    useEffect(() => {
        if (data) {
            setProductfavoriteUserList(data.productsFavorite);
        }
    }, [data]);

    const handleLike = (id, isLike) => {
        if (isLike) {
            mutationUnLike.mutate(id);
        } else {
            mutationLike.mutate(id);
        }
    };

    const renderHeart = (id) => {
        if (isLogin) {
            const isArray = Array.isArray(productfavoriteUserList);
            let isLike =
                isArray &&
                productfavoriteUserList.findIndex((a) => Number(a.id) == Number(id)) !=
                -1;

            return (
                <div className="card-heart">
                    <i
                        className="fa fa-heart"
                        style={{
                            color: isLike ? "red" : "black",
                        }}
                        onClick={() => handleLike(id, isLike)}
                    ></i>
                </div>
            );
        }
        return <></>;
    };

    if (isLogin && isLoading) return <Loading />;
    else
        return (
            <div className="card product-card">
                <div className="card-img-wrapper">
                    <img src={prod.image} className="card-img-top" alt={prod.name} />
                    {renderHeart(prod.id)}
                </div>
                <NavLink to={`/detail/${prod.id}`} className="card-body">
                    <h5 className="card-title">{prod.name}</h5>
                    <p className="card-text">{prod.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <button className="btn btn-success">Buy now</button>
                        <span className="price">${prod.price}</span>
                    </div>
                </NavLink>
            </div>
        );
};

export default ProductCard;
