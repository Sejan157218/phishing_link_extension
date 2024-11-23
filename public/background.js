// Replace with your Django backend URL
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const BACKEND_URL = "http://127.0.0.1:8000/api/predict/";

  if (changeInfo.status === "complete" && tab.active) {
    const url = new URL(tab.url);
    const domain = url.href;
    console.log("domain_____________", domain)
    if (domain) {
 
      // Send the URL to your Django backend
      fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url : domain}),
      })
        .then((response) => response.json())
        .then((data) => {
          // Send data to React app using chrome.runtime.sendMessage
          chrome.runtime.sendMessage({
          type: "BACKEND_RESPONSE",
          payload: data,
        });
          console.log("Response from backend:", data);
        })
        // .catch((error) => {
        //   console.error("Error sending URL to backend:", error);
        // });
    }
  }
});
