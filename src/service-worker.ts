/// <reference lib="webworker" />
export default null
declare let self: ServiceWorkerGlobalScope

self.addEventListener('push', async (event) => {
  const payload = event.data ? event.data.text() : 'no payload';
  console.log('push received');
  console.log(payload);

  // Keep the service worker alive until the notification is created.
  await event.waitUntil(
    // Show a notification with title 'ServiceWorker Cookbook' and use the payload
    // as the body.
    self.registration.showNotification('Rememberly', {
      body: payload,
    })
  );

});
