import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import StoreCard from "../components/StoreCard";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import {url} from "../assets/url"

const Home = () => {
  const [stores,setStores] = useState([])
  const [products,setProducts] = useState([])

  const getallstores = async () =>{
    try {
      const res = await axios.get(`${url}store/getall`)
      // console.log(res.data.data);
      setStores(res.data.data)
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const getallproducts = async () =>{
    try {
      const res = await axios.get(`${url}product/getall`)
      // console.log(res.data.data);
      setProducts(res.data.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    getallstores()
    getallproducts()
  },[])
  return (
    <div>
      <Hero />

      <span class="flex items-center">
        <span class="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300"></span>

        <span class="shrink-0 px-4 text-gray-900 text-5xl">Nearby Stores</span>

        <span class="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300"></span>
      </span>
      <div className="flex flex-wrap mt-10" id="stores">
       {
        stores.map((store) => {
          return (
            <StoreCard
              key={store._id}
              storeId={store._id}
              storeName={store.name}
              storeLocation={store.location}
              
            />
          );
        })
       }
     
      </div>

      <span class="flex items-center" id="products">
        <span class="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300"></span>

        <span class="shrink-0 px-4 text-gray-900 text-5xl">All Products</span>

        <span class="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300"></span>
      </span>
      <div className="flex flex-wrap mt-10">
       {
        products.map((product) => {
          return (
            <ProductCard
              key={product._id}
              productId={product._id}
              productName={product.name}
              productPrice={product.price}
            
            />
          );
        })
       }
      </div>
    </div>
  );
};

export default Home;
