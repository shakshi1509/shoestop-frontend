import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './home.css'
import { Button, Modal } from 'react-bootstrap'
import { productContext } from '../contextAPI/Context'

const Product = () => {

    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)

    const { token } = useContext( productContext )

    const fetchData = async () => {
        await axios.get("http://localhost:5000/api/getproducts")
            .then(res => setProducts(res.data))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const getProduct = (image,title,company,price) =>{
        const headers = {
            Authorization: `Bearer ${token}`,
          };
        console.log(image,title,company,price);
        axios.post('http://localhost:5000/api/addfav', {
            image,title,company,price
          },{
            headers
          })
          .then(function (response) {
            console.log(response);
            if(response.status === 202)
            {
                alert("already in fav list")
            }
            else {
                alert("Item Added to fav")
                getFav()
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const addtoCart = (image,title,company,price) =>{
        console.log(token);
        
        axios.post('http://localhost:5000/api/addcart', {
            image,title,company,price
          },{
            headers : {
                Authorization: `Bearer ${token}`,
              }
          })
          .then(function (response) {
            console.log(response);
            if(response.status === 202)
            {
                alert("already in cart")
            }
            else {
                alert("Item Added to cart")
               
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    return (
        <div className='product' id="products">
            <h3 className='text-center p-4'>Products</h3>


            <div className="pro-layout">
                {
                    products && products.length > 0 ?

                        products.map(li => {
                            return <div className='cardz' key={li._id}>
                                <img src={li.image} className='image' alt="" />
                                <p className="title">{li.title}</p>
                                <div className="comrice">
                                <p className="company">{li.company}</p>
                                <p className="price text-dark">Rs:{li.price}</p>
                               
                                <p className="sizes">
    Sizes: {li.sizes?.join(", ")}
</p>
                                </div>
                                <div className="btns">
    <Button
        variant='success px-4'
        onClick={() => addtoCart(li.image, li.title, li.company, li.price)}
    >
        Add to Cart
    </Button>

  <Button
    variant='outline-dark'
    className='px-4'
    onClick={() => setSelectedProduct(li)}
>
    View Details
</Button>
</div>
                            </div>
                        })

                        : <div>
                            <p>no product found</p>
                        </div>
                }
                       </div>

            <Modal
                show={selectedProduct !== null}
                onHide={() => setSelectedProduct(null)}
                centered
            >
                {selectedProduct && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedProduct.title}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.title}
                                style={{ width: "100%", height: "250px", objectFit: "contain" }}
                            />

                            <h5 className="mt-3">{selectedProduct.company}</h5>

                            <h4>Rs. {selectedProduct.price}</h4>
                            <p>{selectedProduct.description}</p>

                            <p>
                                <strong>Available Sizes:</strong>{" "}
                                {selectedProduct.sizes?.join(", ")}
                            </p>

                            <p>
                                <strong>Stock:</strong> {selectedProduct.stock}
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
                                onClick={() => {
                                    addtoCart(
                                        selectedProduct.image,
                                        selectedProduct.title,
                                        selectedProduct.company,
                                        selectedProduct.price
                                    );
                                }}
                            >
                                Add to Cart
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </div>
    )
}

export default Product