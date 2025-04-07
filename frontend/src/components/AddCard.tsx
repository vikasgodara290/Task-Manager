import { IoAdd } from "react-icons/io5";

export default function AddCard() {
  return (
    <>
      <div className="text-txtColor h-9 flex px-4 items-center text-[14px]">
        <span className="mr-2 text-[18px]">
          <IoAdd />
        </span>
        <span>Add a card</span>
      </div>
    </>
  );
}
