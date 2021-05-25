import { useEffect } from "react";
import CollectionScreen from "./CollectionScreen/CollectionScreen";
import './style.css';

function App() {

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    window.addEventListener('resize',()=>{
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    })      
    return () => {
      window.removeEventListener('resize',()=>{
          let vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
      })
    }
  }, [])


  return (
    <div className="App">
      <CollectionScreen />
    </div>
  );
}

export default App;
