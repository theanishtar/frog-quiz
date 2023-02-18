function changeGiscusTheme() {
    const theme = localStorage.getItem("modeByThean") || "light";
    function sendMessage(message) {
        const iframe = document.querySelector('iframe.giscus-frame');
        iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
    }
    sendMessage({
        setConfig: {
            theme: theme
        }
    });
}