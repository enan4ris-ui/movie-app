import "./global.css";
import { FooterContent } from "@/app/_components/FooterContent";

export const metadata = {
  title: "Movie Z",
  description: "Movie discovery app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">
          {children}
          </main>
          <FooterContent />
        </div>
      </body>
    </html>
  );
}
