import React from 'react';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportButton = () => {
  const students = useSelector((state) => state.students.students);

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(students);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'students.xlsx');
  };

  return (
    <button onClick={handleExport} className="px-4 py-2 bg-green-500 text-white rounded-md">
      Export to Excel
    </button>
  );
};

export default ExportButton;
