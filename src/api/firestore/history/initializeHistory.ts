import { db } from "../../../../firebase";
import { collection, query, where, getDocs, doc, writeBatch} from "firebase/firestore";

type rowData = {
  id: number,
  data: object
}

const getQuestionQuantity = async (workbookTitle: string) => {
  try {
    const q = query(collection(db, "workbook"), where("title_eng", "==", workbookTitle));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size !== 1) throw new Error;
    console.log(querySnapshot.docs[0].id)
    return querySnapshot.docs[0].data()["question_quantity"];
  } catch (e) {
    throw e;
  }
}

const chunk = (arr: Array<object>, size: number) =>
  Array.from(
      {length: Math.ceil(arr.length / size)},
      (_, i) => arr.slice(i * size, i * size + size)
  );

export const initializeHistory = async (email: string, workbookTitle: string) => {
  const data: rowData[] = [];
  try {
    const q = query(collection(db, "history"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size !== 1) throw new Error;
    const parentDoc = querySnapshot.docs[0];
    const subcollectionRef = collection(parentDoc.ref, workbookTitle);
    if (!subcollectionRef) throw new Error("サブコレクションの取得に失敗しました。");
    
    // サブコレクション配下にドキュメントが1つでもあれば中断
    const subcollectionSnapshot = await getDocs(subcollectionRef);
    if (subcollectionSnapshot.size > 0) throw new Error("サブコレクションにドキュメントが既に存在します。");

    // 初期値をdataに格納し、500個ごとにチャンク分割
    const question_quantity = await getQuestionQuantity(workbookTitle);
    const digit: number = question_quantity.toString().length;

    for (let i = 1; i <= question_quantity; i++) {
      const row: rowData = { id: i, data: {attempt: 0, miss: 0 }};
      data.push(row)
    }
    const chunked_data = chunk(data, 500);

    let num = 0;
    for (const chunk of chunked_data) {
      const batch = writeBatch(db);
      for (const row of chunk as rowData[]) {
        num++;
        const docRef = doc(subcollectionRef, num.toString().padStart(digit, "0"));
        batch.set(docRef, row.data);
      }
      await batch.commit();
    }
    console.log("Document written with ID: ", parentDoc.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}