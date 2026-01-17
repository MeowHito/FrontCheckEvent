import { Navbar, Footer } from '@/components/layout';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16 bg-gray-50">
                {children}
            </main>
            <Footer />
        </div>
    );
}
