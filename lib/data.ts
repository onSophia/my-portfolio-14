
export type Category = "santeh" | "heating" | "furniture" | "pipes";

export interface Product {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    image: string;
    inStock: boolean;
    category: Category;
    description: string;
    specs: { label: string; value: string }[];
}

let globalId = 1;


function createVariations(
    baseTitle: string,
    category: Category,
    basePrice: number,
    variations: { suffix: string; priceMod: number; specValue: string }[],
    baseSpecs: { label: string; value: string }[],
    imageText: string,
    description: string
): Product[] {
    return variations.map((v, index) => {
        const currentId = globalId++;
        const currentPrice = basePrice + v.priceMod;

        const hasDiscount = currentId % 3 === 0;
        const isStock = currentId % 5 !== 0;

        const safeImageText = encodeURIComponent(imageText + " " + v.suffix);
        const imageUrl = `https://placehold.co/600x600/png?text=${safeImageText}&font=roboto`;

        return {
            id: currentId,
            title: `${baseTitle} ${v.suffix}`,
            price: currentPrice,
            oldPrice: hasDiscount ? Math.round(currentPrice * 1.2) : undefined,
            image: imageUrl,
            inStock: isStock,
            category,
            description,
            specs: [
                ...baseSpecs,
                { label: "Модификация", value: v.specValue }
            ]
        };
    });
}

const santehProducts: Product[] = [
    ...createVariations(
        "Смеситель GROHE Eurosmart",
        "santeh",
        3200,
        [
            { suffix: "S-Size", priceMod: 0, specValue: "Для умывальника" },
            { suffix: "M-Size", priceMod: 400, specValue: "Высокий излив" },
            { suffix: "Cosmopolitan", priceMod: 800, specValue: "Дизайнерский" },
            { suffix: "Kitchen", priceMod: 1200, specValue: "Для кухни" },
            { suffix: "Shower", priceMod: 500, specValue: "Для душа" },
        ],
        [{ label: "Материал", value: "Латунь" }, { label: "Покрытие", value: "Хром" }],
        "GROHE",
        "Немецкое качество. Технология SilkMove для плавности хода рычага. Гарантия 5 лет."
    ),
    ...createVariations(
        "Унитаз Cersanit",
        "santeh",
        4500,
        [
            { suffix: "Carina", priceMod: 0, specValue: "Подвесной" },
            { suffix: "City CleanOn", priceMod: 1200, specValue: "Безободковый" },
            { suffix: "Parva", priceMod: -500, specValue: "Компакт (напольный)" },
            { suffix: "Delfi", priceMod: -200, specValue: "Под инсталляцию" },
        ],
        [{ label: "Материал", value: "Санфарфор" }, { label: "Крышка", value: "Дюропласт (Soft Close)" }],
        "Cersanit",
        "Современный дизайн и легкая уборка. Антибактериальное покрытие сиденья."
    ),
    ...createVariations(
        "Инсталляция Geberit Duofix",
        "santeh",
        9000,
        [
            { suffix: "Delta", priceMod: 0, specValue: "Базовая 3в1" },
            { suffix: "Sigma", priceMod: 3000, specValue: "Узкая (8 см)" },
            { suffix: "Omega", priceMod: 5000, specValue: "Низкая (82 см)" },
            { suffix: "Plattenbau", priceMod: 500, specValue: "Для панельных домов" },
        ],
        [{ label: "Страна", value: "Швейцария" }, { label: "Нагрузка", value: "до 400 кг" }],
        "Geberit",
        "Надежная монтажная рама. Цельный бачок (защита от протечек). Кнопка хром в комплекте."
    ),
    ...createVariations(
        "Душевая система Hansgrohe",
        "santeh",
        12000,
        [
            { suffix: "Crometta 160", priceMod: 0, specValue: "Верхний душ 160мм" },
            { suffix: "Croma 220", priceMod: 4000, specValue: "Тропический душ" },
            { suffix: "Vernis Blend", priceMod: 2000, specValue: "Термостат" },
        ],
        [{ label: "Тип", value: "Со стойкой" }, { label: "Термостат", value: "Есть" }],
        "Hansgrohe",
        "Наслаждение водой. Система QuickClean против известкового налета. Сделано в Германии."
    ),
    {
        id: globalId++,
        title: "Ванна стальная Kaldewei Eurowa 170x70",
        price: 5400,
        image: "https://placehold.co/600x600/png?text=Kaldewei+Steel&font=roboto",
        inStock: true,
        category: "santeh",
        description: "Сталь-эмаль 3.5мм. Не царапается, не желтеет.",
        specs: [{ label: "Толщина", value: "2.3 мм" }, { label: "Гарантия", value: "30 лет" }]
    },
    {
        id: globalId++,
        title: "Гигиенический душ Imprese Praha",
        price: 1800,
        image: "https://placehold.co/600x600/png?text=Imprese+Gig&font=roboto",
        inStock: true,
        category: "santeh",
        description: "Чешский смеситель скрытого монтажа с лейкой биде.",
        specs: [{ label: "Картридж", value: "35 мм" }, { label: "Шланг", value: "120 см" }]
    },
    {
        id: globalId++,
        title: "Сифон для умывальника Viega (бутылочный)",
        price: 450,
        image: "https://placehold.co/600x600/png?text=Viega+Siphon&font=roboto",
        inStock: true,
        category: "santeh",
        description: "Качественный пластик. Сделано в Германии.",
        specs: [{ label: "Диаметр", value: "32 мм" }, { label: "Материал", value: "Пластик" }]
    },
];

const heatingProducts: Product[] = [
    ...createVariations(
        "Бойлер Atlantic O'Pro",
        "heating",
        5200,
        [
            { suffix: "50L", priceMod: 0, specValue: "50 литров" },
            { suffix: "80L", priceMod: 800, specValue: "80 литров" },
            { suffix: "100L", priceMod: 1500, specValue: "100 литров" },
            { suffix: "Slim 50", priceMod: 1200, specValue: "Узкий (33 см)" },
            { suffix: "Slim 80", priceMod: 2000, specValue: "Узкий (33 см)" },
        ],
        [{ label: "ТЭН", value: "Мокрый" }, { label: "Покрытие", value: "Эмаль с цирконием" }],
        "Atlantic",
        "Классический бойлер. Защита O'Pro продлевает срок службы магниевого анода."
    ),
    ...createVariations(
        "Бойлер Gorenje (Сухой ТЭН)",
        "heating",
        7500,
        [
            { suffix: "GBF 50", priceMod: 0, specValue: "50 литров" },
            { suffix: "GBF 80", priceMod: 1000, specValue: "80 литров" },
            { suffix: "GBF 100", priceMod: 2000, specValue: "100 литров" },
        ],
        [{ label: "ТЭН", value: "Сухой (2 шт)" }, { label: "Монтаж", value: "Вертикальный" }],
        "Gorenje",
        "Два сухих тэна. Надежная электроника. Европейская сборка (Сербия)."
    ),
    ...createVariations(
        "Радиатор биметаллический Royal Thermo",
        "heating",
        4500,
        [
            { suffix: "6 секций", priceMod: -1500, specValue: "Площадь 8 м²" },
            { suffix: "8 секций", priceMod: -500, specValue: "Площадь 12 м²" },
            { suffix: "10 секций", priceMod: 0, specValue: "Площадь 15 м²" },
            { suffix: "12 секций", priceMod: 1000, specValue: "Площадь 18 м²" },
        ],
        [{ label: "Теплоотдача", value: "185 Вт/сек" }, { label: "Давление", value: "до 30 бар" }],
        "Royal Thermo",
        "Идеален для центрального отопления в Харькове. Полностью стальной коллектор."
    ),
    ...createVariations(
        "Полотенцесушитель Mario",
        "heating",
        3200,
        [
            { suffix: "Лесенка 600x400", priceMod: 0, specValue: "6 перемычек" },
            { suffix: "Лесенка 800x500", priceMod: 800, specValue: "8 перемычек" },
            { suffix: "Змейка 500x500", priceMod: -1000, specValue: "M-образный" },
        ],
        [{ label: "Материал", value: "Нерж. сталь" }, { label: "Тип", value: "Водяной" }],
        "Mario",
        "Украинское производство. Нержавеющая сталь AISI 304. Пожизненная гарантия."
    ),
    {
        id: globalId++,
        title: "Котел газовый Bosch Gaz 6000 W",
        price: 24000,
        image: "https://placehold.co/600x600/png?text=Bosch+Boiler&font=roboto",
        inStock: false,
        category: "heating",
        description: "Двухконтурный турбированный котел. Адаптирован к перепадам напряжения.",
        specs: [{ label: "Мощность", value: "24 кВт" }, { label: "Площадь", value: "до 250 м²" }]
    },
    {
        id: globalId++,
        title: "Терморегулятор Danfoss (головка)",
        price: 650,
        image: "https://placehold.co/600x600/png?text=Danfoss&font=roboto",
        inStock: true,
        category: "heating",
        description: "Позволяет экономить до 20% тепла. Автоматически поддерживает температуру.",
        specs: [{ label: "Подключение", value: "M30x1.5" }, { label: "Тип", value: "Жидкостный" }]
    },
];

const furnitureProducts: Product[] = [
    ...createVariations(
        "Тумба с умывальником 'Мойдодыр'",
        "furniture",
        4200,
        [
            { suffix: "Classic 50", priceMod: -500, specValue: "Ширина 50см" },
            { suffix: "Classic 60", priceMod: 0, specValue: "Ширина 60см" },
            { suffix: "Classic 70", priceMod: 800, specValue: "Ширина 70см" },
            { suffix: "Classic 80", priceMod: 1500, specValue: "Ширина 80см" },
        ],
        [{ label: "Фасад", value: "МДФ крашеный" }, { label: "Монтаж", value: "Напольный" }],
        "Moidodyr",
        "Влагостойкая мебель для ванной. Умывальник Cersanit в комплекте."
    ),
    ...createVariations(
        "Зеркало с подсветкой LED",
        "furniture",
        2800,
        [
            { suffix: "Round 60", priceMod: 0, specValue: "Круглое d60" },
            { suffix: "Round 80", priceMod: 1200, specValue: "Круглое d80" },
            { suffix: "Square 60x80", priceMod: 500, specValue: "Прямоугольное" },
        ],
        [{ label: "Подсветка", value: "Сенсорная" }, { label: "Защита", value: "IP44" }],
        "Liberta",
        "Зеркальное полотно AGC (Бельгия). Нейтральный белый свет."
    ),
    ...createVariations(
        "Пенал для ванной",
        "furniture",
        3500,
        [
            { suffix: "Подвесной", priceMod: 0, specValue: "Высота 150см" },
            { suffix: "Напольный с корзиной", priceMod: 1000, specValue: "С корзиной для белья" },
        ],
        [{ label: "Цвет", value: "Белый глянец" }, { label: "Ширина", value: "35 см" }],
        "Juventa",
        "Удобное хранение бытовой химии. Петли с доводчиками."
    ),
    {
        id: globalId++,
        title: "Ванна акриловая Kolo 150x70",
        price: 5200,
        image: "https://placehold.co/600x600/png?text=Kolo+Bath&font=roboto",
        inStock: true,
        category: "furniture",
        description: "Компактная ванна. Акрил Lucite.",
        specs: [{ label: "Объем", value: "180 л" }, { label: "Страна", value: "Польша" }]
    },
    {
        id: globalId++,
        title: "Ванна акриловая Ravak 170x75",
        price: 14000,
        image: "https://placehold.co/600x600/png?text=Ravak+Bath&font=roboto",
        inStock: true,
        category: "furniture",
        description: "Самый толстый акрил на рынке. Гарантия 10 лет.",
        specs: [{ label: "Усиление", value: "Стекловолокно" }, { label: "Страна", value: "Чехия" }]
    },
    {
        id: globalId++,
        title: "Корзина для белья угловая",
        price: 800,
        image: "https://placehold.co/600x600/png?text=Basket&font=roboto",
        inStock: true,
        category: "furniture",
        description: "Пластик под ротанг. Вентилируемая.",
        specs: [{ label: "Объем", value: "45 л" }, { label: "Цвет", value: "Коричневый" }]
    },
];

const pipesProducts: Product[] = [
    ...createVariations(
        "Труба полипропилен Fado PPR",
        "pipes",
        45,
        [
            { suffix: "20mm", priceMod: 0, specValue: "Диаметр 20мм" },
            { suffix: "25mm", priceMod: 20, specValue: "Диаметр 25мм" },
            { suffix: "32mm", priceMod: 50, specValue: "Диаметр 32мм" },
            { suffix: "40mm", priceMod: 100, specValue: "Диаметр 40мм" },
        ],
        [{ label: "Тип", value: "Армированная стекловолокном" }, { label: "Назначение", value: "Отопление/Вода" }],
        "PPR Pipe",
        "Цена за 1 метр. Не требует зачистки при пайке. Выдерживает 95 градусов."
    ),
    ...createVariations(
        "Кран шаровый Valtec Base",
        "pipes",
        250,
        [
            { suffix: "1/2 ВН", priceMod: 0, specValue: "Резьба внутр-наруж" },
            { suffix: "1/2 ВВ", priceMod: 0, specValue: "Резьба внутр-внутр" },
            { suffix: "3/4 ВН", priceMod: 100, specValue: "Резьба внутр-наруж" },
            { suffix: "3/4 ВВ", priceMod: 100, specValue: "Резьба внутр-внутр" },
        ],
        [{ label: "Материал", value: "Латунь CW617N" }, { label: "Ручка", value: "Бабочка" }],
        "Valtec Valve",
        "Усиленный корпус. Ресурс 25 000 циклов. Гарантия 7 лет."
    ),
    ...createVariations(
        "Фильтр грубой очистки",
        "pipes",
        180,
        [
            { suffix: "1/2", priceMod: 0, specValue: "Пол-дюйма" },
            { suffix: "3/4", priceMod: 80, specValue: "Три четверти" },
            { suffix: "1 дюйм", priceMod: 150, specValue: "Дюйм" },
        ],
        [{ label: "Сетка", value: "Нержавейка 500мкм" }, { label: "Тип", value: "Косой" }],
        "Filter",
        "Защищает смесители от песка и ржавчины."
    ),
    ...createVariations(
        "Труба канализации Ostendorf",
        "pipes",
        120,
        [
            { suffix: "50x500", priceMod: 0, specValue: "50мм / 0.5м" },
            { suffix: "50x1000", priceMod: 50, specValue: "50мм / 1м" },
            { suffix: "110x500", priceMod: 100, specValue: "110мм / 0.5м" },
            { suffix: "110x1000", priceMod: 180, specValue: "110мм / 1м" },
        ],
        [{ label: "Материал", value: "Полипропилен" }, { label: "Шумоизоляция", value: "Базовая" }],
        "Ostendorf",
        "Немецкая канализация. Стойкая к химии и горячей воде."
    ),
    {
        id: globalId++,
        title: "Счетчик воды Novator (Холодная)",
        price: 600,
        image: "https://placehold.co/600x600/png?text=Meter+Cold&font=roboto",
        inStock: true,
        category: "pipes",
        description: "Свежая поверка. Штуцеры в комплекте.",
        specs: [{ label: "Монтаж", value: "1/2 дюйма" }, { label: "Тип", value: "Механический" }]
    },
    {
        id: globalId++,
        title: "Счетчик воды Novator (Горячая)",
        price: 600,
        image: "https://placehold.co/600x600/png?text=Meter+Hot&font=roboto",
        inStock: true,
        category: "pipes",
        description: "Выдерживает до 90 градусов. Антимагнитная защита.",
        specs: [{ label: "Монтаж", value: "1/2 дюйма" }, { label: "Тип", value: "Механический" }]
    },
    {
        id: globalId++,
        title: "Редуктор давления Honeywell",
        price: 1800,
        image: "https://placehold.co/600x600/png?text=Honeywell&font=roboto",
        inStock: true,
        category: "pipes",
        description: "Защищает технику от гидроударов и высокого давления.",
        specs: [{ label: "Диапазон", value: "1.5 - 6 бар" }, { label: "Подключение", value: "1/2" }]
    },
    {
        id: globalId++,
        title: "Фум-лента профессиональная (катушка)",
        price: 45,
        image: "https://placehold.co/600x600/png?text=Fum&font=roboto",
        inStock: true,
        category: "pipes",
        description: "Для герметизации резьбовых соединений. 12 метров.",
        specs: [{ label: "Ширина", value: "12 мм" }, { label: "Толщина", value: "0.1 мм" }]
    }
];

export const products: Product[] = [
    ...santehProducts,
    ...heatingProducts,
    ...furnitureProducts,
    ...pipesProducts,
];