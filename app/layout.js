import "./globals.css";
import Providers from "./Providers";

export const metadata = {
  title: "JuzzWatch",
  description: "Discover and search your favorite movies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}