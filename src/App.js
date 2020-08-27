import React from 'react';
import Layaout from './components/Layaout';

export const AuthContext = React.createContext();
function App() {
  
  return (
    <div className="App">
      
      <Layaout/>
  
    </div>
  );
}

export default App;
