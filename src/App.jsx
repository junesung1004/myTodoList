import "./App.css";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";
import Notfound from "./pages/Notfound";

import { useReducer, useRef, createContext } from "react";

import { Routes, Route } from "react-router-dom";

//dummy data
const mockData = [
  {
    id: 1,
    createDate: new Date("2024-11-03").getTime(),
    emotionId: 1,
    content: "1번의 일기 내용",
  },
  {
    id: 2,
    createDate: new Date("2024-11-02").getTime(),
    emotionId: 2,
    content: "2번의 일기 내용",
  },
  {
    id: 3,
    createDate: new Date("2024-10-02").getTime(),
    emotionId: 3,
    content: "3번의 일기 내용",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

// 리듀서 함수를 전역으로 데이터를 넘겨주기 위해 컨텍스트 생성
export const DiaryStateContext = createContext(); //

// dispatch를 전역으로 사용할 수 있게 컨텍스트 생성
// onCreate, onUpdate, onDelete 함수를 말함
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  //console.log(data);

  const idRef = useRef(3); // 일기를 작성할때마다 고유의 아이디값

  // 새로운 일기 추가
  const onCreate = (createDate, emotionId, content) => {
    //새로운 일기를 추가하는 기능
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={(onCreate, onDelete, onUpdate)}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
