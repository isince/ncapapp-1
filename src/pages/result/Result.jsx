import { React, useState, Fragment } from "react";
import { Combobox, Transition, Popover, Dialog } from "@headlessui/react";
import {
  AiOutlineSearch,
  AiFillSetting,
  AiOutlineBell,
  AiFillBell,
  AiOutlineCheck,
  AiOutlinePicture,
} from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { BiTime } from "react-icons/bi";
import { MdEditNote, MdToday } from "react-icons/md";
import { ImFilePicture } from "react-icons/im";
import { IoVideocamOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

function Result() {
  const ncap = [
    {
      id: 1,
      name: "Ncap01",
      group: "NcapGroup-1",
      address: "ตากใบ",
      lat: "6.213123",
      long: "101.123134",
    },
    {
      id: 2,
      name: "Ncap02",
      group: "NcapGroup-1",
      address: "ปะลุกา",
      lat: "6.213123",
      long: "101.123134",
    },
    {
      id: 3,
      name: "Ncap03",
      group: "NcapGroup-2",
      address: "ศรีพงัน",
      lat: "6.213123",
      long: "101.123134",
    },
  ];

  let [selectedNcap, setSelectedNcap] = useState(ncap[0]);
  let [query, setQuery] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenAlert, setIsOpenAlert] = useState(false);

  const filteredNcap =
    query === ""
      ? ncap
      : ncap.filter((ncap) => {
          return ncap.name.toLowerCase().includes(query.toLowerCase());
        });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModalAlert() {
    setIsOpenAlert(false);
  }

  function openModalAlert() {
    setIsOpenAlert(true);
  }

  function modal() {
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment successful
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>;
  }

  return (
    <>
      <div className="flex  w-[40rem] flex-none flex-col overflow-auto bg-slate-300">
        {/* Search Content*/}
        <div className="relative my-5 mx-14 flex flex-row items-stretch gap-2">
          {/* Search_Input */}
          <div className="relative h-12 flex-auto flex-row  items-center rounded-lg bg-slate-100 shadow-md">
            <Combobox value={selectedNcap} onChange={setSelectedNcap}>
              <div className="relative flex h-full flex-auto flex-row items-center border-none ">
                <AiOutlineSearch className="mx-4 h-6 w-6 flex-none text-slate-700" />
                <Combobox.Input
                  autocomplete="off"
                  className="h-full w-full bg-slate-100 focus:outline-none focus:ring-0"
                  onChange={(event) => setQuery(event.target.value)}
                />
                <button className="btn flex-none rounded-none rounded-r-md border-none bg-slate-100 px-6 text-slate-600 shadow-none">
                  ค้นหา
                </button>
              </div>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute z-50 mt-3 w-full rounded-md bg-slate-100 py-2 shadow-md">
                  {filteredNcap.length === 0 && query !== "" ? (
                    <div className="cursor-default select-none py-2 px-4 font-Sarabun text-gray-700">
                      ไม่พบผลการค้นหา.
                    </div>
                  ) : (
                    filteredNcap.map((ncap) => (
                      <Combobox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-teal-600 text-white" : "text-gray-900"
                          }`
                        }
                        key={ncap.id}
                        value={ncap.name}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {`${ncap.name} - ${ncap.address}`}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <AiOutlineSearch
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </Combobox>
          </div>

          {/* Search-option_Btn */}
          <Popover className="">
            {({ open }) => (
              <>
                <Popover.Button className="btn flex-none">
                  <AiFillSetting className="h-6 w-6" />
                </Popover.Button>
                <Popover.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md" />

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-3"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-3"
                >
                  <Popover.Panel className="absolute left-0 z-50 mt-3 w-full   transform rounded-md bg-slate-100 font-Sarabun text-sm shadow-lg">
                    <div className="flex flex-col justify-center space-y-3 overflow-hidden p-4 ring-1 ring-black ring-opacity-5 [&>*]:h-[28px]">
                      <div className="flex flex-row ">
                        <div className="w-28 ">
                          <p className="font-bold">Ncap</p>
                        </div>
                        <div className="flex flex-row">
                          <input className="rounded-md border-[1px] border-slate-400 px-3" />
                        </div>
                      </div>

                      <div className="flex flex-row ">
                        <div className="w-28 ">
                          <p className="font-bold">NcapGroup</p>
                        </div>
                        <div className="flex flex-row">
                          <input className="rounded-md border-[1px] border-slate-400 px-3" />
                        </div>
                      </div>

                      <div className="flex flex-row">
                        <div className="w-28 flex-initial">
                          <p className="font-bold">Status</p>
                        </div>
                        <ul className="grid flex-auto grid-flow-row grid-cols-3 ">
                          <li>
                            <div class="flex items-center">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                value=""
                                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-0 "
                              />
                              <label
                                for="default-checkbox"
                                class="ml-2 text-sm font-medium "
                              >
                                รอตรวจสอบ
                              </label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                value=""
                                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-0 "
                              />
                              <label
                                for="default-checkbox"
                                class="ml-2 text-sm font-medium "
                              >
                                กำลังตรวจสอบ
                              </label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                value=""
                                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-0 "
                              />
                              <label
                                for="default-checkbox"
                                class="ml-2 text-sm font-medium "
                              >
                                ตรวจสอบแล้ว
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="flex flex-row">
                        <p className="w-28 font-bold">Date</p>
                        <div className="flex flex-row">
                          <input className="rounded-md border-[1px] border-slate-400" />
                          <span className="mx-2"> ถึง </span>
                          <input className="rounded-md border-[1px] border-slate-400" />
                        </div>
                      </div>

                      <div className="flex flex-row ">
                        <div className="w-28 ">
                          <p className="font-bold">ประเภทเป้าหมาย</p>
                        </div>
                        <div className="flex flex-row">
                          <input className="rounded-md border-[1px] border-slate-400 px-3" />
                        </div>
                      </div>
                    </div>
                    <div className="border-t-2 py-3 px-4">
                      <div className="flex flex-row justify-between">
                        <button className="text-red-600">Clear</button>
                        <div className="space-x-4">
                          <button className="">ยกเลิก</button>
                          <button className="rounded-md border-[1px] border-slate-700 px-2 py-1 transition duration-300 hover:bg-slate-800 hover:text-slate-100">
                            ตกลง
                          </button>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>

        {/*Result list New */}
        <ul className="divide-y divide-slate-400">
          <li className="flex flex-row items-center justify-between space-x-3  bg-slate-100 py-4 px-6 font-Sarabun transition duration-200">
            <div className="flex flex-none flex-col">
              <div className="flex flex-row items-center">
                <h1 className="font-Sarabun text-base">Ncap01</h1>
              </div>

              <div className="flex flex-row items-center">
                <MdToday className="mr-1 h-4 w-4 text-slate-400" />
                <h2 className="font-Sarabun text-sm text-slate-400">
                  11/06/2565
                </h2>
                <h2 className="ml-1 font-Sarabun text-sm text-slate-400">
                  12:00:23
                </h2>
              </div>
            </div>

            <div className="flex flex-row items-center rounded-full bg-orange-600 px-4 py-1 text-slate-100">
              <BiTime className="mr-1 h-5 w-5" />
              <h4 className="result__status ">รอตรวจสอบ</h4>
            </div>

            <div className="flex flex-none flex-row justify-end space-x-1">
              <button className="group h-11 w-11 rounded-md border-[1.5px] border-slate-800 bg-slate-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:text-slate-100 hover:shadow-md">
                <FaMapMarkerAlt className=" m-2.5 h-5 w-auto   group-hover:text-slate-100" />
              </button>

              <button
                type="button"
                onClick={openModal}
                className="group h-11 w-11 rounded-md border-[1.5px] border-slate-800 bg-slate-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:text-slate-100 hover:shadow-md"
              >
                <ImFilePicture className=" m-2.5 h-5 w-auto   group-hover:text-slate-100" />
              </button>

              <button className=" group h-11 w-11 rounded-md border-[1.5px] border-slate-800 bg-slate-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:text-slate-100 hover:shadow-md">
                <IoVideocamOutline className=" m-2.5 h-5 w-auto   group-hover:text-slate-100" />
              </button>

              <Popover className="h-11 w-11">
                {({ open }) => (
                  <>
                    <Popover.Button className="group h-11 w-11 rounded-md border-[1.5px] border-slate-800 bg-slate-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:text-slate-100 hover:shadow-md active:translate-y-0 active:border-slate-500 active:bg-slate-500 active:text-slate-100 active:shadow-sm">
                      <BsThreeDots className="m-2.5 h-5 w-auto   group-hover:text-slate-100" />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-400"
                      enterFrom="opacity-0 translate-x-10"
                      enterTo="opacity-100 translate-x-0"
                      leave="transition ease-in duration-450"
                      leaveFrom="opacity-100 translate-x-0"
                      leaveTo="opacity-0 translate-x-10"
                    >
                      <Popover.Panel className="fixed right-0 top-0 z-50 h-screen w-[600px] transform overflow-y-auto bg-slate-200 p-4 shadow-sm">
                        <div className="flex flex-col space-y-3">
                          {/*ข้อมูลการตรวจจับ */}
                          <div className="rounded-md bg-slate-100 ">
                            <div className="flex flex-row items-center justify-between px-4 pt-4 pb-3">
                              <h1 className="font-Kanit text-base">
                                รายละเอียดข้อมูลตรวจจับ
                              </h1>
                              <div className="h-10 space-x-2">
                                <button className="btn">แก้ไข</button>
                                <button className="btn btn--outline">
                                  ยกเลิก
                                </button>
                              </div>
                            </div>
                            <hr className=" border-slate-300" />
                            <div className="my-4 mx-8 flex flex-col space-y-3 [&>*]:h-[36px]">
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">เวลา</h4>
                                <p className="w-full rounded-md border-2 py-1 px-3">
                                  12:00:23 11-06-2565
                                </p>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">สถานที่</h4>
                                <p className="w-full rounded-md border-2 py-1 px-3">
                                  ตากใบ
                                </p>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">พิกัด Lat / Long</h4>
                                <div className="flex w-full flex-row items-center justify-between ">
                                  <div className="flex h-9 w-full items-center rounded-l-md border-[1px] border-r-0 border-slate-300 pl-3">
                                    <p>6.719241, 101.289264</p>
                                  </div>
                                  <button className="flex h-9 w-28 flex-none flex-row items-center justify-center rounded-r-md border-[1px] border-slate-300 bg-slate-100 py-1 px-2  text-slate-800 transition duration-100 hover:border-slate-800 hover:bg-slate-800 hover:text-slate-100">
                                    <FaMapMarkerAlt className="mr-1 inline h-5" />
                                    Copy
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">พิกัด MGRS</h4>
                                <div className="flex w-full flex-row items-center justify-between ">
                                  <div className="flex h-9 w-full items-center rounded-l-md border-[1px] border-r-0 border-slate-300 pl-3">
                                    <p>47Q LA 377 437</p>
                                  </div>
                                  <button className="flex h-9 w-28 flex-none flex-row items-center justify-center rounded-r-md border-[1px] border-slate-300 bg-slate-100 py-1 px-2  text-slate-800 transition duration-100 hover:border-slate-800 hover:bg-slate-800 hover:text-slate-100">
                                    <FaMapMarkerAlt className="mr-1 inline h-5" />
                                    Copy
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">GoogleMaps</h4>
                                <div className="flex w-full flex-row items-center justify-between ">
                                  <div className="flex h-9 w-full items-center rounded-l-md border-[1px] border-r-0 border-slate-300 pl-3">
                                    <p>
                                      <a href="http://maps.gooogle.com">
                                        http://maps.gooogle.com...
                                      </a>
                                    </p>
                                  </div>
                                  <button className="flex h-9 w-28 flex-none flex-row items-center justify-center rounded-r-md border-[1px] border-slate-300 bg-slate-100 py-1 px-2  text-slate-800 transition duration-100 hover:border-slate-800 hover:bg-slate-800 hover:text-slate-100">
                                    <FaMapMarkerAlt className="mr-1 inline h-5" />
                                    Copy
                                  </button>
                                </div>
                              </div>

                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">ข้อมูล</h4>
                                <p className="w-full">
                                  <div className="flex flex-row space-x-2">
                                    <button
                                      type="button"
                                      onClick={openModal}
                                      className="flex w-28 flex-row items-center justify-center rounded-lg border-[1px] border-slate-800 bg-slate-100 px-2 py-1 text-slate-800 transition duration-100 hover:bg-slate-800 hover:text-slate-100"
                                    >
                                      <ImFilePicture className="mr-1 inline h-5 w-5" />
                                      Picture
                                    </button>
                                    <button className="flex w-28 flex-row items-center justify-center rounded-lg border-[1px] border-slate-800 bg-slate-100 px-2 py-1 text-slate-800 transition duration-100 hover:bg-slate-800 hover:text-slate-100">
                                      <IoVideocamOutline className="mr-1 inline h-5 w-5" />
                                      Video
                                    </button>
                                  </div>
                                </p>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">สถานะ</h4>
                                <p className="w-full">
                                  <div className="flex w-fit flex-none items-center rounded-full bg-green-600 px-4 py-1 text-slate-100">
                                    <AiOutlineCheck className="mr-1 h-5 w-5" />
                                    <h4 className="result__status whitespace-nowrap font-Sarabun text-sm ">
                                      ตรวจสอบแล้ว
                                    </h4>
                                  </div>
                                </p>
                              </div>
                            </div>
                          </div>

                          {/*ข้อมูลการตรวจจับใบหน้า */}
                          <div className="rounded-md bg-slate-100 ">
                            <div className="flex flex-row items-center justify-between px-4 pt-4 pb-3">
                              <h1 className="font-Kanit text-base">
                                รายละเอียดข้อมูลตรวจจับใบหน้า
                              </h1>
                              <div className="h-10 space-x-2">
                                <button className="btn">แก้ไข</button>
                                <button className="btn btn--outline">
                                  ยกเลิก
                                </button>
                              </div>
                            </div>
                            <hr className=" border-slate-300" />
                            <div className="my-4 mx-8 flex flex-col space-y-3 [&>*]:h-[36px]">
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">เวลา</h4>
                                <p className="w-full rounded-md border-2 py-1 px-3">
                                  ไม่พบเป้าหมาย
                                </p>
                              </div>
                            </div>
                          </div>

                          {/*ข้อมูลกล้อง Nacp */}
                          <div className="rounded-md bg-slate-100">
                            <h1 className=" px-4 pt-4 pb-3 font-Kanit text-base">
                              ข้อมูลกล้อง NCAP
                            </h1>
                            <hr className=" border-slate-300" />
                            <div className="my-4 mx-8 flex flex-col space-y-3 [&>*]:h-[36px] ">
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">Ncap</h4>
                                <p className="w-full rounded-md border-2 py-1 px-3">
                                  Ncap01
                                </p>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">กลุ่ม Ncap</h4>
                                <p className="w-full rounded-md border-2 py-1 px-3">
                                  ท่าพงัน
                                </p>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">จุดติดตั้งปัจจุบัน</h4>
                                <p className="w-full rounded-md border-2 py-1 px-3">
                                  ตากใบ
                                </p>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">สถานะแบตเตอรี่</h4>
                                <p className="w-full rounded-md border-2 py-1 px-3">
                                  42% (12-07-2565 12:00:01)
                                </p>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">อุณภูมิ</h4>
                                <p className="w-full rounded-md border-2 py-1 px-3">
                                  34 องศา (12-07-2565 12:00:01)
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </li>

          <li className="flex flex-row items-center justify-between space-x-3  bg-slate-100 py-4 px-6 font-Sarabun transition duration-200">
            <div className="flex flex-none flex-col">
              <div className="flex flex-row items-center">
                <h1 className="font-Sarabun text-base">Ncap01</h1>
              </div>

              <div className="flex flex-row items-center">
                <MdToday className="mr-1 h-4 w-4 text-slate-400" />
                <h2 className="font-Sarabun text-sm text-slate-400">
                  11/06/2565
                </h2>
                <h2 className="ml-1 font-Sarabun text-sm text-slate-400">
                  12:00:23
                </h2>
              </div>
            </div>

            <div className="flex flex-row  items-center rounded-full bg-green-600 px-4 py-1 text-slate-100">
              <AiOutlineCheck className="mr-1 h-5 w-5" />
              <h4 className="result__status whitespace-nowrap text-sm ">
                ตรวจสอบแล้ว
              </h4>
            </div>

            <div className="flex flex-none flex-row justify-end space-x-1">
              <button className="group h-11 w-11 rounded-md border-[1.5px] border-slate-800 bg-slate-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:text-slate-100 hover:shadow-md">
                <FaMapMarkerAlt className=" m-2.5 h-5 w-auto   group-hover:text-slate-100" />
              </button>

              <button
                type="button"
                onClick={openModal}
                className="group h-11 w-11 rounded-md border-[1.5px] border-slate-800 bg-slate-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:text-slate-100 hover:shadow-md"
              >
                <ImFilePicture className=" m-2.5 h-5 w-auto   group-hover:text-slate-100" />
              </button>

              <button className=" group h-11 w-11 rounded-md border-[1.5px] border-slate-800 bg-slate-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:text-slate-100 hover:shadow-md">
                <IoVideocamOutline className=" m-2.5 h-5 w-auto   group-hover:text-slate-100" />
              </button>

              <Popover className="h-11 w-11">
                {({ open }) => (
                  <>
                    <Popover.Button className="group h-11 w-11 rounded-md border-[1.5px] border-slate-800 bg-slate-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:text-slate-100 hover:shadow-md active:translate-y-0 active:border-slate-500 active:bg-slate-500 active:text-slate-100 active:shadow-sm">
                      <BsThreeDots className="m-2.5 h-5 w-auto   group-hover:text-slate-100" />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-400"
                      enterFrom="opacity-0 translate-x-10"
                      enterTo="opacity-100 translate-x-0"
                      leave="transition ease-in duration-450"
                      leaveFrom="opacity-100 translate-x-0"
                      leaveTo="opacity-0 translate-x-10"
                    >
                      <Popover.Panel className="fixed right-0 top-0 z-50 h-screen w-2/6 transform overflow-y-auto bg-slate-200 p-4 shadow-sm">
                        <div className="flex flex-col space-y-3">
                          <div className="rounded-md bg-slate-100">
                            <h1 className=" px-4 pt-4 pb-3 font-Kanit text-base">
                              รายละเอียดข้อมูลตรวจจับ
                            </h1>
                            <hr />
                            <div className="my-4 mx-8 flex flex-col space-y-3">
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">เวลา</h4>
                                <p className="w-full rounded-md border-2 py-1 px-3">
                                  12:00:23 11-06-2565
                                </p>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">สถานที่</h4>
                                <p className="w-full rounded-md border-2 py-1 px-3">
                                  ตากใบ
                                </p>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">พิกัด Lat / Long</h4>
                                <div className="flex w-full flex-row items-center justify-between ">
                                  <div className="flex h-9 w-full items-center rounded-l-md border-[1px] border-r-0 border-slate-300 pl-3">
                                    <p>6.719241, 101.289264</p>
                                  </div>
                                  <button className="flex h-9 w-28 flex-none flex-row items-center justify-center rounded-r-md border-[1px] border-slate-300 bg-slate-100 py-1 px-2  text-slate-800 transition duration-100 hover:border-slate-800 hover:bg-slate-800 hover:text-slate-100">
                                    <FaMapMarkerAlt className="mr-1 inline h-5" />
                                    Google
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">พิกัด MGRS</h4>
                                <div className="flex w-full flex-row items-center justify-between ">
                                  <div className="flex h-9 w-full items-center rounded-l-md border-[1px] border-r-0 border-slate-300 pl-3">
                                    <p>47Q LA 377 437</p>
                                  </div>
                                  <button className="flex h-9 w-28 flex-none flex-row items-center justify-center rounded-r-md border-[1px] border-slate-300 bg-slate-100 py-1 px-2  text-slate-800 transition duration-100 hover:border-slate-800 hover:bg-slate-800 hover:text-slate-100">
                                    <FaMapMarkerAlt className="mr-1 inline h-5" />
                                    Copy
                                  </button>
                                </div>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">พิกัด</h4>
                                <p className="w-full">
                                  <div className="flex flex-row space-x-2">
                                    <button className="flex w-28 min-w-min flex-row items-center justify-center rounded-lg border-[1px] border-slate-800 bg-slate-100 py-1 px-2  text-slate-800 transition duration-100 hover:bg-slate-800 hover:text-slate-100 ">
                                      <FaMapMarkerAlt className="mr-1 inline h-5" />
                                      Google
                                    </button>
                                    <button className="flex w-28 flex-row items-center justify-center rounded-lg border-[1px] border-slate-800 bg-slate-100 py-1 px-2 text-slate-800 transition duration-100 hover:bg-slate-800 hover:text-slate-100">
                                      <FaMapMarkerAlt className="mr-1 inline h-5 w-5" />
                                      MGRS
                                    </button>
                                    <button className="flex w-28 flex-row items-center rounded-lg border-[1px] border-slate-800 bg-slate-100 px-2 py-1 text-slate-800 transition duration-100 hover:bg-slate-800 hover:text-slate-100">
                                      <FaMapMarkerAlt className="mr-1 inline h-5 w-5" />
                                      Lat/Long
                                    </button>
                                  </div>
                                </p>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">ข้อมูล</h4>
                                <p className="w-full">
                                  <div className="flex flex-row space-x-2">
                                    <button
                                      type="button"
                                      onClick={openModal}
                                      className="flex w-28 flex-row items-center justify-center rounded-lg border-[1px] border-slate-800 bg-slate-100 px-2 py-1 text-slate-800 transition duration-100 hover:bg-slate-800 hover:text-slate-100"
                                    >
                                      <ImFilePicture className="mr-1 inline h-5 w-5" />
                                      Picture
                                    </button>
                                    <button className="flex w-28 flex-row items-center justify-center rounded-lg border-[1px] border-slate-800 bg-slate-100 px-2 py-1 text-slate-800 transition duration-100 hover:bg-slate-800 hover:text-slate-100">
                                      <IoVideocamOutline className="mr-1 inline h-5 w-5" />
                                      Video
                                    </button>
                                  </div>
                                </p>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">สถานะ</h4>
                                <p className="w-full">
                                  <div className="flex w-fit flex-none items-center rounded-full bg-green-600 px-4 py-1 text-slate-100">
                                    <AiOutlineCheck className="mr-1 h-5 w-5" />
                                    <h4 className="result__status whitespace-nowrap font-Sarabun text-sm ">
                                      ตรวจสอบแล้ว
                                    </h4>
                                  </div>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-md bg-slate-100">
                            <h1 className=" px-4 pt-4 pb-3 font-Kanit text-base">
                              ข้อมูลกล้อง NCAP
                            </h1>
                            <hr />
                            <div className="my-4 mx-8 flex flex-col space-y-3">
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">Ncap</h4>
                                <p className="w-full rounded-md border-2 py-1 px-3">
                                  Ncap01
                                </p>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">กลุ่ม Ncap</h4>
                                <p className="w-full rounded-md border-2 py-1 px-3">
                                  ท่าพงัน
                                </p>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">จุดติดตั้งปัจจุบัน</h4>
                                <p className="w-full rounded-md border-2 py-1 px-3">
                                  ตากใบ
                                </p>
                              </div>
                              <div className="flex flex-row items-center font-Sarabun text-base">
                                <h4 className="w-2/5">สถานะกล้อง</h4>
                                <p className="w-full rounded-md border-2 py-1 px-3">
                                  ตรวจจับเมื่อ 1 ชม. ที่แล้ว
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </li>
        </ul>
      </div>

      {/*Modal Exam */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" w-full w-[62rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Ncap
                  </Dialog.Title>
                  <div className="mx-auto mt-2">
                    <img
                      src="20220404_115331-100MEDIA-IMG_0118.JPG"
                      alt=""
                      className=" object-cover"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/*Modal Alert */}
      <Transition appear show={isOpenAlert} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalAlert}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" w-full w-[62rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Ncap
                  </Dialog.Title>
                  <div className="mx-auto mt-2">
                    <img
                      src="20220404_115331-100MEDIA-IMG_0118.JPG"
                      alt=""
                      className=" object-cover"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModalAlert}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Result;
