import Link from "next/link";
import { DatePicker } from "antd";

export default function SearchHotel() {
  return (
    <div className="flex justify-center  ">
      <div className="relative md:absolute flex justify-center md:bottom-3 m-auto">
        <div className="flex flex-col rounded-lg bg-white shadow-lg  md:w-4/5 h-4/5 md:flex-row">
          <div className="mb-2 mt-1 ml-6 md:w-2/6">
            <div className="">
              <label className="form-label inline-block mb-2 text-gray-700 md:text-xs md:text-xs">
                Negara
              </label>
              <input
                className="shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-46"
                type="text"
              />
            </div>
            <div className="mb-1">
              <label className="form-label inline-block mb-2 text-gray-700 md:text-xs">
                Check-in
              </label>
              <DatePicker className="shadow appearance-none border rounded text-gray-700 h-6 leading-tight w-full focus:outline-none focus:shadow-outline" />
            </div>
          </div>
          <div className="mb-2 mt-1 ml-6 md:w-2/6">
            <div className="">
              <label className="form-label inline-block mb-2 text-gray-700 md:text-xs md:text-xs">
                Provice
              </label>
              <input
                className="shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:w-full"
                type="text"
              />
            </div>
            <div className="mb-1">
              <label className="form-label inline-block mb-2 text-gray-700 md:text-xs">
                Check-Out
              </label>
              <DatePicker className="shadow appearance-none border rounded text-gray-700 h-6 w-full leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>
          <div className="mb-2 mt-1 ml-6 mr-5 md:w-2/6">
            <div className="">
              <label className="form-label inline-block mb-2 text-gray-700 md:text-xs md:text-xs">
                Guest
              </label>
              <input
                className="shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                type="text"
              />
            </div>
            <div className="mb-1 mt-7">
              <Link href="#">
                <button
                  type="button"
                  className="inline-block  py-1 w-full bg-blue-300 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                >
                  Search
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
