import { ShoppingCart, Check, Clock } from "lucide-react";
import { useCartStore } from "@/store/cart";

interface ProductProps {
    id: number;
    title: string;
    price: number;
    oldPrice?: number; // Новое поле
    image: string;
    inStock: boolean;
}

export default function ProductCard(props: ProductProps) {
    const { addItem } = useCartStore();

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col hover:shadow-xl transition-all duration-300 group relative">

            {/* Скидка (бэйдж) */}
            {props.oldPrice && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                    - {Math.round((1 - props.price / props.oldPrice) * 100)}%
                </span>
            )}

            <div className="h-48 mb-4 flex items-center justify-center overflow-hidden relative">
                <img
                    src={props.image}
                    alt={props.title}
                    className="h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="flex-grow">
                <div className="text-xs text-gray-400 mb-1">Код: {1000 + props.id}</div>
                <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {props.title}
                </h3>

                {props.inStock ? (
                    <div className="flex items-center gap-1 text-xs text-green-600 font-medium mb-3">
                        <Check size={12} /> В наличии
                    </div>
                ) : (
                    <div className="flex items-center gap-1 text-xs text-gray-400 font-medium mb-3">
                        <Clock size={12} /> Под заказ
                    </div>
                )}
            </div>

            <div className="flex items-end justify-between mt-auto">
                <div>
                    {props.oldPrice && (
                        <div className="text-xs text-gray-400 line-through">{props.oldPrice.toLocaleString()} ₴</div>
                    )}
                    <div className="text-xl font-bold text-slate-900">{props.price.toLocaleString()} ₴</div>
                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault(); // Чтобы не переходило по ссылке при клике на кнопку
                        addItem({ id: props.id, title: props.title, price: props.price, image: props.image });
                    }}
                    className="bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white p-2.5 rounded-xl transition-all active:scale-95"
                >
                    <ShoppingCart size={20} />
                </button>
            </div>
        </div>
    );
}