import styled from "styled-components";
import { useAuth } from "@/utils/useAuth";
import getHistory from "@/api/firestore/history/getHistory";
import initializeHistory from "@/api/firestore/history/initializeHistory";

type SelectQuestionByNumProps = {
  questionQuantity: number,
  interval: number,
}

const makeStartEndArray = (max: number, interval: number) => {
  const startEndArray = [];
  for (let i = 0; i < max; i += interval) {
    const start = i + 1;
    const end = i + interval > max ? max : i + interval;
    startEndArray.push([start, end]);
  }
  return startEndArray;
}

const SelectQuestionByNum: React.FC<SelectQuestionByNumProps> = ({ questionQuantity, interval }) => {
  const { user } = useAuth();
  const setArray = makeStartEndArray(questionQuantity, interval);
  const workbookTitle = "TOEICLRGrammar1000";

  const getHistoryOfQuestions = async () => {
    if (!user) return
    if (!user.email) return
    const result = await getHistory(user.email, workbookTitle);
    console.log(result);
  }
  const initializeHistoryOfQuestions = async () => {
    if (!user) return
    if (!user.email) return
    await initializeHistory(user.email, workbookTitle);
  }

  return (
    <QuestionSelectArea>
      <button onClick={getHistoryOfQuestions}>test1</button>
      <button onClick={initializeHistoryOfQuestions}>test2</button>
      {setArray.map((arr) => (
        <div key={`questionSelector${arr[0]}-${arr[1]}`}>
          <button key={`questionBtn${arr[0]}-${arr[1]}`}>{arr[0]+'-'+arr[1]}</button>
        </div>
      ))}
    </QuestionSelectArea>
  )
}

export { SelectQuestionByNum }

const QuestionSelectArea = styled.div`
  width: 100%;
  max-width: 450px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 6px;
  overflow-y: scroll;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.2);
  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: 35%;
      height: 2.4em;
      border: none;
      cursor: pointer;
      font-weight: bold;
      font-size: 15px;
      color: #fff;
      background-color: #777;
      border-radius: 5px;
      letter-spacing: .02em;
      box-shadow: 
        0px 0px 4px rgba(0, 0, 0, 0.2),
        inset 0px 0px 8px transparent;
      transition: all .2s ease-in-out;
    }
    button:hover {
      background-color: #555;
      box-shadow: 
        0px 0px 4px transparent,
        inset 0px 0px 8px rgba(0, 0, 0, 0.2);
    }
  }
`