import { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { motion } from "framer-motion";
import { ArrowBigLeft,  ArrowBigRightIcon,  Search } from "lucide-react"; // Import custom CSS for table styling
import { loadCSVData } from "../../utils/csvDataProcessor";
import LoadingSpinner from "../common/LoadingSpinner";

const EvDetailTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data and store it in state
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const csvData = await loadCSVData();
      setData(csvData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Define columns
  const columns = useMemo(
    () => [
      { Header: "VIN (1-10)", accessor: "VIN (1-10)" },
      { Header: "County", accessor: "County" },
      { Header: "City", accessor: "City" },
      { Header: "State", accessor: "State" },
      { Header: "Postal Code", accessor: "Postal Code" },
      { Header: "Model Year", accessor: "Model Year" },
      { Header: "Make", accessor: "Make" },
      { Header: "Model", accessor: "Model" },
      { Header: "Electric Vehicle Type", accessor: "Electric Vehicle Type" },
      { Header: "Electric Range", accessor: "Electric Range" },
    ],
    []
  );

  // Filtered data based on search
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(
      (user) =>
        user["VIN (1-10)"].toLowerCase().includes(searchTerm) ||
        user["County"].toLowerCase().includes(searchTerm)
    );
  }, [data, searchTerm]);

  // React-table instance with pagination
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 }, // Display 10 rows per page by default
    },
    usePagination
  );


  if(loading){
    return(<LoadingSpinner />)
  }

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">
          Electric Vehicle Details
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-700"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {" "}
                {/* Add key for each headerGroup */}
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    key={column.id} // Add key for each column
                    className="px-6 py-3 text-left text-xs font-semibold  bg-blue-800 text-blue-100 uppercase tracking-wider"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()} className="divide-y divide-gray-700">
            {page.map((row) => {
              prepareRow(row);
              return (
                <motion.tr
                  {...row.getRowProps()}
                  key={row.id} // Unique key prop added for each row
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination mt-4 flex items-center justify-center gap-4">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className=" bg-white rounded-md">
          {<ArrowBigLeft style={{color: "#6366f1"}}/>}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className=" pl-1 pr-1 bg-white text-black rounded cursor-pointer">
          {'<'}
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage} className=" pl-1 pr-1 bg-white text-black rounded cursor-pointer">
          {">"}
        </button>
        <button
          onClick={() => gotoPage(pageOptions.length - 1)}
          disabled={!canNextPage}
          className=" bg-white rounded-md"
        >
          {<ArrowBigRightIcon style={{color: "#6366f1"}}/>}
        </button>
        <select
          value={pageSize}
          name='Page size'
          onChange={(e) => setPageSize(Number(e.target.value))}
          className=" text-lg bg-white text-black"
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size} className=" text-xs text-black bg-orange-200">
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
};

export default EvDetailTable;
