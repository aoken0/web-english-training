import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import getSubcollectionIfExists from "../utils/getSubDocumentsIfExists";

type objType = {
  id: string,
  data(): object
};

const returnValue = (error: boolean, message: string, data: objType[] ) => {
  return { error: error, message: message, data: data };
}

const getHistory = async (email: string, workbookTitle: string) => {
  console.log(email)
  try {
    const q = query(collection(db, "history"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) throw new Error("No matching documents.");
    if (querySnapshot.size > 1) throw new Error("Multiple matching documents.");

    const result = await getSubcollectionIfExists("history", workbookTitle, email);
    if (result.error) throw new Error;
    const data = result.subcollection;

    return returnValue(false, "取得に成功しました。", data);
  } catch (e) {
    console.log(e)
    return returnValue(true, "取得に失敗しました。", []);
  }
}

export default getHistory