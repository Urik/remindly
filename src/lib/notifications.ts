import { NotificationsBlockedError } from "./errors";

async function allowNotifications(): Promise<void> {
  const permission: 'granted' | 'denied' | 'default' = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new NotificationsBlockedError();
  }
}