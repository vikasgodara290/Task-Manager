import axios from "axios";
import { FaPlus } from "react-icons/fa6";
const URL = import.meta.env.VITE_URL;

interface AddNewCardProps {
  setCards: React.Dispatch<React.SetStateAction<any>>;
  cards: any;
}

const AddNewCard = ({ cards, setCards }: AddNewCardProps) => {
  const handleAddNewCard = async () => {
    console.log(cards.length);

    const res = await axios.post(`${URL}card`, {
      cardName: "New Card",
    });

    const newCard = res.data;

    setCards([
      ...cards,
      {
        CardId: newCard.CardId,
        CardName: newCard.CardName,
      },
    ]);
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
