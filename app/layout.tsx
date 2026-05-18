import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulseFit Personal",
  description: "Plataforma pessoal para perfil, treinos e evolução corporal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
