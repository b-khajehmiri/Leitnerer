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
import { number } from "yup";

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
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    footerGroups,
    state,
    setGlobalFilter,
  } = cardsTable;

  const { globalFilter, pageIndex, pageSize } = state;

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
        <div className="d-flex justify-content-center align-item-center">
          <span
            className={`text-primary ${design.paginationHover} ${design.pageHandlers} me-4`}
            style={{
              display: canPreviousPage ? "inline-block" : "none",
            }}
            onClick={() => gotoPage(0)}
          >
            First
          </span>
          <span
            className={`text-primary ${design.paginationHover} ${design.pageHandlers}`}
            style={{
              display: canPreviousPage ? "inline-block" : "none",
            }}
            onClick={() => previousPage()}
          >
            <i
              className={`fa-solid fa-chevron-left ${design.iconsFontSize}`}
            ></i>
            Previous
          </span>
          <span
            className={`mx-3 text-primary cursorPointer ${design.pageHandlers}`}
            style={{ display: pageIndex > 1 ? "block" : "none" }}
            onClick={() => gotoPage(pageIndex - 2)}
          >
            {[pageIndex - 1]}
          </span>
          <span
            className={`mx-3 text-primary cursorPointer ${design.pageHandlers}`}
            style={{ display: pageIndex > 0 ? "block" : "none" }}
            onClick={() => gotoPage(pageIndex - 1)}
          >
            {[pageIndex]}
          </span>
          <span
            className={`mx-3 text-primary fw-bolder cursorDefault ${design.pageHandlers}`}
          >
            {[pageIndex + 1]}
          </span>
          <span
            className={`mx-3 text-primary cursorPointer ${design.pageHandlers}`}
            style={{ display: pageIndex < pageCount - 1 ? "block" : "none" }}
            onClick={() => gotoPage(pageIndex + 1)}
          >
            {[pageIndex + 2]}
          </span>
          <span
            className={`mx-3 text-primary cursorPointer ${design.pageHandlers}`}
            style={{ display: pageIndex < pageCount - 2 ? "block" : "none" }}
            onClick={() => gotoPage(pageIndex + 2)}
          >
            {[pageIndex + 3]}
          </span>
          <span
            className={`text-primary ms-2 ${design.paginationHover} ${design.pageHandlers}`}
            style={{
              display: canNextPage ? "inline-block" : "none",
            }}
            onClick={() => nextPage()}
          >
            Next
            <i
              className={`fa-solid fa-chevron-right ${design.iconsFontSize}`}
            ></i>
          </span>
          <span
            className={`text-primary ${design.paginationHover} ${design.pageHandlers} ms-4`}
            style={{
              display: canNextPage ? "inline-block" : "none",
            }}
            onClick={() => gotoPage(pageCount - 1)}
          >
            Last
          </span>
          <span className="text-primary ms-5 d-none d-lg-flex">
            <label
              htmlFor="goToPage"
              className={`form-label m-0 p-0 align-self-center ${design.gotoPageLabel}`}
            >
              Go to page:
            </label>
            <input
              id="goToPage"
              className={`form-control border-primary ms-2 ${design.gotoPageInput}`}
              type="number"
              min={1}
              max={pageCount}
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
            />
          </span>
          <span className="text-primary ms-5 d-none d-lg-flex">
            <label
              htmlFor="pageSize"
              className={`form-label m-0 p-0 align-self-center ${design.pageSizeLabel}`}
            >
              Page rows:
            </label>
            <select
              id="pageSize"
              className={`form-control border-primary ms-2 ${design.pageSizeInput}`}
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 20, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </span>
        </div>
      </div>
    </>
  );
};

export default CardsTable;
