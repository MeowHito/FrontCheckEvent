import type { Metadata } from "next";
import { Noto_Sans_Thai, Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CheckEvent - ค้นหาและลงทะเบียนกิจกรรมวิ่ง",
  description: "แพลตฟอร์มสำหรับค้นหาและลงทะเบียนกิจกรรมวิ่งทั่วประเทศไทย",
  keywords: ["วิ่ง", "running", "marathon", "5K", "10K", "event", "กิจกรรม"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${geist.variable} ${notoSansThai.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
