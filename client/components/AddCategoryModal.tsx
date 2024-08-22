export default function AddCategoryModal({
  addCategoryModal,
  setCategoryName,
  handleCategorySubmit,
  toggleAddCategoryModal,
  uploading,
}: {
  addCategoryModal: boolean;
  setCategoryName: any;
  handleCategorySubmit: any;
  toggleAddCategoryModal: any;
  uploading: any;
}) {
  return (
    <div className="flex mt-24 relative justify-center items-center">
      {addCategoryModal && (
        <form
          className="flex flex-col mx-auto bg-white rounded-3xl max-w-sm mt-10 p-4 gap-4 z-40 absolute"
          onSubmit={handleCategorySubmit}
        >
          <p
            className="text-gray-800 ml-auto cursor-pointer rounded-full hover:bg-gray-300 p-2"
            onClick={toggleAddCategoryModal}
          >
            X
          </p>
          <h5 className="text-gray-900 text-lg outline-none">Add Category</h5>
          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) => setCategoryName(e.target.value)}
            className="rounded-md text-gray-900"
            autoFocus
          />

          <button
            className="bg-black text-white py-2 rounded-lg"
            disabled={uploading}
          >
            {uploading ? 'Saving...' : 'Save'}
          </button>
        </form>
      )}
    </div>
  );
}
