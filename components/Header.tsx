// src/components/Header.tsx
"use client";

import { ShoppingCart, Search, Menu, User } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useRouter, useSearchParams } from "next/navigation"; // Хуки для URL

export default function Header() {
    const items = useCartStore((state) => state.items);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Функция поиска
    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        // replace обновляет URL без перезагрузки страницы
        router.replace(`/?${params.toString()}`);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-sm">


            <div className="bg-slate-900 text-slate-300 text-[11px] py-2">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex gap-4">
                        <span>📍 Харьков, Плехановская 126</span>
                        <span className="hidden sm:inline">🕒 Пн-Пт: 09:00 - 19:00</span>
                    </div>
                    <div className="flex gap-4">
                        {/* ИЗМЕНЕНИЯ ЗДЕСЬ: */}
                        <Link href="/delivery" className="hover:text-white transition">Доставка и оплата</Link>
                        <Link href="/warranty" className="hover:text-white transition">Гарантия и возврат</Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-6">
                <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900 flex flex-col leading-none group">
                    <span>SANTEH</span>
                    <span className="text-blue-600 text-sm tracking-widest group-hover:tracking-[0.2em] transition-all">KHARKIV</span>
                </Link>

                {/* ПОИСК */}
                <div className="hidden md:flex flex-1 max-w-xl relative">
                    <input
                        type="text"
                        // Берем значение из URL по умолчанию
                        defaultValue={searchParams.get('q')?.toString()}
                        // При вводе меняем URL
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Поиск: 'бойлер', 'смеситель'..."
                        className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-5 pr-12 text-sm focus:ring-2 ring-blue-500/50 outline-none transition-all"
                    />
                    <button className="absolute right-2 top-1.5 bg-white p-1.5 rounded-full text-blue-600 shadow-sm hover:scale-105 transition">
                        <Search size={18} />
                    </button>
                </div>

                <div className="flex items-center gap-2 lg:gap-6">
                    <div className="h-8 w-px bg-gray-200 hidden lg:block"></div>

                    {/* Ссылка на Профиль */}
                    <Link href="/profile" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-600 hidden sm:block" title="Личный кабинет">
                        <User size={24} />
                    </Link>

                    <Link href="/cart" className="relative p-2 hover:bg-slate-100 rounded-full transition text-slate-900 group">
                        <ShoppingCart size={24} />
                        {items.length > 0 && (
                            <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white transform group-hover:scale-110 transition">
                                {items.length}
                            </span>
                        )}
                    </Link>

                    <button className="md:hidden p-2 text-slate-900">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
}

// В src/components/Header.tsx

// ... (импорты и начало компонента)

{/* Верхняя полоска (Top Bar) */ }


// ... (остальной код хедера без изменений)