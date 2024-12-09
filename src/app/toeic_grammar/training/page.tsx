'use client'
import { useState } from "react"
import { GlobalWrapper, ContentWrapper } from "@/components/GlobalComponents"
import styled from "styled-components"
import { useRouter } from "next/navigation"
import Image from "next/image"
import closeIcon from "../../../../public/cross_thin.svg"
import arrowRightIcon from "../../../../public/arrow_right.svg"

const Training = () => {
  const router = useRouter()
  // const [answer, setAnswer] = useState<string>("")
  // const [japanese, setJapanese] = useState<string>("")
  const answer = "A"
  const japanese = "12月から3月にかけてほぼ毎日夕立があるが、Merizoの天候は、1年中とても快適だ。"
  const [answered, setAnswered] = useState<boolean>(false)
  const [canClick, setCanClick] = useState<boolean>(true)

  const handleClickChoice = (choice: string) => {
    // setSelected(choice)

    // 正解不正解に関わらず正解の選択肢に色付け
    const answerEle = document.getElementById(answer)!
    answerEle.setAttribute("id", "correct")

    if (choice === answer) {
      console.log("正解")
    } else {
      // 不正解時は選択肢に色付け
      const selectedEle = document.getElementById(choice)!
      selectedEle.setAttribute("id", "incorrect")
    }
    setCanClick(false)
    setAnswered(true)
  }

  const routerPush = (path: string) => {
    router.push(path)
  }

  return (
    <GlobalWrapper header="TOEIC L&R テスト文法問題でる1000問">
      <ContentWrapper>
        <TrainingWrapper>
          <QuestionSideWrapper>
            <div><p>1</p></div>
            <div id="close" onClick={() => routerPush("/toeic_grammar")}><Image src={closeIcon} alt="" /></div>
          </QuestionSideWrapper>
          <QuestionWrapper id="question">
            The Weather in Merizo is very ------- year-round, though there are showers almost daily from December through March.
          </QuestionWrapper>
          <ChoicesWrapper $canClick={canClick}>
            <div id="choices">
              <button id="A" onClick={() => handleClickChoice("A")}>A. agreeable</button>
              <button id="B" onClick={() => handleClickChoice("B")}>B. agree</button>
              <button id="C" onClick={() => handleClickChoice("C")}>C. agreement</button>
              <button id="D" onClick={() => handleClickChoice("D")}>D. agreeably</button>
            </div>
            <div id="next-wrapper">
              {answered &&
              <div id="next">
                <Image src={arrowRightIcon} alt="次の問題" />
              </div>}
            </div>
          </ChoicesWrapper>
          <AnswerWrapper>
            <div>正解</div>
            <p id="answer">{answered && answer}</p>
          </AnswerWrapper>
          <JapaneseTranslationWrapper>
            <div>日本語訳</div>
            <p id="japanese">{answered && japanese}</p>
          </JapaneseTranslationWrapper>
        </TrainingWrapper>
      </ContentWrapper>
    </GlobalWrapper>
  )
}

export default Training

const TrainingWrapper = styled.div`
  width: 100%;
  font-size: 18px;
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: 2fr 200px 50px auto;
  background-color: #fff;
  padding: 20px 20px 20px 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`

const QuestionSideWrapper = styled.div`
  grid-row-start: 1;
  grid-row-end: 5;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  #close {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      background-color: #ccc;
    }
    img {
      width: 20px;
      height: auto;
      }
  }
`

const QuestionWrapper = styled.div`
  grid-row-start: 1;
  grid-row-end: 2;
  padding-bottom: 20px;
  padding-left: 10px;
  font-size: 18px;
  line-height: 1.5;
`

const ChoicesWrapper = styled.div<{ $canClick?: boolean }>`
  padding-top: 8px;
  padding-bottom: 12px;
  padding-left: 10px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  #choices {
    width: 40%;
    min-width: 280px;
    margin-right: 20px;
  }
  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    button {
      position: relative;
      font-size: 18px;
      text-align: left;
      display: inline-block;
      padding: 8px 0;
      padding-left: 10px;
      border: none;
      border-radius: 5px;
      background-color: ${({ $canClick }) => $canClick ? "#f0f0f0" : "#fff"};
      box-shadow: ${({ $canClick }) => $canClick ? "0px 0px 3px rgba(0, 0, 0, 0.4)" : "none"};
      pointer-events: ${({ $canClick }) => $canClick ? "auto" : "none"};
      transition: all 0.05s ease-in-out;
      &:hover {
        cursor: pointer;
        background-color: #ccc;
      }
    }
  }
  #correct {
    background-color: #87cefa;
    &::after {
      content: "";
      display: inline-block;
      background-image: url('/check.svg');
      background-position: center;
      background-size: contain;
      width: 30px;
      height: 30px;
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
    }
  }
  #incorrect {
    background-color: #ff6347;
    &::after {
      content: "";
      display: inline-block;
      background-image: url('/cross.svg');
      background-position: center;
      background-size: contain;
      width: 22px;
      height: 22px;
      position: absolute;
      top: 50%;
      right: 14px;
      transform: translateY(-50%);
    }
  }
  #next-wrapper {
    width: 60%;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    justify-content: end;
    align-items: start;
    #next {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 5px;
      background-color: #00ff7f;
      box-shadow: 
        0px 0px 8px rgba(0, 0, 0, 0.2),
        inset 0px 0px 8px transparent;
      transition: all 0.2s ease-in-out;
      &:hover {
        cursor: pointer;
        background-color: #aaa;
        box-shadow: 
        0px 0px 8px transparent,
        inset 0px 0px 8px rgba(0, 0, 0, 0.2);
      }
      img {
        width: 80px;
        height: auto;
      }
    }
  }
`

const AnswerWrapper = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  div {
    width: 55px;
    height: 40px;
    border-radius: 5px;
    font-size: 16px;
    margin-right: 16px;
    box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    margin-bottom: -4px;
  }
`

const JapaneseTranslationWrapper = styled.div`
  font-size: 16px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  div {
    width: 80px;
    height: 40px;
    background-color: #fff;  
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.2);
    margin-top: 8px;
    margin-right: 10px;
    margin-bottom: 8px;
  }
  p{
    width: 100%;
    line-height: 1.5;
  }
`
