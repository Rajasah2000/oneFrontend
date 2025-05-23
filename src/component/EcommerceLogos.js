import React from "react";

const EcommerceLogos = () => {
  const logos = [
    {
      name: "Amazon",
      image: "https://foxin.in/cdn/shop/files/Amazon_400x.jpg?v=1650651882",
      url: "https://www.amazon.in",
    },
    {
      name: "JioMart",
      image: "https://foxin.in/cdn/shop/files/CRED_LOGO_400x.png?v=1687890395",
      url: "https://www.jiomart.com",
    },
    {
      name: "CRED",
      image: "https://foxin.in/cdn/shop/files/moglix_400x.png?v=1708679611",
      url: "https://cred.club",
    },
    {
      name: "Moglix",
      image: "https://foxin.in/cdn/shop/files/5_400x.png?v=1688496862",
      url: "https://www.moglix.com",
    },
  ];

  const getItemStyle = () => {
    const isMobile = window.innerWidth < 768;
    return {
      flex: isMobile ? "0 0 48%" : "0 0 23%",
      maxWidth: isMobile ? "48%" : "23%",
      margin: "1%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
      transition: "transform 0.3s ease",
    };
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 10px",
        width: "100%",
      }}
    >
      {logos.map((logo, index) => (
        <a
          key={index}
          href={logo.url}
          target="_blank"
          rel="noopener noreferrer"
          style={getItemStyle()}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img
            src={logo.image}
            alt={logo.name}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "120px",
              objectFit: "contain",
            }}
          />
        </a>
      ))}
    </div>
  );
};

export default EcommerceLogos;
