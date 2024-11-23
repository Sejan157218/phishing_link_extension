import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    // Listen for messages from background.js
    if (chrome && chrome.runtime) {
      const messageListener = (message, sender, sendResponse) => {
        console.log('chrome.runtime.onMessage:', message);
        if (message.type === 'BACKEND_RESPONSE') {
          console.log('Message from background.js:', message.payload);
          // Update state with backend response
          setResponse(() => message.payload); // Ensure the latest payload is set
        }
      };

      chrome.runtime.onMessage.addListener(messageListener);

      // Cleanup listener on component unmount
      return () => {
        chrome.runtime.onMessage.removeListener(messageListener);
      };
    }
  }, []);
  console.log("response____________", response)
  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      <h1 style={{ textAlign: "left", backgroundColor: "#f4f4f4", padding: "5px", fontSize: "20px"}}>Phishing Link Detection</h1>
      
      {
        response ? (
        <p style={{ textAlign: "left", backgroundColor: "#f4f4f4", padding: "5px", fontSize: "15px"}}>Result: {response.message}</p>
        ) : ( <p style={{ textAlign: "left", backgroundColor: "#f4f4f4", padding: "5px", fontSize: "15px"}}>Loading........</p>)
      }
    </div>
  );
}

export default App;



