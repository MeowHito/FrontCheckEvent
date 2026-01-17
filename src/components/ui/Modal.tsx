'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
                if (e.target === overlayRef.current) onClose();
            }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className={cn(
                    'relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto',
                    'animate-in fade-in-0 zoom-in-95 duration-200',
                    className
                )}
            >
                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                )}

                {/* Content */}
                <div className={cn(!title && 'pt-6', 'p-6')}>
                    {!title && (
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
}
