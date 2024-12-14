import { db } from "../../../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

type objType = {
  id: string,
  data(): object
};

const returnObj = (error: boolean, data: objType) => {
  return { error: error, subcollection: data };
}

const getSubcollectionIfExists = async (collectionName: string, subcollectionName: string, email: string) => {
  try {
    const q = query(collection(db, collectionName), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) throw new Error;

    const q2 = query(collection(db, collectionName, querySnapshot.docs[0].id, subcollectionName));
    const querySnapshot2 = await getDocs(q2);
    if (querySnapshot2.size !== 1) throw new Error;

    return returnObj(false, querySnapshot2.docs[0]);
  } catch(e) {
    console.error("サブコレクションの存在確認中にエラーが発生しました: ", e);
    return returnObj(true, {id: "", data(): object {return {}}});
  }
};

export default getSubcollectionIfExists;
