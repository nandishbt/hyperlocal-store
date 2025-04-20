import React, { useContext, useEffect, useState } from "react";
import { storeContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { images } from "../assets/imgs";

const ProductCard = ({productName = 'Loading..',productPrice = 50,productId}) => {

  const{addToCart,removeFromCart} = useContext(storeContext)

  const [quantity, setQuantity] = useState(1);


  const handleAddToCart = async (productId,quantity) => {
    const items = {
      productId: productId,
      quantity: quantity,
    };
   await addToCart(items);

   toast.success("Added to cart successfully")

   
  }

  

  
  return (
    <div className="mx-auto max-w-sm py-4 px-4 sm:px-6 lg:max-w-3xl lg:px-8">
      <a class="block rounded-lg p-4 shadow-xs shadow-indigo-100">
        <img
          alt=""
          src={images[productName.toLowerCase()]}
          class="h-56 w-full rounded-md object-cover"
        />

        <div class="mt-2">
          <dl>
            <div>
              <dt class="sr-only">Price</dt>

              <dd class="text-sm text-gray-500">{productPrice}</dd>
            </div>

            <div>
              <dt class="sr-only">Address</dt>

              <dd class="font-medium">{productName}</dd>
            </div>
          </dl>

          <div class="mt-6 flex items-center gap-8 text-xs">
            <div>
              <label for="Quantity" class="sr-only">
                {" "}
                Quantity{" "}
              </label>

              <div class="flex items-center rounded-sm border border-gray-200">
                <button
                  type="button"
                  class="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  } }
                >
                  &minus;
                </button>

                <input
                  type="number"
                  id="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  class="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />

                <button
                  type="button"
                  class="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                  onClick={() => setQuantity(quantity + 1)}
                >
                 +
                </button>
              </div>
            </div>

            <button
              class="group relative inline-block text-sm font-medium text-[#009689] focus:ring-3 focus:outline-hidden"
              onClick={() => handleAddToCart(productId,quantity)}
             
            >
              <span class="absolute inset-0 translate-x-0 translate-y-0 bg-[#009689] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"></span>

              <span class="relative block border border-current bg-white px-8 py-3">
                {" "}
                Add to cart{" "}
              </span>
            </button>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
