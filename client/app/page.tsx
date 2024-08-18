'use client';

import axios from 'axios';
import Image from 'next/image';
import { useState, ChangeEvent, useEffect } from 'react';

// Define types for data used in the component
interface AnimalData {
  animalName: string;
  categoryName: string;
  file: string;
}

export default function Home() {
  const [active, setActive] = useState<boolean>(true);
  const [file, setFile] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [animalName, setAnimalName] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');
  const [allData, setAllData] = useState<AnimalData[] | null>(null);

  const [addAnimalModal, setAddAnimalModal] = useState<boolean>(false);
  const [addCategoryModal, setCategoryModal] = useState<boolean>(false);

  const toggleAddAnimalModal = () => setAddAnimalModal((prev) => !prev);
  const toggleAddCategoryModal = () => setCategoryModal((prev) => !prev);

  const convertToBase64 = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const image = e.target.files?.[0];
    if (!image) {
      console.log('no file selected');
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        console.log(reader.result);
        setFile(reader.result);
      }
    };
    reader.onerror = (error) => {
      console.log('Error', error);
    };
  };

  const SelectCategory = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setCategoryName(selectedValue);
  };

  const filterAnimal = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/filter`,
        {
          category,
        }
      );
      setAllData(response.data.data);
    } catch (err) {
      console.error('Error filtering animals:', err);
    }
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('animalName', animalName);
      formData.append('categoryName', categoryName);
      formData.append('file', file);

      await axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/upload`, {
          animalName,
          categoryName,
          file,
        })
        .then((res) => {
          alert(res.data.message);
          window.location.reload();
        });
    }
  };

  const getAllData = async () => {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/getAllData`,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    try {
      setAllData(result.data.data);
    } catch (error) {
      console.log('Error getting Data', error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <main
      className="flex flex-col min-h-screen mx-auto max-w-[1440px] pt-16 relative"
      id="mainDiv"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="flex w-2/3 h-fit gap-10">
          <button
            className="focus:text-green-600 text-red-600 p-6 py-2 font-medium rounded-full border-2 border-red-600 focus:border-green-600"
            onClick={() => {
              setCategory('Land Animal');
              filterAnimal();
            }}
          >
            Land Animal
          </button>
          <button
            className="focus:text-green-600 text-red-600 p-6 py-2 font-medium rounded-full border-2 border-red-600 focus:border-green-600"
            onClick={() => {
              setCategory('Bird');
              filterAnimal();
            }}
          >
            Bird
          </button>
          <button
            className="text-red-600 focus:text-green-600 p-6 py-2 font-medium rounded-full border-2 border-red-600 focus:border-green-600"
            onClick={() => {
              setCategory('Fish');
              filterAnimal();
            }}
          >
            Fish
          </button>
          <button
            className="text-red-600 focus:text-green-600 p-6 py-2 font-medium rounded-full border-2 border-red-600 focus:border-green-600"
            onClick={() => {
              setCategory('Insect');
              filterAnimal();
            }}
          >
            Insect
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full px-2 lg:w-1/3 h-fit flex gap-10">
          <button
            className="text-white p-6 py-2 font-medium rounded-full border-2 border-white"
            onClick={toggleAddAnimalModal}
          >
            Add Animal
          </button>
          <button
            className="text-white p-6 py-2 font-medium rounded-full border-2 border-white"
            onClick={toggleAddCategoryModal}
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Modal For Add Animal */}
      {addAnimalModal && (
        <div
          className="flex flex-col mx-auto bg-white rounded-3xl max-w-sm mt-24 p-8 gap-4 z-40"
          id="animalModal"
        >
          <h5 className="text-gray-900 text-lg">Add Animal</h5>
          <input
            type="text"
            placeholder="Animal Name"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
            required
            className="bg-gray-200 p-2 rounded-md placeholder-gray-900 text-gray-900"
          />
          <div className="flex justify-between items-center bg-gray-200 rounded-md cursor-pointer">
            <label htmlFor="files" className="w-full text-gray-900 p-2">
              Image
            </label>
            {file == '' || file == null ? (
              <label
                htmlFor="files"
                className="text-gray-900 m-2 p-1 rounded-md ml-auto bg-zinc-300 text-center"
              >
                Upload
              </label>
            ) : (
              <Image src={file} alt="Seclected Image" width={50} height={50} />
            )}
            <input
              type="file"
              onChange={convertToBase64}
              id="files"
              className="hidden"
              required
            />
          </div>

          <button
            className="bg-black text-white py-2 rounded-lg"
            onClick={toggleAddAnimalModal}
          >
            Create Animal
          </button>
        </div>
      )}
      {/* Modal For Add Category */}
      {addCategoryModal && (
        <div className="flex flex-col mx-auto bg-white rounded-3xl max-w-sm mt-24 p-8 gap-4 z-40">
          <h5 className="text-gray-900 text-lg outline-none">Add Category</h5>
          <select
            className="bg-gray-300 text-gray-900"
            disabled={!active}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => SelectCategory(e)}
          >
            <option value="Land Animal">Land Animal</option>
            <option value="Bird">Bird</option>
            <option value="Fish">Fish</option>
            <option value="Insect">Insect</option>
          </select>

          <button
            className="bg-black text-white py-2 rounded-lg"
            onClick={() => {
              handleSubmit();
              setActive(!active);
            }}
          >
            Save
          </button>
        </div>
      )}
      <div className="flex absolute top-40 flex-wrap">
        {allData &&
          allData.map((data, index) => (
            <div
              key={index}
              className="flex flex-col gap-10 items-center justify-end z-10 mr-20 mb-10"
            >
              {data.file && (
                <Image
                  src={data.file}
                  alt={data.animalName}
                  width={150}
                  height={150}
                />
              )}
              <h5 className="uppercase">{data.animalName}</h5>
            </div>
          ))}
      </div>
    </main>
  );
}
