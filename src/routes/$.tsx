// src/routes/$.tsx
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  // 💡 Instantly throw the notFound exception when this route is matched
  loader: () => {
    throw notFound();
  },
});
