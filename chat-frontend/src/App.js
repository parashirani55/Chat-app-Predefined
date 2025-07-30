import React from "react";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <div style={styles.appContainer}>
      <div style={styles.chatWrapper}>
        <h2 style={styles.heading}>💬 Chat with Us</h2>
        <ChatBox />
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #f7f8fc, #e2e8f0)",
    padding: "20px",
  },
  chatWrapper: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "12px",
    background: "#ffffff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: "1.5rem",
    marginBottom: "15px",
    color: "#333",
  },
};

export default App;
