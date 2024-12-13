'use client'
import { GlobalWrapper, ContentWrapper } from "@/components/GlobalComponents"
import styled from "styled-components"
import { useState } from "react"
import CsvUploader from "./components/CSVUploader"

const Admin = () => {
  const [currentMenuId, setCurrentMenuId] = useState<string>("")
  const [currentMenuTitle, setCurrentMenuTitle] = useState<string>("メニューを選択してください。")
  const adminMenu = [
    { id: "csv-upload", title: "CSVアップロード" },
    { id: "sample", title: "サンプル" },
    { id: "テスト", title: "テスト" },
  ]

  const handleClick = (id: string) => {
    console.log(id)
    const element = document.getElementById(id)
    if (!element) return;
    element.style.backgroundColor = "#444"

    if (currentMenuId) {
      const currentElement = document.getElementById(currentMenuId)
      if (!currentElement) return;
      currentElement.style.backgroundColor = "#666"
    }
    setCurrentMenuId(id)
    setCurrentMenuTitle(adminMenu.find((menu) => menu.id === id)!.title)
  }

  const handleContent = () => {
    switch (currentMenuId) {
      case "csv-upload":
        return <CsvUploader />
      case "sample":
        return <div>サンプル</div>
      case "テスト":
        return <div>テスト</div>
    }
  }

  return (
    <GlobalWrapper header="Admin">
      <ContentWrapper>
        <AdminWrapper>
          <AdminMenuWrapper>
            <ul>
              {adminMenu.map((menu) => (
                <li key={menu.id} id={menu.id} onClick={() => handleClick(menu.id)}>
                  {menu.title}
                </li>
              ))}
            </ul>
          </AdminMenuWrapper>
          <AdminContentWrapper>
            <h2>{currentMenuTitle}</h2>
            {handleContent()}
          </AdminContentWrapper>
        </AdminWrapper>
      </ContentWrapper>
    </GlobalWrapper>
  )
}

export default Admin

const AdminWrapper = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: start;
`

const AdminMenuWrapper = styled.div`
  width: 20%;
  max-width: 240px;
  min-width: 160px;
  height: 100%;
  color: #fff;
  background-color: #eee;
  ul {
    list-style: none;
    }
  li {
    background-color: #666;
    width: 100%;
    line-height: 2.5;
    cursor: pointer;
    margin-bottom: 2px;
    padding-left: 1em;
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: #444;
    }
  }
  #selected {
    background-color: #444;
  }
`

const AdminContentWrapper = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  background-color: #fff;
  padding: 0 16px;
  h2 {
    font-size: 24px;
    font-weight: normal;
  }
`