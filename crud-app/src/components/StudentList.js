import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents, deleteStudent } from '../features/students/studentSlice';
import { exportToExcel } from '../utils/exportToExcel';
import EditStudent from './EditStudent';

const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const studentStatus = useSelector((state) => state.students.status);

  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    if (studentStatus === 'idle') {
      dispatch(fetchStudents());
    }
  }, [studentStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleExport = () => {
    exportToExcel(students, 'students');
  };

  return (
    <div className="p-4">
      {editingStudent ? (
        <EditStudent student={editingStudent} onCancel={handleCancelEdit} />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Students</h2>
          <button
            onClick={handleExport}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Export to Excel
          </button>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/4 py-2">Name</th>
                <th className="w-1/4 py-2">Class</th>
                <th className="w-1/4 py-2">Section</th>
                <th className="w-1/4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="py-2">{student.name}</td>
                  <td className="py-2">{student.class}</td>
                  <td className="py-2">{student.section}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleEdit(student)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default StudentList;
