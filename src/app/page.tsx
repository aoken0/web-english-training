'use client';
import { GlobalWrapper, ContentWrapper } from "@/components/GlobalComponents";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { FirebaseError } from "firebase/app";

export default function Home() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string | null | undefined) => {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const validatePassword = (password: string | null | undefined) => {
    if (!password) return false;
    const regex = /^[^\s]{6,}$/
    return regex.test(password);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!validateEmail(emailRef.current?.value)) {
        setErrorMessage("正しいメールアドレスを入力してください。")
        return
      }
      if (!validatePassword(passwordRef.current?.value)) {
        setErrorMessage("正しいパスワードを入力してください。")
        return
      }
      const userCredential = await signInWithEmailAndPassword(auth, emailRef.current!.value, passwordRef.current!.value);
      console.log("User signed in:", userCredential.user);
      router.push("/top");
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
      setErrorMessage("ログインに失敗しました。")
    }
  }

  return (
    <GlobalWrapper header="login">
      <ContentWrapper height="100%">
        <LoginWrapper $errorMessage={errorMessage}>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="メールアドレス" ref={emailRef} required />
            <input type="password" placeholder="パスワード" ref={passwordRef} required />
            <button type="submit">ログイン</button>
          </form>
        </LoginWrapper>
      </ContentWrapper>
    </GlobalWrapper>
  );
}

const LoginWrapper = styled.div<{ $errorMessage: string }>`
  background-color: #fff;
  width: 50%;
  min-width: 450px;
  aspect-ratio: 1 / 1;
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
      width: 300px;
      height: 48px;
      border: none;
      border-radius: 5px;
      outline: none;
      box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.2);
      transition: all .25s ease-in-out;
      margin: 10px 0;
      padding: 0 10px;
    }
    button[type="submit"] {
      width: 300px;
      height: 48px;
      margin-top: 30px;
      border: none;
      border-radius: 5px;
      background-color: #aaa;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      position: relative;
      &:hover {
        box-shadow: 
          0px 0px 10px transparent,
          inset 0px 0px 10px rgba(0, 0, 0, 0.2);
      }
      &::after {
        content: ${({ $errorMessage }) => $errorMessage ? `"${$errorMessage}"` : ''};
        position: absolute;
        display: block;
        top: -30px;
        left: 0;
        width: 100%;
        height: 100%;
        color: #ff6347;
        z-index: 100;
      }
    }
  }
  button {
    width: 160px;
    height: 40px;
    border: none;
    border-radius: 5px;
    outline: none;
    box-shadow: 
      0px 0px 10px rgba(0, 0, 0, 0.2),
      inset 0px 0px 10px transparent;
    transition: all .25s ease-in-out;
    cursor: pointer;
    &:hover {
      box-shadow: 
        0px 0px 10px transparent,
        inset 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
  }
`
