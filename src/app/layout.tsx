import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smruti Ranjan Nayak | Full Stack Developer",
  description:
    "Portfolio of Smruti Ranjan Nayak, Full Stack Developer specialized in Java, Spring Boot, React, Microservices, Cloud (AWS & GCP), and DevOps. Passionate about building scalable applications and modern web experiences.",
  icons: {
    icon: "/my-sticker.ico", // put a favicon in /public
  },
  keywords: [
    "Smruti Ranjan Nayak",
    "Full Stack Developer",
    "Java",
    "Spring Boot",
    "React",
    "Next.js",
    "Microservices",
    "Cloud",
    "AWS",
    "GCP",
    "DevOps",
    "Portfolio",
  ],
  authors: [{ name: "Smruti Ranjan Nayak" }],
  creator: "Smruti Ranjan Nayak",
  openGraph: {
    title: "Smruti Ranjan Nayak | Full Stack Developer",
    description:
      "Explore my portfolio showcasing projects, skills, and experience in full-stack development, Java, Spring Boot, React, Cloud, and DevOps.",
    url: "https://my-portfolio-gdsf.vercel.app/", // replace with actual
    siteName: "Smruti Ranjan Nayak Portfolio",
    images: [
      {
        url: "/my-sticker.png", // put a banner image in /public
        width: 1200,
        height: 630,
        alt: "Smruti Ranjan Nayak Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smruti Ranjan Nayak | Full Stack Developer",
    description:
      "Portfolio of Smruti Ranjan Nayak, specialized in Java, Spring Boot, React, Microservices, Cloud (AWS/GCP), and DevOps.",
    images: ["/my-sticker.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
