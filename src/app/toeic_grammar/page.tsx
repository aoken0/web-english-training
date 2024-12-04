'use client'
import { GlobalWrapper, LRContentWrapper, RContentWrapper, LContentWrapper, BigButton } from "@/components/GlobalComponents"
import styled from "styled-components"
import "styled-reset"

const ToeicGrammar = () => {
  return (
    <GlobalWrapper header="TOEIC L&R テスト文法問題でる1000問">
      <LRContentWrapper>
        <LContentWrapper>
          <BigButton text="問題番号を指定して出題" onClick={() => {}}></BigButton>
          <BigButton text="ランダム出題" onClick={() => {}}></BigButton>
        </LContentWrapper>
        <RContentWrapper>
          <RContentArea>
            <HistoryWrapper>
              <table>
                <tbody>
                  <tr>
                    <th>全問題数</th>
                    <td>1049</td>
                  </tr>
                  <tr>
                    <th>解答済</th>
                    <td>100</td>
                  </tr>
                  <tr>
                    <th>正解数</th>
                    <td>100</td>
                  </tr>
                  <tr>
                    <th>ミス数</th>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>解答率</th>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <th>正答率</th>
                    <td>100%</td>
                  </tr>

                </tbody>
              </table>
            </HistoryWrapper>
            <GraphWrapper>
              <Graph percent={"50%"}><div></div><p>解答率</p></Graph>
              <Graph percent={"100%"}><div></div><p>正答率</p></Graph>
            </GraphWrapper>
          </RContentArea>
        </RContentWrapper>
      </LRContentWrapper>
    </GlobalWrapper>
  )
}

export default ToeicGrammar

const RContentArea = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 420px;
  height: 270px;
  // aspect-ratio: 2 / 1;
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

const GraphWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: end;
  padding: 0 20px;
  // background-color: #eee;
`

const Graph = styled.div<{ percent?: string }>`
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
      height: ${({ percent }) => percent ? `${percent}` : '0'};
      background-color: #555;
    }
    &::after {
      content: ${({ percent }) => percent ? `"${percent}"` : ''};
      position: absolute;
      bottom: ${({ percent }) => percent ? `${percent}` : '0'};
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
    }
  }
`
