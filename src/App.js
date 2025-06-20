
import React from 'react';
import { PostProvider } from './components/PostContext';  
import Main from './components/Main';                     

function App() {
  return (
    <PostProvider>
      <Main />
    </PostProvider>
  );
}

export default App;


