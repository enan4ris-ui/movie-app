import WhiteFilmIcon from "@/app/_icons/WhiteFilmIcon";
import MailIcon from "@/app/_icons/MailIcon";
import WifiIcon from "@/app/_icons/WifiIcon";

export function FooterContent() {
  return (
    <footer className="h-[280px] w-full bg-[#4338CA]">
      <div className="mx-auto flex h-full w-full max-w-[1280px] flex-row items-start justify-between py-10">
        <div className="flex w-[247px] flex-col gap-3 text-white">
          <div className="flex items-center gap-2">
            <WhiteFilmIcon />
            <p className="font-inter text-[16px] font-bold italic leading-5 tracking-[0.32px] text-zinc-50">
              Movie Z
            </p>
          </div>
          <p className="text-sm leading-5 text-white">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        <div className="flex w-[174px] flex-col gap-5 text-[14px] text-white">
          <p className="text-sm">Contact Information</p>
          <div className="flex items-start gap-3">
            <MailIcon className="mt-1 shrink-0" />
            <div>
              <p className="font-medium">Email:</p>
              <p className="text-sm">support@movieZ.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <WifiIcon className="mt-1 shrink-0" />
            <div>
              <p className="font-medium">Phone:</p>
              <p className="text-sm">+976 (11) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="flex w-[274px] flex-col gap-4 text-[14px] text-white">
          <p className="text-sm leading-5">Follow us</p>
          <div className="flex gap-4 text-sm">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Youtube</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
