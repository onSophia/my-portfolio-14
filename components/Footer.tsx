
import { MapPin, Phone, Mail, Facebook, Instagram, Send } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* 1. О компании */}
                    <div>
                        <div className="text-2xl font-bold text-white mb-4">
                            SANTEH<span className="text-blue-500">KH</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-6 opacity-80">
                            Ваш надежный партнер в мире сантехники Харькова.
                            Комплектация объектов от квартиры до торгового центра.
                        </p>
                        <div className="flex gap-4">
                            {/* Ссылки на соцсети (внешние) */}
                            <a href="https://instagram.com" target="_blank" className="hover:text-blue-500 transition"><Instagram size={24} /></a>
                            <a href="https://facebook.com" target="_blank" className="hover:text-blue-500 transition"><Facebook size={24} /></a>
                            <a href="https://telegram.org" target="_blank" className="hover:text-blue-500 transition"><Send size={24} /></a>
                        </div>
                    </div>

                    {/* 2. Каталог (теперь ссылки работают через фильтры) */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Каталог</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/?category=santeh" className="hover:text-white transition">Сантехника</Link></li>
                            <li><Link href="/?category=furniture" className="hover:text-white transition">Ванны и Мебель</Link></li>
                            <li><Link href="/?category=heating" className="hover:text-white transition">Отопление и Котлы</Link></li>
                            <li><Link href="/?category=pipes" className="hover:text-white transition">Трубы и Фитинги</Link></li>
                            <li><Link href="/?q=GROHE" className="hover:text-white transition text-blue-400">Продукция GROHE</Link></li>
                        </ul>
                    </div>

                    {/* 3. Клиентам */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Клиентам</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/delivery" className="hover:text-white transition">Оплата и доставка</Link></li>
                            <li><Link href="/warranty" className="hover:text-white transition">Обмен и возврат</Link></li>
                            <li><Link href="/services" className="hover:text-white transition">Услуги установки</Link></li>
                            <li><Link href="/contacts" className="hover:text-white transition">Контакты и Карта</Link></li>
                            <li><Link href="/profile" className="hover:text-white transition">Личный кабинет</Link></li>
                        </ul>
                    </div>

                    {/* 4. Контакты */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Контакты</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin className="text-blue-500 mt-1" size={18} />
                                <span>Харьков, ул. Плехановская, 126<br />(ст. м. Завод им. Малышева)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="text-blue-500" size={18} />
                                <a href="tel:+380577500000" className="hover:text-white">(057) 750-00-00</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="text-blue-500" size={18} />
                                <a href="mailto:info@santeh.kh.ua" className="hover:text-white">info@santeh.kh.ua</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-60">
                    <p>© 2026 SantehKharkiv. Все права защищены.</p>
                    <p>Сделано с любовью</p>
                </div>
            </div>
        </footer>
    );
}