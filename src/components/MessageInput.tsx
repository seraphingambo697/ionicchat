import { FC, useState, KeyboardEvent } from "react";
import {
  IonFooter,
  IonToolbar,
  IonInput,
  IonButton,
  IonIcon,
  IonThumbnail,
} from "@ionic/react";
import { send, close } from "ionicons/icons";
import { SendPayload } from "../types/chat";
import ImagePicker from "./ImagePicker";
import AudioRecorder from "./AudioRecorder";
import { fetchLocation } from "../hooks/useGeolocation";
import "./MessageInput.css";

interface MessageInputProps {
  onSend: (payload: SendPayload) => void;
}

const MessageInput: FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const canSend = (text.trim().length > 0 || image !== null) && !sending;

  const send_msg = async (): Promise<void> => {
    if (!canSend) return;
    setSending(true);
    const location = await fetchLocation();
    onSend({
      text: text.trim() || undefined,
      image: image ?? undefined,
      location: location ?? undefined,
    });
    setText("");
    setImage(null);
    setSending(false);
  };

  const handleKey = (e: KeyboardEvent<HTMLIonInputElement>): void => {
    if (e.key === "Enter") void send_msg();
  };

  return (
    <IonFooter>
      {image && (
        <IonToolbar style={{ "--background": "var(--input-toolbar-bg)", "--min-height": "72px" }}>
          <div className="input-preview-row">
            <IonThumbnail style={{ "--size": "56px", borderRadius: 8, overflow: "hidden" }}>
              <img src={image} alt="preview" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </IonThumbnail>
            <IonButton fill="clear" color="danger" onClick={() => setImage(null)} aria-label="Remove photo">
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </div>
        </IonToolbar>
      )}

      <IonToolbar style={{ "--background": "var(--input-toolbar-bg)", "--min-height": "56px" }}>
        <div className="input-row">
          <ImagePicker onImageReady={setImage} />

          <IonInput
            value={text}
            placeholder="Type a message"
            onIonInput={(e) => setText(e.detail.value ?? "")}
            onKeyDown={handleKey}
            aria-label="Message"
            className="input-field"
            style={{
              "--background": "var(--input-field-bg)",
              "--color": "var(--ion-text-color)",
              "--border-radius": "20px",
              "--padding-start": "14px",
              "--padding-end": "14px",
              "--padding-top": "8px",
              "--padding-bottom": "8px",
            }}
          />

          <AudioRecorder onAudioReady={(url) => onSend({ audio: url })} />

          {canSend && (
            <IonButton
              shape="round"
              color="success"
              onClick={send_msg}
              aria-label="Send"
              style={{ "--padding-start": "12px", "--padding-end": "12px", width: 44, height: 44 }}
            >
              <IonIcon slot="icon-only" icon={send} />
            </IonButton>
          )}
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default MessageInput;
