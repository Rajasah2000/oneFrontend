import React from "react";

const SocialMediaIcons = () => {
  const socialLinks = [
    {
      _id: "68197d7b1a8b59b65d24deec",
      name: "https://www.instagram.com/yourpage",
      image: "http://3.111.171.1:8001/uploads/1746756338365-846377007.webp",
      createdAt: "2025-05-06T03:09:47.133Z",
      updatedAt: "2025-05-09T02:05:39.779Z",
      __v: 0,
    },
    {
      _id: "68197d9b1a8b59b65d24def0",
      name: "https://www.facebook.com/yourpage",
      image: "http://3.111.171.1:8001/uploads/1746756321507-128793229.webp",
      createdAt: "2025-05-06T03:10:19.394Z",
      updatedAt: "2025-05-09T02:05:22.625Z",
      __v: 0,
    },
    {
      _id: "68197db21a8b59b65d24def4",
      name: "https://twitter.com/yourpage",
      image: "http://3.111.171.1:8001/uploads/1746756309576-88627040.webp",
      createdAt: "2025-05-06T03:10:42.204Z",
      updatedAt: "2025-05-09T02:05:10.730Z",
      __v: 0,
    },
    {
      _id: "68197dfd1a8b59b65d24def8",
      name: "https://www.youtube.com/yourchannel",
      image: "http://3.111.171.1:8001/uploads/1746756300719-869464828.webp",
      createdAt: "2025-05-06T03:11:57.983Z",
      updatedAt: "2025-05-09T02:05:01.971Z",
      __v: 0,
    },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "20px",
        justifyContent: "center",
        padding: "0 10px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      {socialLinks?.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "250 / 429",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.02)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img
            src={social.image}
            alt={social.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
