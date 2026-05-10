import "./globals.css";

export const metadata = {
  title: "AutoPostVisit",
  description: "Nurse-reviewed post-visit custom discharge videos"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
