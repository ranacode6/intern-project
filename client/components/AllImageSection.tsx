import Image from 'next/image';

export default function AllImageSection({
  filteredData,
}: {
  filteredData: { animalName: string; categoryName: string; file: string }[];
}) {
  return (
    <div className="flex flex-wrap max-w-[1400px]">
      {filteredData &&
        filteredData.map((data, index) => (
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
  );
}
