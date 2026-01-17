// src/app/services/page.tsx
import Header from "@/components/Header";
import { Wrench, CheckCircle } from "lucide-react";

export default function ServicesPage() {
    const services = [
        { title: "Установка бойлера", price: "от 800 грн", desc: "Монтаж на стену, подключение к воде и электричеству." },
        { title: "Монтаж унитаза", price: "от 600 грн", desc: "Демонтаж старого, установка нового, герметизация." },
        { title: "Замена смесителя", price: "от 300 грн", desc: "На кухне или в ванной. Сборка и подключение." },
        { title: "Монтаж ванны", price: "от 1200 грн", desc: "Установка ножек, сифона, крепление к стене." },
        { title: "Разводка труб (точка)", price: "от 400 грн", desc: "Пайка полипропилена, штробление стен." },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Услуги сантехника</h1>

                <div className="bg-blue-600 text-white p-8 rounded-2xl mb-8">
                    <h2 className="text-2xl font-bold mb-2">Нужен мастер?</h2>
                    <p className="mb-6 opacity-90">Наши специалисты имеют опыт от 5 лет. Гарантия на работы — 1 год.</p>
                    <a href="tel:+380577500000" className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition">
                        Вызвать мастера
                    </a>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <Wrench className="text-blue-600 mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                            <p className="text-gray-500 text-sm mb-4">{s.desc}</p>
                            <div className="text-xl font-bold text-slate-900">{s.price}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}