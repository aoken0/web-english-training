"use client";

import { db } from "../../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import Papa from "papaparse";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

type ColumnType = {
  TypeName: string;
  Type: string;
}
type Column = {
  Name: string;
  Type: string;
}

const CsvUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const columnNumRef = useRef<HTMLInputElement>(null);
  const [columnNum, setColumnNum] = useState<number>(1);
  const [columns, setColumns] = useState<Column[]>([]);
  const [collectionName, setCollectionName] = useState<string>("");

  const ColumnTypes: ColumnType[] = [
    { TypeName: "整数", Type: "int" },
    { TypeName: "小数", Type: "float" },
    { TypeName: "文字列", Type: "string" },
  ]

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleFileUpload = async () => {
    setColumns([])
    const columnNames = document.getElementsByClassName("column-name-input")
    const columnTypes = document.getElementsByClassName("column-type-select")
    for (let i = 0; i < columnNames.length; i++) {
      const columnName = columnNames[i] as HTMLInputElement;
      const columnType = columnTypes[i] as HTMLSelectElement;
      if (columnName.value === "" || columnType.value === "") {
        alert("列名をすべて入力してください");
        return;
      }
      setColumns((prevColumns) => [
        ...prevColumns,
        { Name: columnName.value, Type: columnType.value },
      ]);
    }
  };

  useEffect(() => {
    if (!(columns.length > 0)) return
    if (!collectionName) return
    if (!selectedFile) {
      alert("ファイルを選択してください！");
      return;
    }

    Papa.parse(selectedFile, {
      header: false,
      complete: async (results) => {
        const data = results.data as string[][];
        try {
          for (const row of data) {
            const dynamicData: { [key: string]: any } = {};
            for (let i = 0; i < columns.length; i++) {
              const columnName = columns[i].Name;
              const columnType = columns[i].Type;
  
              if (columnType === "int") {
                const columnValue = parseInt(row[i], 10);
                dynamicData[columnName] = columnValue;
              } else if (columnType === "float") {
                const columnValue = parseFloat(row[i]);
                dynamicData[columnName] = columnValue;
              } else if (columnType === "string") {
                const columnValue = row[i].trim();
                dynamicData[columnName] = columnValue;
              }
            }
            await addDoc(collection(db, collectionName), dynamicData);
          }
          alert("CSVデータがFirestoreに保存されました！");
        } catch (error) {
          console.error("Firestoreへの保存に失敗しました: ", error);
        }
      },
      error: (error) => {
        console.error("CSV解析エラー: ", error);
      },
    });
  }, [columns]);

  const handleColumnNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const columnNum = parseInt(event.target.value, 10);
    setColumnNum(columnNum);
  };

  return (
    <Wrapper>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <ColumnNameList>
        <li id="CollectionNameLi"><label htmlFor="CollectionName">コレクション名: </label><input id="CollectionName" type="text" onChange={(e) => setCollectionName(e.target.value)} /></li>
        <li id="ColumnNumLi"><label htmlFor="ColumnNum">カラム数: </label><input id="ColumnNum" type="number" defaultValue="1" ref={columnNumRef} onChange={handleColumnNumChange} min={1} /></li>
        {Array.from({length: columnNum}, (_, index) => (
          <li key={index}>
            <label htmlFor={`Column${index + 1}`}>カラム名{index + 1}: </label>
            <input id={`Column${index + 1}`} type="text" className="column-name-input" />
            <label htmlFor={`ColumnType${index + 1}`}>型: </label>
            <select name="ColumnType" id={`ColumnType${index + 1}`} className="column-type-select">
              {ColumnTypes.map((ColumnType) => (
                <option key={ColumnType.Type} value={ColumnType.Type}>{ColumnType.TypeName}</option>
              ))}
            </select>
          </li>
        ))}
      </ColumnNameList>
      <button onClick={handleFileUpload}>アップロード</button>
    </Wrapper>
  );
};

export default CsvUploader;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 20px;
`

const ColumnNameList = styled.ul`
  width: 100%;
  li {
    list-style: none;
    margin-bottom: 2px;
  }
  input {
    height: 2em;
  }
  select {
    height: 2em;
  }
  #CollectionNameLi {
    margin-bottom: 20px;
  }
  #ColumnNumLi {
    margin-bottom: 10px;
  }
  .column-name-input {
    margin-right: 10px;
  }
`





