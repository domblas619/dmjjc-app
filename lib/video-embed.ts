function youtubeEmbedUrl(url: URL) {
  const host = url.hostname.replace(/^www\./, "");
  let videoId = "";

  if (host === "youtu.be") {
    videoId = url.pathname.split("/").filter(Boolean)[0] || "";
  }

  if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
    if (url.pathname === "/watch") {
      videoId = url.searchParams.get("v") || "";
    } else if (url.pathname.startsWith("/shorts/") || url.pathname.startsWith("/embed/")) {
      videoId = url.pathname.split("/").filter(Boolean)[1] || "";
    } else if (url.pathname.startsWith("/live/")) {
      videoId = url.pathname.split("/").filter(Boolean)[1] || "";
    }
  }

  if (!videoId) return null;

  const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
  const start = url.searchParams.get("t") || url.searchParams.get("start");
  if (start) embedUrl.searchParams.set("start", start.replace(/\D/g, ""));

  return embedUrl.toString();
}

export function getEmbeddableVideoUrl(value: string) {
  try {
    const url = new URL(value);
    const youtubeUrl = youtubeEmbedUrl(url);
    return youtubeUrl || value;
  } catch {
    return value;
  }
}

export function truncateText(value: string, maxLength = 150) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim().replace(/[.,;:!?-]+$/, "")}...`;
}
