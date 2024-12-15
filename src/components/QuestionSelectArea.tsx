import styled from "styled-components";
import { useAuth } from "@/utils/useAuth";
import { HistoryObj } from "@/types/history";
import makeStartEndSetArray from "@/utils/makeStartEndSetArray";
import { useEffect, useState } from "react";

type SelectQuestionByNumProps = {
  questionQuantity: number,
  interval: number,
  data: HistoryObj[],
}


const getInfoOfEverySet = (data: HistoryObj[], setArray: number[][]) => {
  const returnArray = [];
  for (const set of setArray) {
    const s_data = data.slice(set[0]-1, set[1]);
    const attempted = s_data.filter((item) => item.data().attempt > 0).length;
    console.log(attempted)
    returnArray.push(attempted);
  }
  return returnArray
}

const SelectQuestionByNum: React.FC<SelectQuestionByNumProps> = ({ questionQuantity, interval, data }) => {
  const { user } = useAuth();
  const setArray: number[][] = makeStartEndSetArray(questionQuantity, interval);
  const [infoOfEverySet, setInfoOfEverySet] = useState<number[]>([]);
  const pWidth = interval.toString().length * 1.6 + 'em';

  useEffect(() => {
    setInfoOfEverySet(getInfoOfEverySet(data, setArray))
  }, [])

  return (
    <QuestionSelectArea>
      {setArray.map((set, i) => (
        <RowWrapper key={`questionSelector${set[0]}-${set[1]}`}>
          <Button key={`questionBtn${set[0]}-${set[1]}`}>{set[0]+' - '+set[1]}</Button>
          <SetInfoWrapper $pWidth={pWidth}>
            <p id={infoOfEverySet[i] === interval ? 'completed' : ''}>{infoOfEverySet[i]}/{interval}</p>
          </SetInfoWrapper>
        </RowWrapper>
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
`
const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  border-radius: 5px;
  justify-content: start;
  align-items: center;
  background-color: #ddd;
`

const Button = styled.button`
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
  text-align: center;
  box-shadow: 
    0px 0px 4px rgba(0, 0, 0, 0.2),
    inset 0px 0px 8px transparent;
  transition: all .2s ease-in-out;
  &:hover {
    background-color: #555;
    box-shadow: 
      0px 0px 4px transparent,
      inset 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
`

const SetInfoWrapper = styled.div<{ $pWidth?: string}>`
  width: 65%;
  p {
    width: ${({ $pWidth }) => $pWidth};
    color: #555;
    text-align: right;
    position: relative;
  }
  #completed {
    &::after {
      content: "";
      display: inline-block;
      background-image: url('/check.svg');
      background-position: center;
      background-size: contain;
      width: 24px;
      height: 24px;
      position: absolute;
      top: 50%;
      right: -24px;
      transform: translateY(-50%);
    }
  }
`