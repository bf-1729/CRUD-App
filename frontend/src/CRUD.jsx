import React, { useEffect, useState } from 'react';
import axios from "axios";

const CRUD = () => {

  const backendurl = import.meta.env.VITE_BACKEND_URL
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []); 

  // Handler for adding data
  const handler = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter a value!");
      return;
    }
    try {
      await axios.post(backendurl+"/api/add-data", { name });
      setName(""); // Clear input after submitting
      console.log("Data added");
      fetchData(); // Refresh the data
    } catch (err) {
      console.log(err);
    }
  };

  // Handler for updating data
  const updateHandler = (dataId, currentName) => {
    let updatedName = prompt("Enter Updated Text", currentName);
    if (updatedName) {
      axios.post(backendurl+"/api/update-data", { dataId, updatedName })
        .then((res) => {
          console.log("Data updated successfully", res.data);
          fetchData(); // Refresh the data
        })
        .catch((error) => {
          console.log("Error updating data", error);
        });
    }
  };

  // Fetch data from server
  function fetchData() {
    axios.get(backendurl+"/api/get-data")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching data.");
      });
  }

  // Handler for deleting data
  const deleteHandler = async (dataId) => {
    try {
      await axios.post(backendurl+"/api/delete-data", { dataId });
      console.log("Data deleted successfully");
      fetchData(); // Refresh the data
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=' text-black lg:w-full'>
      <div className='flex flex-col items-center lg:gap-9 gap-4 pt-16 h-screen'>
        <h1 className='text-white lg:text-2xl text-xl font-semibold'>CRUD APP</h1>
        <div>
          <form onSubmit={handler} className='lg:w-screen flex flex-row lg:justify-center items-center'>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='lg:w-4/12 w-72 lg:h-11 h-10 font-sans pl-2 px-2 outline-none'
              type='text'
              placeholder='Enter value'
            />
            <button className='w-fit bg-teal-600 py-2 lg:py-2.5 lg:px-11 px-6 hover:bg-black text-white font-sans'>Add</button>
          </form>
        </div>
        <div className='border-2 lg:w-6/12 w-11/12 border-gray-700 h-fit'>
          {data.map((item, index) => (
            <div className='flex justify-between items-center bg-white py-1 lg:w-full w-full border-t-1 border-b-2 border-gray-300' key={item._id}>
              <p className='pl-4'>{index + 1}.</p>
              <p className='break-all font-sans pl-7 lg:text-[1rem] text-sm lg:w-3/4 w-10/12'>{item.name}</p>
              <div className='flex'>
                <p
                  className='w-12 text-left p-2 cursor-pointer text-red'
                  onClick={() => deleteHandler(item._id)}
                >
                  <img
                  className='lg:w-5 w-[19px]'
                    src="https://img.icons8.com/ios-glyphs/24/filled-trash.png"
                    alt="filled-trash"
                  />
                </p>
                <p
                  className='w-12 text-right p-2 cursor-pointer'
                  onClick={() => updateHandler(item._id, item.name)}
                >
                  <img
                  className='lg:w-4 w-4'
                    src="https://img.icons8.com/pastel-glyph/24/loop.png"
                    alt="loop"
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CRUD;
