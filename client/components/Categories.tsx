export default function Categories({
  allCategory,
  filterByCategory,
}: {
  allCategory: { categoryName: string }[] | null;
  filterByCategory: any;
}) {
  return (
    <div className="flex w-1/2 h-fit flex-wrap gap-10">
      {allCategory &&
        allCategory.map((cat, index) => {
          return (
            <button
              key={index}
              className="focus:text-green-600 text-red-500 p-6 py-2 font-medium rounded-full border-2 border-red-500 focus:border-green-600"
              value={cat.categoryName}
              onClick={() => {
                filterByCategory(cat.categoryName);
              }}
            >
              {cat.categoryName}
            </button>
          );
        })}
    </div>
  );
}
