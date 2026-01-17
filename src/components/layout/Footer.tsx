import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo */}
                    <div>
                        <Image
                            src="/logo-white.png"
                            alt="Action"
                            width={160}
                            height={48}
                            className="h-12 w-auto"
                        />
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/events" className="text-gray-400 hover:text-white transition-colors">
                                    อีเว้นท์ทั้งหมด
                                </Link>
                            </li>
                            <li>
                                <Link href="/calendar" className="text-gray-400 hover:text-white transition-colors">
                                    ปฏิทินอีเว้นท์
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="text-gray-400 hover:text-white transition-colors">
                                    สมัครสมาชิก
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                                    ศูนย์ช่วยเหลือ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                                    ติดต่อเรา
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                                    คำถามที่พบบ่อย
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Follow Us</h3>
                        <div className="flex flex-wrap gap-3">
                            <a href="#" className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-white transition-colors">
                                <Facebook className="h-4 w-4 text-gray-400 hover:text-white" />
                            </a>
                            <a href="#" className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-white transition-colors">
                                <Twitter className="h-4 w-4 text-gray-400 hover:text-white" />
                            </a>
                            <a href="#" className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-white transition-colors">
                                <Instagram className="h-4 w-4 text-gray-400 hover:text-white" />
                            </a>
                        </div>
                        <div className="flex gap-3 mt-3">
                            <a href="#" className="w-8 h-8 bg-green-500 rounded flex items-center justify-center hover:bg-green-600 transition-colors">
                                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>Copyright Action Inc. สงวนลิขสิทธ์ทุกประการ</p>
                </div>
            </div>
        </footer>
    );
}
