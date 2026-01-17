// src/app/delivery/page.tsx
import Header from "@/components/Header";
import { Truck, MapPin, Clock, CreditCard, Wallet, Building } from "lucide-react";

export default function DeliveryPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />

            <div className="container mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Доставка и Оплата</h1>

                {/* БЛОК ДОСТАВКИ */}
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Truck className="text-blue-600" /> Способы доставки
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {/* Способ 1 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                            <Truck size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Экспресс по Харькову</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Доставка курьером Uklon Delivery прямо до подъезда. Отправляем в течение 30 минут после подтверждения заказа.
                        </p>
                        <div className="text-sm font-bold text-slate-900">Стоимость: ~150-200 грн</div>
                    </div>

                    {/* Способ 2 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                            <Building size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Новая Почта</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Отправка по всей Украине. В отделение или почтомат. Заказы до 15:00 уезжают в тот же день.
                        </p>
                        <div className="text-sm font-bold text-slate-900">По тарифам перевозчика</div>
                    </div>

                    {/* Способ 3 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                            <MapPin size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Самовывоз</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Бесплатно из нашего магазина. Поможем загрузить тяжелый товар в машину.
                        </p>
                        <div className="text-sm font-bold text-slate-900">ул. Плехановская, 126</div>
                    </div>
                </div>

                {/* БЛОК ОПЛАТЫ */}
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Wallet className="text-blue-600" /> Способы оплаты
                </h2>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                            <CreditCard className="text-gray-400 shrink-0" size={32} />
                            <div>
                                <h3 className="font-bold mb-1">Оплата на сайте</h3>
                                <p className="text-sm text-gray-500">
                                    Google Pay, Apple Pay или картой Visa/Mastercard без комиссии.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Wallet className="text-gray-400 shrink-0" size={32} />
                            <div>
                                <h3 className="font-bold mb-1">Оплата при получении</h3>
                                <p className="text-sm text-gray-500">
                                    Наложенный платеж на Новой Почте или наличными курьеру/в магазине.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Building className="text-gray-400 shrink-0" size={32} />
                            <div>
                                <h3 className="font-bold mb-1">Безналичный расчет (с НДС)</h3>
                                <p className="text-sm text-gray-500">
                                    Для юридических лиц и ФОП. Выставляем счет-фактуру.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Clock className="text-gray-400 shrink-0" size={32} />
                            <div>
                                <h3 className="font-bold mb-1">Оплата частями</h3>
                                <p className="text-sm text-gray-500">
                                    ПриватБанк и Monobank. До 4 платежей без переплат.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}