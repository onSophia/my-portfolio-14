
import Header from "@/components/Header";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Контакты</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Информация */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="text-blue-600 mt-1" size={24} />
                            <div>
                                <h3 className="font-bold text-lg">Адрес магазина</h3>
                                <p className="text-gray-600">г. Харьков, ул. Плехановская, 126</p>
                                <p className="text-sm text-gray-400">Напротив завода им. Малышева</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="text-blue-600 mt-1" size={24} />
                            <div>
                                <h3 className="font-bold text-lg">Телефоны</h3>
                                <p className="text-gray-600">(057) 750-00-00</p>
                                <p className="text-gray-600">(099) 123-45-67 (Viber/Telegram)</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Clock className="text-blue-600 mt-1" size={24} />
                            <div>
                                <h3 className="font-bold text-lg">График работы</h3>
                                <p className="text-gray-600">Пн-Пт: 09:00 - 19:00</p>
                                <p className="text-gray-600">Сб-Вс: 10:00 - 16:00</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Mail className="text-blue-600 mt-1" size={24} />
                            <div>
                                <h3 className="font-bold text-lg">Email</h3>
                                <p className="text-gray-600">info@santeh.kh.ua</p>
                                <p className="text-gray-600">director@santeh.kh.ua</p>
                            </div>
                        </div>
                    </div>

                    {/* Карта (Google Maps iframe) */}
                    <div className="bg-gray-200 rounded-2xl overflow-hidden h-full min-h-75">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2565.913507853613!2d36.27647837684654!3d49.97576567149726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a08b603842c5%3A0xc6657c9197022097!2z0LLRg9C7LiDQn9C70LXRhdCw0L3RltCy0YHRjNC60LAsIDEyNiwg0KXQsNGA0LrRltCyLCDQpdCw0YDQutGW0LLRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgNjEwMDA!5e0!3m2!1sru!2sua!4v1705500000000!5m2!1sru!2sua"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}