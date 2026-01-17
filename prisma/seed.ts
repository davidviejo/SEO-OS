
import { PrismaClient, StrategyType } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const tasks = [
  // --- GLOBAL TASKS (All Strategies) ---
  {
    title: "Configuración avanzada de GSC (Asociación, Sitemap)",
    description: "Verificar propiedad de todas las versiones del dominio (https, http, www, non-www) y configurar la propiedad de Dominio. Subir sitemaps índices.",
    phase: "Setup",
    default_priority: 5,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola equipo, hemos completado la configuración avanzada de Google Search Console. Se han unificado las propiedades bajo una propiedad de Dominio para tener una visión total del tráfico y se han enviado los sitemaps actualizados. Esto asegura que Google reciba las señales de indexación correctas inmediatamente."
  },
  {
    title: "Auditoría de Logs del Servidor (Crawl Budget)",
    description: "Analizar logs del servidor para identificar desperdicio de Crawl Budget, cadenas de redirección internas y frecuencia de rastreo de bots.",
    phase: "Technical Audit",
    default_priority: 4,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, tras analizar los logs del servidor, hemos identificado patrones de rastreo ineficientes. Estamos procediendo a bloquear parámetros inútiles y corregir cadenas de redirección que estaban consumiendo presupuesto de rastreo valioso. Esto mejorará la velocidad con la que Google descubre nuevo contenido."
  },
  {
    title: "Validación de Core Web Vitals (Desktop + Mobile)",
    description: "Auditoría completa de métricas CWV usando datos de campo (CrUX) y lab, enfocándose en CLS y INP.",
    phase: "WPO",
    default_priority: 4,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, hemos revisado los Core Web Vitals. Hemos identificado y corregido desplazamientos de diseño (CLS) que afectaban la experiencia de usuario, asegurando que pasamos los umbrales de Google para obtener el beneficio de ranking."
  },
  {
    title: "Optimización de Estructura de URLs",
    description: "Revisión de la sintaxis de URLs para asegurar que sean amigables, cortas y contengan palabras clave relevantes.",
    phase: "Technical Audit",
    default_priority: 3,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, hemos optimizado la estructura de URLs. URLs limpias y descriptivas facilitan el escaneo por parte de los bots y mejoran el CTR en los resultados de búsqueda al ser más legibles para el usuario."
  },
  {
    title: "Implementación de Open Graph y Twitter Cards",
    description: "Configuración de metadatos sociales para controlar cómo se visualiza el contenido al ser compartido en redes.",
    phase: "On-Page",
    default_priority: 3,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, hemos configurado Open Graph. Ahora, cuando el contenido se comparte en redes sociales, aparecerá con la imagen, título y descripción optimizados, aumentando la visibilidad y el tráfico referido."
  },
  {
    title: "Setup de GA4 con eventos de conversión",
    description: "Configuración de Google Analytics 4, asegurando la medición de eventos clave (leads, compras, suscripciones) y vinculación con GSC.",
    phase: "Setup",
    default_priority: 5,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, la configuración de GA4 está lista. Hemos definido eventos de conversión personalizados para medir el ROI real de la estrategia SEO, más allá de las simples visitas. Los datos ya están poblándose correctamente."
  },
  {
    title: "Análisis de indexabilidad (Meta Robots)",
    description: "Revisión exhaustiva de directivas noindex, nofollow en todo el sitio para evitar desindexación accidental de páginas críticas.",
    phase: "Technical Audit",
    default_priority: 5,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, hemos finalizado el barrido de etiquetas Meta Robots. Se han detectado y corregido X URLs que tenían directivas 'noindex' erróneas, lo que impedía su aparición en resultados de búsqueda. El sitio es ahora totalmente accesible para los rastreadores."
  },
  {
    title: "Configuración de X-Robots-Tag",
    description: "Implementación de cabeceras HTTP X-Robots-Tag para controlar la indexación de archivos no HTML (PDFs, imágenes) y control granular.",
    phase: "Technical Audit",
    default_priority: 3,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, hemos configurado las cabeceras X-Robots-Tag en el servidor. Esto nos permite prevenir la indexación de archivos PDF y recursos estáticos que competían con las landing pages principales, optimizando la relevancia semántica del dominio."
  },
  {
    title: "Schema Organization y WebSite",
    description: "Implementación de JSON-LD para Organization (Logo, ContactPoint, SameAs) y WebSite (Sitelinks Searchbox).",
    phase: "On-Page",
    default_priority: 4,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, se han implementado los datos estructurados a nivel de organización. Google ahora tiene información explícita sobre la entidad de la marca, redes sociales y el motor de búsqueda interno, lo cual favorece la aparición de Rich Snippets en la SERP."
  },
  {
    title: "Optimización de LCP (Preload scanner)",
    description: "Mejorar el Largest Contentful Paint asegurando que la imagen principal no tenga lazy-load y usando <link rel='preload'>.",
    phase: "WPO",
    default_priority: 4,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, hemos optimizado la carga del elemento principal (LCP). Al pre-cargar la imagen hero y eliminar el lazy-loading en el primer pantallazo, hemos mejorado los Core Web Vitals, lo que es un factor de ranking directo."
  },
  {
    title: "Implementación de Fetch Priority",
    description: "Uso del atributo fetchpriority='high' en recursos críticos para adelantar su carga en el waterfall del navegador.",
    phase: "WPO",
    default_priority: 3,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, hemos ajustado la prioridad de recuperación de recursos críticos. Esto asegura que el navegador descargue los elementos esenciales de la página antes que scripts secundarios, mejorando la percepción de velocidad del usuario."
  },
  {
    title: "Auditoría de Canonicals",
    description: "Revisión de etiquetas canonical self-referencing y corrección de canonicals cruzados para evitar contenido duplicado.",
    phase: "Technical Audit",
    default_priority: 4,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, la auditoría de canonicalización ha concluido. Hemos consolidado las señales de autoridad eliminando bucles y referencias incorrectas. Esto clarifica a Google cuál es la versión 'oficial' de cada página."
  },
  {
    title: "Optimización de Hreflang",
    description: "Implementación y validación de atributos hreflang para segmentación geográfica e idiomática correcta.",
    phase: "On-Page",
    default_priority: 3,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, hemos desplegado las etiquetas hreflang. Esto asegura que los usuarios vean la versión de la web correspondiente a su idioma y región, evitando problemas de duplicidad internacional."
  },
  {
    title: "Limpieza de Cadenas de Redirección",
    description: "Identificación y resolución de cadenas de redirección 301 (hops) para minimizar latencia y pérdida de PageRank.",
    phase: "Technical Audit",
    default_priority: 3,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, hemos aplanado las cadenas de redirecciones. Ahora las URLs antiguas apuntan directamente al destino final sin pasos intermedios, recuperando el link juice que se perdía en cada salto."
  },
  {
    title: "Optimización de Enlazado Interno",
    description: "Análisis de distribución de PageRank interno y creación de clusters temáticos mediante enlaces contextuales.",
    phase: "On-Page",
    default_priority: 4,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, hemos reestructurado el enlazado interno. Hemos potenciado las páginas estratégicas que estaban quedando aisladas (orphaned pages), distribuyendo mejor la autoridad desde la Home y páginas de alta tracción."
  },
  {
    title: "Validación de Seguridad (SSL/HSTS)",
    description: "Verificación de certificados SSL y cabeceras HSTS para asegurar conexiones seguras y confianza del usuario.",
    phase: "Technical Audit",
    default_priority: 5,
    applicable_strategies: [StrategyType.LOCAL, StrategyType.ECOM, StrategyType.MEDIA, StrategyType.B2B],
    email_script: "Hola, hemos auditado la seguridad del sitio. La implementación de HSTS está activa, forzando conexiones seguras y protegiendo la integridad de los datos del usuario, un requisito indispensable para Google hoy en día."
  },

  // --- LOCAL STRATEGY ---
  {
    title: "Auditoría de NAP (Consistency Check)",
    description: "Verificar consistencia exacta de Name, Address, Phone en web, GBP y directorios principales.",
    phase: "Local SEO",
    default_priority: 5,
    applicable_strategies: [StrategyType.LOCAL],
    email_script: "Hola, hemos finalizado la auditoría NAP. Hemos unificado el formato de dirección y teléfono en todos los puntos de contacto digitales. Esta consistencia es la señal base para que Google confíe en la ubicación física del negocio."
  },
  {
    title: "Optimización de ficha GBP (Categorías)",
    description: "Selección estratégica de categoría primaria y categorías secundarias en Google Business Profile.",
    phase: "Local SEO",
    default_priority: 5,
    applicable_strategies: [StrategyType.LOCAL],
    email_script: "Hola, hemos ajustado las categorías en GBP. Al añadir categorías secundarias relevantes, hemos ampliado el alcance de búsqueda para servicios que antes no estaban explícitamente definidos ante Google."
  },
  {
    title: "Creación de Location Pages",
    description: "Desarrollo de landing pages específicas por ubicación con contenido único y relevante localmente.",
    phase: "Content",
    default_priority: 4,
    applicable_strategies: [StrategyType.LOCAL],
    email_script: "Hola, las nuevas páginas de ubicación están activas. Cada una cuenta con contenido específico de la zona, lo que nos permitirá posicionar para búsquedas 'geo-modificadas' (servicio + ciudad) de manera mucho más efectiva."
  },
  {
    title: "Schema LocalBusiness anidado",
    description: "Implementación de JSON-LD LocalBusiness específico en cada Location Page, con coordenadas y horarios.",
    phase: "On-Page",
    default_priority: 4,
    applicable_strategies: [StrategyType.LOCAL],
    email_script: "Hola, hemos inyectado Schema LocalBusiness en las páginas de ciudad. Esto proporciona a Google datos procesables sobre coordenadas, horarios y servicios específicos de esa sucursal, vital para el Local Pack."
  },
  {
    title: "Estrategia de Reseñas y Q&A",
    description: "Plan de gestión de reputación: solicitud de reseñas y respuesta a preguntas frecuentes en GBP.",
    phase: "Authority",
    default_priority: 3,
    applicable_strategies: [StrategyType.LOCAL],
    email_script: "Hola, hemos definido el protocolo de reseñas. Responder activamente y fomentar nuevas valoraciones con keywords naturales aumentará la relevancia y la tasa de conversión de la ficha de Maps."
  },
  {
    title: "Optimización de Atributos GBP",
    description: "Configuración detallada de atributos (Accesibilidad, Servicios, Opciones de pago) en la ficha.",
    phase: "Local SEO",
    default_priority: 3,
    applicable_strategies: [StrategyType.LOCAL],
    email_script: "Hola, hemos completado los atributos de la ficha GBP. Esto permite a los usuarios filtrar por características específicas (ej. 'acceso silla de ruedas'), mejorando el matching con la intención de búsqueda del usuario."
  },
  {
    title: "Mapas Embebidos (Embed API)",
    description: "Inserción de mapas de Google en páginas de contacto y ubicación para confirmar relevancia geográfica.",
    phase: "On-Page",
    default_priority: 2,
    applicable_strategies: [StrategyType.LOCAL],
    email_script: "Hola, se han actualizado los mapas embebidos. Al interactuar con la API de Maps, reforzamos la señal de proximidad para el usuario y confirmamos la ubicación física a los rastreadores."
  },
  {
    title: "Gestión de Citaciones Locales",
    description: "Alta y corrección de datos en directorios locales de alta autoridad (Yelp, Páginas Amarillas, cámaras de comercio).",
    phase: "Authority",
    default_priority: 3,
    applicable_strategies: [StrategyType.LOCAL],
    email_script: "Hola, hemos iniciado la campaña de citaciones. Estar listados correctamente en directorios de autoridad local transfiere confianza al dominio principal y valida nuestra existencia física ante el algoritmo local."
  },
  {
    title: "Contenido Hiperlocal",
    description: "Creación de artículos de blog o guías que mencionen hitos locales, eventos o noticias de la comunidad.",
    phase: "Content",
    default_priority: 2,
    applicable_strategies: [StrategyType.LOCAL],
    email_script: "Hola, hemos publicado las primeras piezas de contenido hiperlocal. Vincular la marca con eventos y lugares de la comunidad mejora nuestra relevancia tópica geográfica más allá de las páginas comerciales."
  },
  {
    title: "Schema Service",
    description: "Implementación de datos estructurados para servicios específicos ofrecidos en cada localidad.",
    phase: "On-Page",
    default_priority: 3,
    applicable_strategies: [StrategyType.LOCAL],
    email_script: "Hola, hemos añadido Schema Service. Esto ayuda a Google a entender no solo dónde estamos, sino qué hacemos exactamente en cada ubicación, diferenciando nuestra oferta de servicios."
  },

  // --- E-COMMERCE STRATEGY ---
  {
    title: "Arquitectura de Silos",
    description: "Reestructuración de categorías y subcategorías para crear una jerarquía temática clara (Silos).",
    phase: "Technical Audit",
    default_priority: 5,
    applicable_strategies: [StrategyType.ECOM],
    email_script: "Hola, hemos redefinido la arquitectura web. La nueva estructura de silos concentra la autoridad temática en las categorías principales, facilitando el rastreo y mejorando el ranking de keywords genéricas de alto volumen."
  },
  {
    title: "Gestión de Facetas (Canonicalización)",
    description: "Configuración de canonicals hacia la categoría raíz para filtros de ordenación o visualización.",
    phase: "Technical Audit",
    default_priority: 5,
    applicable_strategies: [StrategyType.ECOM],
    email_script: "Hola, hemos completado la optimización de las facetas de filtrado. Al canonicalizar las variantes de ordenación, esto evitará que Google gaste recursos rastreando miles de URLs duplicadas, concentrando el valor en la categoría principal."
  },
  {
    title: "Gestión de Facetas (Noindex Strategy)",
    description: "Bloqueo por meta robots o robots.txt de combinaciones de filtros excesivos (más de 2 facetas).",
    phase: "Technical Audit",
    default_priority: 4,
    applicable_strategies: [StrategyType.ECOM],
    email_script: "Hola, hemos implementado reglas de noindex para los filtros profundos. Esto previene la generación de 'Spider Traps' y asegura que el Crawl Budget se invierta en productos y categorías indexables, no en combinaciones infinitas de atributos."
  },
  {
    title: "Schema Product y Offer",
    description: "Implementación de datos estructurados de Producto con anidación de Oferta (Precio, Stock, Moneda).",
    phase: "On-Page",
    default_priority: 5,
    applicable_strategies: [StrategyType.ECOM],
    email_script: "Hola, el marcado Schema de Producto está validado. Google ahora puede leer estructuradamente el precio, stock y valoraciones, lo cual es requisito indispensable para aparecer en las fichas enriquecidas de Shopping."
  },
  {
    title: "Validación Merchant Center",
    description: "Sincronización y depuración de errores en el feed de productos de Google Merchant Center.",
    phase: "Setup",
    default_priority: 4,
    applicable_strategies: [StrategyType.ECOM],
    email_script: "Hola, hemos depurado el feed de Merchant Center. Hemos corregido las advertencias de GTIN faltantes y discrepancias de precio, asegurando que los productos sean elegibles para campañas de Shopping y listados gratuitos."
  },
  {
    title: "Optimización Stock Agotado (Soft 404)",
    description: "Configuración de respuesta correcta para productos sin stock temporal (mantener 200 OK con aviso visual y datos estructurados).",
    phase: "On-Page",
    default_priority: 4,
    applicable_strategies: [StrategyType.ECOM],
    email_script: "Hola, hemos ajustado el manejo de productos sin stock. Mantendremos la URL activa para capturar tráfico residual, pero hemos actualizado el Schema a 'OutOfStock' para ser transparentes con Google y el usuario."
  },
  {
    title: "Gestión Descatalogados (Redirect 301)",
    description: "Implementación de redirecciones 301 a productos equivalentes o categoría padre para productos eliminados permanentemente.",
    phase: "Technical Audit",
    default_priority: 3,
    applicable_strategies: [StrategyType.ECOM],
    email_script: "Hola, hemos limpiado el catálogo de productos antiguos. Los productos descatalogados ahora redirigen a su versión más nueva o categoría inmediata, preservando la autoridad acumulada y mejorando la experiencia del usuario."
  },
  {
    title: "Optimización Semántica de Categorías",
    description: "Ampliación de textos de categoría con contenido semántico relevante para keywords transaccionales.",
    phase: "Content",
    default_priority: 3,
    applicable_strategies: [StrategyType.ECOM],
    email_script: "Hola, hemos enriquecido las descripciones de categoría. Añadir contexto semántico ayuda a Google a entender no solo el listado de productos, sino la intención comercial y variedad de la gama, mejorando el ranking para términos head-tail."
  },
  {
    title: "Schema BreadcrumbList",
    description: "Implementación de datos estructurados para migas de pan, reflejando la jerarquía de silos.",
    phase: "On-Page",
    default_priority: 3,
    applicable_strategies: [StrategyType.ECOM],
    email_script: "Hola, las Breadcrumbs ahora tienen marcado Schema. Esto mejora la visualización en SERPs, mostrando la ruta de categoría en lugar de la URL cruda, lo que aumenta el CTR."
  },
  {
    title: "Optimización Buscador Interno",
    description: "Noindex de páginas de resultados de búsqueda interna para evitar Thin Content masivo.",
    phase: "Technical Audit",
    default_priority: 5,
    applicable_strategies: [StrategyType.ECOM],
    email_script: "Hola, hemos bloqueado la indexación de resultados de búsqueda interna. Estas páginas suelen generar contenido duplicado infinito; al bloquearlas, forzamos a Google a rastrear la estructura de navegación real."
  },
  {
    title: "Normalización de URLs de Producto",
    description: "Eliminación de IDs de sesión o parámetros de tracking en las URLs canónicas de ficha de producto.",
    phase: "Technical Audit",
    default_priority: 4,
    applicable_strategies: [StrategyType.ECOM],
    email_script: "Hola, hemos normalizado las URLs de producto. Asegurar URLs limpias y estáticas consolida la autoridad de enlace y facilita que los usuarios compartan los enlaces correctos."
  },
  {
    title: "Estrategia de Productos Relacionados",
    description: "Mejora del enlazado interno mediante módulos de 'Productos complementarios' o 'Comprados juntos'.",
    phase: "On-Page",
    default_priority: 2,
    applicable_strategies: [StrategyType.ECOM],
    email_script: "Hola, hemos optimizado los bloques de cross-selling. Esto no solo aumenta el ticket medio, sino que mejora la profundidad del rastreo al crear más caminos hacia productos profundos."
  },

  // --- MEDIA / PUBLISHER STRATEGY ---
  {
    title: "Validación de Schema NewsArticle",
    description: "Implementación estricta de NewsArticle (Headline, Image, DatePublished, Author).",
    phase: "On-Page",
    default_priority: 5,
    applicable_strategies: [StrategyType.MEDIA],
    email_script: "Hola, el marcado NewsArticle está validado. Esto es crítico para aparecer en el carrusel de Top Stories y Google Discover. Hemos verificado que las imágenes cumplan con los requisitos de tamaño mínimo."
  },
  {
    title: "Google Publisher Center",
    description: "Configuración y verificación de la fuente en Google Publisher Center para gestión de marca en Google News.",
    phase: "Setup",
    default_priority: 4,
    applicable_strategies: [StrategyType.MEDIA],
    email_script: "Hola, hemos configurado el Publisher Center. Ahora tenemos control sobre el logotipo y los estilos que aparecen en la aplicación de Google News, reforzando el branding de la publicación."
  },
  {
    title: "Estrategia Evergreen vs News",
    description: "Separación arquitectónica y de enlazado entre contenido de noticias (efímero) y guías evergreen.",
    phase: "Content",
    default_priority: 4,
    applicable_strategies: [StrategyType.MEDIA],
    email_script: "Hola, hemos definido la distinción Evergreen/News. El contenido Evergreen se mantendrá actualizado y re-promovido, mientras que las noticias seguirán su ciclo de vida natural, optimizando el esfuerzo editorial."
  },
  {
    title: "Sitemap de Noticias",
    description: "Creación de sitemap específico para noticias publicadas en las últimas 48 horas.",
    phase: "Technical Audit",
    default_priority: 5,
    applicable_strategies: [StrategyType.MEDIA],
    email_script: "Hola, el Sitemap de Noticias está operativo. Solo incluye artículos recientes (<48h), lo que permite a Googlebot News priorizar el rastreo de contenido fresco inmediatamente tras su publicación."
  },
  {
    title: "Optimización CWV para Discover",
    description: "Auditoría específica de Core Web Vitals (CLS y LCP) para asegurar elegibilidad en feed de Discover.",
    phase: "WPO",
    default_priority: 4,
    applicable_strategies: [StrategyType.MEDIA],
    email_script: "Hola, hemos pulido los Web Vitals para móvil. Google Discover es muy sensible a la experiencia de página; al mejorar la estabilidad visual, aumentamos drásticamente la probabilidad de entrar en el feed."
  },
  {
    title: "Schema Person (Author)",
    description: "Creación de páginas de autor con Schema Person y enlaces a RRSS para E-E-A-T.",
    phase: "On-Page",
    default_priority: 4,
    applicable_strategies: [StrategyType.MEDIA],
    email_script: "Hola, hemos enriquecido las biografías de autor. Vincular los artículos a perfiles de autores reales con experiencia demostrable refuerza las señales E-E-A-T, vitales para temáticas YMYL."
  },
  {
    title: "Datos Estructurados Paywall",
    description: "Implementación de propiedades de acceso en JSON-LD para contenido de suscripción (isAccessibleForFree).",
    phase: "On-Page",
    default_priority: 3,
    applicable_strategies: [StrategyType.MEDIA],
    email_script: "Hola, hemos configurado el marcado de Paywall. Esto permite a Google indexar el contenido completo que está detrás del muro de pago sin considerarlo cloaking, respetando las directrices de calidad."
  },
  {
    title: "Consistencia de Fechas",
    description: "Auditoría de visualización de fechas: datePublished visible y dateModified cuando hay cambios sustanciales.",
    phase: "Technical Audit",
    default_priority: 3,
    applicable_strategies: [StrategyType.MEDIA],
    email_script: "Hola, hemos unificado el criterio de fechas. Mostrar claramente cuándo se actualizó un artículo señala frescura al algoritmo y al usuario, un factor clave en consultas QDF (Query Deserves Freshness)."
  },
  {
    title: "Optimización Imagen Destacada (Discover)",
    description: "Asegurar imágenes de alta resolución (>1200px ancho) y max-image-preview:large.",
    phase: "On-Page",
    default_priority: 4,
    applicable_strategies: [StrategyType.MEDIA],
    email_script: "Hola, hemos estandarizado las imágenes destacadas. Usar imágenes de gran formato y declarar 'max-image-preview:large' es un requisito técnico directo para conseguir tarjetas grandes en Discover y aumentar el CTR."
  },
  {
    title: "Monitorización Google Trends",
    description: "Establecimiento de flujo de trabajo para detección de temas tendencia y redacción rápida.",
    phase: "Content",
    default_priority: 3,
    applicable_strategies: [StrategyType.MEDIA],
    email_script: "Hola, el dashboard de tendencias está listo. El equipo de redacción ahora puede identificar picos de interés en tiempo real para cubrir noticias de última hora antes que la competencia."
  },
  {
    title: "Estructura de Encabezados (Skimmability)",
    description: "Optimización de H1, H2, H3 para lectura rápida y Featured Snippets.",
    phase: "Content",
    default_priority: 3,
    applicable_strategies: [StrategyType.MEDIA],
    email_script: "Hola, hemos revisado las guías de estilo. Estructurar el contenido para 'skimmability' no solo mejora la retención del usuario, sino que facilita a Google la extracción de pasajes para Featured Snippets."
  },
  {
    title: "Auditoría E-E-A-T",
    description: "Revisión de señales de Experiencia, Autoridad y Confianza en páginas 'About' y política editorial.",
    phase: "Authority",
    default_priority: 5,
    applicable_strategies: [StrategyType.MEDIA],
    email_script: "Hola, hemos reforzado las páginas corporativas. Explicar claramente nuestra política editorial y quién está detrás del medio construye la confianza necesaria para que Google nos considere una fuente autorizada."
  }
]

async function main() {
  console.log(`Start seeding ...`)

  // Optional: Clear existing templates to avoid duplicates if running multiple times
  await prisma.taskTemplate.deleteMany({})

  const result = await prisma.taskTemplate.createMany({
    data: tasks,
    skipDuplicates: true, // Optional: in case the script is run multiple times
  })

  console.log(`Seeding finished. Created ${result.count} task templates.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
