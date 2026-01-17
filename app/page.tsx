// src/app/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react"; // Добавили Suspense
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { products, Category } from "@/lib/data";

// Выносим контент в отдельный компонент для Suspense (требование Next.js)
function HomeContent() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const searchParams = useSearchParams();

  // 1. Получаем параметры из URL
  const searchQuery = searchParams.get('q')?.toLowerCase() || "";
  const categoryParam = searchParams.get('category');

  // 2. Если в ссылке была категория (например, клик из футера), активируем её
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam as Category);
      // Плавный скролл к каталогу
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [categoryParam]);

  // 3. Логика фильтрации
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery);

    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;

    if (searchQuery) return matchesSearch;
    return matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'Все товары' },
    { id: 'santeh', name: 'Сантехника' },
    { id: 'heating', name: 'Отопление' },
    { id: 'furniture', name: 'Мебель' },
    { id: 'pipes', name: 'Инженерка' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Header />

      {/* Баннер (скрываем при поиске или выборе категории из футера) */}
      {!searchQuery && !categoryParam && (
        <div className="bg-linear-to-r from-blue-700 to-slate-900 text-white py-16 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Ремонт ванной <br /> начинается здесь</h1>
            <p className="text-blue-100 mb-8 max-w-lg text-lg">
              Профессиональная сантехника в Харькове. <br /> Комплектация объектов под ключ.
            </p>
            <button onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-slate-900 font-bold py-3 px-8 rounded-full hover:shadow-lg hover:scale-105 transition-all">
              Перейти в каталог
            </button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 bg-blue-600/20 skew-x-12 transform origin-bottom-left"></div>
        </div>
      )}

      <div id="catalog" className="container mx-auto px-4 mt-12">

        {searchQuery ? (
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Результаты поиска: "{searchQuery}"</h2>
            <Link href="/" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
              Сбросить поиск
            </Link>
          </div>
        ) : (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all ${activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-transparent'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="block">
              <ProductCard {...product} />
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-gray-900">Ничего не найдено</h3>
          </div>
        )}
      </div>
    </main>
  );
}

// Оборачиваем в Suspense для безопасности
export default function Home() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <HomeContent />
    </Suspense>
  );
}
