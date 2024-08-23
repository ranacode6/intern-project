'use client';

import AddAnimalAndCategory from '@/components/AddAnimalAndCategory';
import AddAnimalModal from '@/components/AddAnimalModal';
import AddCategoryModal from '@/components/AddCategoryModal';
import AllImageSection from '@/components/AllImageSection';
import Categories from '@/components/Categories';
import axios from 'axios';
import { useState, ChangeEvent, useEffect, FormEvent } from 'react';

// Define types for data used in the component
interface AnimalData {
  animalName: string;
  categoryName: string;
  file: string;
}

interface Category {
  categoryName: string;
}
export default function Home() {
  const [file, setFile] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [animalName, setAnimalName] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');
  const [allData, setAllData] = useState<AnimalData[]>([]);
  const [filteredData, setFilteredData] = useState<AnimalData[]>([]);
  const [allCategory, setAllCategory] = useState<Category[] | null>(null);

  const [addAnimalModal, setAddAnimalModal] = useState<boolean>(false);
  const [addCategoryModal, setCategoryModal] = useState<boolean>(false);

  const toggleAddAnimalModal = () => setAddAnimalModal(!addAnimalModal);
  const toggleAddCategoryModal = () => setCategoryModal(!addCategoryModal);

  const convertToBase64 = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) {
      console.log('no file selected');
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        setFile(reader.result);
      }
    };
    reader.onerror = (error) => {
      console.log('Error', error);
    };
  };

  const handleAnimalSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/create-animal`, {
        animalName,
        categoryName,
        file,
      })
      .then((res) => {
        setUploading(false);
        alert(res.data.message);
        setAddAnimalModal(true);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setUploading(false);
      });
  };

  const handleCategorySubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/create-category`, {
        categoryName,
      })
      .then((res) => {
        setUploading(false);
        alert(res.data.message);
        setAddAnimalModal(true);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const getAllData = async () => {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/getAnimals`,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setAllData(result.data.data);
      setFilteredData(result.data.data);
    } catch (error) {
      console.log('Error getting Data', error);
    }
  };

  const filterByCategory = (cat: string) => {
    const filtered = allData.filter(
      (data) => data.categoryName.toLowerCase() === cat.toLowerCase()
    );
    setFilteredData(filtered);
  };

  const getAllCategory = async () => {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/getAllCategory`,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setAllCategory(result.data.data);
    } catch (error) {
      console.log('Error getting category', error);
    }
  };

  useEffect(() => {
    getAllData();
    getAllCategory();
  }, []);

  return (
    <main className="w-full relative">
      <div className="flex flex-col items-center justify-center h-auto">
        <div className="flex flex-col lg:flex-row py-12 gap-10">
          {/* Left Section */}
          <Categories
            allCategory={allCategory}
            filterByCategory={filterByCategory}
          />

          {/* Right Section */}
          <AddAnimalAndCategory
            toggleAddAnimalModal={toggleAddAnimalModal}
            toggleAddCategoryModal={toggleAddCategoryModal}
          />
        </div>

        {/* Modal For Add Animal */}
        <AddAnimalModal
          addAnimalModal={addAnimalModal}
          setAnimalName={setAnimalName}
          setCategoryName={setCategoryName}
          convertToBase64={convertToBase64}
          animalName={animalName}
          allCategory={allCategory}
          toggleAddAnimalModal={toggleAddAnimalModal}
          handleAnimalSubmit={handleAnimalSubmit}
          uploading={uploading}
        />

        {/* Modal For Add Category */}
        <AddCategoryModal
          addCategoryModal={addCategoryModal}
          setCategoryName={setCategoryName}
          handleCategorySubmit={handleCategorySubmit}
          toggleAddCategoryModal={toggleAddCategoryModal}
          uploading={uploading}
        />
        {/* All Image Section */}
        <AllImageSection filteredData={filteredData} />
      </div>
    </main>
  );
}
