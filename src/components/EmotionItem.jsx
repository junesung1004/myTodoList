import "./EmotionItem.css";
import { getEmotionImage } from "../utils/get-emotion-image";

const EmotionItem = ({ emotionId, emotionName, isSelected }) => {
  return (
    <div
      className={`emotionItem 
    ${isSelected ? `emotionItem_on_${emotionId}` : ""}`}
    >
      <img className="emotion_img" src={getEmotionImage(emotionId)} />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
