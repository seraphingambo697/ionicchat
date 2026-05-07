import { useState } from "react";
import { ChatMessage, SendPayload, MessageStatus } from "../types/chat";

const STORAGE_KEY = "minichat_messages";

const AUTO_REPLIES: string[] = [
    "Super ! J'ai reçu ton message 👍",
    "Ok je vois, merci !",
    "Haha 😄 trop bien !",
    "Je te réponds dès que possible.",
    "Reçu 5/5 ✅",
];

const uid = (): string => Math.random().toString(36).slice(2);

const nowTime = (): string =>
    new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

function load(): ChatMessage[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as ChatMessage[];
    } catch {
        return [];
    }
}

// save messages to localStorage
function save(msgs: ChatMessage[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
}
// useMessages hook
export function useMessages(contactName: string) {
    const [messages, setMessages] = useState<ChatMessage[]>(load);

    const addMessage = (payload: SendPayload): void => {
        const msg: ChatMessage = {
            id: uid(),
            sender: "me",
            senderName: "Moi",
            status: "sent",
            createdAt: nowTime(),
            ...payload,
        };

        setMessages((prev) => {
            const next = [...prev, msg];
            save(next);
            return next;
        });

        // réponse automatique
        setTimeout(() => {
            const reply: ChatMessage = {
                id: uid(),
                sender: "contact",
                senderName: contactName,
                text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
                status: "read",
                createdAt: nowTime(),
                location: "California, USA",
            };

            setMessages((cur) => {
                const updated = cur.map((m) =>
                    m.id === msg.id ? { ...m, status: "read" as MessageStatus } : m
                );
                const withReply = [...updated, reply];
                save(withReply);
                return withReply;
            });
        }, 1200);
    };

    // delete message
    const deleteMessage = (id: string): void => {
        setMessages((prev) => {
            const next = prev.filter((m) => m.id !== id);
            save(next);
            return next;
        });
    };
    // clear all messages
    const clearAll = (): void => {
        setMessages([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return { messages, addMessage, deleteMessage, clearAll };
}
