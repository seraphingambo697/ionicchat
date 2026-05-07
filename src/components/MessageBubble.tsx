import { FC } from "react";
import {
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import { ChatMessage } from "../types/chat";
import "./MessageBubble.css";

interface MessageBubbleProps {
  msg: ChatMessage;
  onDelete: (id: string) => void;
}

const MessageBubble: FC<MessageBubbleProps> = ({ msg, onDelete }) => {
  const isMe = msg.sender === "me";

  const statusIcon =
    msg.status === "read" ? "✓✓" :
    msg.status === "delivered" ? "✓✓" : "✓";

  const statusColor =
    msg.status === "read"
      ? "var(--status-read-color)"
      : "var(--status-default-color)";

  return (
    <IonItemSliding style={{ width: "100%", background: "transparent" }}>
      <IonItemOptions side="end" onIonSwipe={() => onDelete(msg.id)}>
        <IonItemOption color="danger" expandable onClick={() => onDelete(msg.id)}>
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>

      <div className={`bubble-row ${isMe ? "me" : "contact"}`}>
        <div className={`bubble ${isMe ? "me" : "contact"}`}>
          {msg.image && (
            <img src={msg.image} alt="sent" className="bubble-image" />
          )}

          {msg.text && (
            <p className="bubble-text">{msg.text}</p>
          )}

          {msg.audio && (
            <audio controls src={msg.audio} className="bubble-audio" />
          )}

          <div className="bubble-meta">
            {msg.location && (
              <span className="bubble-location">Sent from {msg.location}</span>
            )}
            <div className="bubble-footer">
              <span className="bubble-time">{msg.createdAt}</span>
              {isMe && (
                <span className="bubble-status" style={{ color: statusColor }}>
                  {statusIcon}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </IonItemSliding>
  );
};

export default MessageBubble;
