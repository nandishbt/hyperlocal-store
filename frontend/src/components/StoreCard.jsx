import React from "react";
import Button from "./Button";
import { storeImages } from "../assets/imgs";

const StoreCard = ({storeId,storeName,storeLocation}) => {
  return (
    <div className="mx-auto max-w-sm py-4 px-4 sm:px-6 lg:max-w-3xl lg:px-8">
      <a href="#" class="block rounded-lg p-4 shadow-xs shadow-indigo-100">
        <img
          alt=""
          src={storeImages[storeName.replace(/\s+/g, '').toLowerCase()]}
          class="h-56 w-full rounded-md object-cover"
        />

        <div class="mt-2">
          <dl>
            <div>
              <dt class="sr-only">Name</dt>

              <dd class="text-sm text-gray-500">{storeName}</dd>
            </div>

            <div>
              <dt class="sr-only">Address</dt>

              <dd class="font-medium">{storeLocation}</dd>
            </div>
          </dl>

          <div class="mt-6 flex items-center gap-8 text-xs">
            <Button navigateTo={`store/${storeId}`} />
          </div>
        </div>
      </a>
    </div>
  );
};

export default StoreCard;
