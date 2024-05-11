import webPush from 'web-push';
import { VAPID_PRIVATE_KEY, VAPID_SUBJECT } from '$env/static/private';
import { PUBLIC_VAPID_PUBLIC_KEY } from '$env/static/public';

import type { RequestHandler } from "./$types";

webPush.setVapidDetails(VAPID_SUBJECT, PUBLIC_VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

export const POST: RequestHandler = async ({ request }) => {
  const vapidKeys = {
    publicKey: PUBLIC_VAPID_PUBLIC_KEY,
    privateKey: VAPID_PRIVATE_KEY,
    what: 'guero',
  };
  
  const { subscription, reminder, whatToRemember } = await request.json();
  console.log(subscription);
  const test = await webPush.sendNotification(subscription, whatToRemember, {
    TTL: 10000000,
  });

  console.log(test);


  return new Response(JSON.stringify(vapidKeys));
};