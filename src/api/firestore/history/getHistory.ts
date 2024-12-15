import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import getSubDocumentsIfExists from "../utils/getSubDocumentsIfExists";
import { HistoryObj } from "@/types/history";

const returnValue = (error: boolean, message: string, data: HistoryObj[] ) => {
  return { error: error, message: message, data: data };
}

const getHistory = async (email: string, workbookTitle: string) => {
  try {
    const q = query(collection(db, "history"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) throw new Error("No matching documents.");
    if (querySnapshot.size > 1) throw new Error("Multiple matching documents.");

    const result = await getSubDocumentsIfExists("history", workbookTitle, email);
    const data: HistoryObj[] = result.subcollection as HistoryObj[];

    return returnValue(false, "取得に成功しました。", data);
  } catch (e) {
    if (e instanceof Error) {
      throw e
    }
    return returnValue(true, "取得に失敗しました。", []);
  }
}

export default getHistory