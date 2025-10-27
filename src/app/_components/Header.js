import MoonIcon from "../_features/_icons/MoonIcon";
import FilmIcon from "../_features/_icons/FilmIcon";
import HeaderIcon from "../_features/_icons/HeaderIcon";
export const Header = () => {
  return (
    <div className=" p-[16px] flex flex-row justify-around">
      <div className="flex flex-row gap-2">
        {" "}
        <FilmIcon />{" "}
        <p className="text-indigo-700 font-inter text-[16px] italic font-bold leading-[20px] tracking-[0.32px]">
          Movie Z
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-md border border-[#E4E4E7] bg-white shadow-sm flex w-[97px] h-[36px] px-4 py-2 justify-center items-center gap-1.5">
          <HeaderIcon />
          Genre
        </button>
        <input
          className="flex w-[379px] h-[36px] px-3 items-center gap-[10px] rounded-lg border border-[#E4E4E7] bg-white"
          placeholder="Search"
        />
      </div>
      <MoonIcon />
    </div>
  );
};

export default Header;
