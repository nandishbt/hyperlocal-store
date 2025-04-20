import React from "react";

const Button = ({navigateTo = '#'}) => {
  return (
    <div className="w-full">
      <a
        class="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-green-600 transition-colors hover:bg-zinc-100 focus:ring-3 focus:outline-hidden"
        href={`${navigateTo}`}
      >
        <span class="font-medium transition-colors group-hover:text-black">
          {" "}
          Find out more{" "}
        </span>

        <span class="shrink-0 rounded-full border border-green-600 bg-white p-2">
          <svg
            class="size-5 shadow-sm rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </a>
    </div>
  );
};

export default Button;
