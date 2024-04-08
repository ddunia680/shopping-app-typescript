import { useNavigate } from "react-router";
import { watchType } from "../../store/watches";
import { GiStarSattelites } from "react-icons/gi";

export default function Card(card: watchType) {
    const navigate = useNavigate();

  return (
    <div className="relative w-[8rem] flex flex-col justify-start items-start shadow-sm bg-white shadow-gray-400 hover:bg-gray-400 rounded-md 
    px-[0.5rem] duration-200 hover:duration-200 cursor-pointer" onClick={() => navigate(`/productDetail/${card._id}`)}>
        <h5 className="text-[14px] font-bold">{card.name && card.name.substring(0, 13).concat('...')}</h5>
        <img src={card.imageURL} alt={card.name} className="w-[95%] h-[6rem] object-contain rounded-lg overflow-hidden"/>
        <p className="text-[11px] text-gray-700 px-1">{card.name && card.name.includes('smart' || 'Smart') ? 'An intelligent gadget' : 'A fine specy'}</p>
        <p className="text-[14px] font-bold text-blue-800 px-1 w-[60%] flex justify-between items-center"><span className="text-red-600 line-through italic text-[10px] font-normal">
            {card.previousPrice}$</span> {card.previousPrice}$
        </p>
        <GiStarSattelites size={27} className="absolute bottom-[2.1rem] right-3 text-pink-900" />
    </div>
  )
}
