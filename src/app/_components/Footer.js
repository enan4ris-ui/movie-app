import WhiteFilmIcon from "../_features/_icons/WhiteFilmIcon";
import MailIcon from "@/app/_features/_icons/MailIcon";
import WifiIcon from "@/app/_features/_icons/WifiIcon";
export function Footer() {
  return (
    <div className="w-[1440px] h-[280px] flex justify-center gap-[120px] bg-indigo-700 pt-10 ">
      <div className="w-[247px] h-[200px] gap-10 grid-auto-flow">
        {" "}
        <WhiteFilmIcon />{" "}
        <p className="text-zinc-50 font-inter text-[16px] italic font-bold leading-5 tracking-[0.32px]">
          Movie Z
        </p>
        <p className="text-white text-sm leading-5 text-[14px]">
          © 2024 Movie Z. All Rights Reserved.
        </p>
      </div>
      <div className="flex flex-col justify-self-center text-white h-[200px] w-[174px] text-[14px] gap-3">
        <p className="text-sm">Contact Information</p>
        <div>
          <MailIcon />
          <p className="font-medium">Email:</p>
          <p className="text-sm">support@movieZ.com</p>
        </div>
        <div>
          <WifiIcon />
          <p className="font-medium">Phone:</p>
          <p className="text-sm">+976(11)123-4567</p>
        </div>
      </div>
      <div className="w-[274px] h-[52px] gap-12 text-[14px] text-white">
        <p className="leading-5 text-sm">Follow us</p>
        <p className="">Facebook Instagram Twitter Youtube</p>
      </div>
    </div>
  );
}
