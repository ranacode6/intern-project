export default function AddAnimalModal({
  addAnimalModal,
  setAnimalName,
  setCategoryName,
  toggleAddAnimalModal,
  handleAnimalSubmit,
  animalName,
  allCategory,
  convertToBase64,
  uploading,
}: {
  addAnimalModal: boolean;
  setAnimalName: any;
  setCategoryName: any;
  convertToBase64: any;
  animalName: string;
  allCategory: { categoryName: string }[] | null;
  toggleAddAnimalModal: any;
  handleAnimalSubmit: any;
  uploading: boolean;
}) {
  return (
    <div className="flex items-center justify-center mt-2">
      {addAnimalModal && (
        <form
          onSubmit={handleAnimalSubmit}
          className="flex flex-col mx-auto bg-white rounded-3xl max-w-sm mt-24 p-8 pt-3 gap-4 z-40 h-[350px] absolute"
          id="animalForm"
        >
          <p
            className="text-gray-800 ml-auto cursor-pointer rounded-full p-2 hover:bg-gray-200"
            onClick={toggleAddAnimalModal}
          >
            X
          </p>
          <h5 className="text-gray-900 text-lg font-semibold">Add Animal</h5>
          <input
            type="text"
            placeholder="Animal Name"
            onChange={(e) => setAnimalName(e.target.value)}
            required
            autoFocus
            value={animalName}
            className="bg-gray-200 rounded-md placeholder-gray-500 text-gray-900"
          />
          <select
            className="bg-gray-200 text-gray-900 rounded-md"
            onChange={(e) => setCategoryName(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {allCategory !== null &&
              allCategory.map((cat, index) => {
                return (
                  <option key={index} value={cat.categoryName}>
                    {cat.categoryName}
                  </option>
                );
              })}
          </select>

          <input
            type="file"
            onChange={convertToBase64}
            id="files"
            required
            className="bg-gray-200 rounded-md placeholder-gray-300 text-gray-900"
          />

          <button
            disabled={uploading}
            className="bg-black text-white py-2 rounded-lg"
          >
            {uploading ? 'Uploading...' : 'Create Animal'}
          </button>
        </form>
      )}
    </div>
  );
}
