import { React, useState } from "react";
import { Transition } from "@headlessui/react";

import { IconContext } from "react-icons";

import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import {
  AiFillSetting,
  AiOutlineCamera,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { MdSpaceDashboard, MdMonitor, MdExpandMore } from "react-icons/md";
import { HiMenu, HiOutlineDocumentReport } from "react-icons/hi";
//import { CgClose } from "react-icons/cg";

function Nav() {
  const listItemUpper = [
    { key: 11, icon: MdSpaceDashboard, name: "แดชบอร์ด", path: "/" },
    { key: 13, icon: MdMonitor, name: "มอนิเตอร์", path: "/" },
    { key: 14, icon: AiOutlineUser, name: "ผู้ใช้งาน", path: "/" },
    { key: 15, icon: AiFillSetting, name: "ตั้งค่าระบบ", path: "/" },
    { key: 16, icon: AiOutlineCamera, name: "กล้อง Ncap", path: "/" },
    {
      key: 17,
      icon: BsFileEarmarkSpreadsheet,
      name: "บันทึกเหตุการณ์",
      path: "/",
    },
    { key: 18, icon: HiOutlineDocumentReport, name: "รายงาน", path: "/" },
  ];

  const listItemLower = [
    { key: 21, icon: AiOutlineUser, name: "User1", path: "/" },
    { key: 22, icon: AiOutlineLogout, name: "ออกจากระบบ", path: "/" },
  ];

  const [isExpanded, setIsExpanded] = useState(true);

  const expandHandle = (e) => {
    setIsExpanded(!isExpanded);
  };

  const navItemRender = (position) => {
    let listItem = {};

    if (position === "upper") listItem = listItemUpper;
    if (position === "lower") listItem = listItemLower;

    return listItem.map(({ key, icon, name, path }) => (
      <li
        className="group mb-1 flex border-l-4 border-slate-900 transition duration-300 hover:border-l-teal-600"
        key={key}
      >
        <a
          href="/"
          className="mx-2 flex h-[48px] flex-row items-center justify-start gap-5 overflow-clip rounded-md px-4 py-3 transition duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-1 group-hover:bg-slate-100"
        >
          <div>{icon()}</div>
          <Transition
            show={isExpanded}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex flex-row">
              <div className="inline-block w-28 whitespace-nowrap align-top font-Sarabun text-sm text-slate-100 transition duration-300 group-hover:text-slate-900">
                {name}
              </div>
              <MdExpandMore className="group-hover:text-slate-900; inline-block h-5 w-5 -rotate-90 justify-items-end text-slate-900 transition duration-300" />
            </div>
          </Transition>
        </a>
      </li>
    ));
  };

  return (
    <IconContext.Provider
      value={{
        className:
          "inline-block h-5 w-5 text-slate-100 transition duration-300 group-hover:text-slate-900",
      }}
    >
      <nav
        className={`${
          isExpanded ? "w-[14rem]" : "w-[4.5rem]"
        } flex h-screen flex-none flex-col justify-end overflow-hidden bg-slate-900 shadow-sm transition-all duration-300`}
      >
        {/* Header */}
        <header className="mx-4 mb-8 flex h-[5rem] items-center justify-around gap-4">
          <Transition
            show={isExpanded}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <sapn className="font-Prompt text-3xl text-slate-100 transition duration-300 group-hover:text-slate-900">
              NcapApp
            </sapn>
          </Transition>
          <button
            className="nline-block h-5 w-5 text-slate-100 transition duration-300 group-hover:text-slate-900"
            onClick={expandHandle}
          >
            <HiMenu className="h-6 w-6 hover:text-slate-900" />
          </button>
        </header>

        {/* Top Nav list */}
        <ul>{navItemRender("upper")}</ul>

        {/* Bottom Nav list */}
        <ul className="mb-4 flex flex-auto flex-col justify-end">
          {navItemRender("lower")}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Nav;
