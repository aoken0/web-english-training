import styled from "styled-components";

// Propsの型定義
type GlobalWrapperProps = {
  header: string;
  children: React.ReactNode;
};

const GlobalWrapper: React.FC<GlobalWrapperProps> = ({ header, children }) => {
  return (
    <Wrapper>
      <Header>
        {header}
      </Header>
      {children}
    </Wrapper>
  )
}

export {GlobalWrapper}

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
  padding: 30px;
  font-size: 32px;
`