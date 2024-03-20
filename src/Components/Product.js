import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProductById(productId) {
      try {
        // Obtain the authorization token
        const authToken = await getAuthToken();

        // Fetch product data with the authorization token
        const response = await fetch(`http://20.244.56.144/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setProduct(null); // Clear the product state if there's an error
      }
    }

    fetchProductById(productId); // Call the fetchProductById function
  }, [productId]); // Add productId to the dependency array

  // Function to obtain authorization token
  async function getAuthToken() {
    try {
      const response = await fetch('http://20.244.56.144/products/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyName: "goMart",
          clientID: "37bb493c-73d3-47ea-8675-21f66ef9b735",
          clientSecret: "XOyolORPasKWODAN",
          ownerName: "Rahul",
          ownerEmail: "rahul@abc.edu",
          rollNo: "1"
        })
      });

      if (!response.ok) {
        throw new Error('Failed to obtain authorization token');
      }

      const data = await response.json();
      return data.token; // Assuming the authorization token is returned as 'token' in the response
    } catch (error) {
      console.error('Error obtaining authorization token:', error);
      return null;
    }
  }

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <p>Company: {product.company}</p>
          <p>Category: {product.category}</p>
          <p>Price: {product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>Discount: {product.discount}</p>
          <p>Availability: {product.availability ? 'Available' : 'Out of Stock'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Product;
