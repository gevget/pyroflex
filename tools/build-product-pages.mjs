import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BRAND_ROOT = 'branding/ОГНЕЗАЩИТНЫЕ СИСТЕМЫ ПИРОФЛЕКС — копия 10.11.26';
const PRODUCT_ORDER = ['ultra', 'base', 'finish', 'acrylic', 'epoxy', 'therma-ultra', 'therma-epoxy', 'cable'];
const SYSTEM_ORDER = ['system-t-ultra', 'system-t-epoxy'];

const pages = [
  {
    slug: 'acrylic', kind: 'product', source: 'docs/product-content/products/acrylic.md',
    title: 'ПИРОФЛЕКС-АКРИЛ', nav: 'Пирофлекс Акрил', code: 'PX-A', tu: '20.30.12-109-73815750-2024',
    accent: '#F5F5F5', accentInk: '#55595D', iconFolder: 'acrylic',
    category: 'Огнезащитная краска на органическом растворителе для стальных конструкций',
    heroLead: 'Быстросохнущее покрытие для стальных конструкций внутри зданий. Предел огнестойкости — до R120.',
    heroImage: 'branding/акрил 1.png', heroAlt: 'Ведро огнезащитной краски ПИРОФЛЕКС-АКРИЛ, код PX-A',
    areaImage: 'branding/back/акрил.png', areaAlt: 'ПИРОФЛЕКС-АКРИЛ на промышленном объекте',
    areaHeading: 'Для металлических конструкций внутри зданий',
    applications: [
      ['application-industrial.svg', 'Стальные конструкции'], ['application-outdoor.svg', 'Закрытые помещения'],
      ['application-thermal.svg', 'Строительно-монтажный этап'], ['verified.svg', 'Совместимые грунты и эмали']
    ],
    facts: [
      ['fire-performance.svg', 'до R120', 'огнестойкость стали'], ['service-life.svg', 'до 20 лет', 'заявленный срок службы'],
      ['seismic-resistance.svg', 'до 9', 'баллов сейсмостойкости'], ['drying.svg', '≤3 ч', 'высыхание до степени 3'],
      ['consumption.svg', '1,47 кг/м²', 'на 1 мм сухого слоя']
    ],
    benefitHeading: 'Быстрое нанесение и совместимость',
    benefitLead: 'Органическая основа, удобная технология и подтверждённые каталожные характеристики.',
    benefitTitles: ['Органическая основа', 'Быстрое высыхание', 'Стандартное оборудование', 'Совместимость материалов', 'Сейсмостойкость'],
    benefitIcons: ['material-description.svg', 'drying.svg', 'equipment.svg', 'verified.svg', 'seismic-resistance.svg'],
    lifespan: 'Срок службы — до 20 лет. Сейсмостойкость — до 9 баллов.',
    descriptionHeading: 'Матовая гладкая поверхность',
    techLead: 'Параметры нанесения и высыхания приведены по каталожной карточке; толщину задаёт проектный расчёт.',
    docsFolder: `${BRAND_ROOT}/ПИРОФЛЕКС-АКРИЛ`, excludeDocs: [/таблица расходов/i],
    expenseHeading: 'Расход ПИРОФЛЕКС-АКРИЛ',
    expenseTables: [{ file: 'docs/product-content/tables/acryl.md', label: 'Расход по пределу огнестойкости', source: `${BRAND_ROOT}/ПИРОФЛЕКС-АКРИЛ/ПИРОФЛЕКС АКРИЛ_таблица расходов.pdf`, mode: 'wide' }],
    related: ['base', 'finish'],
    storage: { range: '−40…+40 °C', period: '12 месяцев', note: 'Хранить в закрытой таре и соблюдать меры пожарной безопасности.' },
    metaDescription: 'ПИРОФЛЕКС-АКРИЛ — быстросохнущая огнезащитная краска для стальных конструкций до R120. Технические характеристики, расход, нанесение и локальные документы.'
  },
  {
    slug: 'base', kind: 'product', source: 'docs/product-content/products/base.md',
    title: 'ПИРОФЛЕКС-БАЗА', nav: 'Пирофлекс База', code: 'PX-B', tu: '20.30.12-105-73815750-2024',
    accent: '#24AC84', accentInk: '#087354', iconFolder: 'base',
    category: 'Эпоксидный грунт для антикоррозионной защиты металлоконструкций и оборудования',
    heroLead: 'Грунтовочный слой для металлического основания. Ингибиторы коррозии помогают обеспечивать долговечную защиту и сохранять внешний вид.',
    heroImage: 'branding/база 3.png', heroAlt: 'Ведро эпоксидного грунта ПИРОФЛЕКС-БАЗА, код PX-B',
    areaImage: 'branding/back/база.png', areaAlt: 'ПИРОФЛЕКС-БАЗА на промышленном объекте',
    areaHeading: 'Подготовка металлического основания',
    applications: [
      ['application-industrial.svg', 'Металлоконструкции'], ['gear.svg', 'Промышленное оборудование'],
      ['application-outdoor.svg', 'Наружная эксплуатация с ФИНИШЕМ']
    ],
    facts: [
      ['service-life.svg', 'до 25 лет', 'заявленный срок службы'], ['verified.svg', '≥75%', 'нелетучие вещества основы'],
      ['protection-shield.svg', 'класс ≤1', 'адгезия к металлу'], ['clock.svg', '≥4 ч', 'жизнеспособность смеси'],
      ['coating.svg', '100:16,5', 'массовое соотношение A:B']
    ],
    benefitHeading: 'Основание для долговечной защиты',
    benefitLead: 'ПИРОФЛЕКС-БАЗА работает как грунтовочный слой; для наружной эксплуатации требуется финишное покрытие.',
    benefitTitles: ['Срок службы до 25 лет', 'Высокая адгезия', 'Защита от коррозии', 'Атмосферостойкость с ФИНИШЕМ', 'Эксплуатационные свойства'],
    benefitIcons: ['service-life.svg', 'verified.svg', 'corrosion-shield.svg', 'application-outdoor.svg', 'protection-shield.svg'],
    lifespan: 'Для наружной эксплуатации используйте ПИРОФЛЕКС-ФИНИШ.',
    descriptionHeading: 'Эпоксидный грунт полуматового вида',
    techLead: 'Смешивайте компоненты и подготавливайте основание в соответствии с техническими условиями.',
    docsFolder: `${BRAND_ROOT}/ПИРОФЛЕКС-БАЗА`, excludeDocs: [],
    expenseHeading: 'Опорный расход ПИРОФЛЕКС-БАЗА', expenseTables: [],
    expenseNote: 'Сводный документ указывает 300 г/м² при толщине сухого слоя 100 мкм. Отдельная полная таблица расхода в переданном комплекте не обнаружена.',
    related: ['finish'],
    storage: { range: '−35…+35 °C', period: '18 месяцев', note: 'Хранить вдали от огня, прямого солнечного света и влаги.' },
    metaDescription: 'ПИРОФЛЕКС-БАЗА — эпоксидный антикоррозионный грунт для металлоконструкций. Характеристики, подготовка основания, расход и локальные документы.'
  },
  {
    slug: 'finish', kind: 'product', source: 'docs/product-content/products/finish.md',
    title: 'ПИРОФЛЕКС-ФИНИШ', nav: 'Пирофлекс Финиш', code: 'PX-F', tu: '20.30.12-104-73815750-2024',
    accent: '#AC55FF', accentInk: '#7425A8', iconFolder: 'finish',
    category: 'Двухкомпонентная акрил-уретановая эмаль для финишной защиты и отделки',
    heroLead: 'Защитно-декоративный слой для металла, бетона и железобетона. Цвет выбирается по каталогу RAL.',
    heroImage: 'branding/финиш 3.png', heroAlt: 'Ведро эмали ПИРОФЛЕКС-ФИНИШ, код PX-F',
    areaImage: 'branding/back/финиш.png', areaAlt: 'ПИРОФЛЕКС-ФИНИШ на промышленном объекте',
    areaHeading: 'Для металла, бетона и инфраструктурных объектов',
    applications: [
      ['application-industrial.svg', 'Металлоконструкции и оборудование'], ['application-outdoor.svg', 'Наружные трубопроводы'],
      ['application-thermal.svg', 'Мосты, опоры и резервуары'], ['verified.svg', 'Бетон и железобетон']
    ],
    facts: [
      ['corrosion-shield.svg', 'C5', 'коррозионная стойкость'], ['service-life.svg', '≥25 лет', 'срок службы'],
      ['seismic-resistance.svg', 'до 9', 'баллов при высоте до 70 м'], ['verified.svg', 'RAL', 'цветовая гамма'],
      ['drying.svg', '≤6 ч', 'высыхание до степени 3']
    ],
    benefitHeading: 'Защита и декоративная отделка',
    benefitLead: 'ФИНИШ защищает подготовленную поверхность и задаёт цвет и блеск по проекту.',
    benefitTitles: ['Адгезия и долговечность', 'Коррозионная стойкость C5', 'Выбор цвета и блеска', 'Срок службы до 25 лет', 'Сейсмостойкость'],
    benefitIcons: ['verified.svg', 'corrosion-shield.svg', 'material-description.svg', 'service-life.svg', 'seismic-resistance.svg'],
    lifespan: 'Срок службы — не менее 25 лет по каталогу.',
    descriptionHeading: 'Акрил-уретановая эмаль',
    techLead: 'Подготовьте компоненты A и B, соблюдайте жизнеспособность смеси и требования к подготовке поверхности.',
    docsFolder: `${BRAND_ROOT}/ПИРОФЛЕКС-ФИНИШ`, excludeDocs: [],
    expenseHeading: 'Опорный расход ПИРОФЛЕКС-ФИНИШ', expenseTables: [],
    expenseNote: 'Сводный документ указывает 135 г/м² при толщине сухого слоя 50 мкм. Полная отдельная таблица расхода ФИНИША в переданном комплекте не обнаружена.',
    related: ['base'],
    storage: { range: '−35…+35 °C', period: '18 месяцев', note: 'Хранить вдали от огня, прямого солнечного света и влаги.' },
    metaDescription: 'ПИРОФЛЕКС-ФИНИШ — двухкомпонентная акрил-уретановая эмаль с коррозионной стойкостью C5 и цветом по RAL. Расход, нанесение и документы.'
  },
  {
    slug: 'epoxy', kind: 'product', source: 'docs/product-content/products/epoxy.md',
    title: 'ПИРОФЛЕКС-ЭПОКСИ', nav: 'Пирофлекс Эпокси', code: 'PX-E', tu: '20.30.22-107-73815750-2024',
    accent: '#D94E4E', accentInk: '#A32D2D', iconFolder: 'epoxy',
    category: 'Двухкомпонентное эпоксидное вспучивающееся покрытие для стальных конструкций',
    heroLead: 'Огнезащита стали от целлюлозного и углеводородного пожара до R120. Для открытой атмосферы применяется с ПИРОФЛЕКС-ФИНИШ.',
    heroImage: 'branding/эпокси 4.png', heroAlt: 'Ведро огнезащитного состава ПИРОФЛЕКС-ЭПОКСИ, код PX-E',
    areaImage: 'branding/back/эпокси.png', areaAlt: 'ПИРОФЛЕКС-ЭПОКСИ на промышленном объекте',
    areaHeading: 'Огнезащита стальных конструкций в агрессивной среде',
    applications: [
      ['application-industrial.svg', 'Промышленное строительство'], ['application-oil-gas.svg', 'Нефтегазовые объекты'],
      ['application-outdoor.svg', 'Открытая атмосфера с ФИНИШЕМ'], ['fire-performance.svg', 'Углеводородный пожар']
    ],
    facts: [
      ['fire-performance.svg', 'R15–R120', 'предел огнестойкости'], ['corrosion-shield.svg', 'C5', 'коррозионная стойкость'],
      ['service-life.svg', '≥40 лет', 'заявленный срок службы'], ['seismic-resistance.svg', 'до 9', 'баллов сейсмостойкости'],
      ['material-description.svg', '93 ± 3%', 'сухой остаток']
    ],
    benefitHeading: 'Для огнезащиты в сложных условиях',
    benefitLead: 'Эпоксидное покрытие рассчитано на углеводородный сценарий и коррозионную категорию C5.',
    benefitTitles: ['Огнестойкость до R120', 'Коррозионная стойкость C5', 'Сейсмостойкость до 9 баллов', 'Высокий сухой остаток', 'Углеводородный пожар', 'Срок службы 40 лет'],
    benefitIcons: ['fire-performance.svg', 'corrosion-shield.svg', 'seismic-resistance.svg', 'verified.svg', 'application-oil-gas.svg', 'service-life.svg'],
    lifespan: 'Для открытой атмосферы предусмотрено финишное покрытие ПИРОФЛЕКС-ФИНИШ.',
    descriptionHeading: 'Эпоксидная композиция с минеральными наполнителями',
    techLead: 'Соотношение компонентов, толщину одного прохода и межслойные интервалы соблюдайте по технологическому регламенту.',
    docsFolder: `${BRAND_ROOT}/ПИРОФЛЕКС-ЭПОКСИ`, excludeDocs: [/таблица расходов/i],
    expenseHeading: 'Расход ПИРОФЛЕКС-ЭПОКСИ по сценарию пожара',
    expenseTables: [
      { file: 'docs/product-content/tables/epoxy-cg.md', label: 'Целлюлозное горение', source: `${BRAND_ROOT}/ПИРОФЛЕКС-ЭПОКСИ/ПИРОФЛЕКС ЭПОКСИ_таблица расходов_ЦГ.pdf`, mode: 'wide' },
      { file: 'docs/product-content/tables/epoxy-ugv.md', label: 'Углеводородное горение', source: `${BRAND_ROOT}/ПИРОФЛЕКС-ЭПОКСИ/ПИРОФЛЕКС ЭПОКСИ_таблица расходов_УГВ.pdf`, mode: 'wide' }
    ],
    related: ['base', 'finish'],
    storage: { range: '−40…+40 °C', period: '12 месяцев', note: 'Перед применением проверьте маркировку партии и состояние заводской упаковки.' },
    metaDescription: 'ПИРОФЛЕКС-ЭПОКСИ — огнезащитное покрытие для стали до R120, C5, целлюлозный и углеводородный пожар. Таблицы расхода, нанесение и документы.'
  },
  {
    slug: 'cable', kind: 'product', source: 'docs/product-content/products/cable.md',
    title: 'ПИРОФЛЕКС-КАБЕЛЬ', nav: 'Пирофлекс Кабель', code: 'PX-C', tu: '20.30.11-103-73815750-2024',
    accent: '#FF9F1C', accentInk: '#9B5600', iconFolder: 'cable',
    category: 'Вспучивающийся огнезащитный материал на водной основе для электрических кабелей',
    heroLead: 'Готовый к применению состав для кабелей с полиэтиленовой, ПВХ- или резиновой оболочкой, включая бронированные кабели.',
    heroImage: 'branding/кабель 3.png', heroAlt: 'Ведро огнезащитного состава ПИРОФЛЕКС-КАБЕЛЬ, код PX-C',
    areaImage: 'branding/back/кабель.png', areaAlt: 'ПИРОФЛЕКС-КАБЕЛЬ на кабельной линии',
    areaHeading: 'Для кабельных линий внутри и снаружи зданий',
    applications: [
      ['application-cable.svg', 'Кабели с оболочкой ПВХ'], ['application-cable.svg', 'Кабели с полиэтиленовой оболочкой'],
      ['application-cable.svg', 'Резиновые и бронированные кабели'], ['application-outdoor.svg', 'Помещения и наружная среда']
    ],
    facts: [
      ['temperature-thermometer.svg', '−60…+60 °C', 'температура эксплуатации'], ['consumption.svg', '1,36 кг/м²', 'при толщине 0,8 мм'],
      ['drying.svg', '3–6 ч', 'межслойная выдержка'], ['clock.svg', '24 ч', 'полное высыхание'],
      ['service-life.svg', 'до 20 лет', 'заявленный срок службы']
    ],
    benefitHeading: 'Огнезащита кабельных линий',
    benefitLead: 'Водная основа, готовность к применению и несколько способов нанесения.',
    benefitTitles: ['Водная основа', 'Влагостойкость', 'Готов к применению', 'Разные способы нанесения', 'Для помещений и улицы'],
    benefitIcons: ['material-description.svg', 'weather-resistance.svg', 'verified.svg', 'equipment.svg', 'application-outdoor.svg'],
    lifespan: 'Эксплуатационная температура по каталогу — −60…+60 °C.',
    descriptionHeading: 'Матовый серый состав для кабельных оболочек',
    techLead: 'Наносите по сухому чистому основанию. Проектом задаются требуемая толщина и число слоёв.',
    docsFolder: `${BRAND_ROOT}/ПИРОФЛЕКС-КАБЕЛЬ`, excludeDocs: [],
    expenseHeading: 'Расход ПИРОФЛЕКС-КАБЕЛЬ', expenseTables: [],
    expenseNote: 'Ориентир каталога — 1,36 кг/м² при толщине сухого слоя 800 мкм. Отдельная полная таблица расхода в переданном комплекте не обнаружена.',
    related: [],
    storage: { range: 'выше 0 °C', period: '12 месяцев', note: 'Замораживание материала запрещено.' },
    metaDescription: 'ПИРОФЛЕКС-КАБЕЛЬ — водный огнезащитный состав для кабелей внутри и снаружи зданий. Расход, температурный диапазон, нанесение и официальные документы.'
  },
  {
    slug: 'therma-ultra', kind: 'product', source: 'docs/product-content/products/therma-ultra.md',
    title: 'ПИРОФЛЕКС-ТЕРМА УЛЬТРА', nav: 'Пирофлекс Терма Ультра', code: 'PX-T-U', tu: '20.30.22-102-73815750-2024',
    accent: '#939393', accentInk: '#555555', iconFolder: 'therma-ultra',
    category: 'Теплоизоляционный компонент конструктивной системы СИСТЕМА-Т УЛЬТРА',
    heroLead: 'Полиуретановый теплоизоляционный слой применяется совместно с ПИРОФЛЕКС-УЛЬТРА в составе системы.',
    heroImage: 'branding/терма ультра 2.png', heroAlt: 'Ведро теплоизоляционного материала ПИРОФЛЕКС-ТЕРМА УЛЬТРА, код PX-T-U',
    areaImage: 'branding/back/т ультра.png', areaAlt: 'Терма Ультра и Ультра в составе системы огнезащиты',
    areaHeading: 'Компонент СИСТЕМА-Т УЛЬТРА',
    applications: [
      ['application-industrial.svg', 'Стальные конструкции'], ['gear.svg', 'Конструктивная огнезащита'],
      ['coating.svg', 'Теплоизоляционный слой'], ['verified.svg', 'Работа совместно с ПИРОФЛЕКС-УЛЬТРА']
    ],
    facts: [
      ['technical-characteristics.svg', 'ТУ 20.30.22-102', 'идентификатор материала'],
      ['material-description.svg', 'Полиуретановая', 'основа по карточке системы'],
      ['coating.svg', 'Теплоизоляционный', 'слой СИСТЕМА-Т УЛЬТРА']
    ],
    benefitHeading: 'Роль теплоизоляционного слоя',
    benefitLead: 'Каталог показывает ТЕРМА УЛЬТРА как компонент системы, а не как самостоятельное покрытие с отдельным набором показателей.',
    benefitsOverride: ['Теплоизоляционный слой системы на полиуретановой основе.', 'Применяется совместно с ПИРОФЛЕКС-УЛЬТРА в конструктивной огнезащите.', 'Показатели R90–R150, C5 и срок службы относятся к СИСТЕМА-Т УЛЬТРА.'],
    benefitTitles: ['Формирует системный слой', 'Работает в составе СИСТЕМА-Т УЛЬТРА', 'Показатели системы остаются показателями системы'],
    benefitIcons: ['coating.svg', 'verified.svg', 'certificate-check.svg'],
    lifespan: 'R90–R150, C5, сейсмостойкость и срок службы относятся к СИСТЕМА-Т УЛЬТРА.',
    descriptionHeading: 'Теплоизоляционный материал на полиуретановой основе',
    techLead: 'Отдельные параметры нанесения ТЕРМА УЛЬТРА в каталоге не выделены. Для системного слоя используйте технологический регламент СИСТЕМА-Т УЛЬТРА.',
    docsFolder: `${BRAND_ROOT}/ПИРОФЛЕКС СИСТЕМА-Т УЛЬТРА`,
    onlyDocs: [/ТУ 20\.30\.22-102/i, /ТР № 02-24/i],
    expenseHeading: 'Расход слоя ТЕРМА УЛЬТРА в составе системы', expenseTables: [],
    expenseNote: 'Отдельный расход компонента не публикуется как самостоятельное значение. Подберите толщину и расход по официальной таблице СИСТЕМА-Т УЛЬТРА.',
    related: ['system-t-ultra', 'ultra', 'base', 'finish'], relatedHeading: 'Система применения и сопутствующие материалы',
    storage: { range: 'отдельно не указан', period: 'уточнить по ТУ и регламенту', note: 'Не переносите системный срок хранения на отдельный компонент без проверки маркировки и документации.' },
    metaDescription: 'ПИРОФЛЕКС-ТЕРМА УЛЬТРА — теплоизоляционный компонент СИСТЕМА-Т УЛЬТРА. Назначение слоя, документы и связь с огнезащитным составом.'
  },
  {
    slug: 'therma-epoxy', kind: 'product', source: 'docs/product-content/products/therma-epoxy.md',
    title: 'ПИРОФЛЕКС-ТЕРМА ЭПОКСИ', nav: 'Пирофлекс Терма Эпокси', code: 'PX-T-E', tu: '20.30.22-108-73815750-2024',
    accent: '#939393', accentInk: '#555555', iconFolder: 'therma-epoxy',
    category: 'Теплоизоляционный компонент конструктивной системы СИСТЕМА-Т ЭПОКСИ',
    heroLead: 'Теплоизоляционный слой эпоксидной системы применяется совместно с ПИРОФЛЕКС-ЭПОКСИ.',
    heroImage: 'branding/терма эпокси 2.png', heroAlt: 'Ведро теплоизоляционного материала ПИРОФЛЕКС-ТЕРМА ЭПОКСИ, код PX-T-E',
    areaImage: 'branding/back/т эпокси.png', areaAlt: 'Терма Эпокси и Эпокси в составе системы огнезащиты',
    areaHeading: 'Компонент СИСТЕМА-Т ЭПОКСИ',
    applications: [
      ['application-industrial.svg', 'Стальные конструкции'], ['gear.svg', 'Конструктивная огнезащита'],
      ['coating.svg', 'Теплоизоляционный слой'], ['verified.svg', 'Работа совместно с ПИРОФЛЕКС-ЭПОКСИ']
    ],
    facts: [
      ['technical-characteristics.svg', 'ТУ 20.30.22-108', 'идентификатор материала'],
      ['material-description.svg', 'Эпоксидная', 'основа по карточке системы'],
      ['coating.svg', 'Теплоизоляционный', 'слой СИСТЕМА-Т ЭПОКСИ']
    ],
    benefitHeading: 'Роль теплоизоляционного слоя',
    benefitLead: 'ТЕРМА ЭПОКСИ — часть конструктивной системы. Показатели системы нельзя трактовать как самостоятельные показатели компонента.',
    benefitsOverride: ['Теплоизоляционный слой эпоксидной конструктивной системы.', 'Применяется совместно с ПИРОФЛЕКС-ЭПОКСИ.', 'Показатели R90–R150, C5 и срок службы относятся к СИСТЕМА-Т ЭПОКСИ.'],
    benefitTitles: ['Формирует системный слой', 'Работает в составе СИСТЕМА-Т ЭПОКСИ', 'Показатели системы остаются показателями системы'],
    benefitIcons: ['coating.svg', 'verified.svg', 'certificate-check.svg'],
    lifespan: 'R90–R150, C5, сейсмостойкость и срок службы относятся к СИСТЕМА-Т ЭПОКСИ.',
    descriptionHeading: 'Теплоизоляционный слой эпоксидной системы',
    techLead: 'Отдельные параметры нанесения ТЕРМА ЭПОКСИ в каталоге не выделены. Для системного слоя используйте официальные документы СИСТЕМА-Т ЭПОКСИ.',
    docsFolder: `${BRAND_ROOT}/ПИРОФЛЕКС СИСТЕМА-Т ЭПОКСИ`, onlyDocs: [/ТУ_ПИРОФЛЕКС-ТЕРМА ЭПОКСИ/i],
    expenseHeading: 'Расход слоя ТЕРМА ЭПОКСИ в составе системы', expenseTables: [],
    expenseNote: 'Отдельный расход компонента не публикуется как самостоятельное значение. Подберите толщину и расход по официальной таблице СИСТЕМА-Т ЭПОКСИ.',
    related: ['system-t-epoxy', 'epoxy', 'base', 'finish'], relatedHeading: 'Система применения и сопутствующие материалы',
    storage: { range: 'отдельно не указан', period: 'уточнить по ТУ и регламенту', note: 'Условия хранения проверяйте по ТУ и маркировке конкретной партии.' },
    metaDescription: 'ПИРОФЛЕКС-ТЕРМА ЭПОКСИ — теплоизоляционный компонент системы СИСТЕМА-Т ЭПОКСИ. Назначение слоя, документы и связь с огнезащитным составом.'
  },
  {
    slug: 'system-t-ultra', kind: 'system', source: 'docs/product-content/systems/system-t-ultra.md',
    title: 'ПИРОФЛЕКС СИСТЕМА-Т УЛЬТРА', nav: 'Пирофлекс Система-Т Ультра', code: 'PX-T-U', tu: '',
    accent: '#939393', accentInk: '#555555', secondary: '#AC9354', iconFolder: 'system-t-ultra',
    category: 'Конструктивная система огнезащиты металлоконструкций на полиуретановой основе',
    heroLead: 'Сочетание теплоизоляционного слоя ПИРОФЛЕКС-ТЕРМА УЛЬТРА и огнезащитного слоя ПИРОФЛЕКС-УЛЬТРА.',
    heroImage: 'assets/site/images/system-t-ultra.png', heroAlt: 'СИСТЕМА-Т УЛЬТРА: ПИРОФЛЕКС-УЛЬТРА и теплоизоляционный слой',
    areaImage: 'assets/site/images/application-energy.jpg', areaAlt: 'Стальные конструкции энергетического промышленного объекта',
    areaHeading: 'Для стальных конструкций промышленного и гражданского строительства',
    applications: [
      ['application-industrial.svg', 'Промышленные объекты'], ['application-thermal.svg', 'Энергетика'],
      ['application-oil-gas.svg', 'Нефтегазовые объекты'], ['application-outdoor.svg', 'Внутри и снаружи по проекту']
    ],
    facts: [
      ['fire-performance.svg', 'R90–R150', 'предел огнестойкости системы'], ['corrosion-shield.svg', 'C5', 'коррозионная стойкость'],
      ['seismic-resistance.svg', 'до 9', 'баллов при высоте до 70 м'], ['service-life.svg', '≥40 лет', 'срок службы системы'],
      ['temperature-thermometer.svg', '−70…+80 °C', 'наружная эксплуатация по каталогу']
    ],
    benefitHeading: 'Конструктивная защита с теплоизоляционным слоем',
    benefitLead: 'Показатели относятся к СИСТЕМА-Т УЛЬТРА как к системе и зависят от проектного решения.',
    benefitTitles: ['Огнестойкость до R150', 'Внутреннее и наружное применение', 'Коррозионная категория C5', 'Для групп огнезащитной эффективности 1–3', 'Сейсмостойкость до 9 баллов', 'Срок службы не менее 40 лет'],
    benefitIcons: ['fire-performance.svg', 'application-outdoor.svg', 'corrosion-shield.svg', 'verified.svg', 'seismic-resistance.svg', 'service-life.svg'],
    lifespan: 'Каталог указывает применение без финишного покрытия в заданных наружных условиях; решение проверяют по проекту.',
    descriptionHeading: 'Последовательность слоёв системы',
    techLead: 'Технологические параметры компонентов и системные требования сверяйте с отдельными регламентами перед началом работ.',
    docsFolder: `${BRAND_ROOT}/ПИРОФЛЕКС СИСТЕМА-Т УЛЬТРА`, excludeDocs: [/таблица расходов/i],
    expenseHeading: 'Расход каждого слоя по пределу и ПТМ',
    expenseTables: [{ file: 'docs/product-content/tables/system-t-ultra.md', label: 'СИСТЕМА-Т УЛЬТРА · R90–R150', source: `${BRAND_ROOT}/ПИРОФЛЕКС СИСТЕМА-Т УЛЬТРА/ПИРОФЛЕКС СИСТЕМА-Т УЛЬТРА_таблица расходов.pdf`, mode: 'wide' }],
    related: ['base', 'therma-ultra', 'ultra', 'finish'],
    storage: { range: '+5…+40 °C', period: '12 месяцев по карточке системы', note: 'Проверяйте срок и условия отдельно для каждого компонента по маркировке и документации.' },
    systemComponents: ['БАЗА', 'ТЕРМА УЛЬТРА', 'УЛЬТРА', 'ФИНИШ'],
    metaDescription: 'СИСТЕМА-Т УЛЬТРА — конструктивная огнезащита металлоконструкций R90–R150. Состав слоёв, таблица расхода, технология и документы.'
  },
  {
    slug: 'system-t-epoxy', kind: 'system', source: 'docs/product-content/systems/system-t-epoxy.md',
    title: 'ПИРОФЛЕКС СИСТЕМА-Т ЭПОКСИ', nav: 'Пирофлекс Система-Т Эпокси', code: 'PX-T-E', tu: '',
    accent: '#939393', accentInk: '#555555', secondary: '#D94E4E', iconFolder: 'system-t-epoxy',
    category: 'Конструктивная система огнезащиты металлоконструкций на эпоксидной основе',
    heroLead: 'Теплоизоляционный слой ПИРОФЛЕКС-ТЕРМА ЭПОКСИ работает совместно с огнезащитным составом ПИРОФЛЕКС-ЭПОКСИ.',
    heroImage: 'assets/site/images/system-t-epoxy.png', heroAlt: 'СИСТЕМА-Т ЭПОКСИ: ПИРОФЛЕКС-ТЕРМА ЭПОКСИ и ПИРОФЛЕКС-ЭПОКСИ',
    areaImage: 'assets/site/images/application-petrochemical.jpg', areaAlt: 'Стальные конструкции нефтехимического объекта',
    areaHeading: 'Для стальных конструкций и тяжёлых условий эксплуатации',
    applications: [
      ['application-industrial.svg', 'Промышленные объекты'], ['application-thermal.svg', 'Энергетика'],
      ['application-oil-gas.svg', 'Нефтегазовые объекты'], ['application-outdoor.svg', 'Наружная атмосфера с ФИНИШЕМ']
    ],
    facts: [
      ['fire-performance.svg', 'R90–R150', 'предел огнестойкости системы'], ['corrosion-shield.svg', 'C5', 'коррозионная стойкость'],
      ['seismic-resistance.svg', 'до 9', 'баллов сейсмостойкости'], ['service-life.svg', 'до 40 лет', 'срок службы системы'],
      ['temperature-thermometer.svg', '−15…+40 °C', 'нанесение ЭПОКСИ по каталогу']
    ],
    benefitHeading: 'Система слоёв для огнезащиты конструкций',
    benefitLead: 'Характеристики относятся к системе; для открытой атмосферы каталог предусматривает финишный слой.',
    benefitTitles: ['Огнестойкость до R150', 'Коррозионная категория C5', 'Сейсмостойкость до 9 баллов', 'Срок службы до 40 лет', 'Финиш для открытой атмосферы'],
    benefitIcons: ['fire-performance.svg', 'corrosion-shield.svg', 'seismic-resistance.svg', 'service-life.svg', 'application-outdoor.svg'],
    lifespan: 'Сухой остаток и режим нанесения в таблице относятся к огнезащитному составу ЭПОКСИ, а не к ТЕРМА ЭПОКСИ.',
    descriptionHeading: 'Слои конструктивной системы',
    techLead: 'Для системы и каждого компонента используйте собственный технологический документ; параметры ЭПОКСИ не переносятся на ТЕРМА ЭПОКСИ.',
    docsFolder: `${BRAND_ROOT}/ПИРОФЛЕКС СИСТЕМА-Т ЭПОКСИ`, excludeDocs: [/таблица расходов/i],
    expenseHeading: 'Расход каждого слоя по пределу и ПТМ',
    expenseTables: [{ file: 'docs/product-content/tables/system-t-epoxy.md', label: 'СИСТЕМА-Т ЭПОКСИ · R90–R150', source: `${BRAND_ROOT}/ПИРОФЛЕКС СИСТЕМА-Т ЭПОКСИ/ПИРОФЛЕКС СИСТЕМА-Т ЭПОКСИ_таблица расходов.pdf`, mode: 'wide' }],
    related: ['base', 'therma-epoxy', 'epoxy', 'finish'],
    storage: { range: 'условия компонентов различаются', period: 'проверять по ТУ и маркировке', note: 'Срок −40…+40 °C и 12 месяцев в каталоге относится к ЭПОКСИ, а не ко всем слоям системы.' },
    systemComponents: ['БАЗА', 'ТЕРМА ЭПОКСИ', 'ЭПОКСИ', 'ФИНИШ'],
    metaDescription: 'СИСТЕМА-Т ЭПОКСИ — конструктивная огнезащита металлоконструкций R90–R150. Состав слоёв, официальная таблица расхода, технология и документы.'
  }
];

const products = new Map([
  ['ultra', { nav: 'Пирофлекс Ультра', title: 'ПИРОФЛЕКС-УЛЬТРА', code: 'PX-U', image: 'branding/ультра 2.png', color: '#AC9354', href: 'ultra.html', short: 'Полиуретановое огнезащитное покрытие для металлоконструкций.' }],
  ['base', { nav: 'Пирофлекс База', title: 'ПИРОФЛЕКС-БАЗА', code: 'PX-B', image: 'branding/база 3.png', color: '#24AC84', href: 'base.html', short: 'Эпоксидный грунт для подготовки металлического основания.' }],
  ['finish', { nav: 'Пирофлекс Финиш', title: 'ПИРОФЛЕКС-ФИНИШ', code: 'PX-F', image: 'branding/финиш 3.png', color: '#AC55FF', href: 'finish.html', short: 'Защитно-декоративная акрил-уретановая эмаль.' }],
  ['acrylic', { nav: 'Пирофлекс Акрил', title: 'ПИРОФЛЕКС-АКРИЛ', code: 'PX-A', image: 'branding/акрил 1.png', color: '#F5F5F5', href: 'acrylic.html', short: 'Быстросохнущая огнезащитная краска для стальных конструкций.' }],
  ['epoxy', { nav: 'Пирофлекс Эпокси', title: 'ПИРОФЛЕКС-ЭПОКСИ', code: 'PX-E', image: 'branding/эпокси 4.png', color: '#D94E4E', href: 'epoxy.html', short: 'Эпоксидное покрытие для огнезащиты стальных конструкций.' }],
  ['therma-ultra', { nav: 'Пирофлекс Терма Ультра', title: 'ПИРОФЛЕКС-ТЕРМА УЛЬТРА', code: 'PX-T-U', image: 'branding/терма ультра 2.png', color: '#939393', href: 'therma-ultra.html', short: 'Теплоизоляционный слой системы СИСТЕМА-Т УЛЬТРА.' }],
  ['therma-epoxy', { nav: 'Пирофлекс Терма Эпокси', title: 'ПИРОФЛЕКС-ТЕРМА ЭПОКСИ', code: 'PX-T-E', image: 'branding/терма эпокси 2.png', color: '#939393', href: 'therma-epoxy.html', short: 'Теплоизоляционный слой системы СИСТЕМА-Т ЭПОКСИ.' }],
  ['cable', { nav: 'Пирофлекс Кабель', title: 'ПИРОФЛЕКС-КАБЕЛЬ', code: 'PX-C', image: 'branding/кабель 3.png', color: '#FF9F1C', href: 'cable.html', short: 'Водный огнезащитный состав для кабельных линий.' }],
  ['system-t-ultra', { nav: 'Пирофлекс Система-Т Ультра', title: 'ПИРОФЛЕКС СИСТЕМА-Т УЛЬТРА', code: 'PX-T-U', image: 'assets/site/images/system-t-ultra.png', color: '#939393', href: 'system-t-ultra.html', short: 'Система конструктивной огнезащиты на полиуретановой основе.' }],
  ['system-t-epoxy', { nav: 'Пирофлекс Система-Т Эпокси', title: 'ПИРОФЛЕКС СИСТЕМА-Т ЭПОКСИ', code: 'PX-T-E', image: 'assets/site/images/system-t-epoxy.png', color: '#939393', href: 'system-t-epoxy.html', short: 'Система конструктивной огнезащиты на эпоксидной основе.' }]
]);

const SYSTEM_SET = new Set(SYSTEM_ORDER);
const PAGE_FILES = Object.fromEntries([...products.entries()].map(([slug, meta]) => [slug, meta.href]));

function escapeHtml(value = '') {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function relativeHref(rootRelativePath) {
  const abs = path.resolve(ROOT, rootRelativePath);
  const from = path.relative(path.join(ROOT, 'products'), abs).replaceAll('\\', '/');
  return from.split('/').map((part) => encodeURIComponent(part)).join('/');
}

function splitSections(markdown) {
  const sections = new Map();
  let current = '';
  for (const line of markdown.replace(/^---\s*$/gm, '').split(/\r?\n/)) {
    const match = line.match(/^##\s+(.+?)\s*$/);
    if (match) {
      current = match[1];
      sections.set(current, []);
    } else if (current) {
      sections.get(current).push(line);
    }
  }
  return sections;
}

function plainMarkdown(value) {
  return String(value ?? '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<br\s*\/?\s*>/gi, ' ')
    .trim();
}

function paragraphs(lines = []) {
  const blocks = [];
  let current = [];
  const flush = () => {
    const value = current.join(' ').trim();
    current = [];
    if (value && !/^\|/.test(value) && !/^[-*]\s/.test(value) && !/^\d+\.\s/.test(value)) blocks.push(plainMarkdown(value));
  };
  for (const line of lines) {
    if (!line.trim()) flush();
    else if (/^\s*\|/.test(line) || /^\s*[-*]\s/.test(line) || /^\s*\d+\.\s/.test(line)) {
      flush();
    } else {
      current.push(line.trim());
    }
  }
  flush();
  return blocks.filter(Boolean);
}

function bulletItems(lines = []) {
  return lines.map((line) => line.match(/^\s*[-*]\s+(.+)$/)?.[1]).filter(Boolean).map(plainMarkdown);
}

function orderedItems(lines = []) {
  return lines.map((line) => line.match(/^\s*\d+\.\s+(.+)$/)?.[1]).filter(Boolean).map(plainMarkdown);
}

function findSection(sections, patterns) {
  const expressions = patterns.map((item) => item instanceof RegExp ? item : new RegExp(item, 'i'));
  for (const [heading, lines] of sections) {
    if (expressions.some((expression) => expression.test(heading))) return { heading, lines };
  }
  return { heading: '', lines: [] };
}

function markdownTable(lines = []) {
  const start = lines.findIndex((line) => /^\s*\|/.test(line));
  if (start < 0) return [];
  const tableLines = [];
  for (const line of lines.slice(start)) {
    if (!/^\s*\|/.test(line)) break;
    tableLines.push(line);
  }
  return tableLines
    .filter((line) => !/^\s*\|?\s*:?-{3,}/.test(line))
    .map((line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => plainMarkdown(cell.trim())));
}

function paragraphHtml(values, className = '') {
  if (!values.length) return '';
  return values.map((value, index) => `<p${className && index === 0 ? ` class="${className}"` : ''}>${escapeHtml(value)}</p>`).join('\n');
}

function renderDefinitionTable(rows, className = 'pf-spec-table') {
  if (rows.length < 2) return '';
  const bodyRows = rows.slice(1).filter((row) => row.some(Boolean));
  return `<table class="${className}">
  <caption class="pf-visually-hidden">Технические характеристики</caption>
  <thead><tr><th scope="col">${escapeHtml(rows[0][0])}</th><th scope="col">${escapeHtml(rows[0][1])}</th></tr></thead>
  <tbody>${bodyRows.map((row) => `<tr><th scope="row">${escapeHtml(row[0] ?? '')}</th><td>${escapeHtml(row[1] ?? '')}</td></tr>`).join('')}</tbody>
  </table>`;
}

function renderExpenseTable(rows, caption, mode, sourcePath) {
  if (rows.length < 2) return '';
  const head = rows[0];
  const body = rows.slice(1).filter((row) => row.some(Boolean));
  const header = head.map((cell, index) => `<th scope="col">${escapeHtml(cell).replace(/, /g, '<br>')}</th>`).join('');
  const highlightedPtms = new Set(['3,4', '5,8']);
  const content = body.map((row) => {
    const isHighlighted = highlightedPtms.has(String(row[0] ?? '').trim());
    const cells = row.map((cell, index) => index === 0
      ? `<th scope="row">${escapeHtml(cell)}</th>`
      : `<td>${escapeHtml(cell)}</td>`).join('');
    return `<tr${isHighlighted ? ' class="is-highlight"' : ''}>${cells}</tr>`;
  }).join('\n');
  const wideClass = mode === 'wide' || head.length > 7 ? ' pf-expense-grid--ugv' : '';
  return `<details class="pf-expense-table" open>
    <summary><span>${escapeHtml(caption)}</span><span>${body.length} строк · ${head.length} параметров</span></summary>
    <div class="pf-expense-table__source"><a href="${relativeHref(sourcePath)}" target="_blank" rel="noopener">Открыть исходную таблицу PDF</a></div>
    <div class="pf-expense-scroll" role="region" aria-label="${escapeHtml(caption)}" tabindex="0">
      <table class="pf-expense-grid${wideClass}">
        <caption class="pf-visually-hidden">${escapeHtml(caption)}</caption>
        <thead><tr>${header}</tr></thead>
        <tbody>${content}</tbody>
      </table>
    </div>
  </details>`;
}

function documentKind(filename) {
  if (/сертификат|\bСС\b|_СС|соответствия/i.test(filename)) return 'Сертификат соответствия';
  if (/экспертн|\bЭЗ\b/i.test(filename)) return 'Экспертное заключение';
  if (/свидетельство|\bСГР\b/i.test(filename)) return 'Свидетельство о государственной регистрации';
  if (/паспорт безопасности/i.test(filename)) return 'Паспорт безопасности';
  if (/характеристик/i.test(filename)) return 'Технические характеристики';
  if (/\bТУ\b|^ТУ_|_ТУ\b|ТУ_/i.test(filename)) return 'Технические условия';
  if (/\bТР №/i.test(filename)) return 'Технологический регламент';
  if (/протокол|\bПИ\b|^ПИ[_\s]/i.test(filename)) return 'Протокол испытаний';
  if (/таблица расходов/i.test(filename)) return 'Таблица расходов';
  return 'Официальный документ';
}

function documentTitle(filename) {
  let title = filename.replace(/\.pdf$/i, '').replaceAll('_', ' ').replace(/\s+/g, ' ').trim();
  title = title.replace(/^ПИРОФЛЕКС\s*/i, '').replace(/^ПИ\s+/i, 'Протокол испытаний ');
  title = title.replace(/^ПИРОФЛЕКС\s+/, '').replace(/\s+экз\.\s*№?\s*1$/i, '');
  title = title.replace(/^СС\s+/, 'Сертификат соответствия ');
  title = title.replace(/^СГР\s+/, 'Свидетельство о государственной регистрации ');
  title = title.replace(/^ТУ\s+/i, '');
  return title;
}

async function collectDocuments(page) {
  const folder = path.resolve(ROOT, page.docsFolder);
  const names = await readdir(folder);
  return names.filter((name) => name.toLowerCase().endsWith('.pdf'))
    .filter((name) => !(page.excludeDocs ?? []).some((pattern) => pattern.test(name)))
    .filter((name) => !page.onlyDocs || page.onlyDocs.some((pattern) => pattern.test(name)))
    .sort((a, b) => documentKind(a).localeCompare(documentKind(b), 'ru') || a.localeCompare(b, 'ru'))
    .map((name) => ({ filename: name, title: documentTitle(name), kind: documentKind(name), path: path.posix.join(page.docsFolder.replaceAll('\\', '/'), name) }));
}

function renderDocuments(page, files, certLines) {
  const intro = paragraphs(certLines);
  const rows = files.map((file) => `<a class="pf-detail-document" href="${relativeHref(file.path)}" target="_blank" rel="noopener">
    <img src="${relativeHref(`assets/site/icons/${page.iconFolder}/certificate-check.svg`)}" width="36" height="36" alt="" aria-hidden="true">
    <span class="pf-detail-document__copy"><small>${escapeHtml(file.kind)}</small><strong>${escapeHtml(file.title)}</strong></span>
    <span class="pf-detail-document__open">Открыть PDF</span>
  </a>`).join('\n');
  const noCertificate = files.some((file) => /сертификат/i.test(file.kind)) ? '' : '<p class="pf-detail-document__notice">В переданном комплекте отдельный файл сертификата для этого материала не обнаружен. Нормативные ссылки в каталоге приведены отдельно от списка доступных файлов.</p>';
  return `<section class="pf-detail-documents" id="documents" aria-labelledby="documents-title">
  <div class="pf-detail-documents__heading pf-container">
    <div><p class="pf-eyebrow pf-eyebrow--icon"><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/certification.svg`)}" alt="" aria-hidden="true">Документы продукта</p><h2 id="documents-title">${escapeHtml(page.docHeading ?? `Документы — ${page.title}`)}</h2>${paragraphHtml(intro)}</div>
  </div>
  <div class="pf-container"><div class="pf-detail-documents__files">${rows || '<p>Локальные официальные файлы для страницы не найдены.</p>'}</div>${noCertificate}</div>
</section>`;
}

function renderBenefits(page, benefits) {
  const items = benefits.length ? benefits.map((text, index) => {
    const title = page.benefitTitles[index] ?? text.split(/[.;:]/, 1)[0];
    const icon = page.benefitIcons[index % page.benefitIcons.length] ?? 'verified.svg';
    return `<li><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/${icon}`)}" width="36" height="36" alt="" aria-hidden="true"><div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(text)}</span></div></li>`;
  }).join('\n') : '';
  const highlight = page.lifespan ? `<div class="pf-detail-benefits__lifespan"><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/verified.svg`)}" width="36" height="36" alt="" aria-hidden="true"><strong>${escapeHtml(page.lifespan)}</strong></div>` : '';
  return `<section class="pf-section pf-section--dark pf-detail-benefits" id="benefits" aria-labelledby="benefits-title">
    <div class="pf-container"><div class="pf-heading"><p class="pf-eyebrow pf-eyebrow--icon"><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/verified.svg`)}" alt="" aria-hidden="true">${escapeHtml(page.benefitLabel ?? (page.kind === 'system' ? 'Система и эксплуатация' : 'Свойства материала'))}</p><h2 id="benefits-title">${escapeHtml(page.benefitHeading)}</h2><p class="pf-section-lead">${escapeHtml(page.benefitLead)}</p></div>
    <ul class="pf-detail-benefits__list">${items}</ul>${highlight}</div>
  </section>`;
}

function relatedMarkup(page) {
  if (!page.related.length) {
    return `<div class="pf-detail-related__note"><p>Для кабельных линий применяется самостоятельный материал ПИРОФЛЕКС-КАБЕЛЬ. Грунты и эмали для металлических конструкций каталогом как сопутствующие покрытия не назначены.</p></div>`;
  }
  return `<div class="pf-related-materials">${page.related.map((slug) => {
    const item = products.get(slug);
    const pageHref = item.href;
    const imageHref = relativeHref(item.image);
    return `<article class="pf-related-material" style="--pf-related-accent:${item.color}">
      <img src="${imageHref}" width="1200" height="1200" alt="${escapeHtml(item.title)}" loading="lazy">
      <div><p class="pf-related-material__code">${escapeHtml(item.code)}</p><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.short)}</p><a class="pf-text-link" href="${pageHref}">Подробнее о продукте</a></div>
    </article>`;
  }).join('\n')}</div>`;
}

function renderSystemLayers(page, descriptionLines) {
  if (page.kind !== 'system') return '';
  const items = orderedItems(descriptionLines);
  if (!items.length) return '';
  const slugByName = [
    ['БАЗА', 'base'], ['ТЕРМА УЛЬТРА', 'therma-ultra'], ['УЛЬТРА', 'ultra'], ['ТЕРМА ЭПОКСИ', 'therma-epoxy'], ['ЭПОКСИ', 'epoxy'], ['ФИНИШ', 'finish']
  ];
  const layerHtml = items.map((item, index) => {
    const normalized = item.toUpperCase();
    const slug = slugByName.find(([name]) => normalized.includes(name))?.[1];
    const product = slug ? products.get(slug) : null;
    const image = product ? relativeHref(product.image) : relativeHref(`assets/site/icons/${page.iconFolder}/technical-characteristics.svg`);
    const label = product?.title ?? 'Металлическое основание';
    const desc = product ? item.replace(new RegExp(`^.*?${product.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'i'), '').replace(/^[-—,:\s]+/, '') : 'Основание конструкции';
    const layerHref = product ? `<a href="${product.href}">Страница материала</a>` : '';
    return `<li style="--pf-layer-accent:${product?.color ?? page.secondary ?? page.accent}"><span class="pf-system-layer__index">${String(index + 1).padStart(2, '0')}</span><img src="${image}" width="64" height="64" alt="" aria-hidden="true"><div><strong>${escapeHtml(label)}</strong><span>${escapeHtml(desc || item)}</span>${layerHref}</div></li>`;
  }).join('\n');
  return `<div class="pf-system-layers"><p class="pf-system-layers__title">Слои снизу вверх</p><ol>${layerHtml}</ol></div>`;
}

function renderTech(page, technologyLines, technologyParas) {
  const items = bulletItems(technologyLines);
  const steps = items.map((item, index) => {
    const splitAt = item.search(/[.;:]/);
    const title = splitAt > 12 && splitAt < 72 ? item.slice(0, splitAt) : `Этап ${index + 1}`;
    const body = title === `Этап ${index + 1}` ? item : item.slice(splitAt + 1).trim() || item;
    const icon = page.techIcons?.[index] ?? ['preparation.svg', 'primer.svg', 'application-conditions.svg', 'equipment.svg', 'layer-thickness.svg', 'drying.svg', 'safety.svg'][index % 7];
    return `<li><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/${icon}`)}" width="36" height="36" alt="" aria-hidden="true"><div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(body)}</span></div></li>`;
  }).join('\n');
  const body = items.length ? `<ol class="pf-detail-steps">${steps}</ol>` : `<div class="pf-detail-tech-prose">${paragraphHtml(technologyParas)}</div>`;
  return `<section class="pf-section pf-section--light pf-detail-application-tech" id="application-technology" aria-labelledby="technology-title">
    <div class="pf-container"><div class="pf-heading pf-detail-tech-heading"><p class="pf-eyebrow pf-eyebrow--icon"><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/preparation.svg`)}" alt="" aria-hidden="true">Технология нанесения</p><h2 id="technology-title">${escapeHtml(page.techHeading ?? 'Подготовка и условия работ')}</h2><p class="pf-section-lead">${escapeHtml(page.techLead)}</p></div>${body}</div>
  </section>`;
}

function renderStorage(page, storageLines) {
  const sourceText = paragraphs(storageLines);
  return `<section class="pf-detail-storage" id="storage" aria-labelledby="storage-title">
    <div class="pf-container pf-detail-storage__inner"><div class="pf-detail-storage__top">
      <div class="pf-detail-storage__intro"><p class="pf-eyebrow pf-eyebrow--icon"><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/storage-condition.svg`)}" alt="" aria-hidden="true">Хранение</p><h2 id="storage-title">${escapeHtml(page.storageHeading ?? 'Условия хранения')}</h2>${paragraphHtml(sourceText, '')}</div>
      <p class="pf-detail-storage__temperature"><strong>${escapeHtml(page.storage.range)}</strong><span>${escapeHtml(page.storage.period)}</span></p>
    </div>
    <div class="pf-detail-storage__facts"><div><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/storage-condition.svg`)}" width="36" height="36" alt="" aria-hidden="true"><p><strong>Хранение и перевозка</strong><span>${escapeHtml(page.storage.note)}</span></p></div><div><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/storage-period.svg`)}" width="36" height="36" alt="" aria-hidden="true"><p><strong>${escapeHtml(page.storage.period)}</strong><span>Условия и срок проверяйте по документам конкретного материала и маркировке партии.</span></p></div></div>
    <p class="pf-detail-storage__note">Не допускайте применения материала с нарушенной упаковкой или истёкшим сроком хранения.</p></div>
  </section>`;
}

function navLists(currentSlug) {
  const productsHtml = PRODUCT_ORDER.map((slug) => {
    const item = products.get(slug);
    const current = slug === currentSlug ? ' aria-current="page"' : '';
    const href = slug === currentSlug ? '#top' : item.href;
    return `<a href="${href}"${current}>${escapeHtml(item.nav)}</a>`;
  }).join('');
  const systemsHtml = SYSTEM_ORDER.map((slug) => {
    const item = products.get(slug);
    const current = slug === currentSlug ? ' aria-current="page"' : '';
    const href = slug === currentSlug ? '#top' : item.href;
    return `<a href="${href}"${current}>${escapeHtml(item.nav)}</a>`;
  }).join('');
  return { productsHtml, systemsHtml };
}

function headerMarkup(page) {
  const { productsHtml, systemsHtml } = navLists(page.slug);
  return `<header class="pf-header" id="top">
    <a class="pf-brand" href="../index.html" aria-label="ПИРОФЛЕКС — на главную"><img src="../assets/site/pyroflex-logo.svg" alt="ПИРОФЛЕКС"></a>
    <button class="pf-menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" aria-label="Открыть меню"><span></span><span></span><span></span></button>
    <nav class="pf-nav" id="site-navigation" aria-label="Основная навигация">
      <div class="pf-nav__links">
        <details class="pf-nav-group"><summary class="pf-nav__link">Продукты</summary><div class="pf-nav__dropdown">${productsHtml}</div></details>
        <details class="pf-nav-group"><summary class="pf-nav__link">Системы</summary><div class="pf-nav__dropdown">${systemsHtml}</div></details>
        <a class="pf-nav__link" href="../services.html">Сервисы</a><a class="pf-nav__link" href="../documents.html?product=${page.slug}">Документы</a>
        <a class="pf-nav__link" href="../partners.html">Партнерам</a><a class="pf-nav__link" href="../contacts.html">Контакты</a>
      </div>
      <div class="pf-header__actions"><div class="pf-header__contacts"><a href="tel:88001018112">8 (800) 101-8-112</a><a href="mailto:office@pyroflex.ru">office@pyroflex.ru</a></div>
        <a class="pf-button pf-button--small" href="../contacts.html">Связаться</a>
        <details class="pf-locale"><summary aria-label="Выбрать язык"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.1-3.3-8.5s1.1-6.2 3.3-8.5Z"/></svg> RU</summary><div><a href="../index.html" lang="ru">RU Russian</a><a href="../en/index.html" lang="en">EN English</a></div></details>
      </div>
    </nav>
  </header>`;
}

function footerMarkup(page = null) {
  const { productsHtml, systemsHtml } = navLists('');
  return `<footer class="pf-footer"><div class="pf-container"><div class="pf-footer__main">
    <div class="pf-footer__brand"><a href="../index.html" aria-label="ПИРОФЛЕКС — на главную"><img src="../assets/site/pyroflex-logo.svg" alt="ПИРОФЛЕКС"></a><a href="tel:88001018112">8 (800) 101-8-112</a><a href="mailto:office@pyroflex.ru">office@pyroflex.ru</a></div>
    <div class="pf-footer__column"><h2>Продукты</h2>${PRODUCT_ORDER.map((slug) => `<a href="${products.get(slug).href}">${escapeHtml(products.get(slug).nav)}</a>`).join('')}</div>
    <div class="pf-footer__column"><h2>Системы</h2>${SYSTEM_ORDER.map((slug) => `<a href="${products.get(slug).href}">${escapeHtml(products.get(slug).nav)}</a>`).join('')}</div>
    <div class="pf-footer__column"><h2>Навигация</h2><a href="../services.html">Сервисы</a><a href="../documents.html${page ? `?product=${page.slug}` : ''}">Документы</a><a href="../partners.html">Партнерам</a><a href="../index.html#applications">Области применения</a><a href="../contacts.html">Контакты</a></div>
  </div><div class="pf-footer__bottom"><span>© 2026 ООО «ПИРОФЛЕКС»</span><a href="../privacy/index.html">Политика конфиденциальности</a></div>
  <p class="pf-legal-note">Визуальные материалы используются в информационных целях. Внешний вид продукции и упаковки может отличаться от представленного на изображениях, при этом технические характеристики, составы и показатели огнезащитной эффективности соответствуют нормативной и технической документации.</p></div></footer>`;
}

function productSchema(page) {
  const facts = page.facts.map(([icon, value, label]) => ({ '@type': 'PropertyValue', name: label, value }));
  return {
    '@context': 'https://schema.org', '@type': 'Product', name: page.title,
    description: page.metaDescription, sku: page.code, category: page.category,
    brand: { '@type': 'Brand', name: 'ПИРОФЛЕКС' }, manufacturer: { '@type': 'Organization', name: 'ООО «ПИРОФЛЕКС»' },
    additionalProperty: facts
  };
}

async function buildPage(page, sections, docs) {
  const productName = page.title.replace(/^ПИРОФЛЕКС\s*/, 'ПИРОФЛЕКС ');
  const first = findSection(sections, [/первый экран/i, /описание и применение/i]);
  const firstParas = paragraphs(first.lines).filter((value) => !/^Метки/i.test(value));
  const area = findSection(sections, [/^Область применения$/i]);
  const areaParagraphs = paragraphs(area.lines);
  const benefitsBlock = findSection(sections, [/^Преимущества/i]);
  const benefits = page.benefitsOverride ?? bulletItems(benefitsBlock.lines);
  const description = findSection(sections, [/^Описание материала$/i, /^Состав и визуальные материалы$/i, /^Описание и применение$/i]);
  const techSpecs = findSection(sections, [/^Технические характеристики/i, /^Технические данные$/i]);
  const specRows = markdownTable(techSpecs.lines);
  const certification = findSection(sections, [/^Сертификация/i, /^Документы$/i]);
  const expenses = findSection(sections, [/^Расход$/i]);
  const technology = findSection(sections, [/^Технология нанесения$/i]);
  const storage = findSection(sections, [/^Хранение$/i]);
  const tagsSource = first.lines.find((line) => /\*\*Метки/.test(line)) ?? '';
  const tags = tagsSource.replace(/^.*?\*\*Метки[^:]*:\*\*\s*/i, '').split('·').map(plainMarkdown).filter(Boolean);
  const technologyParas = paragraphs(technology.lines);
  const systemLayers = page.kind === 'system' ? renderSystemLayers(page, description.lines) : '';
  const descriptionParas = paragraphs(description.lines);
  const descriptionHeading = page.descriptionHeading ?? (description.heading === 'Состав и визуальные материалы' ? 'Состав системы' : 'Описание материала');
  const applicationIcons = page.applications.map(([icon, label]) => `<li><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/${icon}`)}" width="36" height="36" alt="" aria-hidden="true"><span>${escapeHtml(label)}</span></li>`).join('');
  const applicationText = areaParagraphs.length ? areaParagraphs : firstParas;
  const factHtml = page.facts.length ? `<section class="pf-detail-facts" id="quickfacts" aria-label="Ключевые характеристики ${escapeHtml(page.title)}"><div class="pf-container pf-detail-facts__grid" style="--pf-fact-count:${page.facts.length}">${page.facts.map(([icon, value, label]) => `<div><div class="pf-detail-facts__value"><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/${icon}`)}" width="36" height="36" alt="" aria-hidden="true"><strong>${escapeHtml(value)}</strong></div><span>${escapeHtml(label)}</span></div>`).join('')}</div></section>` : '';
  const expensesText = paragraphs(expenses.lines);
  const expenseTables = await Promise.all(page.expenseTables.map(async (table) => {
    const md = await readFile(path.resolve(ROOT, table.file), 'utf8');
    // Expense files use a top-level H1, so they are not included by the H2-only
    // content parser. Read the first Markdown table directly from the file.
    const rows = markdownTable(md.split(/\r?\n/));
    return renderExpenseTable(rows, table.label, table.mode, table.source);
  }));
  const expenseContent = expenseTables.length ? expenseTables.join('\n') : `<div class="pf-expense-note"><p>${escapeHtml(page.expenseNote ?? expensesText.join(' '))}</p></div>`;
  const jsonLd = JSON.stringify(productSchema(page)).replaceAll('<', '\\u003c');
  const subtitle = page.heroLead ?? firstParas.join(' ');
  const secondary = page.secondary ? `; --pf-product-secondary:${page.secondary}` : '';
  const labelForBenefits = page.benefitLabel ?? (page.kind === 'system' ? 'Система и эксплуатация' : 'Свойства материала');
  const docsSection = renderDocuments(page, docs, certification.lines);
  const materialClass = page.kind === 'system' ? ' pf-detail-material--system' : '';
  const materialNote = tags.length ? `<ul class="pf-detail-tags" aria-label="Ключевые свойства">${tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>` : '';
  const techSection = renderTech(page, technology.lines, technologyParas);
  const schemaTitle = `${page.title} — ПИРОФЛЕКС`;
  const appHeading = page.areaHeading ?? 'Область применения';
  const storageSection = renderStorage(page, storage.lines);
  const relatedTitle = page.relatedHeading ?? (page.kind === 'system' ? 'Материалы системы' : page.related.length ? 'Сопутствующие материалы' : 'Связанные решения');
  const titleId = page.slug.replaceAll('-', '') + '-title';
  const headingId = page.slug.replaceAll('-', '') + '-application-title';
  const htmlSections = `
    <section class="pf-detail-hero pf-section--dark" id="overview" aria-labelledby="${titleId}">
      <div class="pf-container pf-detail-hero__inner"><div class="pf-detail-hero__copy">
        <p class="pf-detail-code"><span>${escapeHtml(page.code)}</span><span>${page.tu ? `ТУ ${escapeHtml(page.tu)}` : 'СИСТЕМА-Т · технические документы по компонентам'}</span></p>
        <h1 id="${titleId}">${escapeHtml(page.title)}</h1><p class="pf-detail-hero__category">${escapeHtml(page.category)}</p>
        <p class="pf-detail-hero__lead">${escapeHtml(subtitle)}</p>${materialNote}
        <div class="pf-detail-hero__actions"><a class="pf-button" href="#expenses">${page.expenseTables.length ? 'Таблицы расходов' : 'Условия применения'}</a><a class="pf-text-link" href="#documents">Документы и регламенты</a></div>
      </div><figure class="pf-detail-hero__visual"><img src="${relativeHref(page.heroImage)}" width="1200" height="1200" alt="${escapeHtml(page.heroAlt)}"></figure></div>
      <a class="pf-detail-scroll" href="#application" aria-label="Перейти к области применения"><span></span></a>
    </section>
    ${factHtml}
    <section class="pf-section pf-section--light pf-detail-application" id="application" aria-labelledby="${headingId}">
      <div class="pf-container pf-detail-application__grid"><div class="pf-detail-copy">
        <p class="pf-eyebrow pf-eyebrow--icon"><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/application-industrial.svg`)}" width="36" height="36" alt="" aria-hidden="true">Область применения</p>
        <h2 id="${headingId}">${escapeHtml(appHeading)}</h2>${paragraphHtml(applicationText, 'pf-section-lead')}
        <ul class="pf-detail-applications" aria-label="Объекты и условия применения">${applicationIcons}</ul>
        ${page.kind === 'system' ? `<p class="pf-detail-note">${page.slug === 'system-t-ultra' ? 'Наружная область, климатическая зона и финишный слой определяются проектом и подтверждённым системным регламентом.' : 'Для открытой атмосферы каталог предусматривает защитно-декоративный слой ПИРОФЛЕКС-ФИНИШ.'}</p>` : ''}
      </div><figure class="pf-detail-application__visual"><img src="${relativeHref(page.areaImage)}" width="1230" height="812" alt="${escapeHtml(page.areaAlt)}" loading="lazy"></figure></div>
    </section>
    ${renderBenefits(page, benefits)}
    <section class="pf-section pf-section--light pf-detail-specs${materialClass}" id="specifications" aria-labelledby="specifications-title">
      <div class="pf-container pf-detail-specs__grid"><div class="pf-detail-copy">
        <p class="pf-eyebrow pf-eyebrow--icon"><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/material-description.svg`)}" width="36" height="36" alt="" aria-hidden="true">${page.kind === 'system' ? 'Состав системы' : 'Описание материала'}</p>
        <h2 id="specifications-title">${escapeHtml(descriptionHeading)}</h2>${paragraphHtml(descriptionParas)}${systemLayers}
      </div><div class="pf-detail-specs__table-wrap">
        <p class="pf-detail-subheading"><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/technical-characteristics.svg`)}" width="36" height="36" alt="" aria-hidden="true">${page.kind === 'system' ? 'Технические характеристики системы' : 'Технические характеристики'}</p>
        ${specRows.length > 1 ? renderDefinitionTable(specRows) : `<div class="pf-detail-data-note"><strong>Отдельная таблица характеристик не приведена</strong><p>${escapeHtml(page.slug === 'therma-ultra' || page.slug === 'therma-epoxy' ? 'Каталог показывает этот материал как компонент системы. Системные характеристики не относятся автоматически к отдельному компоненту.' : techSpecs.heading ? paragraphs(techSpecs.lines).join(' ') : 'Используйте подтверждённые условия и официальные документы, перечисленные ниже.')}</p></div>`}
      </div></div>
    </section>
    ${docsSection}
    <section class="pf-section pf-section--dark pf-detail-expenses" id="expenses" aria-labelledby="expenses-title">
      <div class="pf-container"><div class="pf-heading"><p class="pf-eyebrow pf-eyebrow--icon"><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/consumption.svg`)}" width="36" height="36" alt="" aria-hidden="true">Толщина и расход</p><h2 id="expenses-title">${escapeHtml(page.expenseHeading)}</h2>${paragraphHtml(expensesText, 'pf-section-lead')}</div>
      ${page.expenseTables.length ? '<p class="pf-detail-expenses__note">ПТМ — приведённая толщина металла. Сверяйте толщину и расход каждого слоя по требуемому пределу огнестойкости; пустые значения в официальной таблице обозначены тире.</p>' : ''}${expenseContent}</div>
    </section>
    ${techSection}
    ${storageSection}
    <section class="pf-section pf-section--dark pf-detail-related" id="related-materials" aria-labelledby="related-title"><div class="pf-container">
      <div class="pf-heading"><p class="pf-eyebrow pf-eyebrow--icon"><img src="${relativeHref(`assets/site/icons/${page.iconFolder}/related-materials.svg`)}" width="36" height="36" alt="" aria-hidden="true">${page.kind === 'system' ? 'Слои и компоненты' : 'Сопутствующие материалы'}</p><h2 id="related-title">${escapeHtml(relatedTitle)}</h2><p class="pf-section-lead">${escapeHtml(page.kind === 'system' ? 'Последовательность слоёв и состав проверяйте по проекту и регламенту системы.' : 'Выбирайте совместимые материалы по проектному решению и условиям эксплуатации.')}</p></div>
      ${relatedMarkup(page)}
    </div></section>
    <section class="pf-detail-contact" id="contact" aria-labelledby="contact-title"><div class="pf-container pf-detail-contact__inner"><div><p class="pf-eyebrow">Подбор для конкретного объекта</p><h2 id="contact-title">Обсудите решение с командой ПИРОФЛЕКС</h2></div><div class="pf-detail-contact__actions"><a class="pf-button" href="../index.html#contacts">Связаться с командой</a><a href="tel:88001018112">8 (800) 101-8-112</a><a href="mailto:office@pyroflex.ru">office@pyroflex.ru</a></div></div></section>`;
  const navItems = [
    ['overview', 'Обзор'], ['application', 'Применение'], ['benefits', page.kind === 'product' && page.slug.startsWith('therma-') ? 'Роль в системе' : 'Преимущества'],
    ['specifications', 'Характеристики'], ['documents', 'Документы'], ['expenses', 'Расход'], ['application-technology', 'Нанесение'], ['storage', 'Хранение'], ['related-materials', page.kind === 'system' ? 'Слои' : 'Материалы']
  ];
  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#000000">
  <meta name="description" content="${escapeHtml(page.metaDescription)}"><meta name="author" content="ПИРОФЛЕКС">
  <meta property="og:type" content="product"><meta property="og:locale" content="ru_RU"><meta property="og:site_name" content="ПИРОФЛЕКС">
  <meta property="og:title" content="${escapeHtml(schemaTitle)}"><meta property="og:description" content="${escapeHtml(page.metaDescription)}">
  <title>${escapeHtml(schemaTitle)}</title>
  <link rel="icon" href="../assets/site/pyroflex-logo.svg" type="image/svg+xml">
  <link rel="preload" href="../assets/site/fonts/original-JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="../assets/site/fonts.css"><link rel="stylesheet" href="../assets/site/site.css"><link rel="stylesheet" href="../assets/site/product-detail.css?v=23">
  <script src="../assets/site/site.js?v=3" defer></script>
  <script type="application/ld+json">${jsonLd}</script>
</head>
<body class="pf-product-detail pf-product-detail--${page.slug}" style="--pf-product-accent:${page.accent};--pf-product-accent-ink:${page.accentInk}${secondary}">
  <a class="pf-skip-link" href="#main">Перейти к содержимому</a>
  ${headerMarkup(page)}
  <nav class="pf-detail-subnav" aria-label="Навигация по странице ${escapeHtml(page.title)}"><div class="pf-detail-subnav__links">${navItems.map(([id, label], index) => `<a href="#${id}"${index === 0 ? ' aria-current="location"' : ''}>${escapeHtml(label)}</a>`).join('')}</div></nav>
  <main id="main">${htmlSections}</main>
  ${footerMarkup(page)}
  <dialog class="pf-image-dialog" aria-label="Просмотр документа"><button type="button" class="pf-image-dialog__close" aria-label="Закрыть просмотр">×</button><img alt=""></dialog>
</body>
</html>`;
}

async function createIconVariants(page) {
  const sourceDirectories = [path.resolve(ROOT, 'assets/site/icons'), path.resolve(ROOT, 'assets/site/icons/ultra')];
  const targetDirectory = path.resolve(ROOT, 'assets/site/icons', page.iconFolder);
  await mkdir(targetDirectory, { recursive: true });
  // Use the project's shared icon assets together with the expanded Ultra page
  // icon collection. The page set intentionally keeps the Ultra version when
  // both sources have a file with the same name.
  const filenames = new Set();
  for (const sourceDirectory of sourceDirectories) {
    for (const filename of await readdir(sourceDirectory)) {
      if (filename.endsWith('.svg') && !['ultra'].includes(filename)) filenames.add(filename);
    }
  }
  const ultraFiles = await readdir(sourceDirectories[1]);
  for (const filename of ultraFiles) if (filename.endsWith('.svg')) filenames.add(filename);
  await Promise.all([...filenames].map(async (filename) => {
    const preferredDirectory = ultraFiles.includes(filename) ? sourceDirectories[1] : sourceDirectories[0];
    const source = await readFile(path.join(preferredDirectory, filename), 'utf8');
    const copy = source.replace(/#[0-9a-f]{6}/gi, page.accent);
    await writeFile(path.join(targetDirectory, filename), copy, 'utf8');
  }));
}

async function updateSiteNavigation() {
  const indexPath = path.resolve(ROOT, 'index.html');
  let html = await readFile(indexPath, 'utf8');
  const { productsHtml, systemsHtml } = navLists('');
  html = html.replace(/<details class="pf-nav-group"><summary class="pf-nav__link">Продукты<\/summary>[\s\S]*?<\/details>/, `<details class="pf-nav-group"><summary class="pf-nav__link">Продукты</summary><div class="pf-nav__dropdown">${PRODUCT_ORDER.map((slug) => `<a href="products/${PAGE_FILES[slug]}">${escapeHtml(products.get(slug).nav)}</a>`).join('')}</div></details>`);
  html = html.replace(/<details class="pf-nav-group"><summary class="pf-nav__link">Системы<\/summary>[\s\S]*?<\/details>/, `<details class="pf-nav-group"><summary class="pf-nav__link">Системы</summary><div class="pf-nav__dropdown">${SYSTEM_ORDER.map((slug) => `<a href="products/${PAGE_FILES[slug]}">${escapeHtml(products.get(slug).nav)}</a>`).join('')}</div></details>`);
  html = html.replaceAll('href="#documents"', 'href="documents.html"').replaceAll('href="#contacts"', 'href="contacts.html"');
  html = html.replaceAll('href="#services"', 'href="services.html"').replaceAll('href="#partners"', 'href="partners.html"');
  html = html.replace('assets/site/site.js"', 'assets/site/site.js?v=3"');
  html = html.replace(/href="https:\/\/docs\.yandex\.ru\/docs\/view\?[^\"]+"/i, `href="${encodeURI('branding/пирофлекс каталог-сжатый (1).pdf')}"`);
  html = html.replace(/<div class="pf-footer__column"><h2>Продукты<\/h2>[\s\S]*?<\/div>/, `<div class="pf-footer__column"><h2>Продукты</h2>${PRODUCT_ORDER.map((slug) => `<a href="products/${PAGE_FILES[slug]}">${escapeHtml(products.get(slug).nav)}</a>`).join('')}</div>`);
  html = html.replace(/<div class="pf-footer__column"><h2>Системы<\/h2>[\s\S]*?<\/div>/, `<div class="pf-footer__column"><h2>Системы</h2>${SYSTEM_ORDER.map((slug) => `<a href="products/${PAGE_FILES[slug]}">${escapeHtml(products.get(slug).nav)}</a>`).join('')}</div>`);
  const cardRoutes = [
    ['product-ultra', 'ultra'], ['product-base', 'base'], ['product-finish', 'finish'], ['product-acrylic', 'acrylic'], ['product-epoxy', 'epoxy'],
    ['product-therma-ultra', 'therma-ultra'], ['product-therma-epoxy', 'therma-epoxy'], ['system-t-ultra', 'system-t-ultra'], ['system-t-epoxy', 'system-t-epoxy'], ['product-cable', 'cable']
  ];
  for (const [sectionId, slug] of cardRoutes) {
    const idPattern = new RegExp(`(<(?:article|div)[^>]*id="${sectionId}"[^>]*>[\\s\\S]*?)(<\\/(?:article|div)>)`, 'm');
    html = html.replace(idPattern, (whole, before, close) => {
      const link = `<a class="pf-text-link pf-product__document" href="products/${PAGE_FILES[slug]}">Подробная страница продукта</a>`;
      const existing = before.match(/<a[^>]*class="[^"]*pf-product__document[^"]*"[^>]*>[\s\S]*?<\/a>/);
      const clean = existing ? before.replace(existing[0], link) : before.replace(/<a[^>]*href="https:\/\/disk\.yandex\.ru[^>]*>[\s\S]*?<\/a>/, link);
      return clean + close;
    });
  }
  for (const [sectionId, slug] of cardRoutes) {
    const idIndex = html.indexOf(`id="${sectionId}"`);
    if (idIndex < 0) continue;
    const openStart = html.lastIndexOf(sectionId.startsWith('system-') ? '<article' : '<article', idIndex);
    const closeEnd = html.indexOf('</article>', idIndex) + '</article>'.length;
    if (openStart < 0 || closeEnd < '</article>'.length) continue;
    const block = html.slice(openStart, closeEnd);
    const replacement = `<a class="pf-text-link pf-product__document" href="products/${PAGE_FILES[slug]}">Подробная страница продукта</a>`;
    const updated = block.replace(/<a\b[^>]*href="https:\/\/disk\.yandex\.ru[^\"]*"[^>]*>[\s\S]*?<\/a>/i, replacement);
    if (updated !== block) html = html.slice(0, openStart) + updated + html.slice(closeEnd);
  }
  html = html.replace(/<section class="pf-section pf-section--dark pf-cable" id="product-cable"[\s\S]*?<\/section>/, (section) => section.replace(/<a[^>]*href="https:\/\/disk\.yandex\.ru[^>]*>Сертификаты<\/a>/, '<a class="pf-text-link" href="products/cable.html">Подробная страница ПИРОФЛЕКС-КАБЕЛЬ</a>'));
  // The Base and Finish content is nested in a combined article; replace legacy cloud links by local product routes.
  html = html.replace(/<div id="product-base">([\s\S]*?)<\/div>/, (whole, inner) => `<div id="product-base">${inner.replace(/<a[^>]*href="https:\/\/disk\.yandex\.ru[^>]*>Сертификаты<\/a>/, '<a class="pf-text-link" href="products/base.html">Подробная страница ПИРОФЛЕКС-БАЗА</a>')}</div>`);
  html = html.replace(/<div id="product-finish">([\s\S]*?)<\/div>/, (whole, inner) => `<div id="product-finish">${inner.replace(/<a[^>]*href="https:\/\/disk\.yandex\.ru[^>]*>Сертификаты<\/a>/, '<a class="pf-text-link" href="products/finish.html">Подробная страница ПИРОФЛЕКС-ФИНИШ</a>')}</div>`);
  await writeFile(indexPath, html, 'utf8');

  const englishIndexPath = path.resolve(ROOT, 'en/index.html');
  let english = await readFile(englishIndexPath, 'utf8');
  english = english.replaceAll('href="#documents"', 'href="documents.html"').replaceAll('href="#contacts"', 'href="contacts.html"');
  english = english.replaceAll('href="#services"', 'href="services.html"').replaceAll('href="#partners"', 'href="partners.html"');
  english = english.replace('assets/site/site.js"', 'assets/site/site.js?v=3"');
  english = english.replace(/href="https:\/\/docs\.yandex\.ru\/docs\/view\?[^\"]+"/i, `href="../${encodeURI('branding/пирофлекс каталог-сжатый (1).pdf')}"`);
  const documentRoutes = [
    ['system-t-ultra', 'СИСТЕМА-Т УЛЬТРА'], ['system-t-epoxy', 'СИСТЕМА-Т ЭПОКСИ'], ['therma-ultra', 'ТЕРМА УЛЬТРА'],
    ['therma-epoxy', 'ТЕРМА ЭПОКСИ'], ['ultra', 'ПИРОФЛЕКС-УЛЬТРА'], ['base', 'ПИРОФЛЕКС-БАЗА'],
    ['finish', 'ПИРОФЛЕКС-ФИНИШ'], ['acrylic', 'ПИРОФЛЕКС-АКРИЛ'], ['epoxy', 'ПИРОФЛЕКС-ЭПОКСИ'], ['cable', 'ПИРОФЛЕКС-КАБЕЛЬ']
  ];
  english = english.replace(/<a\b([^>]*href="https:\/\/disk\.yandex\.ru[^"]*"[^>]*)>([\s\S]*?)<\/a>/gi, (anchor, attrs) => {
    let decodedHref = attrs.match(/href="([^"]+)"/i)?.[1] ?? '';
    try { decodedHref = decodeURIComponent(decodedHref); } catch { /* keep the encoded path */ }
    const target = documentRoutes.find(([, marker]) => decodedHref.toUpperCase().includes(marker))?.[0];
    return target ? anchor.replace(/href="[^"]+"/i, `href="documents.html?product=${target}"`).replace(/\s+target="_blank"/i, '').replace(/\s+rel="noopener"/i, '')
      : anchor.replace(/href="[^"]+"/i, 'href="documents.html"').replace(/\s+target="_blank"/i, '').replace(/\s+rel="noopener"/i, '');
  });
  await writeFile(englishIndexPath, english, 'utf8');

  const ultraPath = path.resolve(ROOT, 'products/ultra.html');
  let ultra = await readFile(ultraPath, 'utf8');
  const ultraNav = navLists('ultra');
  ultra = ultra.replace(/<details class="pf-nav-group"><summary class="pf-nav__link">Продукты<\/summary>[\s\S]*?<\/details>/, `<details class="pf-nav-group"><summary class="pf-nav__link">Продукты</summary><div class="pf-nav__dropdown">${ultraNav.productsHtml}</div></details>`);
  ultra = ultra.replace(/<details class="pf-nav-group"><summary class="pf-nav__link">Системы<\/summary>[\s\S]*?<\/details>/, `<details class="pf-nav-group"><summary class="pf-nav__link">Системы</summary><div class="pf-nav__dropdown">${ultraNav.systemsHtml}</div></details>`);
  ultra = ultra.replace(/(<a class="pf-nav__link" href=")[^"]+(">)Документы<\/a>/, '$1../documents.html?product=ultra$2Документы</a>');
  ultra = ultra.replace(/(<a class="pf-nav__link" href=")[^"]+(">)Контакты<\/a>/, '$1../contacts.html$2Контакты</a>');
  ultra = ultra.replace(/(<a class="pf-button pf-button--small" href=")[^"]+(">)Связаться<\/a>/, '$1../contacts.html$2Связаться</a>');
  ultra = ultra.replaceAll('../index.html#services', '../services.html').replaceAll('../index.html#partners', '../partners.html');
  ultra = ultra.replace(/<div class="pf-footer__column"><h2>Продукты<\/h2>[\s\S]*?<\/div>/, `<div class="pf-footer__column"><h2>Продукты</h2>${PRODUCT_ORDER.map((slug) => `<a href="${slug === 'ultra' ? '#top' : products.get(slug).href}">${escapeHtml(products.get(slug).nav)}</a>`).join('')}</div>`);
  ultra = ultra.replace(/<div class="pf-footer__column"><h2>Системы<\/h2>[\s\S]*?<\/div>/, `<div class="pf-footer__column"><h2>Системы</h2>${SYSTEM_ORDER.map((slug) => `<a href="${products.get(slug).href}">${escapeHtml(products.get(slug).nav)}</a>`).join('')}</div>`);
  ultra = ultra.replace(/(<div class="pf-footer__column"><h2>Навигация<\/h2>)([\s\S]*?)(<\/div>)/, (whole, start, links, end) => `${start}${links.replace(/href="[^"]+">Документы<\/a>/, 'href="../documents.html?product=ultra">Документы</a>').replace(/href="[^"]+">Контакты<\/a>/, 'href="../contacts.html">Контакты</a>')}${end}`);
  ultra = ultra.replace('class="pf-ultra-detail"', 'class="pf-ultra-detail pf-product-detail" style="--pf-product-accent:#AC9354;--pf-product-accent-ink:#735A23"');
  ultra = ultra.replace(/product-detail\.css\?v=\d+/, 'product-detail.css?v=23');
  ultra = ultra.replace(/site\.js\?v=\d+/, 'site.js?v=3');
  await writeFile(ultraPath, ultra, 'utf8');
}

const PRODUCT_PAGE_ORDER = ['ultra', 'base', 'finish', 'acrylic', 'epoxy', 'therma-ultra', 'therma-epoxy', 'cable', 'system-t-ultra', 'system-t-epoxy'];
const EN_PRODUCT_NAMES = {
  ultra: 'PYROFLEX Ultra', base: 'PYROFLEX Base', finish: 'PYROFLEX Finish', acrylic: 'PYROFLEX Acrylic',
  epoxy: 'PYROFLEX Epoxy', 'therma-ultra': 'PYROFLEX Therma Ultra', 'therma-epoxy': 'PYROFLEX Therma Epoxy',
  cable: 'PYROFLEX Cable', 'system-t-ultra': 'PYROFLEX System-T Ultra', 'system-t-epoxy': 'PYROFLEX System-T Epoxy'
};

function rootRelativeHref(filePath, prefix = '') {
  const relative = path.relative(ROOT, path.resolve(ROOT, filePath)).replaceAll('\\', '/');
  return `${prefix}${relative.split('/').map((part) => encodeURIComponent(part)).join('/')}`;
}

function utilityGroupTitle(slug, locale) {
  if (slug === 'common') return locale === 'en' ? 'General documents' : 'Общие документы';
  return locale === 'en' ? EN_PRODUCT_NAMES[slug] : products.get(slug).nav;
}

function utilityDocumentKind(kind, locale) {
  if (locale !== 'en') return kind;
  const translations = {
    'Сертификат соответствия': 'Certificate of conformity',
    'Экспертное заключение': 'Expert opinion',
    'Свидетельство о государственной регистрации': 'State registration certificate',
    'Паспорт безопасности': 'Safety data sheet',
    'Технические характеристики': 'Technical data sheet',
    'Технические условия': 'Technical specifications',
    'Технологический регламент': 'Application procedure',
    'Протокол испытаний': 'Test report',
    'Таблица расходов': 'Consumption table',
    'Каталог продукции': 'Product catalogue',
    'Прайс-лист и сводные расходы': 'Price list and consumption summary',
    'Официальный документ': 'Official document'
  };
  return translations[kind] ?? 'Official document';
}

function utilityHeader(locale, currentPage) {
  const en = locale === 'en';
  const prefix = en ? '../' : '';
  const text = en
    ? { home: 'PYROFLEX — home', products: 'Products', systems: 'Systems', services: 'Services', documents: 'Documents', partners: 'Partners', contacts: 'Contacts', connect: 'Contact us', choose: 'Choose language', ru: 'RU Russian', english: 'EN English' }
    : { home: 'ПИРОФЛЕКС — на главную', products: 'Продукты', systems: 'Системы', services: 'Сервисы', documents: 'Документы', partners: 'Партнерам', contacts: 'Контакты', connect: 'Связаться', choose: 'Выбрать язык', ru: 'RU Russian', english: 'EN English' };
  const productLinks = PRODUCT_ORDER.map((slug) => `<a href="${prefix}products/${PAGE_FILES[slug]}">${escapeHtml(en ? EN_PRODUCT_NAMES[slug] : products.get(slug).nav)}</a>`).join('');
  const systemLinks = SYSTEM_ORDER.map((slug) => `<a href="${prefix}products/${PAGE_FILES[slug]}">${escapeHtml(en ? EN_PRODUCT_NAMES[slug] : products.get(slug).nav)}</a>`).join('');
  const russianHref = en ? `${prefix}${currentPage}.html` : `${currentPage}.html`;
  const englishHref = en ? `${currentPage}.html` : `en/${currentPage}.html`;
  return `<header class="pf-header" id="top">
    <a class="pf-brand" href="${prefix}index.html" aria-label="${text.home}"><img src="${prefix}assets/site/pyroflex-logo.svg" alt="PYROFLEX"></a>
    <button class="pf-menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" aria-label="${en ? 'Open menu' : 'Открыть меню'}"><span></span><span></span><span></span></button>
    <nav class="pf-nav" id="site-navigation" aria-label="${en ? 'Main navigation' : 'Основная навигация'}">
      <div class="pf-nav__links">
        <details class="pf-nav-group"><summary class="pf-nav__link">${text.products}</summary><div class="pf-nav__dropdown">${productLinks}</div></details>
        <details class="pf-nav-group"><summary class="pf-nav__link">${text.systems}</summary><div class="pf-nav__dropdown">${systemLinks}</div></details>
        <a class="pf-nav__link" href="services.html"${currentPage === 'services' ? ' aria-current="page"' : ''}>${text.services}</a>
        <a class="pf-nav__link" href="documents.html"${currentPage === 'documents' ? ' aria-current="page"' : ''}>${text.documents}</a>
        <a class="pf-nav__link" href="partners.html"${currentPage === 'partners' ? ' aria-current="page"' : ''}>${text.partners}</a>
        <a class="pf-nav__link" href="contacts.html"${currentPage === 'contacts' ? ' aria-current="page"' : ''}>${text.contacts}</a>
      </div>
      <div class="pf-header__actions"><div class="pf-header__contacts"><a href="tel:88001018112">8 (800) 101-8-112</a><a href="mailto:office@pyroflex.ru">office@pyroflex.ru</a></div>
        <a class="pf-button pf-button--small" href="contacts.html">${text.connect}</a>
        <details class="pf-locale"><summary aria-label="${text.choose}"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.1-3.3-8.5s1.1-6.2 3.3-8.5Z"/></svg> ${en ? 'EN' : 'RU'}</summary><div><a href="${russianHref}" lang="ru">${text.ru}</a><a href="${englishHref}" lang="en">${text.english}</a></div></details>
      </div>
    </nav>
  </header>`;
}

function utilityFooter(locale) {
  const en = locale === 'en';
  const prefix = en ? '../' : '';
  const title = en ? { products: 'Products', systems: 'Systems', navigation: 'Navigation', services: 'Services', documents: 'Documents', partners: 'Partners', applications: 'Applications', contacts: 'Contacts', privacy: 'Privacy policy' } : { products: 'Продукты', systems: 'Системы', navigation: 'Навигация', services: 'Сервисы', documents: 'Документы', partners: 'Партнерам', applications: 'Области применения', contacts: 'Контакты', privacy: 'Политика конфиденциальности' };
  const productLinks = PRODUCT_ORDER.map((slug) => `<a href="${prefix}products/${PAGE_FILES[slug]}">${escapeHtml(en ? EN_PRODUCT_NAMES[slug] : products.get(slug).nav)}</a>`).join('');
  const systemLinks = SYSTEM_ORDER.map((slug) => `<a href="${prefix}products/${PAGE_FILES[slug]}">${escapeHtml(en ? EN_PRODUCT_NAMES[slug] : products.get(slug).nav)}</a>`).join('');
  return `<footer class="pf-footer"><div class="pf-container"><div class="pf-footer__main">
    <div class="pf-footer__brand"><a href="${prefix}index.html" aria-label="PYROFLEX"><img src="${prefix}assets/site/pyroflex-logo.svg" alt="PYROFLEX"></a><a href="tel:88001018112">8 (800) 101-8-112</a><a href="mailto:office@pyroflex.ru">office@pyroflex.ru</a></div>
    <div class="pf-footer__column"><h2>${title.products}</h2>${productLinks}</div>
    <div class="pf-footer__column"><h2>${title.systems}</h2>${systemLinks}</div>
    <div class="pf-footer__column"><h2>${title.navigation}</h2><a href="services.html">${title.services}</a><a href="documents.html">${title.documents}</a><a href="partners.html">${title.partners}</a><a href="${prefix}index.html#applications">${title.applications}</a><a href="contacts.html">${title.contacts}</a></div>
  </div><div class="pf-footer__bottom"><span>© 2026 ООО «ПИРОФЛЕКС»</span><a href="${prefix}privacy/index.html">${title.privacy}</a></div><p class="pf-legal-note">${en ? 'Product images are for information only. Verify technical properties, system selection and application requirements in the current technical documents.' : 'Визуальные материалы используются в информационных целях. Технические характеристики, составы и показатели огнезащитной эффективности сверяйте с актуальной нормативной и технической документацией.'}</p></div></footer>`;
}

function utilityHtmlStart(locale, title, description, currentPage, extraScript = '') {
  const en = locale === 'en';
  const prefix = en ? '../' : '';
  const titleText = /пирофлекс|pyroflex/i.test(title) ? title : `${title} — ${en ? 'PYROFLEX' : 'ПИРОФЛЕКС'}`;
  return `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#000000">
  <meta name="description" content="${escapeHtml(description)}"><meta name="author" content="ПИРОФЛЕКС">
  <meta property="og:type" content="website"><meta property="og:locale" content="${en ? 'en_US' : 'ru_RU'}"><meta property="og:site_name" content="ПИРОФЛЕКС">
  <meta property="og:title" content="${escapeHtml(titleText)}"><meta property="og:description" content="${escapeHtml(description)}">
  <title>${escapeHtml(titleText)}</title>
  <link rel="icon" href="${prefix}assets/site/pyroflex-logo.svg" type="image/svg+xml">
  <link rel="preload" href="${prefix}assets/site/fonts/original-JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${prefix}assets/site/fonts.css"><link rel="stylesheet" href="${prefix}assets/site/site.css"><link rel="stylesheet" href="${prefix}assets/site/utility-pages.css?v=1">
  <script src="${prefix}assets/site/site.js?v=3" defer></script>${extraScript ? `\n  <script src="${prefix}assets/site/${extraScript}" defer></script>` : ''}
</head>
<body class="pf-utility-page pf-utility-page--${currentPage}">
  <a class="pf-skip-link" href="#main">${en ? 'Skip to content' : 'Перейти к содержимому'}</a>
  ${utilityHeader(locale, currentPage)}
  <main id="main">`;
}

function contactPageMarkup(locale) {
  const en = locale === 'en';
  const prefix = en ? '../' : '';
  const text = en ? {
    title: 'Contact PYROFLEX', description: 'Contact the PYROFLEX team about fire protection materials, technical documents and project requirements.', eyebrow: 'CONTACTS',
    lead: 'Talk with the PYROFLEX team about fire protection materials, system selection and your project requirements.', phone: 'Phone', email: 'Email', docs: 'Browse product documents', formTitle: 'Send a request',
    name: 'Name', emailLabel: 'Email', phoneLabel: 'Phone', message: 'Project or question', consent: 'I agree to the processing of personal data under the privacy policy.', send: 'Prepare email', note: 'Your email application will open with the request details. If it does not, write to office@pyroflex.ru.', privacy: 'privacy policy'
  } : {
    title: 'Контакты ПИРОФЛЕКС', description: 'Контакты команды ПИРОФЛЕКС: консультации по огнезащитным материалам, системам и документам.', eyebrow: 'КОНТАКТЫ',
    lead: 'Свяжитесь с командой ПИРОФЛЕКС по вопросам материалов, выбора системы и требований проекта.', phone: 'Телефон', email: 'Электронная почта', docs: 'Перейти к документам продуктов', formTitle: 'Отправить запрос',
    name: 'Имя', emailLabel: 'Почта', phoneLabel: 'Телефон', message: 'Объект или вопрос', consent: 'Я даю согласие на обработку персональных данных в соответствии с политикой конфиденциальности.', send: 'Подготовить письмо', note: 'Откроется ваша почтовая программа с данными запроса. Если она не открылась, напишите на office@pyroflex.ru.', privacy: 'политикой конфиденциальности'
  };
  return `${utilityHtmlStart(locale, text.title, text.description, 'contacts')}
    <section class="pf-section pf-section--dark pf-contacts pf-utility-contact" aria-labelledby="contact-page-title">
      <div class="pf-contacts__shade"></div>
      <div class="pf-container pf-contacts__layout">
        <div class="pf-contacts__copy">
          <p class="pf-eyebrow">${text.eyebrow}</p><h1 id="contact-page-title">${text.title}</h1><p class="pf-section-lead">${text.lead}</p>
          <div class="pf-contact-channels">
            <a href="tel:88001018112"><span>${text.phone}</span><strong>8 (800) 101-8-112</strong></a>
            <a href="mailto:office@pyroflex.ru"><span>${text.email}</span><strong>office@pyroflex.ru</strong></a>
          </div>
          <a class="pf-text-link pf-contact-documents" href="documents.html">${text.docs}</a>
        </div>
        <form class="pf-contact-form" id="contact-form" aria-labelledby="contact-form-title">
          <h2 id="contact-form-title">${text.formTitle}</h2>
          <label class="pf-contact-field"><span>${text.name}</span><input name="name" autocomplete="name" required></label>
          <label class="pf-contact-field"><span>${text.emailLabel}</span><input name="email" type="email" autocomplete="email" required></label>
          <label class="pf-contact-field"><span>${text.phoneLabel}</span><input name="phone" type="tel" autocomplete="tel" placeholder="${en ? 'Phone number' : 'Номер телефона'}" required></label>
          <label class="pf-contact-field"><span>${text.message}</span><textarea name="message" rows="3"></textarea></label>
          <label class="pf-consent"><input type="checkbox" name="consent" required><span>${text.consent.replace(text.privacy, `<a href="${prefix}privacy/index.html">${text.privacy}</a>`)}</span></label>
          <button class="pf-button pf-button--light" type="submit">${text.send}</button>
          <p class="pf-form-status" role="status" aria-live="polite"></p><p class="pf-form-note">${text.note}</p>
        </form>
      </div>
    </section>
  </main>
  ${utilityFooter(locale)}
</body>
</html>`;
}

function partnersPageMarkup(locale) {
  const en = locale === 'en';
  const prefix = en ? '../' : '';
  const text = en ? {
    title: 'Partners', description: 'PYROFLEX works with engineering, construction and steel fabrication teams delivering fire protection projects.',
    eyebrow: 'PARTNERSHIPS', lead: 'We build partnerships with companies and teams that deliver fire protection solutions on site.',
    second: 'We work together across one engineering process, from project design to implementation on site.',
    introAlt: 'Project team discussing work at an industrial site',
    contactEyebrow: 'PARTNERSHIPS', contactTitle: 'Let’s discuss your project', contactLead: 'Tell us about your team and the work you are planning.', contact: 'Contact PYROFLEX',
    groups: [
      { slug: 'engineering', eyebrow: 'PROJECT DESIGN', title: 'Design and engineering firms', description: 'We discuss fire-resistance requirements, system selection and product documentation while the solution is being prepared for a project.', alt: 'Fire protection engineers reviewing structural drawings beside a coated steel column' },
      { slug: 'epc', eyebrow: 'PROJECT DELIVERY', title: 'EPC and general contractors', description: 'We help align the fire-protection solution with the wider construction plan, from selecting materials to organizing work on site.', alt: 'Project managers coordinating construction at a large industrial site' },
      { slug: 'installation', eyebrow: 'SITE WORK', title: 'Construction and installation contractors', description: 'We help crews understand the selected materials and application requirements before work begins at the facility.', alt: 'Applicator in protective equipment coating a steel beam at an industrial site' },
      { slug: 'fabrication', eyebrow: 'STEEL FABRICATION', title: 'Steel fabricators', description: 'We discuss coating requirements with fabricators, including surface preparation, application conditions and the next installation stage.', alt: 'Fabricators inspecting a large structural steel beam in a workshop' }
    ]
  } : {
    title: 'Партнерам', description: 'Партнёрская программа ПИРОФЛЕКС для проектных, строительных и монтажных организаций и производителей металлоконструкций.',
    eyebrow: 'СОТРУДНИЧЕСТВО', lead: 'Мы выстраиваем партнёрские отношения с компаниями и командами, участвующими в реализации огнезащитных решений на объектах.',
    second: 'Мы открыты к сотрудничеству как участники одной инженерной цепочки — от проекта до работ на объекте.',
    introAlt: 'Специалисты обсуждают проект на промышленном объекте',
    contactEyebrow: 'СОТРУДНИЧЕСТВО', contactTitle: 'Обсудим ваш проект', contactLead: 'Расскажите о вашей команде и задачах, которые предстоит решить.', contact: 'Связаться с ПИРОФЛЕКС',
    groups: [
      { slug: 'engineering', eyebrow: 'ПРОЕКТИРОВАНИЕ', title: 'Проектные и инжиниринговые компании', description: 'Обсуждаем требования по огнестойкости, выбор системы и документы на материалы ещё на этапе подготовки проектного решения.', alt: 'Инженеры обсуждают чертёж металлоконструкции на объекте' },
      { slug: 'epc', eyebrow: 'РЕАЛИЗАЦИЯ ПРОЕКТА', title: 'EPC-подрядчики и генеральные подрядчики', description: 'Помогаем встроить огнезащитное решение в общую логику строительства — от выбора материалов до организации работ на площадке.', alt: 'Руководители проекта координируют строительные работы на промышленном объекте' },
      { slug: 'installation', eyebrow: 'РАБОТЫ НА ОБЪЕКТЕ', title: 'Строительно-монтажные организации', description: 'Помогаем командам разобраться в выбранных материалах и требованиях к нанесению до начала работ на площадке.', alt: 'Специалист в защитной экипировке наносит покрытие на стальную балку' },
      { slug: 'fabrication', eyebrow: 'ПРОИЗВОДСТВО', title: 'Производители металлоконструкций', description: 'Обсуждаем требования к защите элементов с учётом подготовки поверхности, условий нанесения и дальнейшего монтажа.', alt: 'Специалисты проверяют крупную стальную балку в цехе металлоконструкций' }
    ]
  };
  const groupMarkup = text.groups.map((group) => `<section class="pf-partner-story pf-partner-story--${group.slug}" aria-labelledby="partner-${group.slug}-title">
      <div class="pf-container pf-partner-story__inner"><div class="pf-partner-story__copy"><p class="pf-eyebrow">${group.eyebrow}</p><h2 id="partner-${group.slug}-title">${group.title}</h2><p>${group.description}</p></div>
        <div class="pf-partner-story__visual"><img src="${prefix}assets/site/images/partners/partner-${group.slug}.webp" alt="${escapeHtml(group.alt)}" loading="lazy"></div>
      </div>
    </section>`).join('\n');
  return `${utilityHtmlStart(locale, text.title, text.description, 'partners')}
    <section class="pf-section pf-section--light pf-partners pf-partners--page" aria-labelledby="partners-title">
      <div class="pf-container pf-partners__layout">
        <div class="pf-partners__visual"><img src="${prefix}assets/site/images/partner-facility.jpg" alt="${escapeHtml(text.introAlt)}"></div>
        <div class="pf-partners__copy"><p class="pf-eyebrow">${text.eyebrow}</p><h1 id="partners-title">${text.title}</h1>
          <p class="pf-section-lead">${text.lead}</p><p>${text.second}</p>
        </div>
      </div>
    </section>
    <div id="partner-groups">${groupMarkup}</div>
    <section class="pf-partner-page-cta"><div class="pf-container pf-partner-page-cta__inner"><div><p class="pf-eyebrow">${text.contactEyebrow}</p><h2>${text.contactTitle}</h2><p>${text.contactLead}</p></div><a class="pf-button pf-button--dark" href="contacts.html">${text.contact}</a></div></section>
  </main>
  ${utilityFooter(locale)}
</body>
</html>`;
}

function servicesPageMarkup(locale) {
  const en = locale === 'en';
  const prefix = en ? '../' : '';
  const text = en ? {
    title: 'Services', description: 'PYROFLEX project design, material supply, quality verification, on-site supervision and turnkey fire protection.',
    eyebrow: 'PYROFLEX SERVICES', intro: 'Design, supply and on-site delivery.', contactEyebrow: 'PROJECT SUPPORT', contactTitle: 'Let’s discuss your site', contactLead: 'Tell us about your facility and project requirements.', contact: 'Contact the team',
    services: [
      { slug: 'design', eyebrow: 'PROJECT DESIGN', title: 'Fire protection design', description: 'We develop solutions for steel structures based on their geometry, required fire-resistance rating and the selected system.', alt: 'Engineer reviews a 3D steel-frame model and structural plans at a workstation' },
      { slug: 'supply', eyebrow: 'MATERIALS', title: 'Supply of materials', description: 'We assemble materials for the agreed project solution and help clarify the composition and documentation for the selected products.', alt: 'Unbranded industrial coating pails prepared for dispatch in a warehouse' },
      { slug: 'laboratory', eyebrow: 'TESTING', title: 'Quality verification', description: 'Accredited testing laboratories are engaged to verify the results of completed fire-protection work.', alt: 'Engineer checks instruments during a controlled fire-resistance test of a steel column' },
      { slug: 'supervision', eyebrow: 'ON-SITE SUPPORT', title: 'Technical supervision', description: 'We support work at the facility and help keep the application aligned with the selected materials and project requirements.', alt: 'Site engineer measures the thickness of a coating on a steel column' },
      { slug: 'turnkey', eyebrow: 'INTEGRATED DELIVERY', title: 'Turnkey fire protection', description: 'We bring design, material supply and fire-protection work together as one coordinated solution for the facility.', alt: 'Organized team applies fire-protection coating to steelwork inside an industrial hall' }
    ]
  } : {
    title: 'Сервисы', description: 'Проектирование огнезащиты, поставка материалов ПИРОФЛЕКС, подтверждение качества, технический надзор и огнезащита под ключ.',
    eyebrow: 'СЕРВИСЫ ПИРОФЛЕКС', intro: 'Проектирование, поставка и реализация на объектах.', contactEyebrow: 'ПОДДЕРЖКА ПРОЕКТА', contactTitle: 'Обсудим ваш объект', contactLead: 'Расскажите о площадке и требованиях вашего проекта.', contact: 'Связаться с командой',
    services: [
      { slug: 'design', eyebrow: 'ПРОЕКТНАЯ РАБОТА', title: 'Проектирование огнезащиты', description: 'Разрабатываем решения для металлических конструкций с учётом геометрии элементов, требований к огнестойкости и выбранной системы.', alt: 'Инженер изучает 3D-модель металлокаркаса и чертежи на рабочем месте' },
      { slug: 'supply', eyebrow: 'МАТЕРИАЛЫ', title: 'Поставка материалов', description: 'Комплектуем материалы под согласованное проектное решение и помогаем разобраться в составе и документации выбранных продуктов.', alt: 'Немаркированные ёмкости с промышленными покрытиями подготовлены к отгрузке на складе' },
      { slug: 'laboratory', eyebrow: 'ИСПЫТАНИЯ', title: 'Подтверждение качества', description: 'Для проверки результатов выполненных огнезащитных работ привлекаются аккредитованные испытательные лаборатории.', alt: 'Специалист проверяет приборы во время огневого испытания стальной колонны' },
      { slug: 'supervision', eyebrow: 'НА ОБЪЕКТЕ', title: 'Технический надзор', description: 'Сопровождаем выполнение работ и помогаем сверять нанесение с выбранными материалами и требованиями проекта.', alt: 'Инженер на объекте измеряет толщину покрытия на стальной колонне' },
      { slug: 'turnkey', eyebrow: 'КОМПЛЕКСНОЕ РЕШЕНИЕ', title: 'Огнезащита под ключ', description: 'Объединяем проектирование, поставку материалов и выполнение огнезащитных работ в единое решение для объекта.', alt: 'Команда специалистов наносит огнезащитное покрытие на металлоконструкции в промышленном здании' }
    ]
  };
  const features = text.services.map((service) => `<section class="pf-service-story pf-service-story--${service.slug}" aria-labelledby="service-${service.slug}-title">
      <div class="pf-container pf-service-story__inner"><div class="pf-service-story__copy"><p class="pf-eyebrow">${service.eyebrow}</p><h2 id="service-${service.slug}-title">${service.title}</h2><p>${service.description}</p></div>
        <div class="pf-service-story__visual"><img src="${prefix}assets/site/images/services/service-${service.slug}.webp" alt="${escapeHtml(service.alt)}" loading="lazy"></div>
      </div>
    </section>`).join('\n');
  return `${utilityHtmlStart(locale, `${text.title} — ${en ? 'PYROFLEX' : 'ПИРОФЛЕКС'}`, text.description, 'services')}
    <section class="pf-service-page-intro" aria-labelledby="services-title"><div class="pf-container">
      <p class="pf-eyebrow">${text.eyebrow}</p><h1 id="services-title">${text.title}</h1><p>${text.intro}</p>
    </div></section>
    <div class="pf-service-stories">${features}</div>
    <section class="pf-service-page-cta"><div class="pf-container pf-service-page-cta__inner"><div><p class="pf-eyebrow">${text.contactEyebrow}</p><h2>${text.contactTitle}</h2><p>${text.contactLead}</p></div><a class="pf-button pf-button--dark" href="contacts.html">${text.contact}</a></div></section>
  </main>
  ${utilityFooter(locale)}
</body>
</html>`;
}

async function collectArchiveDocuments() {
  const ultra = { slug: 'ultra', kind: 'product', docsFolder: `${BRAND_ROOT}/ПИРОФЛЕКС-УЛЬТРА`, excludeDocs: [] };
  const archivePages = new Map([...pages, ultra].map((page) => [page.slug, page]));
  const documents = new Map();
  const add = (record, slug) => {
    const absolutePath = path.resolve(ROOT, record.path);
    const relative = path.relative(ROOT, absolutePath).replaceAll('\\', '/');
    const current = documents.get(relative) ?? { ...record, path: relative, filename: path.basename(relative), pages: new Set() };
    current.pages.add(slug);
    documents.set(relative, current);
  };
  for (const slug of PRODUCT_PAGE_ORDER) {
    if (slug === 'common') continue;
    const page = archivePages.get(slug);
    if (!page) continue;
    const files = await collectDocuments(page);
    for (const file of files) add(file, slug);
    for (const table of page.expenseTables ?? []) {
      const filename = path.basename(table.source);
      add({ path: table.source, filename, title: documentTitle(filename), kind: 'Таблица расходов' }, slug);
    }
  }
  const brandFolder = path.resolve(ROOT, BRAND_ROOT);
  const commonFiles = (await readdir(brandFolder)).filter((name) => name.toLowerCase().endsWith('.pdf'));
  for (const filename of commonFiles) add({ path: path.posix.join(BRAND_ROOT, filename), filename, title: documentTitle(filename), kind: 'Прайс-лист и сводные расходы' }, 'common');
  const cataloguePath = 'branding/пирофлекс каталог-сжатый (1).pdf';
  add({ path: cataloguePath, filename: path.basename(cataloguePath), title: 'Каталог продукции — сжатая версия', kind: 'Каталог продукции' }, 'common');
  const rows = await Promise.all([...documents.values()].map(async (document) => {
    const fileInfo = await stat(path.resolve(ROOT, document.path));
    const pages = PRODUCT_PAGE_ORDER.filter((slug) => document.pages.has(slug));
    if (document.pages.has('common')) pages.push('common');
    return { ...document, size: fileInfo.size, pages };
  }));
  return rows.sort((a, b) => a.kind.localeCompare(b.kind, 'ru') || a.title.localeCompare(b.title, 'ru'));
}

function renderArchiveRow(document, locale) {
  const en = locale === 'en';
  const prefix = en ? '../' : '';
  const pageSlugs = [...document.pages];
  const productTags = pageSlugs.map((slug) => {
    if (slug === 'common') return `<span class="pf-doc-tag">${escapeHtml(utilityGroupTitle(slug, locale))}</span>`;
    const item = products.get(slug);
    return `<a class="pf-doc-tag" href="${prefix}products/${item.href}" style="--pf-doc-accent:${item.color}">${escapeHtml(utilityGroupTitle(slug, locale))}</a>`;
  }).join('');
  const searchable = [document.title, document.filename, document.kind, ...pageSlugs.map((slug) => utilityGroupTitle(slug, locale))].join(' ');
  const pageCount = pageSlugs.join(' ');
  const fileHref = rootRelativeHref(document.path, prefix);
  const size = document.size < 1024 * 1024 ? `${Math.max(1, Math.round(document.size / 1024))} KB` : `${(document.size / (1024 * 1024)).toFixed(1)} MB`;
  return `<article class="pf-doc-row" data-pages="${escapeHtml(pageCount)}" data-kind="${escapeHtml(document.kind)}" data-search="${escapeHtml(searchable.toLowerCase())}">
    <span class="pf-doc-row__format" aria-hidden="true">PDF</span>
    <div class="pf-doc-row__body"><p class="pf-doc-row__kind">${escapeHtml(utilityDocumentKind(document.kind, locale))}</p><h3>${escapeHtml(document.title)}</h3><p class="pf-doc-row__filename">${escapeHtml(document.filename)}</p><div class="pf-doc-row__tags">${productTags}</div></div>
    <div class="pf-doc-row__action"><span>${size}</span><a href="${fileHref}" target="_blank" rel="noopener">${en ? 'Open PDF' : 'Открыть PDF'}<span aria-hidden="true">↗</span></a></div>
  </article>`;
}

async function documentsPageMarkup(locale, documents) {
  const en = locale === 'en';
  const prefix = en ? '../' : '';
  const text = en ? {
    title: 'Product documents', description: 'Browse PYROFLEX certificates, technical specifications, application procedures, test reports, and consumption tables.',
    eyebrow: 'DOCUMENT LIBRARY', lead: 'Choose a product or system to show its local documents. Filter by document type or search by title.',
    product: 'Product or system', allProducts: 'All products and systems', kind: 'Document type', allKinds: 'All document types', search: 'Search',
    searchPlaceholder: 'Document title or file name', reset: 'Clear filters', count: 'Showing', of: 'of', files: 'documents',
    empty: 'No documents match these filters.', fileTitle: 'Local document archive', intro: 'Files shared by several products appear once, with links to every relevant product page.',
    heading: 'Documents and certificates', note: 'Technical and regulatory information should be checked against the current approved revision before project use.'
  } : {
    title: 'Документы продуктов', description: 'Каталог сертификатов, технических условий, регламентов, протоколов испытаний и таблиц расходов ПИРОФЛЕКС.',
    eyebrow: 'БИБЛИОТЕКА ДОКУМЕНТОВ', lead: 'Выберите продукт или систему, чтобы показать относящиеся к ним файлы. Список можно сузить по типу документа или поиску по названию.',
    product: 'Продукт или система', allProducts: 'Все продукты и системы', kind: 'Тип документа', allKinds: 'Все типы документов', search: 'Поиск',
    searchPlaceholder: 'Название документа или файла', reset: 'Сбросить фильтры', count: 'Показано', of: 'из', files: 'документов',
    empty: 'По выбранным фильтрам документов нет.', fileTitle: 'Локальный архив документов', intro: 'Общие документы показаны один раз; метки ведут на страницы всех относящихся к ним продуктов.',
    heading: 'Документы и сертификаты', note: 'Перед применением в проекте сверяйте техническую и нормативную информацию с действующей утверждённой редакцией.'
  };
  const counts = new Map();
  for (const document of documents) for (const slug of document.pages) counts.set(slug, (counts.get(slug) ?? 0) + 1);
  const options = PRODUCT_PAGE_ORDER.map((slug) => `<option value="${slug}">${escapeHtml(utilityGroupTitle(slug, locale))} · ${counts.get(slug) ?? 0}</option>`).join('') + `<option value="common">${escapeHtml(utilityGroupTitle('common', locale))} · ${counts.get('common') ?? 0}</option>`;
  const kinds = [...new Set(documents.map((document) => document.kind))].sort((a, b) => a.localeCompare(b, 'ru'));
  const kindOptions = kinds.map((kind) => `<option value="${escapeHtml(kind)}">${escapeHtml(utilityDocumentKind(kind, locale))}</option>`).join('');
  const rows = documents.map((document) => renderArchiveRow(document, locale)).join('\n');
  const expectedCount = documents.length;
  return `${utilityHtmlStart(locale, text.title, text.description, 'documents', 'document-index.js?v=1')}
    <section class="pf-document-hero" aria-labelledby="documents-title"><div class="pf-document-hero__shade"></div><div class="pf-container pf-document-hero__inner">
      <p class="pf-eyebrow">${text.eyebrow}</p><h1 id="documents-title">${text.title}</h1><p>${text.lead}</p>
      <div class="pf-document-hero__count"><strong>${expectedCount}</strong><span>${text.files}</span></div>
    </div></section>
    <section class="pf-document-directory" id="document-directory" aria-labelledby="document-directory-title">
      <div class="pf-container">
        <div class="pf-document-directory__heading"><div><p class="pf-eyebrow">${text.fileTitle}</p><h2 id="document-directory-title">${text.heading}</h2><p>${text.intro}</p></div><p class="pf-document-directory__note">${text.note}</p></div>
        <form class="pf-document-filters" id="document-filters" role="search">
          <label><span>${text.product}</span><select id="document-product"><option value="all">${text.allProducts} · ${expectedCount}</option>${options}</select></label>
          <label><span>${text.kind}</span><select id="document-kind"><option value="all">${text.allKinds}</option>${kindOptions}</select></label>
          <label class="pf-document-filters__search"><span>${text.search}</span><input id="document-search" type="search" placeholder="${text.searchPlaceholder}"></label>
          <button class="pf-document-filters__reset" type="reset">${text.reset}</button>
        </form>
        <p class="pf-document-count" id="document-count" role="status" aria-live="polite"></p>
        <div class="pf-document-list" id="document-list">${rows}</div>
        <p class="pf-document-empty" id="document-empty" hidden>${text.empty}</p>
      </div>
    </section>
  </main>
  ${utilityFooter(locale)}
</body>
</html>`;
}

async function buildUtilityPages() {
  const documents = await collectArchiveDocuments();
  const contactsRu = contactPageMarkup('ru');
  const contactsEn = contactPageMarkup('en');
  const partnersRu = partnersPageMarkup('ru');
  const partnersEn = partnersPageMarkup('en');
  const servicesRu = servicesPageMarkup('ru');
  const servicesEn = servicesPageMarkup('en');
  const documentsRu = await documentsPageMarkup('ru', documents);
  const documentsEn = await documentsPageMarkup('en', documents);
  await mkdir(path.resolve(ROOT, 'en'), { recursive: true });
  await Promise.all([
    writeFile(path.resolve(ROOT, 'contacts.html'), contactsRu, 'utf8'),
    writeFile(path.resolve(ROOT, 'documents.html'), documentsRu, 'utf8'),
    writeFile(path.resolve(ROOT, 'partners.html'), partnersRu, 'utf8'),
    writeFile(path.resolve(ROOT, 'services.html'), servicesRu, 'utf8'),
    writeFile(path.resolve(ROOT, 'en/contacts.html'), contactsEn, 'utf8'),
    writeFile(path.resolve(ROOT, 'en/documents.html'), documentsEn, 'utf8'),
    writeFile(path.resolve(ROOT, 'en/partners.html'), partnersEn, 'utf8'),
    writeFile(path.resolve(ROOT, 'en/services.html'), servicesEn, 'utf8')
  ]);
  console.log(`Generated contacts, partners, services and document archives (${documents.length} unique PDFs)`);
}

async function patchLegacyUltraRelatedLinks() {
  const file = path.resolve(ROOT, 'products/ultra.html');
  let html = await readFile(file, 'utf8');
  html = html.replaceAll('../index.html#product-base', 'base.html');
  html = html.replaceAll('../index.html#product-finish', 'finish.html');
  await writeFile(file, html, 'utf8');
}

async function main() {
  await mkdir(path.resolve(ROOT, 'products'), { recursive: true });
  for (const page of pages) {
    const source = await readFile(path.resolve(ROOT, page.source), 'utf8');
    const sections = splitSections(source);
    const docs = await collectDocuments(page);
    await createIconVariants(page);
    const html = await buildPage(page, sections, docs);
    await writeFile(path.resolve(ROOT, 'products', `${page.slug}.html`), html, 'utf8');
    console.log(`Generated products/${page.slug}.html (${docs.length} documents)`);
  }
  await patchLegacyUltraRelatedLinks();
  await updateSiteNavigation();
  await buildUtilityPages();
}

await main();
