"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { Badge } from "@/components/badge";

const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = `${base64String}${padding}`.replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

async function getRegistration() {
  if (!("serviceWorker" in navigator)) return null;
  const registration = await navigator.serviceWorker.register("/sw.js");
  await navigator.serviceWorker.ready;
  return registration;
}

export function PushNotificationCard() {
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Get notified about closures, modified schedules, and urgent academy updates.");

  useEffect(() => {
    const isSupported =
      typeof window !== "undefined" &&
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window;

    setSupported(isSupported);

    if (!isSupported) {
      setMessage("Push notifications are not available in this browser. On iPhone, add the app to your Home Screen first.");
      return;
    }

    getRegistration()
      .then((registration) => registration?.pushManager.getSubscription())
      .then((subscription) => setEnabled(Boolean(subscription)))
      .catch(() => setMessage("Notifications are available, but setup could not be checked yet."));
  }, []);

  async function enableNotifications() {
    if (!supported || !vapidPublicKey) {
      setMessage("Push notifications need VAPID keys before they can be enabled.");
      return;
    }

    setLoading(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setMessage("Notifications were not enabled. You can allow them later in your browser settings.");
        return;
      }

      const registration = await getRegistration();
      if (!registration) throw new Error("Service worker registration failed.");

      const subscription =
        (await registration.pushManager.getSubscription()) ||
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
        }));

      const response = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Subscription could not be saved.");
      }

      setEnabled(true);
      setMessage("Notifications are on for urgent Del Mar Jiu-Jitsu Club updates.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Notifications could not be enabled.");
    } finally {
      setLoading(false);
    }
  }

  async function disableNotifications() {
    setLoading(true);
    try {
      const registration = await getRegistration();
      const subscription = await registration?.pushManager.getSubscription();

      if (subscription) {
        await fetch("/api/push/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: subscription.endpoint })
        });
        await subscription.unsubscribe();
      }

      setEnabled(false);
      setMessage("Notifications are off on this device.");
    } catch {
      setMessage("Notifications could not be turned off from here. Check your browser settings.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border border-academy-line/10 bg-academy-panel p-5">
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={enabled ? "green" : "blue"}>{enabled ? "Notifications On" : "Push Alerts"}</Badge>
            {!vapidPublicKey && <Badge tone="amber">Setup Needed</Badge>}
          </div>
          <h2 className="mt-4 font-display text-2xl font-black uppercase leading-none text-academy-foreground sm:text-3xl">
            Urgent Academy Alerts
          </h2>
          <p className="mt-3 text-base font-medium leading-7 text-academy-mist">{message}</p>
        </div>
        <button
          type="button"
          onClick={enabled ? disableNotifications : enableNotifications}
          disabled={loading || !supported}
          className="inline-flex min-h-12 items-center justify-center gap-2 border border-academy-blue bg-academy-blue px-5 text-sm font-black uppercase tracking-[.12em] text-[#05080c] transition hover:bg-transparent hover:text-academy-blue disabled:cursor-not-allowed disabled:border-academy-line/20 disabled:bg-transparent disabled:text-academy-muted"
        >
          {enabled ? <BellOff size={18} aria-hidden="true" /> : <Bell size={18} aria-hidden="true" />}
          {loading ? "Working" : enabled ? "Turn Off" : "Enable Alerts"}
        </button>
      </div>
    </section>
  );
}
