"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface Props {
  ticker: string;
}

function getWatchlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("ep_watchlist") || "[]");
  } catch {
    return [];
  }
}

export default function WatchlistHeart({ ticker }: Props) {
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    setInWatchlist(getWatchlist().includes(ticker));
  }, [ticker]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const list = getWatchlist();
    let newList: string[];
    if (list.includes(ticker)) {
      newList = list.filter((t) => t !== ticker);
    } else {
      newList = [...list, ticker];
    }
    localStorage.setItem("ep_watchlist", JSON.stringify(newList));
    setInWatchlist(newList.includes(ticker));
  };

  return (
    <button
      onClick={toggle}
      title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 6,
        borderRadius: 8,
        transition: "all 0.15s",
        display: "flex",
        alignItems: "center",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#fdf2f8"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; }}
    >
      <Heart
        size={20}
        fill={inWatchlist ? "#ec4899" : "none"}
        color={inWatchlist ? "#ec4899" : "#9ca3af"}
      />
    </button>
  );
}
