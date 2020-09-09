import React from 'react';
import Layaout from './components/Layaout';
import FirebaseService from './services/firebase.service';

export const FirebaseContext = React.createContext();
function App() {
  const firebaseService =  new FirebaseService()
  return (
    <div className="App">
      <FirebaseContext.Provider value={ firebaseService}>
        <Layaout />
      </FirebaseContext.Provider>


    </div>
  );
}

export default App;
