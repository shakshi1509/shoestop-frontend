import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import { Button, Modal } from 'react-bootstrap';
import { productContext } from '../contextAPI/Context';

const Product = () => {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { token, getcart, getFav } = useContext(productContext);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'https://shoestop-backend-mri7.onrender.com/api/getproducts'
            );
            setProducts(response.data);
        } catch (error) {
            console.log('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Add product to favourites
    const addToFav = async (image, title, company, price) => {
        try {
            const response = await axios.post(
                'https://shoestop-backend-mri7.onrender.com/api/addfav',
                { image, title, company, price },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (response.status === 202) {
                alert('Already in favourites');
            } else {
                alert('Item added to favourites');
                await getFav(token);
            }

        } catch (error) {
            console.log('Error adding favourite:', error);
        }
    };

    // Add product to cart
    const addtoCart = async (image, title, company, price) => {

        if (!token) {
            alert('Please login first');
            return;
        }

        try {
            const response = await axios.post(
                'https://shoestop-backend-mri7.onrender.com/api/addcart',
                { image, title, company, price },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (response.status === 202) {
                alert('Already in cart');
            } else {
                alert('Item added to cart');
            }

            // Refresh cart data after adding
            await getcart(token);

        } catch (error) {
            console.log('Error adding product to cart:', error);
            alert('Unable to add product to cart');
        }
    };

    return (
        <div className="product" id="products">

            <h3 className="text-center p-4">Products</h3>

            <div className="pro-layout">

                {products && products.length > 0 ? (

                    products.map(li => (

                        <div className="cardz" key={li._id}>

                            <img
                                src={li.image}
                                className="image"
                                alt={li.title}
                            />

                            <p className="title">{li.title}</p>

                            <div className="comrice">
                                <p className="company">{li.company}</p>
                                <p className="price text-dark">Rs:{li.price}</p>

                                <p className="sizes">
                                    Sizes: {li.sizes?.join(', ')}
                                </p>
                            </div>

                            <div className="btns">

                                <Button
                                    variant="success"
                                    onClick={() => addtoCart(
                                        li.image,
                                        li.title,
                                        li.company,
                                        li.price
                                    )}
                                >
                                    Add to Cart
                                </Button>

                                <Button
                                    variant="outline-dark"
                                    onClick={() => setSelectedProduct(li)}
                                >
                                    View Details
                                </Button>

                            </div>

                        </div>

                    ))

                ) : (

                    <div>
                        <p>No products found</p>
                    </div>

                )}

            </div>

            <Modal
                show={selectedProduct !== null}
                onHide={() => setSelectedProduct(null)}
                centered
            >

                {selectedProduct && (

                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {selectedProduct.title}
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.title}
                                style={{
                                    width: '100%',
                                    height: '250px',
                                    objectFit: 'contain'
                                }}
                            />

                            <h5 className="mt-3">
                                {selectedProduct.company}
                            </h5>

                            <h4>Rs. {selectedProduct.price}</h4>

                            <p>{selectedProduct.description}</p>

                            <p>
                                <strong>Available Sizes:</strong>{' '}
                                {selectedProduct.sizes?.join(', ')}
                            </p>

                            <p>
                                <strong>Stock:</strong>{' '}
                                {selectedProduct.stock}
                            </p>

                        </Modal.Body>

                        <Modal.Footer>

                            <Button
                                variant="secondary"
                                onClick={() => setSelectedProduct(null)}
                            >
                                Close
                            </Button>

                            <Button
                                variant="success"
                                onClick={() => addtoCart(
                                    selectedProduct.image,
                                    selectedProduct.title,
                                    selectedProduct.company,
                                    selectedProduct.price
                                )}
                            >
                                Add to Cart
                            </Button>

                        </Modal.Footer>

                    </>

                )}

            </Modal>

        </div>
    );
};

export default Product;