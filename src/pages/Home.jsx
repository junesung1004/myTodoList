import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();

  const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();

  // 필터링된 데이터를 반환하도록 수정
  return data.filter((item) => beginTime <= item.createDate && item.createDate <= endTime);
};

const Home = () => {
  //리듀서를 불러와서 사용하기 위한 코드
  const data = useContext(DiaryStateContext);

  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, data);

  //버튼을 눌렀을때 날짜에 맞게 데이터를 바꿔줄 함수
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
