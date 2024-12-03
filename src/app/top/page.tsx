"use client"
import styled from "styled-components"
import "styled-reset"

const Page = () => {
  return (
    <Wrapper>
      <Header>
        <h1>トップページ</h1>
      </Header>
      <Content>
        <h2>コンテンツ</h2>
      </Content>
    </Wrapper>
  )
}

export default Page

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffffe0;
  font-family: var(--font-roboto-regular), var(--font-noto-sans-jp), sans-serif;
`

const Header = styled.div`
  width: 80%;
  max-width: 960px;
  min-width: 600px;
  height: 100px;
  margin: 0 auto;
  color: #222;
  padding: 20px;
`

const Content = styled.div`
  width: 80%;
  max-width: 960px;
  min-width: 600px;
  margin: 0 auto;
  color: #222;
  padding: 20px;
`