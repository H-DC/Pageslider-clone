import { useEffect } from 'react';
import CollectionScreen from './CollectionScreen/CollectionScreen';
import { data } from './data';
import './style.css';

function App() {
    useEffect(() => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
        return () => {
            window.removeEventListener('resize', () => {
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            });
        };
    }, []);

    let imgsJSX = data.map((img) => <img src={img.url} alt="" style={{ display: 'none' }} />);

    return (
        <div className="App">
            <CollectionScreen />
            {imgsJSX}
        </div>
    );
}

export default App;
