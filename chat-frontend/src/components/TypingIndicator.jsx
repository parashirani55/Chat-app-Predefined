import React from "react";

function TypingIndicator() {
  return (
    <div style={{ paddingLeft: 10, marginTop: 5 }}>
      <span className="typing-indicator">
        <span className="dot" /> <span className="dot" /> <span className="dot" />
      </span>
      <style>{`
        .typing-indicator .dot {
          height: 8px;
          width: 8px;
          margin: 0 2px;
          background-color: #999;
          border-radius: 50%;
          display: inline-block;
          animation: blink 1.4s infinite both;
        }
        .typing-indicator .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-indicator .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.2;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default TypingIndicator;
