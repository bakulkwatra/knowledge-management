const KnowledgeHeader = () => {
  return (
    <div
      className="mt-2"
      style={{
        backgroundImage: "url('/blog2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "220px",
        width: "100%",
        position: "relative",
        color: "white",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "0 1rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
          Welcome to the CMS Knowledge Center
        </h1>
        <p style={{ marginBottom: "1rem", fontSize: "1rem" }}>How can I help you?</p>
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "white",
            borderRadius: "0.375rem",
            overflow: "hidden",
          }}
        >
          <input
            type="text"
            placeholder="Search with (minimum 3 character)"
            style={{
              flexGrow: 1,
              padding: "0.5rem 0.75rem",
              border: "none",
              outline: "none",
              fontSize: "0.875rem",
              color: "black",
            }}
          />
          <button
            style={{
              backgroundColor: "#e5e7eb",
              padding: "0.5rem 1rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            🔍
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHeader;
