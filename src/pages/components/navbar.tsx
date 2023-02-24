import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NavBar: React.FC = () => {
  const [navbar, setNavbar] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-30 shadow mb-4">
        <div className="relative bg-white">
          <div className="absolute inset-0 bg-white/30"></div>

          <div className="relative px-4 mx-auto sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex-shrink-0 ml-10">
                <a href="#" title="" className="flex">
                  <img className="w-40 h-15" src="/img/logoNav.png" alt="" />
                </a>
              </div>

              <button
                type="button"
                className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-800 hover:bg-gray-800"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>

              <div className="hidden lg:flex lg:items-center lg:space-x-10 mr-10">
                <Link
                  href="#"
                  title=""
                  className="text-base font-medium text-black"
                >
                  {" "}
                  Home{" "}
                </Link>

                <Link href="/" className="text-base font-medium text-black">
                  {" "}
                  Hotels{" "}
                </Link>

                <Link
                  href="/hotelAdmin"
                  title=""
                  className="text-base font-medium text-black"
                >
                  {" "}
                  hotelAdmin
                </Link>

                <a
                  href="#"
                  title=""
                  className="text-base font-medium text-black"
                >
                  {" "}
                  Contact{" "}
                </a>
              </div>

              <Link
                href="#"
                title=""
                className=" mr-10 items-center justify-center hidden px-6 py-2 text-base font-semibold text-white transition-all duration-200 bg-[#131828] border border-transparent rounded-full lg:inline-flex hover:bg-[#1C2953] focus:bg-[#1C2953]"
                role="button"
              >
                {" "}
                Sign In{" "}
              </Link>
            </nav>
          </div>
        </div>
        {/* <nav className="flex flex-col justify-between w-full max-w-xs min-h-screen px-4 py-10 bg-white sm:px-6 lg:hidden">
          <button type="button" className="inline-flex p-2 text-black transition-all duration-200 rounded-md focus:bg-gray-800 hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </button>

          <div className="flex flex-col flex-grow h-full">
              <nav className="flex flex-col flex-1 mt-10 space-y-2">
                  <Link href="/" title="" className="flex w-full py-2 font-medium text-black transition-all duration-200 focus:text-opacity-70"> Home </Link>

                  <Link href="/regions" className="flex w-full py-2 font-medium text-black transition-all duration-200 focus:text-opacity-70"> Regions </Link>

                  <a href="#" title="" className="flex w-full py-2 font-medium text-black transition-all duration-200 focus:text-opacity-70"> Resources </a>

                  <a href="#" title="" className="flex w-full py-2 font-medium text-black transition-all duration-200 focus:text-opacity-70"> Pricing </a>
              </nav>

              <div className="flex flex-col items-start">
                  <Link href="#" title="" className="inline-flex items-center justify-center w-auto px-6 py-3 mt-auto text-base font-semibold text-black transition-all duration-200 bg-yellow-400 border border-transparent rounded-full hover:bg-yellow-500 focus:bg-yellow-500" role="button"> Login  </Link>
              </div>
          </div>
      </nav> */}
      </header>
    </>
  );
};

export default NavBar;
