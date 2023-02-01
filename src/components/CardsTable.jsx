import axios from "axios";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import { useTable } from "react-table";
import NavBar from "./NavBar";
import design from "./cardsTable.module.scss"

const CardsTable = () => {
  const userId = window.localStorage.getItem("user");
  const navsShow = {
    signUpShow: false,
    signInShow: false,
    otherLinksShow: true,
    logOUtShow: true,
  };

  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getCards() {
      const res = await axios.get(
        `https://leitnerer-e8694-default-rtdb.firebaseio.com/${userId}.json`
      );
      let keys = Object.keys(res.data);
      let values = Object.values(res.data);
      values.map((v, index) => (v.id = keys[index]));
      setCards(values);
    }

    getCards();
  }, []);

  const Columns = [
    { Header: "Front Side", accessor: "front" },
    { Header: "Back Side", accessor: "back" },
    { Header: "Deck Number", accessor: "deck" },
  ];

  console.log(cards);
  const columns = useMemo(() => Columns, []);
  // const data = useMemo(() => cards, []);

  const cardsTable = useTable({
    columns: columns,
    data: cards,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    cardsTable;

  return (
    <>
      <NavBar navsShow={navsShow} />
      <div className="container lg mt-5">
        <table
          className={`table table-responsive ${design.cardsTable}`}
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CardsTable;
