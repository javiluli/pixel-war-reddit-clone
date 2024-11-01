https://www.youtube.com/watch?v=H_vEJt5Id_I

https://www.youtube.com/watch?v=Djh_eVj0D2w

```jsx
import React, { useCallback } from "react";
import useSocketConnection from "./hooks/useSocketConnection";
import useSocketEvents from "./hooks/useSocketEvents";
import useSocketEmit from "./hooks/useSocketEmit";

const Chat = () => {
  const socket = useSocketConnection("http://localhost:3000");

  // Callback para manejar los mensajes recibidos
  const handleNewMessage = useCallback((message) => {
    console.log("Nuevo mensaje:", message);
    // Aquí podrías almacenar el mensaje en el estado o Zustand
  }, []);

  // Usar el hook para escuchar el evento 'message'
  useSocketEvents(socket, "message", handleNewMessage);

  // Hook para emitir eventos
  const sendMessage = useSocketEmit(socket);

  return (
    <div>
      <button onClick={() => sendMessage("message", "Hola desde React!")}>
        Enviar Mensaje
      </button>
    </div>
  );
};

export default Chat;
```
