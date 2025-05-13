export default function Potvrdinarudzbu(){
    return(
        <div
  style={{
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 999,
    backgroundColor: "#007aff",
  }}
>
  <button
    style={{
      width: "100%",
      padding: "18px 0",
      backgroundColor: "transparent",
      color: "white",
      border: "none",
      fontSize: "1.1rem",
      fontWeight: 600,
      cursor: "pointer",
      borderRadius: 0,
    }}
    onClick={() => alert("Narudžba potvrđena!")}
  >
     Potvrdi narudžbu
  </button>
</div>

);
};