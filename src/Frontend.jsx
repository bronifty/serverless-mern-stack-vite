import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Query, TodoApp, Edit } from './components';

export const App = () => {
  return (
    <Query>
      <div className='App'>
        <Router>
          <Routes>
            <Route path='/tasks/:id' element={<Edit />} />
            <Route path='/' element={<TodoApp />} />
            <Route
              path='*'
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here</p>
                </main>
              }
            />
          </Routes>
        </Router>
      </div>
    </Query>
  );
};

export default App;
