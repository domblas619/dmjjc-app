import webPush from "web-push";
import { getPushSubscriptions, removePushSubscription } from "@/lib/push/store";
import type { PushPayload, StoredPushSubscription } from "@/lib/push/types";

const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;
const subject = process.env.VAPID_SUBJECT || "mailto:info@delmarjiujitsuclub.com";

export const hasPushKeys = Boolean(publicKey && privateKey);

if (hasPushKeys) {
  webPush.setVapidDetails(subject, publicKey as string, privateKey as string);
}

function toWebPushSubscription(subscription: StoredPushSubscription): webPush.PushSubscription {
  return {
    endpoint: subscription.endpoint,
    expirationTime: subscription.expirationTime,
    keys: subscription.keys
  };
}

export async function sendPushToAll(payload: PushPayload) {
  if (!hasPushKeys) {
    return { sent: 0, failed: 0, skipped: true, reason: "Push VAPID keys are not configured." };
  }

  const subscriptions = await getPushSubscriptions();
  let sent = 0;
  let failed = 0;

  await Promise.all(
    subscriptions.map(async (subscription) => {
      try {
        await webPush.sendNotification(
          toWebPushSubscription(subscription),
          JSON.stringify({
            title: payload.title,
            body: payload.body,
            url: payload.url || "/",
            tag: payload.tag || "dmjjc-update"
          })
        );
        sent += 1;
      } catch (error) {
        failed += 1;
        const statusCode = typeof error === "object" && error && "statusCode" in error ? error.statusCode : undefined;
        if (statusCode === 404 || statusCode === 410) {
          await removePushSubscription(subscription.endpoint);
        }
      }
    })
  );

  return { sent, failed, skipped: false };
}
