const sessionId = Date.now() + "_" + Math.random().toString(36).substring(2);

function sendLog(event) {
    fetch("http://192.168.1.80:5000/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event: event,
            page: window.location.pathname,
            sessionId: sessionId
        })
    });
}

window.onload = () => {
    sendLog("page_open");

    const start = Date.now();

    document.addEventListener("click", (e) => {
        sendLog("clicked: " + e.target.tagName);
    });

    window.onbeforeunload = () => {
        const activeTime = Date.now() - start;
        sendLog("active_time: " + activeTime);
    };
};
