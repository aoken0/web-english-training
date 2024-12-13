import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { validateEmail, validatePassword } from "./utils/validation";

const  returnValue = (error: boolean, message: string) => {
  return { error: error, message: message };
}

export const loginWithEmail = async (email: string, password: string) => {
  try {
    if (!(validateEmail(email) && validatePassword(password))) {
      throw new Error;
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    return returnValue(false, "ログインに成功しました。")
  } catch (e: unknown) {
    if (e instanceof FirebaseError) {
      console.log(e)
    }
    return returnValue(true, "ログインに失敗しました。")
  }
};