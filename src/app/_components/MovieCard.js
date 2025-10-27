const { StarIcon } = require("../_features/_icons/StarIcon");

export function MovieCard(props) {
  const { title, imageURL, rating } = props;
  return (
    <div className="w-[229.73px] h-[439px] bg-[#F4F4F5] rounded flex flex-col justify-end">
      <div
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${imageURL}')`,
        }}
        className={`w-[229.73px] h-[340px] bg-center bg-cover`}
      ></div>
      <div className="w-[229.73px] h-[95px] p-[8px]">
        <div className="flex flex-col items-start">
          <div className="flex ">
            <StarIcon className="w-[16px] h-[18px] object-contain" />
            <p className="font-medium">{rating}</p>
            <p className="text-[#71717A] not-[]:">/10</p>
          </div>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
}
