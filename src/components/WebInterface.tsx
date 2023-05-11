import { Button, Loading } from "@nextui-org/react"
import styles from "../styles/WebInterface.module.scss"
import { MdOutlineDelete, MdOutlineSignalWifi4Bar, MdSignalWifiBad } from "react-icons/md"
import { useEffect, useState } from "react"
import Axios from "axios"
import { decodeUrl } from "../logic/InterfaceIndex"

export interface WebInterfaceProps {
    url: string
    onDelete: () => void
}

export default function WebInterface(props: WebInterfaceProps) {
    const [state, setState] = useState<"loading" | "online" | "offline">("loading");

    useEffect(() => {
        setState("loading");
        Axios.get(`//${props.url}/Config.json`).then(data => {
            if (data.data?.isPipeBombWebInterface === true) {
                setState("online");
            } else {
                setState("offline");
            }
        }, () => {
            setState("offline");
        });
    }, [props.url]);

    const innerHTML = (() => {
        switch (state) {
            case "offline":
                return <MdSignalWifiBad className={styles.icon} />
            case "online":
                return <MdOutlineSignalWifi4Bar className={styles.icon} />
            default:
                return <Loading className={styles.icon} loadingCss={{ $$loadingSize: "50px", $$loadingBorder: "6px"}} />
        }
    })();

    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                { innerHTML }
            </div>
            <div className={styles.info}>
                <h1 className={styles.name}>{ props.url }</h1>
                <Button auto className={styles.delete} light onPress={props.onDelete}><MdOutlineDelete /></Button>
            </div>
            <a href={`//${props.url}/${decodeUrl(location.hash)}`}><Button auto size="lg" color="secondary" disabled={state != "online"}>Launch</Button></a>
        </div>
    )
}