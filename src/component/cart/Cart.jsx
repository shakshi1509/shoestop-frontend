import React, { useContext, useEffect, useState } from 'react';
import './cart.css';
import { Button, Container } from 'react-bootstrap';
import { productContext } from '../contextAPI/Context';
import axios from 'axios';

const Cart = () => {

    const url = 'https://shoestop-backend-mri7.onrender.com/api/addcart';

    const {
        cartProduct,
        setCartProducts,
        getcart,
        token
    } = useContext(productContext);

    const [total, setTotal] = useState(0);

    // Calculate total price whenever cart changes
    useEffect(() => {
        const cartTotal = cartProduct.reduce((acc, item) => {
            return acc + Number(item.quantity) * Number(item.price);
        }, 0);

        setTotal(cartTotal);
    }, [cartProduct]);

    // Remove product from cart
    const removeCartItem = async (id) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };

            await axios.delete(`${url}/${id}`, { headers });

            await getcart();

        } catch (error) {
            console.error('Error removing cart item:', error);
            alert('Unable to remove item from cart');
        }
    };

    // Increase quantity
    const addQty = (id) => {
        const updatedCartItems = cartProduct.map((item) =>
            item._id === id
                ? { ...item, quantity: Number(item.quantity) + 1 }
                : item
        );

        setCartProducts(updatedCartItems);
    };

    // Decrease quantity
    const reduceQty = (id) => {
        const updatedCartItems = cartProduct.map((item) =>
            item._id === id
                ? {
                    ...item,
                    quantity: Math.max(1, Number(item.quantity) - 1)
                }
                : item
        );

        setCartProducts(updatedCartItems);
    };

    return (
        <Container>
            <div>
                {cartProduct.length > 0 ? (

                    <div className="cart">

                        <h4 className="text-center py-3">
                            {cartProduct.length} items in your Cart
                        </h4>

                        {cartProduct.map((li) => (

                            <div key={li._id}>
                                <div className="item">

                                    <img
                                        src={li.image}
                                        className="img"
                                        alt={li.title}
                                    />

                                    <div className="mx-3">
                                        <p className="cp-title">{li.title}</p>
                                        <p className="cp-company">{li.company}</p>
                                    </div>

                                    <div className="quantity-counter my-2">

                                        <Button
                                            className="mx-3"
                                            onClick={() => reduceQty(li._id)}
                                        >
                                            -
                                        </Button>

                                        <p>{li.quantity}</p>

                                        <Button
                                            className="mx-3"
                                            onClick={() => addQty(li._id)}
                                        >
                                            +
                                        </Button>

                                    </div>

                                    <p className="cp-price text-dark mx-5 my-3">
                                        Rs: {Number(li.quantity) * Number(li.price)}
                                    </p>

                                    <div className="Fbtns">
                                        <Button
                                            variant="danger"
                                            onClick={() => removeCartItem(li._id)}
                                        >
                                            Remove
                                        </Button>
                                    </div>

                                </div>
                            </div>

                        ))}

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}>
                            <p>Total</p>
                            <p>Rs: {total}</p>
                        </div>

                    </div>

                ) : (

                    <div className="no-items">
                        <p>No Items are added to the cart</p>
                    </div>

                )}
            </div>
        </Container>
    );
};

export default Cart;