import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "StudySync — Your academic life, in sync",
  description: "An intelligent academic planner that turns deadlines into a clear study plan."
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}