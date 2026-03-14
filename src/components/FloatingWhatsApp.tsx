import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import styles from "./FloatingWhatsApp.module.scss"; // optional if you want extra styling

const FloatingWhatsApp: React.FC = () => {
  const message = `Hi Mauli Mart, I'm interested in products. Please share more details.`;
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/+919665655595?text=${encoded}`;

  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      // className={styles.floatingButton} // optional, or use inline classes
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        color: "#fff",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        border: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        cursor: "pointer",
        zIndex: 9999,
      }}
      aria-label="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp" style={{ fontSize: "28px" }}></i>
    </button>
  );
};

export default FloatingWhatsApp;
