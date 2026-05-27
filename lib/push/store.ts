import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";
import type { StoredPushSubscription } from "@/lib/push/types";

const endpointSetKey = "dmjjc:push:endpoints";
const subscriptionKeyPrefix = "dmjjc:push:subscription:";
const reminderKeyPrefix = "dmjjc:push:reminder:";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.UPSTASH_REDIS_KV_REST_API_TOKEN;

export const hasPushStorage = Boolean(redisUrl && redisToken);

const redis = hasPushStorage
  ? new Redis({
      url: redisUrl as string,
      token: redisToken as string
    })
  : null;

function endpointId(endpoint: string) {
  return createHash("sha256").update(endpoint).digest("hex");
}

function subscriptionKey(endpoint: string) {
  return `${subscriptionKeyPrefix}${endpointId(endpoint)}`;
}

export async function savePushSubscription(subscription: StoredPushSubscription) {
  if (!redis) throw new Error("Push subscription storage is not configured.");
  const id = endpointId(subscription.endpoint);
  await Promise.all([
    redis.sadd(endpointSetKey, id),
    redis.set(`${subscriptionKeyPrefix}${id}`, subscription)
  ]);
}

export async function removePushSubscription(endpoint: string) {
  if (!redis) return;
  const id = endpointId(endpoint);
  await Promise.all([
    redis.srem(endpointSetKey, id),
    redis.del(subscriptionKey(endpoint))
  ]);
}

export async function getPushSubscriptions() {
  if (!redis) return [];
  const ids = await redis.smembers<string[]>(endpointSetKey);
  const subscriptions = await Promise.all(
    ids.map((id) => redis.get<StoredPushSubscription>(`${subscriptionKeyPrefix}${id}`))
  );
  return subscriptions.filter(Boolean) as StoredPushSubscription[];
}

export async function getPushSubscriptionCount() {
  if (!redis) return 0;
  return redis.scard(endpointSetKey);
}

export async function claimReminderSend(reminderId: string) {
  if (!redis) return { claimed: false, reason: "Push reminder storage is not configured." };

  const key = `${reminderKeyPrefix}${reminderId}`;
  const result = await redis.set(key, new Date().toISOString(), {
    nx: true,
    ex: 60 * 60 * 24 * 45
  });

  return { claimed: result === "OK" };
}
