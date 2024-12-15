import initializeHistory from "@/api/firestore/history/initializeHistory";
import getHistory from "@/api/firestore/history/getHistory";
import { User } from "firebase/auth";
import { HistoryObj } from "@/types/history";

const getHistoryOfQuestions = async ( user: User|null, workbookTitle: string ) => {
  if (!user) return
  if (!user.email) return
  try {
    const result = await getHistory(user.email, workbookTitle);
    console.log('実行1');
    return result.data as HistoryObj[]
  } catch (e) {
    if (e instanceof Error) {
      // ドキュメントが存在しないときは初期化する(初回アクセス時)
      if (e.cause === "no-documents") {
        try {
          await initializeHistory(user.email, workbookTitle);
          const result = await getHistory(user.email, workbookTitle);
          console.log('実行2');
          return result.data as HistoryObj[]
        } catch (e) {
          console.log(e)
        }
      }
    };
  }
}

export default getHistoryOfQuestions