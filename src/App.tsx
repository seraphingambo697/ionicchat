import { FC } from "react";
import {
  IonApp,
  IonContent,
  IonPage,
  setupIonicReact,
} from "@ionic/react";

import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import { useMessages } from "./hooks/useMessages";
import { useTheme } from "./hooks/useTheme";
import { useNotifications } from "./hooks/useNotifications";
import { Contact } from "./types/chat";

import "./theme/variables.css";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

setupIonicReact({ mode: "md" });

const contact: Contact = { name: "Jane Doe", online: true };

const App: FC = () => {
  const { messages, addMessage, deleteMessage } = useMessages(contact.name);
  const { isDark, toggleTheme } = useTheme();
  useNotifications();

  return (
    <IonApp>
      <IonPage>
        <ChatHeader contact={contact} isDark={isDark} onToggleTheme={toggleTheme} />

        <IonContent
          style={{ "--background": "var(--chat-bg)" }}
          scrollEvents={true}
        >
          <MessageList messages={messages} onDelete={deleteMessage} />
        </IonContent>

        <MessageInput onSend={addMessage} />
      </IonPage>
    </IonApp>
  );
};

export default App;
