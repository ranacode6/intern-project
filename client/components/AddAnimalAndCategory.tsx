export default function AddAnimalAndCategory({
  toggleAddAnimalModal,
  toggleAddCategoryModal,
}: {
  toggleAddAnimalModal: any;
  toggleAddCategoryModal: any;
}) {
  return (
    <div className="w-full px-2 lg:w-1/2 h-fit flex gap-10">
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
  );
}
