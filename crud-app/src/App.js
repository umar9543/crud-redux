import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-3xl">CRUD Application</h1>
        </header>
        <main className="p-4">
          <AddStudent />
          <StudentList />
        </main>
      </div>
    </Provider>
  );
}

export default App;