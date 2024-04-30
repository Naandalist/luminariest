import React from "react";

interface ButtonMenuForMobileProps {
  isShowTaskMenu: boolean;
  setIsShowTaskMenu: (isShowTaskMenu: boolean) => void;
}

function ButtonMenuForMobile({
  isShowTaskMenu,
  setIsShowTaskMenu,
}: ButtonMenuForMobileProps) {
  return (
    <div
      className={`overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden ${
        isShowTaskMenu && "!block xl:!hidden"
      }`}
      onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}
    ></div>
  );
}

export default ButtonMenuForMobile;
