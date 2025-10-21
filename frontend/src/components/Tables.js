// src/components/Tables.js
import React from "react";

export function Table({ columns, data }) {
  return (
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} className="py-2 px-4 border-b">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-100">
            {columns.map((col, colIndex) => (
              <td key={colIndex} className="py-2 px-4 border-b">{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
