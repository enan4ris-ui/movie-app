import MoonIcon from "../_features/_icons/MoonIcon";
import FilmIcon from "../_features/_icons/FilmIcon";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "../_features/_icons/ArrowDown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export const Header = () => {
  return (
    <div className=" p-4 w-[1440px] h-[59px] flex flex-row justify-around">
      <div className="flex flex-row gap-2 items-center">
        {" "}
        <FilmIcon />{" "}
        <p className="text-indigo-700 font-inter text-[16px] italic font-bold leading-5 tracking-[0.32px]">
          Movie Z
        </p>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ArrowDown />
            <Button
              className="border border-[#E4E4E7] text-[14px] font-semibold"
              variant="outline"
            >
              Genre
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[577px] h-[333px] bg-white border-gray-200"
            align="start"
          >
            <p className="font-sans font-semibold text-[24px] p-5">Genres</p>
          </DropdownMenuContent>
        </DropdownMenu>
        <input
          className="flex w-[379px] h-9 px-3 items-center gap-2.5 rounded-lg border border-[#E4E4E7] bg-white"
          placeholder="Search"
        />
      </div>
      <MoonIcon />
    </div>
  );
};

export default Header;
