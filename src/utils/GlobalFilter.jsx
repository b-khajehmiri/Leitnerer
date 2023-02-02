export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="d-flex">
      <label htmlFor="search" className="form-label m-0 p-0 align-self-center">
        Search:
      </label>
      <input
        id="search"
        type="text"
        className="form-control border-primary ms-2"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};
