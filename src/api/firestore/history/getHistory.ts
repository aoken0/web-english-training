import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import getSubcollectionIfExists from "../utils/getCollectionIfExists";

const returnValue = (error: boolean, message: string) => {
  return { error: error, message: message };
}

const getHistory = async (email: string, workbookTitle: string) => {
  console.log(email)
  try {
    const q = query(collection(db, "history"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) throw new Error("No matching documents.");
    if (querySnapshot.size > 1) throw new Error("Multiple matching documents.");
    console.log(querySnapshot.docs[0].id)

    const result = await getSubcollectionIfExists("history", workbookTitle, email);
    const data = result.subcollection.data();
    console.log(data)

    return returnValue(false, "取得に成功しました。")
  } catch (e) {
    console.log(e)
    return returnValue(true, "取得に失敗しました。")
  }
}

export default getHistory