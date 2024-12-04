"use client"
import styled from "styled-components"
import "styled-reset"
import { GlobalWrapper } from "@/components/GlobalComponents"

const Page = () => {

  return (
    <GlobalWrapper header="Top">
      <ContentWrapper>
        <LContentWrapper>
          <BigButton>
            <span>TOEIC L&R テスト文法問題でる1000問</span>
          </BigButton>
          <BigButton>
            <span>学習履歴</span>
          </BigButton>
        </LContentWrapper>
        <RContentWrapper>
          <CalendarWrapper>
            カレンダー実装予定
          </CalendarWrapper>
          <FriendWrapper>
            フレンド実装予定
          </FriendWrapper>
        </RContentWrapper>
      </ContentWrapper>
    </GlobalWrapper>
  )
}

export default Page

const ContentWrapper = styled.div`
  width: 80%;
  max-width: 960px;
  min-width: 600px;
  margin: 0 auto;
  padding: 20px;
  color: #222;
  // background-color: #eee;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`

const LContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  // background-color: #ccc;
`

const RContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  // background-color: #bbb;
  `
  
const BigButton = styled.button`
  width: 100%;
  max-width: 420px;
  aspect-ratio: 3.8 / 1;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  box-shadow: 
    0px 0px 10px rgba(0, 0, 0, 0.2),
    inset 0px 0px 10px transparent;
  transition: all .3s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 
      0px 0px 10px transparent,
      inset 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  span {
    font-size: 20px;
  }
`

const CalendarWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 2 / 1;
  border-radius: 5px;
  box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.2);
`
const FriendWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 2 / 1;
  border-radius: 5px;
  box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.2);
`
