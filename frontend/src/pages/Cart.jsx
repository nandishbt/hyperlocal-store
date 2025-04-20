import React, { useContext, useEffect } from "react";
import { storeContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const Cart = () => {
  const {cartitems,removeFromCart} = useContext(storeContext)

  const [total, setTotal] = React.useState(0);

  const handleRemoveFromCart = async (productId) => {
    
    removeFromCart(productId);
    window.location.reload();
   }

   const setTotalPrice =  () => {
    let total = 0;
    cartitems.forEach((item) => {
      total += item.total;
    });
    setTotal(total);
  };

  const handleOrder = ()=>{
    if(cartitems.length == 0){
      toast.error("Cart is Empty")
    }else{
      toast.success("Order Placed Successfully")
    }

    
    
  }

  useEffect(()=>{
   
    setTotalPrice();

  },[cartitems])
  return (
    <div>
      <div className=" bg-white p-4 rounded-xl shadow-md mb-4">
     { cartitems.map(item => (  <div className="flex items-center justify-around w-full">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">
            Quantity: <span className="font-medium">{item.quantity}</span>
          </p>
          <p className="text-sm text-gray-500">
            Price: ₹<span className="font-medium">{item.price}</span>
          </p>
          <p className="text-sm  text-gray-500 mt-1">
            Total: ₹<span className="font-medium">{item.total}</span>
          </p>
          <button onClick={()=>handleRemoveFromCart(item.id)}>❌</button>
          
        </div>))}
        <div class="mt-8 flex justify-around border-t border-gray-100 pt-8">
          <div class="w-screen max-w-lg space-y-4">
            <dl class="space-y-0.5 text-sm text-gray-700">
              <div class="flex justify-between">
                <dt>Subtotal</dt>
                <dd>₹{total}</dd>
              </div>

              <div class="flex justify-between">
                <dt>VAT</dt>
                <dd>₹25</dd>
              </div>

              <div class="flex justify-between">
                <dt>Discount</dt>
                <dd>-₹25</dd>
              </div>

              <div class="flex justify-between !text-base font-medium">
                <dt>Total</dt>
                <dd>₹{total}</dd>
              </div>
            </dl>

            <div class="flex justify-end">
              <span
                class="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="-ms-1 me-1.5 size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                  />
                </svg>

                <p class="text-xs whitespace-nowrap">2 Discounts Applied</p>
              </span>
            </div>

            <div class="flex justify-end">
              <button
               
                class="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                onClick={handleOrder}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
