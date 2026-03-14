import React from "react";

const Location = () => {
  return (
    <div style={{ width: "100%", height: "400px", margin: "2rem 0" }}>
      <iframe
        title="Mauli Mart Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.3669167854473!2d75.91506067459036!3d17.680118794307365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5dbcb3ff8e249%3A0x7d1b3be7e4d376bb!2sMauli%20Napkin%20Bouquet!5e0!3m2!1sen!2sin!4v1707220736350!5m2!1sen!2sin" 
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Location;
