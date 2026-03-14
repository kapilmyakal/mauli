import React from "react";
import styles from "./SocialButtons.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SocialButtons: React.FC = () => {
  const message = `Hi Mauli Mart, I'm interested in products. Please share more details.`;
  const encoded = encodeURIComponent(message);

  const socialLinks = [
    {
      name: "whatsapp",
      url: `https://wa.me/+919579068131?text=${encoded}`,
      icon: "fab fa-whatsapp",
      color: "#25D366",
    },
    {
      name: "facebook",
      url: "https://www.facebook.com/share/1FZxwAcyFN/",
      icon: "fab fa-facebook-f",
      color: "#1877F2",
    },
    {
      name: "instagram",
      url: "https://www.instagram.com/maulimart25?utm_source=qr&igsh=MTUzbnJ3OHZhOGhxOA==",
      icon: "fab fa-instagram",
      color:
        "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
    },
    {
        name: "call",
        url: "tel:+919579068131", // <-- opens dialer
        icon: "fas fa-phone-alt",
        color: "#34B7F1", // Blue color for call button
      },
    // {
    //   name: "youtube",
    //   url: "https://www.youtube.com/embed/mXJEQYfO2qI",
    //   icon: "fab fa-youtube",
    //   color: "#FF0000",
    // },
  ];

  return (
    <div className={styles.socialButtons}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target={social.name === "call" ? "_self" : "_blank"} // Call should open in same tab
          rel="noopener noreferrer"
          className={styles.social}
          style={{
            background:
              social.name === "instagram" ? social.color : undefined,
            backgroundColor:
              social.name !== "instagram" ? social.color : undefined,
          }}
        >
          <i className={social.icon}></i>
        </a>
      ))}
    </div>
  );
};

export default SocialButtons;