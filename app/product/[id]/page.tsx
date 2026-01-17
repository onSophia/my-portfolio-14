
"use client";

import { use, useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useCartStore } from "@/store/cart";
import { useFavoritesStore } from "@/store/favorites";
import { products } from "@/lib/data";
import {
    Check, Truck, Shield, ArrowLeft, Star, Heart, Share2,
    CreditCard, RotateCcw, Copy
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const productId = Number(resolvedParams.id);


    const { addItem } = useCartStore();
    const { toggleFavorite, items: favoriteItems } = useFavoritesStore();


    const [isAdded, setIsAdded] = useState(false);
    const [isShared, setIsShared] = useState(false);


    const [isFav, setIsFav] = useState(false);
    useEffect(() => {
        setIsFav(favoriteItems.some(i => i.id === productId));
    }, [favoriteItems, productId]);

    const product = products.find((p) => p.id === productId);

    if (!product) return notFound();

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);


    const handleAddToCart = () => {
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };


    const handleShare = async () => {
        const shareData = {
            title: product.title,
            text: `Смотри, что я нашел в SantehKharkiv: ${product.title}`,
            url: window.location.href,
        };


        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log("Отмена шаринга");
            }
        } else {

            navigator.clipboard.writeText(window.location.href);
            setIsShared(true);
            setTimeout(() => setIsShared(false), 2000);
        }
    };


    const handleFavorite = () => {
        toggleFavorite({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />

            {/* ХЛЕБНЫЕ КРОШКИ */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
                    <Link href="/" className="hover:text-blue-600">Главная</Link>
                    <span className="mx-2">/</span>
                    <Link href={`/?category=${product.category}`} className="hover:text-blue-600 capitalize">
                        {product.category === 'santeh' ? 'Сантехника' :
                            product.category === 'heating' ? 'Отопление' :
                                product.category === 'furniture' ? 'Мебель' : 'Инженерка'}
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium truncate">{product.title}</span>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* ФОТО */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 sticky top-24">
                            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                                {product.oldPrice && (
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
                                )}
                                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">TOP</span>
                            </div>

                            <div className="aspect-square flex items-center justify-center overflow-hidden mb-4 relative">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ИНФО */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <div className="flex text-yellow-400">
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" className="text-gray-300" />
                                </div>
                                <span>Код: {10000 + product.id}</span>
                                {product.inStock ? (
                                    <span className="text-green-600 flex items-center gap-1 font-medium bg-green-50 px-2 py-0.5 rounded">
                                        <Check size={14} /> В наличии
                                    </span>
                                ) : (
                                    <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Под заказ</span>
                                )}
                            </div>
                        </div>

                        {/* Характеристики */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Характеристики</h3>
                            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden text-sm">
                                {product.specs.map((spec, idx) => (
                                    <div key={idx} className="grid grid-cols-2 p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                        <span className="text-gray-500">{spec.label}</span>
                                        <span className="font-medium text-slate-900">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Описание */}
                        <div>
                            <h3 className="font-bold text-lg mb-2">Описание</h3>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* КУПИТЬ И КНОПКИ ДЕЙСТВИЯ */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 sticky top-24">

                            <div className="mb-6">
                                {product.oldPrice && (
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-gray-400 line-through text-lg">{product.oldPrice.toLocaleString()} ₴</span>
                                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                                            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                                        </span>
                                    </div>
                                )}
                                <div className="text-4xl font-bold text-slate-900">
                                    {product.price.toLocaleString()} <span className="text-2xl font-medium text-gray-500">₴</span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <button
                                    onClick={handleAddToCart}
                                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${isAdded ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                                        }`}
                                >
                                    {isAdded ? (
                                        <> <Check size={20} /> Добавлено </>
                                    ) : (
                                        <> <CreditCard size={20} /> Купить сейчас </>
                                    )}
                                </button>

                                <div className="grid grid-cols-2 gap-2">
                                    {/* КНОПКА ИЗБРАННОЕ */}
                                    <button
                                        onClick={handleFavorite}
                                        className={`py-3 border rounded-xl font-medium transition-all flex items-center justify-center gap-2 active:scale-95 ${isFav
                                            ? 'border-red-200 bg-red-50 text-red-600'
                                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                                        {isFav ? "В избранном" : "В избранное"}
                                    </button>

                                    {/* КНОПКА ПОДЕЛИТЬСЯ */}
                                    <button
                                        onClick={handleShare}
                                        className="py-3 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        {isShared ? <Check size={18} /> : <Share2 size={18} />}
                                        {isShared ? "Скопировано" : "Поделиться"}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4 text-sm text-gray-600 pt-4 border-t border-gray-100">
                                <div className="flex gap-3">
                                    <Truck className="text-blue-600 shrink-0" size={20} />
                                    <div>
                                        <span className="font-bold text-slate-900 block">Доставка</span>
                                        <span>Завтра, от 150 ₴</span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Shield className="text-blue-600 shrink-0" size={20} />
                                    <div>
                                        <span className="font-bold text-slate-900 block">Гарантия</span>
                                        <span>Официальная</span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <RotateCcw className="text-blue-600 shrink-0" size={20} />
                                    <div>
                                        <span className="font-bold text-slate-900 block">Возврат</span>
                                        <span>14 дней</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {relatedProducts.length > 0 && (
                    <div className="mt-20 border-t border-gray-200 pt-10">
                        <h2 className="text-2xl font-bold mb-8">Похожие товары</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map(p => (
                                <Link key={p.id} href={`/product/${p.id}`} className="block">
                                    <ProductCard {...p} />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}