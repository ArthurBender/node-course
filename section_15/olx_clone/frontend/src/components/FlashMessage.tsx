import { useState, useEffect } from "react";
import bus from "../utils/bus";

const FlashMessage = () => {
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("");

  useEffect(() => {
    bus.addListener("flash", ({ message, type }: { message: string, type: string }) => {
      setMessage(message);
      setType(type);
    })
  }, [])

  return (
    <>
      {message && <div className={`flash-message ${type}`}>
        {message}
        <button onClick={() => setMessage("")}>&times;</button>
      </div>}
    </>
  )
}

export default FlashMessage;