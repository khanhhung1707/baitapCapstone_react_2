import React, { useState } from "react";
import "../../assets/css/cartPage.css";
import { useSelector, useDispatch } from "react-redux";
import {
    updateItem,
    updateQuantity,
    deleteItem,
    updateSelectedAll,
} from "../../redux/reducers/cartSlice";
import { userApi } from "../../service/user/userApi";
import { useMutation } from "@tanstack/react-query";
import {
    getDataJsonStorage,
    USER_LOGIN,
    CART,
    removeDataJsonStorage,
    setDataJsonStorage,
} from "../../util/utilMethod";
import { useNavigate } from "react-router-dom";
import { setCartCount } from "../../redux/reducers/authSlice";

const Cart = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);

    const mutation = useMutation({
        mutationFn: userApi.postOrderCart,
        onSuccess: (data) => { },
        onError: (error) => { },
    });

    const handleQuantityChange = (index, value) => {
        dispatch(updateQuantity({ index, value }));
    };

    const handleDelete = (index) => {
        dispatch(deleteItem(index));
        dispatch(setCartCount());
    };

    const handleSubmitOrder = () => {
        let email = getDataJsonStorage(USER_LOGIN)?.email;

        if (cart != null && cart.length != 0) {
            const orderDetails = {
                orderDetail: cart
                    .filter((item) => item.selected)
                    .map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                    })),
                email,
            };

            if (orderDetails != null && orderDetails.orderDetail.length != 0) {
                const dataOrderLocal = getDataJsonStorage(CART);
                const existingProductIds = orderDetails.orderDetail.map(
                    (item) => item.productId
                );

                const filteredDataOrderLocal = dataOrderLocal.filter((item) => {
                    return !existingProductIds.includes(item.id);
                });

                mutation.mutate(orderDetails);
                if (
                    filteredDataOrderLocal != null &&
                    filteredDataOrderLocal.length !== 0
                ) {
                    setDataJsonStorage(CART, filteredDataOrderLocal);
                } else {
                    removeDataJsonStorage(CART);
                }
                navigate("/profile");
            }
        }
    };

    const handleSelectAll = () => {
        const newState = !selectAll;
        setSelectAll(newState);
        dispatch(updateSelectedAll(newState));
    };

    const handleSelectSingle = (index) => {
        dispatch(
            updateItem({ index, updatedItem: { selected: !cart[index].selected } })
        );
    };
    return (
        <div className="container mt-4">
            <h1>Carts</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={index} >
                            <td>{item.id}</td>
                            <td>
                                <img src={item.img} alt={item.name} className="img-fluid" />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => handleQuantityChange(index, 1)}
                                >
                                    +
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => handleQuantityChange(index, -1)}
                                >
                                    -
                                </button>
                            </td>
                            <td>{item.price * item.quantity}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(index)}
                                >
                                    DELETE
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                className="btn btn-warning"
                style={{ float: "right" }}
                onClick={handleSubmitOrder}
            >
                Submit Order
            </button>
        </div>
    );
};

export default Cart;
