import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import appCss from "../styles.css?url";

import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer";
import NotFound from "@/components/NotFound";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "@p1xlized" },
      { favicon: "/logo.svg" },
    ],
    links: [
      { rel: "preload", href: appCss, as: "style" },
      { rel: "stylesheet", href: appCss },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: () => <NotFound />,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background">
        <Navbar />
        <Footer />
        {children}

        {/*<TanStackDevtools
          config={{ position: "bottom-left" }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />*/}
        <Scripts />
      </body>
    </html>
  );
}
