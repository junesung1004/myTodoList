import { useParams } from "react-router-dom";

const Diary = () => {
  const param = useParams();
  // console.log(param.id);
  return <div>{param.id}번째 일기 상세 페이지 입니다.</div>;
};

export default Diary;
