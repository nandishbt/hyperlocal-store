import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {url} from "../assets/url"

const StoreDetails = () => {
  const {id} = useParams()

  const [storedata, setStoreData] = useState({
    name:'',
    location:'',
    
  })

  const [products,setProducts] = useState([])



  const getStoreDetails = async () => {
    try {
      const res = await axios.get(`${url}store/get/${id}`)
      // console.log(res.data.data);
      setStoreData({
        name: res.data.data.store.name,
        location: res.data.data.store.location,
      })

      setProducts(res.data.data.products)
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    getStoreDetails()
  },[])

  return (
    <div>
      <section class="bg-white lg:grid lg:h-screen lg:place-content-center">
  <div class="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
    <div class="mx-auto max-w-prose text-center">
      <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl">
        {storedata.name}{" "}
        <strong class="text-indigo-600"> {storedata.location }</strong>
        Bengaluru
      </h1>

      <p class="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi. Natus, provident
        accusamus impedit minima harum corporis iusto.
      </p>

      
    </div>
  </div>
</section>

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
  )
}

export default StoreDetails