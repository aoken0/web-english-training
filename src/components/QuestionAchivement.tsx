'use client'
import styled from "styled-components"
import { HistoryObj } from "@/types/history"
import { useState, useEffect } from "react"

type Props = {
  questionQuantity: number,
  data: HistoryObj[]
}

const getAttemptQuantity = (data: HistoryObj[]) => {
  return data.reduce((total, item) => total + item.data().attempt, 0);
}

const getAnsweredQuantity = (data: HistoryObj[]) => {
  return data.filter((item) => item.data().attempt > 0).length;
}

const getInfo = (data: HistoryObj[]) => {
  const attempted: number = getAttemptQuantity(data)
  const answered: number = getAnsweredQuantity(data)
  const miss: number = data.filter((item) => item.data().miss > 0).length;

  return { attempted, answered, miss }
}
const QuestionAchivement: React.FC<Props> = ({ questionQuantity, data }) => {
  const [attemptedQuantity, setAttemptedQuantity] = useState<number>(0)
  const [answeredQuantity, setAnsweredQuantity] = useState<number>(0)
  const [missQuantity, setMissQuantity] = useState<number>(0)
  const [hitRate, setHitRate] = useState<number>(0)
  const [progressRate, setProgressRate] = useState<number>(0)

  useEffect(() => {
    const { attempted, answered, miss } = getInfo(data)
    setAttemptedQuantity(attempted)
    setAnsweredQuantity(answered)
    setMissQuantity(miss)
    setHitRate(Math.floor(((attempted - miss) / attempted) * 100))
    setProgressRate(Math.floor((attempted / questionQuantity) * 100))
  }, [])

  return (
    <RContentArea>
      <HistoryWrapper>
        <FractionWrapper>
          <FractionTitle>
            <h3>進捗</h3>
          </FractionTitle>
          <Fraction $questionQuantity={questionQuantity}>
            <p>{answeredQuantity}</p>
          </Fraction>
        </FractionWrapper>
        <table>
          <tbody>
            <tr>
              <th>回答数</th>
              <td>{attemptedQuantity}</td>
            </tr>
            <tr>
              <th>正解数</th>
              <td>{attemptedQuantity - missQuantity}</td>
            </tr>
            <tr>
              <th>ミス数</th>
              <td>{missQuantity}</td>
            </tr>
          </tbody>
        </table>
      </HistoryWrapper>
      <GraphWrapper>
        <Graph $percent={`${progressRate}%`}><div></div><p>解答率</p></Graph>
        <Graph $percent={`${hitRate}%`}><div></div><p>正答率</p></Graph>
      </GraphWrapper>
    </RContentArea>
  )
}

export default QuestionAchivement

const RContentArea = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 450px;
  height: 270px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`

const HistoryWrapper = styled.div`
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
    th {
      width: 80px;
      border-bottom: 2px solid rgba(0, 0, 0, 0.8);
      text-align: left;
      padding-left: 8px;
      padding-bottom: 2px;
    }
    td {
      border-bottom: 1px solid rgba(0, 0, 0, 0.5);
      text-align: right;
    }
  }
`

const FractionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`
const FractionTitle = styled.div`
  width: fit-content;
  padding: 6px 8px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  color: #fff;
`
const Fraction = styled.div<{ $questionQuantity?: number }>`
  width: 60%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  p {
    font-size: 2.8em;
    position: relative;
    margin-left: 8px;
    &::before {
      content: '';
      display: block;
      width: 24px;
      height: 2px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.8);
      transform: rotate(-55deg);
      position: absolute;
      right: -24px;
      bottom: 18px;
    }
    &::after {
      content: ${({ $questionQuantity }) => $questionQuantity ? `"${$questionQuantity}問"` : ''};
      position: absolute;
      right: -78px;
      bottom: 6px;
      font-size: 0.4em;
      color: rgba(0, 0, 0, 0.8);
    }
  }
`

const GraphWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: end;
  padding: 0 20px;
`

const Graph = styled.div<{ $percent?: string }>`
  width: 45%;
  height: 100%;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  div {
    width: 60%;
    height: 90%;
    background-color: #ddd;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: ${({ $percent }) => $percent ? `${$percent}` : '0'};
      background-color: #555;
    }
    &::after {
      content: ${({ $percent }) => $percent ? `"${$percent}"` : ''};
      position: absolute;
      bottom: ${({ $percent }) => $percent ? `${$percent}` : '0'};
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
    }
  }
`
