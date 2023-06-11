import { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const Statement = () => {
  const [data, setData] = useState([]);
  async function getStatements() {
    const statements = await axios.get("/api/statement");
    console.log(statements.data);
    setData(statements.data);
  }

  useEffect(() => {
    getStatements();
  }, []);

  const columns = [
    { title: "#", dataIndex: "index", key: "index" },
    { title: "DATETIME", dataIndex: "datetime", key: "datetime" },
    { title: "AMOUNT", dataIndex: "amount", key: "amount" },
    { title: "TYPE", dataIndex: "type", key: "type" },
    { title: "DETAILS", dataIndex: "details", key: "details" },
    { title: "BALANCE", dataIndex: "balance", key: "balance" },
  ];

  const tableData = data.map((item, index) => ({
    key: index,
    index: index + 1,
    datetime: `${item.date} ${item.time}`,
    amount: item.amount,
    type: item.type,
    details: item.details,
    balance: item.balance,
  }));

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default Statement;
