"use client"
import styled from "styled-components"
import "styled-reset"
import { GlobalWrapper, LRContentWrapper, LContentWrapper, RContentWrapper, BigButton } from "@/components/GlobalComponents"
import { useRouter } from "next/navigation"

const Top = () => {
  const router = useRouter()

  const routerPush = (path: string) => {
    router.push(path)
  }

  return (
    <GlobalWrapper header="Top">
      <LRContentWrapper>
        <LContentWrapper>
          <BigButton text="TOEIC L&R テスト文法問題でる1000問" onClick={() => routerPush("/toeic_grammar")}></BigButton>
          <BigButton text="学習履歴" onClick={() => routerPush("/")}></BigButton>
        </LContentWrapper>
        <RContentWrapper>
          <CalendarWrapper>
            カレンダー実装予定
          </CalendarWrapper>
          <FriendWrapper>
            フレンド実装予定
          </FriendWrapper>
        </RContentWrapper>
      </LRContentWrapper>
    </GlobalWrapper>
  )
}

export default Top

const CalendarWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 450px;
  aspect-ratio: 2 / 1;
  border-radius: 5px;
  box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.2);
`
const FriendWrapper = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 450px;
  aspect-ratio: 2 / 1;
  border-radius: 5px;
  box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.2);
`
