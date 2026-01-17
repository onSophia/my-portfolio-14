
import Header from "@/components/Header";
import { Shield, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";

export default function WarrantyPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />

            <div className="container mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Гарантия и Сервис</h1>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">

                    {/* Гарантия */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                            <Shield size={32} />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Официальная гарантия</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Мы продаем только сертифицированную сантехнику. На все товары действует гарантия производителя от 1 до 10 лет. Вместе с товаром вы получаете заполненный гарантийный талон с печатью.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle size={16} className="text-green-500" /> Смесители GROHE — 5 лет
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle size={16} className="text-green-500" /> Бойлеры Atlantic — до 7 лет на бак
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle size={16} className="text-green-500" /> Керамика Cersanit — 10 лет
                            </li>
                        </ul>
                    </div>

                    {/* Возврат */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                            <RefreshCw size={32} />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Обмен и возврат 14 дней</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Согласно закону Украины «О защите прав потребителей», вы можете вернуть товар в течение 14 дней с момента покупки, если он вам не подошел.
                        </p>
                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                            <h4 className="font-bold text-orange-800 text-sm mb-2 flex items-center gap-2">
                                <AlertTriangle size={16} /> Важное условие:
                            </h4>
                            <p className="text-xs text-orange-700">
                                Товар не должен быть в употреблении. Сохранен товарный вид, упаковка, пломбы и чек. Сантехника со следами монтажа возврату не подлежит.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Что делать если сломалось */}
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">Сервисный случай?</h2>
                    <p className="text-gray-500 mb-6">
                        Если вы обнаружили брак или поломку в процессе эксплуатации, обратитесь в авторизованный сервисный центр производителя или к нам.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition">
                            Список сервисных центров
                        </button>
                        <button className="bg-white border border-gray-300 text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition">
                            Связаться с менеджером
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}