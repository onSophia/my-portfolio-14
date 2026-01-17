
"use client";

import Header from "@/components/Header";
import { useCartStore } from "@/store/cart";
import { Trash2, Plus, Minus, ArrowRight, Package, User, Truck, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CartPage() {
    const { items, addItem, removeItem, getTotalPrice, clearCart } = useCartStore();
    const router = useRouter();
    const [isOrdering, setIsOrdering] = useState(false);


    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        delivery: "uklon"
    });

    const handleOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsOrdering(true);
        setTimeout(() => {
            clearCart();
            router.push("/success");
        }, 1500);
    };

    if (!isMounted) return null;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="grow flex flex-col items-center justify-center text-center px-4">
                    <div className="bg-white p-6 rounded-full shadow-lg mb-6">
                        <Package size={64} className="text-blue-200" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Корзина пуста</h1>
                    <p className="text-gray-500 mb-8 max-w-md">В каталоге более 100 товаров для ремонта.</p>
                    <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                        Перейти в каталог
                    </Link>
                </div>
            </div>
        );
    }

    const buttonStyles = "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95";

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Оформление заказа</h1>

                <form onSubmit={handleOrder} className="grid lg:grid-cols-3 gap-8 items-start">

                    {/* ЛЕВАЯ КОЛОНКА */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* ТОВАРЫ */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="font-bold flex items-center gap-2">
                                    <Package size={20} className="text-blue-600" /> Товары
                                </h2>
                                <span className="text-sm text-gray-500">{items.length} поз.</span>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {items.map((item) => (
                                    <div key={item.id} className="p-4 flex gap-4">
                                        <div className="w-20 h-20 bg-gray-50 rounded-lg shrink-0 flex items-center justify-center">
                                            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain mix-blend-multiply" />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-medium text-slate-900 text-sm sm:text-base line-clamp-2 pr-2">
                                                    {item.title}
                                                </h3>
                                                <button type="button" onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-end mt-2">
                                                <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                                                    <button type="button" onClick={() => removeItem(item.id)} className="p-1 hover:text-blue-600">
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="font-semibold text-sm w-4 text-center">{item.quantity}</span>
                                                    <button type="button" onClick={() => addItem(item)} className="p-1 hover:text-blue-600">
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <div className="font-bold text-slate-900">
                                                    {(item.price * item.quantity).toLocaleString()} ₴
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* КОНТАКТЫ */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <User size={20} className="text-blue-600" /> Ваши данные
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Имя</label>
                                    <input required type="text" placeholder="Иван" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 ring-blue-500 outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Телефон</label>
                                    <input required type="tel" placeholder="+380..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 ring-blue-500 outline-none" />
                                </div>
                            </div>
                        </div>

                        {/* ДОСТАВКА */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <Truck size={20} className="text-blue-600" /> Доставка
                            </h2>
                            <div className="grid sm:grid-cols-3 gap-3">
                                {[
                                    { id: 'uklon', name: 'Курьер Uklon', desc: 'Харьков, 1-2 часа', price: '150 ₴' },
                                    { id: 'nova', name: 'Новая Почта', desc: 'В отделение', price: 'по тарифу' },
                                    { id: 'self', name: 'Самовывоз', desc: 'Плехановская, 126', price: '0 ₴' },
                                ].map((option) => (
                                    <label key={option.id} className={`cursor-pointer border rounded-xl p-4 flex flex-col gap-1 transition-all ${formData.delivery === option.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-blue-300'}`}>
                                        <input
                                            type="radio"
                                            name="delivery"
                                            value={option.id}
                                            className="hidden"
                                            checked={formData.delivery === option.id}
                                            onChange={(e) => setFormData({ ...formData, delivery: e.target.value })}
                                        />
                                        <span className="font-bold text-sm text-slate-900">{option.name}</span>
                                        <span className="text-xs text-gray-500">{option.desc}</span>
                                        <span className="text-xs font-bold text-blue-600 mt-auto pt-2">{option.price}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ПРАВАЯ КОЛОНКА */}
                    <div className="lg:sticky lg:top-24 space-y-4">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
                            <h2 className="text-xl font-bold mb-6">Итого</h2>

                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Товары:</span>
                                    <span className="font-medium">{getTotalPrice().toLocaleString()} ₴</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Доставка:</span>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                        {formData.delivery === 'self' ? 'Бесплатно' : 'Оплата при получении'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-6">
                                <span className="text-lg font-bold text-slate-900">К оплате:</span>
                                <span className="text-3xl font-black text-blue-600">{getTotalPrice().toLocaleString()} ₴</span>
                            </div>

                            <button
                                type="submit"
                                disabled={isOrdering}
                                className={buttonStyles}
                            >
                                {isOrdering ? 'Оформляем...' : (
                                    <>
                                        Подтвердить заказ <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="bg-slate-900 text-slate-400 p-4 rounded-xl text-xs flex items-center justify-center gap-2">
                            <CreditCard size={14} /> Оплата картой или наличными
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}