import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-green-100 p-6 rounded-full mb-6 animate-bounce">
                <CheckCircle size={64} className="text-green-600" />
            </div>

            <h1 className="text-3xl font-bold mb-2">Заказ успешно принят!</h1>
            <p className="text-gray-500 max-w-md mb-8">
                Менеджер свяжется с вами в течение 10 минут для подтверждения.
                Номер вашего заказа: <span className="font-bold text-black">#8392</span>
            </p>

            <Link href="/" className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition">
                Вернуться в магазин
            </Link>
        </div>
    );
}