import "./globals.css";
import { FavoritesProvider } from "../context/FavoritesContext";

export const metadata = {
  title: "JuzzWatch",
  description: "Discover and search your favorite movies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
