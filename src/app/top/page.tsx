"use client"
import styled from "styled-components"
import "styled-reset"

const page = () => {
  return (
    <Wrapper>
      <Header>
        <h1>Top</h1>
      </Header>
    </Wrapper>
  )
}

export default page

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffffe0;
  font-family: "Roboto-Regular"
`

const Header = styled.header`
  background-color: #ffffe0;
  color: #222;
  padding: 20px;
`