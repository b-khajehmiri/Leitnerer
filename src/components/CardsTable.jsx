import axios from "axios";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import NavBar from "./NavBar";
import design from "./cardsTable.module.scss";
import { GlobalFilter } from "../utils/GlobalFilter";

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
    { Header: "Front Side", Footer: "Front Side", accessor: "front" },
    { Header: "Back Side", Footer: "Back Side", accessor: "back" },
    { Header: "Deck Number", Footer: "Deck Number", accessor: "deck" },
  ];

  console.log(cards);
  const columns = useMemo(() => Columns, []);
  // const data = useMemo(() => cards, []);

  const cardsTable = useTable(
    {
      columns: columns,
      data: cards,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    prepareRow,
    footerGroups,
    state,
    setGlobalFilter,
  } = cardsTable;

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <NavBar navsShow={navsShow} />
      <div className="container lg my-5">
        <div className="d-flex mb-1">
          <h3 className="my-2 text-primary">Cards table</h3>
          <div className="ms-5 mt-1 text-primary" style={{ fontSize: "18px" }}>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <table
          className={`table table-responsive ${design.cardsTable}`}
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <i className="fa-solid fa-down-long ms-2"></i>
                        ) : (
                          <i className="fa-solid fa-up-long ms-2"></i>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
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
          <tfoot>
            {footerGroups.map((footerGroup) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column) => (
                  <td {...column.getFooterGroupProps}>
                    {column.render("Footer")}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
        <div className="d-flex justify-content-center">
          <span>
            <i
              className="fa-solid fa-chevron-left text-primary cursorPointer"
              style={{ display: canPreviousPage ? "inline-block" : "none" }}
              onClick={() => previousPage()}
            ></i>
          </span>
          <span className="mx-3 text-primary">
            Page {[pageIndex + 1]} of {pageOptions.length}
          </span>
          <span>
            {" "}
            <i
              className="fa-solid fa-chevron-right text-primary cursorPointer"
              style={{ display: canNextPage ? "inline-block" : "none" }}
              onClick={() => nextPage()}
            ></i>
          </span>
        </div>
      </div>
    </>
  );
};

export default CardsTable;
