'use client';
import { GlobalWrapper, ContentWrapper } from "@/components/GlobalComponents";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { loginWithEmail } from "@/api/login";

export default function Home() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<{ error: boolean, message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await loginWithEmail(emailRef.current!.value, passwordRef.current!.value);
      setResult(result);
      if (result.error) throw new Error(result.message);
      router.push("/top");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <GlobalWrapper header="login">
      <ContentWrapper height="100%">
        <LoginWrapper $errorMessage={result ? result.message : ""}>
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
