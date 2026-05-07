import { useEffect } from "react";
import { LocalNotifications, PermissionStatus } from "@capacitor/local-notifications";

let notifId = 1;

async function requestPermission(): Promise<boolean> {
  const status: PermissionStatus = await LocalNotifications.requestPermissions();
  return status.display === "granted";
}

export async function scheduleReplyNotification(senderName: string, text: string): Promise<void> {
  const granted = await requestPermission();
  if (!granted) return;

  await LocalNotifications.schedule({
    notifications: [
      {
        id: notifId++,
        title: senderName,
        body: text,
        schedule: { at: new Date(Date.now() + 100) },
        smallIcon: "ic_stat_icon_config_sample",
        channelId: "chat-replies",
      },
    ],
  });
}

export function useNotifications(): void {
  useEffect(() => {
    LocalNotifications.createChannel({
      id: "chat-replies",
      name: "Chat Replies",
      importance: 4,
      vibration: true,
    }).catch(() => {
      // createChannel only works on Android; ignore on other platforms
    });

    const listener = LocalNotifications.addListener(
      "localNotificationActionPerformed",
      () => {
        // handle tap — navigate to chat if needed
      }
    );

    return () => {
      listener.then((l) => l.remove());
    };
  }, []);
}
