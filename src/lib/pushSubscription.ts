import { PUBLIC_VAPID_PUBLIC_KEY } from '$env/static/public';
import { API_PATH } from "./constants";

// This function is needed because Chrome doesn't accept a base64 encoded string
// as value for applicationServerKey in pushManager.subscribe yet
// https://bugs.chromium.org/p/chromium/issues/detail?id=802280
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
 
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);
 
  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function getSubscription(): Promise<PushSubscription | null> {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    return subscription;
  }

  const encodedVapidKey = urlBase64ToUint8Array(PUBLIC_VAPID_PUBLIC_KEY);

  const newSubscription = await registration.pushManager.subscribe({
    applicationServerKey: encodedVapidKey,
    userVisibleOnly: true,
  });

  return newSubscription;
}