'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147292.profitablecpmratenetwork.com/d2/f2/9d/d2f29de27bf21ecd87f7a1cbd961572a.js", "https://pl29147295.profitablecpmratenetwork.com/d6/4f/2a/d64f2ade7b728ae392a0f2423f2b9a9a.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
