// src/app/profile/page.tsx
"use client";

import Header from "@/components/Header";
import { useUserStore } from "@/store/user";
import { User, Package, MapPin, Save, CreditCard, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const { user, updateUser } = useUserStore();
    const [activeTab, setActiveTab] = useState<'settings' | 'orders'>('settings');
    const [isSaved, setIsSaved] = useState(false);

    // Локальное состояние формы
    const [formData, setFormData] = useState(user);

    // Синхронизация при загрузке
    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />

            <div className="container mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Личный кабинет</h1>

                <div className="grid lg:grid-cols-4 gap-8">

                    {/* БОКОВОЕ МЕНЮ */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{user.name}</div>
                                    <div className="text-xs text-gray-500">{user.email}</div>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <User size={18} /> Мои данные
                                </button>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <Package size={18} /> История заказов
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all mt-4 border-t border-gray-100">
                                    <LogOut size={18} /> Выйти
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* ОСНОВНОЙ КОНТЕНТ */}
                    <div className="lg:col-span-3">

                        {/* ВКЛАДКА: НАСТРОЙКИ */}
                        {activeTab === 'settings' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <User className="text-blue-600" /> Редактировать профиль
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Имя</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 ring-blue-500 outline-none transition"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 ring-blue-500 outline-none transition"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Телефон</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 ring-blue-500 outline-none transition"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Город</label>
                                            <input
                                                type="text"
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 ring-blue-500 outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Адрес доставки (по умолчанию)</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                placeholder="Улица, дом, квартира"
                                                className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 ring-blue-500 outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className={`px-8 py-3 rounded-xl font-bold text-white transition-all flex items-center gap-2 ${isSaved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                                    >
                                        {isSaved ? 'Сохранено!' : (
                                            <>
                                                <Save size={18} /> Сохранить изменения
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* ВКЛАДКА: ИСТОРИЯ ЗАКАЗОВ */}
                        {activeTab === 'orders' && (
                            <div className="space-y-4">
                                {[1, 2].map((order) => (
                                    <div key={order} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-bold text-lg">Заказ #{8390 + order}</span>
                                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">Выполнен</span>
                                            </div>
                                            <p className="text-sm text-gray-500">15 января 2026 • 3 товара</p>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="font-bold text-xl">4 500 ₴</div>
                                            <button className="text-blue-600 font-medium hover:underline text-sm">
                                                Детали
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}