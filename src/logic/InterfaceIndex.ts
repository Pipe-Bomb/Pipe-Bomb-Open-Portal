let interfaces: string[] = [];

export function loadInterfaces() {
    try {
        const json = localStorage.getItem("interfaces");
        interfaces = [];
        if (json) {
            const items = JSON.parse(json);
            if (!Array.isArray(items)) throw "not array";
            let changed = false;
            for (let item of items) {
                if (typeof item == "string") {
                    interfaces.push(item);
                } else {
                    changed = true;
                }
            }
            if (changed) {
                localStorage.setItem("interfaces", JSON.stringify(interfaces));
            }
        } else {
            // add default interfaces
            interfaces.push("mobile.pipebomb.net");
            interfaces.push("pipebomb.net");
            localStorage.setItem("interfaces", JSON.stringify(interfaces));
        }
    } catch {
        interfaces = [];
        localStorage.setItem("interfaces", JSON.stringify(interfaces));
    }
}

loadInterfaces();

export function getInterfaces() {
    return interfaces.map((url, id) => {
        return {
            url,
            id
        }
    }).reverse();
}

export function addInterface(url: string) {
    if (interfaces.indexOf(url) >= 0) return;
    interfaces.push(url);
    localStorage.setItem("interfaces", JSON.stringify(interfaces));
}

export function removeInterface(url: string) {
    const index = interfaces.indexOf(url);
    if (index < 0) return;
    interfaces.splice(index, 1);
    localStorage.setItem("interfaces", JSON.stringify(interfaces));
}


export function decodeUrl(url: string) {
    if (url.startsWith("#")) url = url.substring(1);
    return url;
}