import { useParams } from "react-router-dom";

const Edit = () => {
  const param = useParams();

  return <div>{param.id}번째 Edit 페이지 입니다.</div>;
};

export default Edit;
