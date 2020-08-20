import React, { useState } from 'react';
import Layaout from './commponents/Layaout';

export const AuthContext = React.createContext();
function App() {
  const [auth, setAuth] = useState({});
  if (!auth) {

  }
  return (
    <div className="App">
      
      
      <AuthContext.Provider value={{auth, setAuth}}>
      <Layaout/>
  
      </AuthContext.Provider>
    </div>
  );
}

export default App;
