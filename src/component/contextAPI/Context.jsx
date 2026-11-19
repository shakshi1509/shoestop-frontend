import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const productContext = createContext();

const Context = ({ children }) => {

    const [favProList, setFavProductList] = useState([]);
    const [cartProduct, setCartProducts] = useState([]);
    const [token, setToken] = useState('');

    // Get token when the application loads
    useEffect(() => {
        const savedToken = localStorage.getItem('token');

        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    // Fetch favourite products
    const getFav = async (authToken) => {
        try {
            const headers = {
                Authorization: `Bearer ${authToken}`,
            };

            const response = await axios.get(
                'https://shoestop-backend-mri7.onrender.com/api/addfav',
                { headers }
            );

            setFavProductList(response.data);

        } catch (error) {
            console.log('Error fetching favourites:', error);
        }
    };

    // Fetch cart products
    const getcart = async (authToken = token) => {
        try {
            const headers = {
                Authorization: `Bearer ${authToken}`,
            };

            const response = await axios.get(
                'https://shoestop-backend-mri7.onrender.com/api/addcart',
                { headers }
            );

            setCartProducts(response.data);

        } catch (error) {
            console.log('Error fetching cart:', error);
        }
    };

    // Fetch data whenever token becomes available
    useEffect(() => {
        if (token) {
            getFav(token);
            getcart(token);
        } else {
            setFavProductList([]);
            setCartProducts([]);
        }
    }, [token]);

    return (
        <productContext.Provider
            value={{
                favProList,
                setFavProductList,
                cartProduct,
                setCartProducts,
                token,
                setToken,
                getcart,
                getFav
            }}
        >
            {children}
        </productContext.Provider>
    );
};

export default Context;