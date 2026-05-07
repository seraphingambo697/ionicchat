import { FC } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import { ellipsisVertical, moon, sunny } from "ionicons/icons";
import { Contact } from "../types/chat";
import "./ChatHeader.css";

interface ChatHeaderProps {
  contact: Contact;
  isDark: boolean;
  onToggleTheme: () => void;
}

const ChatHeader: FC<ChatHeaderProps> = ({ contact, isDark, onToggleTheme }) => (
  <IonHeader>
    <IonToolbar className="chat-toolbar">
      <IonButtons slot="start">
        <IonBackButton defaultHref="/" text="" />
      </IonButtons>

      <IonButtons slot="start">
        <IonAvatar className="header-avatar">
          {contact.avatar ? (
            <img src={contact.avatar} alt={contact.name} />
          ) : (
            <div className="avatar-fallback">{contact.name[0].toUpperCase()}</div>
          )}
        </IonAvatar>
      </IonButtons>

      <IonTitle>
        <IonLabel>
          <h2 className="header-name">{contact.name}</h2>
          <p className="header-status">
            {contact.online ? "Online" : "Offline"}
          </p>
        </IonLabel>
      </IonTitle>

      <IonButtons slot="end">
        <IonButton aria-label="Toggle theme" onClick={onToggleTheme}>
          <IonIcon icon={isDark ? sunny : moon} slot="icon-only" />
        </IonButton>
        <IonButton aria-label="Menu">
          <IonIcon icon={ellipsisVertical} slot="icon-only" />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
);

export default ChatHeader;
