"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Bell, BellOff } from "lucide-react";

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

export function HeaderPushButton() {
  const [mounted, setMounted] = useState(false);
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMounted(true);

    const isSupported =
      typeof window !== "undefined" &&
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window;

    setSupported(isSupported);

    if (!isSupported) {
      return;
    }

    getRegistration()
      .then((registration) => registration?.pushManager.getSubscription())
      .then((subscription) => setEnabled(Boolean(subscription)))
      .catch(() => undefined);
  }, []);

  async function toggleNotifications() {
    if (loading) return;

    setMessage("Checking urgent alert settings...");

    if (!supported) {
      setMessage("Push alerts are not available in this browser yet.");
      return;
    }

    if (!vapidPublicKey) {
      setMessage("Push alerts need VAPID keys before they can be enabled.");
      return;
    }

    setLoading(true);
    try {
      const registration = await getRegistration();
      if (!registration) throw new Error("Service worker registration failed.");

      if (enabled) {
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          await fetch("/api/push/subscribe", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ endpoint: subscription.endpoint })
          });
          await subscription.unsubscribe();
        }
        setEnabled(false);
        setMessage("Urgent alerts are off on this device.");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setMessage("Alerts were not enabled. You can allow them later in browser settings.");
        return;
      }

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
      setMessage("Urgent academy alerts are on.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Alerts could not be updated.");
    } finally {
      setLoading(false);
    }
  }

  const toast =
    mounted && message
      ? createPortal(
          <div
            role="status"
            className="fixed right-5 top-[calc(env(safe-area-inset-top)+5.75rem)] z-[9999] w-[min(20rem,calc(100vw-2.5rem))] border border-academy-blue/40 bg-academy-black p-3 text-xs font-bold leading-5 text-academy-foreground shadow-2xl md:right-8"
          >
            {message}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={toggleNotifications}
        disabled={loading}
        aria-label={enabled ? "Turn off urgent academy alerts" : "Turn on urgent academy alerts"}
        title={enabled ? "Urgent alerts on" : "Turn on urgent alerts"}
        className="tap-spring grid size-11 place-items-center border border-academy-line/15 text-academy-foreground transition hover:border-academy-blue hover:text-academy-blue disabled:cursor-wait disabled:opacity-60"
      >
        {enabled ? <BellOff size={19} aria-hidden="true" /> : <Bell size={19} aria-hidden="true" />}
      </button>
      {toast}
    </>
  );
}
