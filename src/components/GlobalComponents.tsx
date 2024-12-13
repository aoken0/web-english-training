import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { logout } from "@/api/logout";

// Propsの型定義
type GlobalWrapperProps = {
  header: string;
  children: React.ReactNode;
};

const GlobalWrapper: React.FC<GlobalWrapperProps> = ({ header, children }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("ログアウト失敗: ", error);
    }
  };

  return (
    <Wrapper>
      <Header $header={header}>
        {header}
        <div>
          <button onClick={() => handleLogout()}>ログアウト</button>
        </div>
      </Header>
      {children}
    </Wrapper>
  )
}

type LRContentWrapperProps = {
  children: React.ReactNode
}
const LRContentWrapper: React.FC<LRContentWrapperProps> = ({ children }) => {
  return (
    <LRContentWrapperStyled>
      {children}
    </LRContentWrapperStyled>
  )
}

type SideContentWrapperProps = {
  children: React.ReactNode
}
const LContentWrapper: React.FC<SideContentWrapperProps> = ({ children }) => {
  return (
    <LContentWrapperStyled>
      {children}
    </LContentWrapperStyled>
  )
}
const RContentWrapper: React.FC<SideContentWrapperProps> = ({ children }) => {
  return (
    <RContentWrapperStyled>
      {children}
    </RContentWrapperStyled>
  )
}

type ContentWrapperProps = {
  children: React.ReactNode;
  height?: string;
}
const ContentWrapper: React.FC<ContentWrapperProps> = ({ children, height }) => {
  if (!height) {
    height = "auto";
  }

  return (
    <ContentWrapperStyled $height={height}>
      {children}
    </ContentWrapperStyled>
  )
}

type BigButtonProps = {
  text: string
  onClick?: () => void
}
const BigButton: React.FC<BigButtonProps> = ({ text, onClick }) => {
  return (
    <BigButtonStyled onClick={onClick}>
      <span>{text}</span>
    </BigButtonStyled>
  )
}

export {GlobalWrapper, LRContentWrapper, LContentWrapper, RContentWrapper, ContentWrapper, BigButton}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffffe0;
  font-family: var(--font-roboto-regular), var(--font-noto-sans-jp), sans-serif;
`

const Header = styled.div<{ $header: string }>`
  width: 80%;
  max-width: 960px;
  min-width: 600px;
  height: 100px;
  margin: 0 auto;
  color: #222;
  padding: 30px 20px;
  font-size: 32px;
  display: ${({ $header }) => $header !== "login" ? "flex" : "none"};
  justify-content: space-between;
  button {
    width: 120px;
    height: 40px;
    border-radius: 20px;
    border: 2px solid #222;
    background-color: transparent;
    cursor: pointer;
    transition: all .25s ease-in-out;
    font-size: 14px;
    &:hover {
      background-color: #222;
      font-weight: bold;
      color: #fff;
    }
  }
`

const LRContentWrapperStyled = styled.div`
  width: 80%;
  max-width: 960px;
  min-width: 600px;
  margin: 0 auto;
  padding: 20px;
  color: #222;
  // background-color: #eee;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`

const LContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  // background-color: #bbb;
`

const RContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  // background-color: #bbb;
`

const ContentWrapperStyled = styled.div<{ $height: string }>`
  width: 80%;
  height: ${({ $height }) => $height};
  max-width: 960px;
  min-width: 600px;
  margin: 0 auto;
  padding: 20px;
  color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BigButtonStyled = styled.button`
  width: 100%;
  max-width: 450px;
  aspect-ratio: 3.8 / 1;
  padding: 30px;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  outline: none;
  box-shadow: 
    0px 0px 10px rgba(0, 0, 0, 0.2),
    inset 0px 0px 10px transparent;
  transition: all .25s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 
      0px 0px 10px transparent,
      inset 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  span {
    font-size: 20px;
  }
`