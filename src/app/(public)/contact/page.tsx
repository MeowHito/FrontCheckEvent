'use client';

import dynamic from 'next/dynamic';
import { Mail, Phone, MapPin, Send, MessageSquare, Users, Zap, ChevronDown } from 'lucide-react';
import { Button, Input, Card } from '@/components/ui';

// Dynamic import scrollytelling to avoid SSR issues with GSAP
const ScrollytellingRoot = dynamic(
    () => import('@bsmnt/scrollytelling').then((mod) => mod.Root),
    { ssr: false }
);
const ScrollytellingAnimation = dynamic(
    () => import('@bsmnt/scrollytelling').then((mod) => mod.Animation),
    { ssr: false }
);

function ContactContent() {
    return (
        <div className="bg-[#f5f5f5]">
            {/* Hero Section */}
            <ScrollytellingRoot start="top top" end="bottom top">
                <section className="h-[100vh] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <ScrollytellingAnimation
                            tween={{
                                start: 0,
                                end: 100,
                                fromTo: [
                                    { scale: 1, opacity: 0.05 },
                                    { scale: 1.5, opacity: 0 },
                                ],
                            }}
                        >
                            <span className="text-[20vw] font-black text-black select-none">
                                CONTACT
                            </span>
                        </ScrollytellingAnimation>
                    </div>

                    <div className="relative z-10 text-center">
                        <ScrollytellingAnimation
                            tween={{
                                start: 0,
                                end: 80,
                                fromTo: [
                                    { y: 0, opacity: 1 },
                                    { y: -150, opacity: 0 },
                                ],
                            }}
                        >
                            <div>
                                <h1 className="text-5xl md:text-7xl font-bold text-black mb-6">
                                    ติดต่อเรา
                                </h1>
                                <p className="text-xl text-gray-600 max-w-xl mx-auto">
                                    เราพร้อมรับฟังและให้บริการคุณ
                                </p>
                            </div>
                        </ScrollytellingAnimation>
                    </div>

                    <ScrollytellingAnimation
                        tween={{
                            start: 0,
                            end: 50,
                            fromTo: [
                                { opacity: 1 },
                                { opacity: 0 },
                            ],
                        }}
                    >
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-500">
                            <span className="text-sm mb-2">เลื่อนลง</span>
                            <ChevronDown className="h-6 w-6 animate-bounce" />
                        </div>
                    </ScrollytellingAnimation>
                </section>
            </ScrollytellingRoot>

            {/* Features Section */}
            <ScrollytellingRoot start="top bottom" end="bottom top">
                <section className="min-h-screen bg-black text-white py-32">
                    <div className="max-w-6xl mx-auto px-4">
                        <ScrollytellingAnimation
                            tween={{
                                start: 0,
                                end: 30,
                                fromTo: [
                                    { y: 50, opacity: 0 },
                                    { y: 0, opacity: 1 },
                                ],
                            }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
                                ทำไมต้องติดต่อเรา?
                            </h2>
                        </ScrollytellingAnimation>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <ScrollytellingAnimation
                                tween={{
                                    start: 10,
                                    end: 40,
                                    fromTo: [
                                        { y: 80, opacity: 0 },
                                        { y: 0, opacity: 1 },
                                    ],
                                }}
                            >
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto mb-8 bg-white rounded-3xl flex items-center justify-center transform hover:scale-110 transition-transform">
                                        <Zap className="h-12 w-12 text-black" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">ตอบกลับรวดเร็ว</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        ทีมงานพร้อมตอบกลับทุกข้อสงสัยภายใน 24 ชั่วโมง
                                    </p>
                                </div>
                            </ScrollytellingAnimation>

                            <ScrollytellingAnimation
                                tween={{
                                    start: 20,
                                    end: 50,
                                    fromTo: [
                                        { y: 80, opacity: 0 },
                                        { y: 0, opacity: 1 },
                                    ],
                                }}
                            >
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto mb-8 bg-white rounded-3xl flex items-center justify-center transform hover:scale-110 transition-transform">
                                        <Users className="h-12 w-12 text-black" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">ทีมมืออาชีพ</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        ผู้เชี่ยวชาญด้านการจัดกิจกรรมพร้อมให้คำปรึกษา
                                    </p>
                                </div>
                            </ScrollytellingAnimation>

                            <ScrollytellingAnimation
                                tween={{
                                    start: 30,
                                    end: 60,
                                    fromTo: [
                                        { y: 80, opacity: 0 },
                                        { y: 0, opacity: 1 },
                                    ],
                                }}
                            >
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto mb-8 bg-white rounded-3xl flex items-center justify-center transform hover:scale-110 transition-transform">
                                        <MessageSquare className="h-12 w-12 text-black" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">หลากหลายช่องทาง</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        ติดต่อได้ทั้ง Email, โทรศัพท์ หรือ Social Media
                                    </p>
                                </div>
                            </ScrollytellingAnimation>
                        </div>
                    </div>
                </section>
            </ScrollytellingRoot>

            {/* Contact Info & Form Section */}
            <ScrollytellingRoot start="top bottom" end="bottom top">
                <section className="min-h-screen bg-white py-32">
                    <div className="max-w-6xl mx-auto px-4">
                        <ScrollytellingAnimation
                            tween={{
                                start: 0,
                                end: 20,
                                fromTo: [
                                    { y: 50, opacity: 0 },
                                    { y: 0, opacity: 1 },
                                ],
                            }}
                        >
                            <div className="text-center mb-20">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                    ช่องทางติดต่อ
                                </h2>
                                <p className="text-gray-500 max-w-2xl mx-auto">
                                    เลือกช่องทางที่สะดวกสำหรับคุณ หรือส่งข้อความผ่านแบบฟอร์มด้านล่าง
                                </p>
                            </div>
                        </ScrollytellingAnimation>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Contact Cards */}
                            <div className="space-y-6">
                                <ScrollytellingAnimation
                                    tween={{
                                        start: 10,
                                        end: 35,
                                        fromTo: [
                                            { x: -80, opacity: 0 },
                                            { x: 0, opacity: 1 },
                                        ],
                                    }}
                                >
                                    <Card className="p-6 flex items-center gap-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-black">
                                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <Mail className="h-7 w-7 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">อีเมล</p>
                                            <p className="text-xl font-semibold">test@action.in.th</p>
                                        </div>
                                    </Card>
                                </ScrollytellingAnimation>

                                <ScrollytellingAnimation
                                    tween={{
                                        start: 15,
                                        end: 40,
                                        fromTo: [
                                            { x: -80, opacity: 0 },
                                            { x: 0, opacity: 1 },
                                        ],
                                    }}
                                >
                                    <Card className="p-6 flex items-center gap-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-black">
                                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <Phone className="h-7 w-7 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">โทรศัพท์</p>
                                            <p className="text-xl font-semibold">0999999999</p>
                                        </div>
                                    </Card>
                                </ScrollytellingAnimation>

                                <ScrollytellingAnimation
                                    tween={{
                                        start: 20,
                                        end: 45,
                                        fromTo: [
                                            { x: -80, opacity: 0 },
                                            { x: 0, opacity: 1 },
                                        ],
                                    }}
                                >
                                    <Card className="p-6 flex items-center gap-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-black">
                                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <MapPin className="h-7 w-7 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">ที่อยู่</p>
                                            <p className="text-xl font-semibold">กรุงเทพมหานคร, ประเทศไทย</p>
                                        </div>
                                    </Card>
                                </ScrollytellingAnimation>

                                {/* Social Links */}
                                <ScrollytellingAnimation
                                    tween={{
                                        start: 25,
                                        end: 50,
                                        fromTo: [
                                            { y: 30, opacity: 0 },
                                            { y: 0, opacity: 1 },
                                        ],
                                    }}
                                >
                                    <div className="pt-6">
                                        <p className="text-sm text-gray-500 mb-4">ติดตามเรา</p>
                                        <div className="flex gap-4">
                                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-black hover:text-white hover:border-black transition-all">
                                                Facebook
                                            </button>
                                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-black hover:text-white hover:border-black transition-all">
                                                Twitter
                                            </button>
                                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-black hover:text-white hover:border-black transition-all">
                                                Instagram
                                            </button>
                                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-black hover:text-white hover:border-black transition-all">
                                                Line
                                            </button>
                                        </div>
                                    </div>
                                </ScrollytellingAnimation>
                            </div>

                            {/* Contact Form */}
                            <ScrollytellingAnimation
                                tween={{
                                    start: 10,
                                    end: 40,
                                    fromTo: [
                                        { x: 80, opacity: 0 },
                                        { x: 0, opacity: 1 },
                                    ],
                                }}
                            >
                                <Card className="p-8 shadow-lg">
                                    <h3 className="text-2xl font-bold mb-6">ส่งข้อความถึงเรา</h3>
                                    <form className="space-y-5">
                                        <Input label="ชื่อ-นามสกุล" placeholder="กรุณากรอกชื่อของคุณ" />
                                        <Input label="อีเมล" type="email" placeholder="กรุณากรอกอีเมลของคุณ" />
                                        <Input label="เบอร์โทรศัพท์" placeholder="กรุณากรอกเบอร์โทรศัพท์ของคุณ" />
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                ข้อความ
                                            </label>
                                            <textarea
                                                rows={4}
                                                placeholder="เขียนข้อความของคุณที่นี่..."
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                                            />
                                        </div>
                                        <Button className="w-full" size="lg">
                                            <Send className="h-4 w-4 mr-2" />
                                            ส่งข้อความ
                                        </Button>
                                    </form>
                                </Card>
                            </ScrollytellingAnimation>
                        </div>
                    </div>
                </section>
            </ScrollytellingRoot>

            {/* Final CTA Section */}
            <ScrollytellingRoot start="top bottom" end="bottom bottom">
                <section className="h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <ScrollytellingAnimation
                            tween={{
                                start: 0,
                                end: 100,
                                fromTo: [
                                    { scale: 0.5, opacity: 0 },
                                    { scale: 1, opacity: 0.03 },
                                ],
                            }}
                        >
                            <span className="text-[50vw] font-black">?</span>
                        </ScrollytellingAnimation>
                    </div>

                    <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
                        <ScrollytellingAnimation
                            tween={{
                                start: 20,
                                end: 60,
                                fromTo: [
                                    { y: 100, opacity: 0 },
                                    { y: 0, opacity: 1 },
                                ],
                            }}
                        >
                            <h2 className="text-4xl md:text-6xl font-bold mb-6">
                                มีคำถามเพิ่มเติม?
                            </h2>
                        </ScrollytellingAnimation>

                        <ScrollytellingAnimation
                            tween={{
                                start: 30,
                                end: 70,
                                fromTo: [
                                    { y: 50, opacity: 0 },
                                    { y: 0, opacity: 1 },
                                ],
                            }}
                        >
                            <p className="text-xl text-gray-400 mb-10">
                                ไม่ต้องลังเล ทีมงานพร้อมช่วยเหลือคุณตลอด 24 ชั่วโมง
                            </p>
                        </ScrollytellingAnimation>

                        <ScrollytellingAnimation
                            tween={{
                                start: 40,
                                end: 80,
                                fromTo: [
                                    { y: 30, opacity: 0 },
                                    { y: 0, opacity: 1 },
                                ],
                            }}
                        >
                            <div className="flex flex-wrap justify-center gap-4 ">
                                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                                    <Mail className="h-5 w-5 mr-2 text-black" />
                                    ส่งอีเมล
                                </Button>
                                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                                    <Phone className="h-5 w-5 mr-2" />
                                    โทรหาเรา
                                </Button>
                            </div>
                        </ScrollytellingAnimation>
                    </div>
                </section>
            </ScrollytellingRoot>
        </div>
    );
}

export default function ContactPage() {
    return <ContactContent />;
}
