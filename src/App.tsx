import { useEffect, useState } from 'react';
import CollectionScreen from './CollectionScreen/CollectionScreen';
import loaderJSX from './Components/Loader';
import { data } from './data';
import './style.css';

function App() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });

        document.addEventListener('readystatechange', (event) => {
            if ((event.target as HTMLDocument).readyState !== 'complete') {
                setIsLoaded(false);
            } else {
                setIsLoaded(true);
            }
        });
        return () => {
            window.removeEventListener('resize', () => {
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            });
        };
    }, []);

    let imgsJSX = data.map((img, i) => <img src={img.url} alt="" style={{ display: 'none' }} key={i} />);

    return (
        <div className="App">
            {isLoaded ? <CollectionScreen /> : loaderJSX}
            {imgsJSX}
        </div>
    );
}

export default App;
