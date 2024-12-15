'use client'
import { GlobalWrapper, LRContentWrapper, RContentWrapper, LContentWrapper, BigButton } from "@/components/GlobalComponents"
import { SelectQuestionByNum } from "@/components/QuestionSelectArea"
import QuestionAchivement from "@/components/QuestionAchivement"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/utils/useAuth"
import { HistoryObj } from "@/types/history"
import getHistoryOfQuestions from "@/utils/getHistoryOfQuestions"


const ToeicGrammar = () => {
  const router = useRouter()
  const { user } = useAuth();
  const workbookTitle = "TOEICLRGrammar1000";
  const questionQuantity = 1049
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["history", workbookTitle, user?.email],
    queryFn: () => getHistoryOfQuestions(user, workbookTitle),
    enabled: !!user,
  })

  const routerPush = (path: string) => {
    router.push(path)
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <GlobalWrapper header="TOEIC L&R テスト文法問題でる1000問">
      <LRContentWrapper>
        <LContentWrapper>
          <BigButton text="問題番号を指定して出題" onClick={() => routerPush("/toeic_grammar/training")}></BigButton>
          <SelectQuestionByNum questionQuantity={questionQuantity} interval={10} data={data as HistoryObj[]} />
          <BigButton text="ランダム出題" onClick={() => {}}></BigButton>
        </LContentWrapper>
        <RContentWrapper>
          <QuestionAchivement questionQuantity={questionQuantity} data={data as HistoryObj[]} />
        </RContentWrapper>
      </LRContentWrapper>
    </GlobalWrapper>
  )
}

export default ToeicGrammar

