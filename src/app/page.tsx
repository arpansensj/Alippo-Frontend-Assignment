"use client";
import { useEffect, useState } from "react";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

interface Data {
  name: string;
  age: number;
  city: string;
  pinCode: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [selectedData, setSelectedData] = useState({});

  async function fetchData(url: any) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  useEffect(() => {
    const apiUrl = "https://assets.alippo.com/catalog/static/data.json";
    fetchData(apiUrl)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpdate = (updatedName: any, selectedIndex: any) => {
    const index = selectedIndex;

    const newData = [...data];

    newData[index].name = updatedName;

    setData(newData);
  };

  const handleDelete = (selectedToDelete: any) => {
    const newData = data.filter((item) => item !== selectedToDelete);

    setData(newData);
    window["delete"]?.close();
  };

  return (
    <div className="">
      <div className="overflow-x-auto flex justify-center pt-8 md:text-base text-xs">
        <table className="table w-[1000px] shadow-2xl">
          <thead>
            <tr className="bg-[#02343F] ">
              <th className="text-[#F0EDCC] py-5">SR No</th>
              <th className="text-[#F0EDCC] py-5">Name</th>
              <th className="text-[#F0EDCC] py-5">Age</th>
              <th className="text-[#F0EDCC] py-5">City</th>
              <th className="text-[#F0EDCC] py-5">Pincode</th>
              <th className="text-[#F0EDCC] py-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((data, index) => (
              <tr className="bg-base-200">
                <th className=" text-[#02343F] py-5 ">{index + 1}</th>
                <td className="text-center  text-[#02343F] ">
                  {data?.name ?? "----"}
                </td>
                <td className="text-center  text-[#02343F] ">
                  {data?.age ?? "----"}
                </td>
                <td className="text-center  text-[#02343F] ">
                  {data?.city ?? "----"}
                </td>
                <td className="text-center  text-[#02343F] ">
                  {data?.pinCode ?? "----"}
                </td>
                <td className="text-center  text-[#02343F] ">
                  <button
                    className="md:mr-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    onClick={() => {
                      setSelectedData({ data, index });
                      const dialogElement = document.getElementById(
                        "edit"
                      ) as HTMLDialogElement;
                      dialogElement.showModal();
                    }}
                  >
                    <MdEdit className="md:hidden" />
                    <p className="max-md:hidden">Edit</p>
                  </button>
                  <button
                    className="md:ml-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    onClick={() => {
                      setSelectedData(data);
                      const dialogElement = document.getElementById(
                        "delete"
                      ) as HTMLDialogElement;
                      dialogElement.showModal();
                    }}
                  >
                    <IoMdTrash className="md:hidden" />
                    <p className="max-md:hidden">Delete</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditModal selected={selectedData} onSubmit={handleUpdate} />
      <DeleteModal
        data={data}
        selected={selectedData}
        onSubmit={handleDelete}
      />
    </div>
  );
};

export default Home;
