import { useEffect, useState } from "react";
import "./App.css";

type Employee = {
  id: string;
  name: string;
  email: string;
  role: string;
};

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;
  const totalPages = Math.ceil(employees.length / rowsPerPage);

  useEffect(() => {
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
      })
      .catch(() => {
        alert("failed to fetch data");
      });
  }, []);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentEmployees = employees.slice(startIndex, startIndex + rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="app">
      <h4 className="header">Employee Data Table</h4>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button type="button" onClick={handlePrevious}>
          Previous
        </button>

        <span>{currentPage}</span>

        <button type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;