'use client'
import { db } from "../../../firebase"
import { doc, getDoc, collection, getDocs, query, where, setDoc } from "firebase/firestore"

const Test = () => {
  const getOne = async () => {
    const docRef = doc(db, "test", "test1")
    const docSnap = await getDoc(docRef)

    console.log(docSnap.data())
  }

  const getMany = async () => {
    const q = query(collection(db, "test"), where("flag", "==", "99"))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data())
    })
  }

  const setOne = async () => {
    await setDoc(doc(db, "test", "test99"), { 
      flag: "99",
      id : "099"
    })
  }


  return (
    <div>
      <button onClick={() => getOne()}>データベースから1つ取得</button>
      <button onClick={() => getMany()}>データベースから複数取得</button>
      <button onClick={() => setOne()}>データベースに追加</button>
    </div>
  )
}

export default Test