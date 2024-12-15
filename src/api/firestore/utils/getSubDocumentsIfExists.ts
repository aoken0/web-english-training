import { db } from "../../../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

type objType = {
  id: string,
  data(): object
};

const returnObj = (error: boolean, data: objType[]) => {
  return { error: error, subcollection: data };
}

const getSubDocumentsIfExists = async (collectionName: string, subcollectionName: string, email: string) => {
  try {
    const q = query(collection(db, collectionName), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) throw new Error("ユーザの情報が見つかりません。");

    const q2 = query(collection(db, collectionName, querySnapshot.docs[0].id, subcollectionName));
    const querySnapshot2 = await getDocs(q2);
    if (querySnapshot2.size === 0) throw new Error("ドキュメントがありません。");

    return returnObj(false, querySnapshot2.docs);
  } catch(e) {
    if (e instanceof Error) console.error(e.message);
    return returnObj(true, []);
  }
};

export default getSubDocumentsIfExists;
