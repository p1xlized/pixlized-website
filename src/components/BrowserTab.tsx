import { useEffect, useRef } from "react";

type UseBrowserTabOptions = {
  section: string;
};

export function useBrowserTab({ section }: UseBrowserTabOptions) {
  const faviconRef = useRef<HTMLLinkElement | null>(null);

  useEffect(() => {
    // 1. Setup the Favicon to use your logo.svg
    if (!faviconRef.current) {
      let link: HTMLLinkElement | null =
        document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      faviconRef.current = link;
    }

    // Simply point the favicon directly to your public logo
    faviconRef.current.href = "/favicon.ico";

    // 2. Setup the 10-second Title Toggle
    let isShowingAltTitle = false;

    const updateTitle = () => {
      if (isShowingAltTitle) {
        document.title = "@p1xlized";
      } else {
        document.title = `${section}`;
      }
      isShowingAltTitle = !isShowingAltTitle;
    };

    // Set the title immediately on mount
    updateTitle();

    // Toggle every 10 seconds (10000 ms)
    const titleInterval = window.setInterval(updateTitle, 10000);

    return () => {
      clearInterval(titleInterval);
    };
  }, [section]);
}
