const { StarIcon } = require("../_features/_icons/StarIcon");

export function MovieCard(props) {
  const { title, imageURL, rating } = props;
  return (
    <div className="w-[229.73px] h-[439px] bg-[#F4F4F5] object-cover rounded-lg flex flex-col justify-end cursor-pointer">
      <div
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${imageURL}')`,
        }}
        className={`w-[229.73px] h-[340px] bg-center rounded-t-lg bg-cover`}
      ></div>
      <div className="w-[229.73px] h-[95px] p-2">
        <div className="flex flex-col items-start">
          <div className="flex ">
            <StarIcon className="w-4 h-[18px] " />
            <p className="font-medium pl-1">{rating}</p>
            <p className="text-[#71717A] not-[]:">/10</p>
          </div>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
}
