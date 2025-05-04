import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { CardType } from "../utils/CustomDataTypes";
const URL = import.meta.env.VITE_URL;

interface AddNewCardProps {
  setCards: React.Dispatch<React.SetStateAction<any>>;
}

const AddNewCard = ({ setCards }: AddNewCardProps) => {
  const handleAddNewCard = async () => {

    const res = await axios.post(`${URL}card`, {
      cardName: "New Card",
      createdBy : "681611c60a4a306175553be2"
    });

    const cards : CardType[] = res.data;

    setCards(cards);
  };

  return (
    <>
      <div
        className="bg-white/30 rounded-[12px] w-min min-w-60 h-10 m-4
        flex items-center text-[14px] hover:cursor-pointer"
        onClick={handleAddNewCard}
      >
        <span className="px-2">
          <FaPlus />
        </span>
        <span>Add another list</span>
      </div>
    </>
  );
};

export default AddNewCard;
