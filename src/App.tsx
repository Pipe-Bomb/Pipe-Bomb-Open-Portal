import styles from './styles/App.module.scss'
import GlowEffect from './components/GlowEffect'
import useWindowSize from './hooks/WindowSideHook';
import WebInterface from './components/WebInterface';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { addInterface, getInterfaces, removeInterface } from "./logic/InterfaceIndex"

function App() {
    const size = useWindowSize();
    const [inputValue, setInputValue] = useState("");
    const [interfaces, setInterfaces] = useState(getInterfaces());

    function addNewInterface(url: string) {
        if (!url) return;
        if (url.startsWith("http://")) {
            url = url.substring(7);
        } else if (url.startsWith("https://")) {
            url = url.substring(8);
        }
        addInterface(url);
        setInputValue("");
        setInterfaces(getInterfaces());
    }

    function keyPress(event: React.KeyboardEvent) {
        if (event.key == "Enter") {
            addNewInterface(inputValue);
        }
    }

    function deleteInterface(url: string) {
        removeInterface(url);
        setInterfaces(getInterfaces());
    }

    return (
        <>
            <div className={styles.background}>
                <GlowEffect active={true} durationMultiplier={10} spread={40}>
                    <svg viewBox={`0 0 ${(size.width || 100) * 1.5} ${(size.height || 100) * 1.5}`} xmlns="http://www.w3.org/2000/svg" className={styles.grain}>
                        <filter id='noiseFilter'>
                            <feTurbulence 
                            type='fractalNoise' 
                            baseFrequency='0.9' 
                            numOctaves='3' 
                            stitchTiles='stitch'/>
                        </filter>
                        <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
                    </svg>
                </GlowEffect>
            </div>
            
            <h1 className={styles.title}>Select an Interface</h1>

            <div className={styles.addInterface}>
                <Input clearable underlined labelPlaceholder="Interface URL" size="xl" fullWidth value={inputValue} onKeyDown={keyPress} onInput={e => setInputValue(e.currentTarget.value)} />
                <Button auto size="lg" bordered color="secondary" onPress={() => addNewInterface(inputValue)}>Add</Button>
            </div>

            <div className={styles.webInterfaces}>
                {interfaces.map(data => (
                    <WebInterface url={data.url} key={data.id} onDelete={() => deleteInterface(data.url)} />
                ))}
            </div>
        </>
    )
}

export default App