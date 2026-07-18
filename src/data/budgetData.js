export const TOTAL_BUDGET = 700;
export const CURRENT_DEFICIT = 4.9;
export const GDP = 2420; // תחזית תמ"ג 2027

// severity: "normal" | "warning" | "critical"
export const CATEGORIES = [
  {
    id: "defense",
    label: "ביטחון וצבא",
    emoji: "🛡️",
    color: "#ef4444",
    current: 100,
    min: 60,
    max: 160,
    insights: {
      decrease: [
        { threshold: -5,  severity: "warning",  text: "חיזבאללה שלח פרחים. 5 מיליארד פחות לביטחון." },
        { threshold: -20, severity: "critical", text: "20 מיליארד קיצוץ. כיפת ברזל? כיפת אלומיניום." },
        { threshold: -35, severity: "critical", text: "קיצוץ של 35 מיליארד. נקווה שהאיראנים יהיו יותר נחמדים הפעם." },
      ],
      increase: [
        { threshold: 5,   severity: "normal",   text: "עוד 2 מיליון ימי מילואים. במשרד כבר נכנסים לכוננות." },
        { threshold: 20,  severity: "normal",   text: "עוד 22 מטוסי F-35 ישר מהניילונים. בחיל האוויר בוכים מאושר." },
        { threshold: 40,  severity: "warning",  text: "ישראל בדרך לטופ 5 בהוצאה ביטחונית ביחס לתמ\"ג." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 5,  items: ["מטוסי קרב נוספים", "כיפות ברזל נוספות", "חיל הים מחוזק"] },
        { threshold: 20, items: ["ישראל בין 5 המעצמות הצבאיות", "יתרון טכנולוגי מוחץ", "הרתעה אמיתית"] },
        { threshold: 40, items: ["הצבא החזק ביחס לגודלו בעולם", "ציוד מהמאה ה-22", "שום שכן לא ינסה"] },
      ],
      decrease: [
        { threshold: -5,  items: ["ציוד פחות מתוחזק", "אימונים מצומצמים", "מאגר מילואים קטן"] },
        { threshold: -20, items: ["כיפת ברזל מצומצמת", "פחות כלי טיס פעילים", "גדודים קטנים יותר"] },
        { threshold: -35, items: ["ירידה חדה בהרתעה", "תלות גבוהה בסיוע אמריקאי", "ביטחון דק מאוד"] },
      ],
    },
  },
  {
    id: "education",
    label: "חינוך והשכלה גבוהה",
    emoji: "📚",
    color: "#3b82f6",
    current: 127,
    min: 73,
    max: 200,
    insights: {
      decrease: [
        { threshold: -5,  severity: "warning",  text: "5,000 מורים פחות. אבל הכיתה של 42 ממילא התרגלה לבד." },
        { threshold: -20, severity: "critical", text: "ילדים לא צריכים ספרים. יש TikTok. הסטודנטים? עוזבים לברלין." },
        { threshold: -35, severity: "critical", text: "מחלקות מחקר נסגרות. הדור הבא של החוקרים? אמריקאים." },
        { threshold: -55, severity: "critical", text: "עוד קיצוץ בחינוך ומדינת ישראל תפסיק להפתיע. לגמרי." },
      ],
      increase: [
        { threshold: 5,   severity: "normal",   text: "5,000 מורים חדשים מצטרפים למערכת" },
        { threshold: 15,  severity: "normal",   text: "יום לימודים ארוך ברוב בתי הספר היסודיים בישראל" },
        { threshold: 30,  severity: "normal",   text: "30,000 מלגות לסטודנטים. המוחות הבורחים עוצרים את הטיסה." },
        { threshold: 50,  severity: "normal",   text: "ישראל בטופ-20 אוניברסיטאות. אפשר לשיר הבאנו שלום." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 5,  items: ["10,000 מורים חדשים", "כיתות קטנות יותר", "ספרים לכל ילד"] },
        { threshold: 20, items: ["יום לימודים ארוך לכולם", "שכר מורים הוגן", "מלגות לסטודנטים"] },
        { threshold: 40, items: ["פרופסורים חוזרים מחו\"ל", "מוחות נשארים בארץ", "ישראל בטופ-20 אוניברסיטאות"] },
        { threshold: 60, items: ["חינוך כמו פינלנד", "מחקר עולמי מובייל", "אקדמיה מצוינת"] },
      ],
      decrease: [
        { threshold: -5,  items: ["5,000 מורים פחות", "ספרים ישנים וקרועים", "כיתות צפופות יותר"] },
        { threshold: -20, items: ["סגירת מסגרות חינוך", "שכר לימוד קפץ 25%", "TikTok מחליף ספרי לימוד"] },
        { threshold: -35, items: ["מחלקות מחקר נסגרות", "חינוך איכותי רק לעשירים", "אקזודוס אקדמי"] },
        { threshold: -55, items: ["ויתור על דור שלם", "בי\"ס ציבורי? מי מכיר", "החוקרים הבאים — אמריקאים"] },
      ],
    },
  },
  {
    id: "welfare",
    label: "ביטוח לאומי, רווחה ותעסוקה",
    emoji: "👴",
    color: "#f59e0b",
    current: 88,
    min: 55,
    max: 130,
    insights: {
      decrease: [
        { threshold: -5,  severity: "warning",  text: "קיצוץ בקצבאות. הנכים שלחו מכתב מחאה. לא ענו להם." },
        { threshold: -15, severity: "critical", text: "ניפחת את הגירעון או קצצת לחלשים. בחרת בחלשים. קלאסי." },
        { threshold: -25, severity: "critical", text: "שינוי מבני בזכאות לקצבאות. כלומר — פחות אנשים יקבלו." },
      ],
      increase: [
        { threshold: 5,   severity: "normal",   text: "העלאת קצבת נכות ב-15%. לא מותרות — רק כיסוי קצת יותר טוב." },
        { threshold: 20,  severity: "normal",   text: "פנסיית זקנה בסיסית לכל אזרח. אירופה עושה כבר 50 שנה." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 5,  items: ["קצבת נכות גבוהה ב-15%", "תמיכה לחד-הוריות", "מרכזי שיקום נוספים"] },
        { threshold: 20, items: ["פנסיית זקנה בסיסית לכולם", "קצבת קיום אמיתית", "פנסיה כמו באירופה"] },
      ],
      decrease: [
        { threshold: -5,  items: ["קיצוץ בקצבאות נכות", "פחות מרכזי שיקום", "הזקנים ישלמו את המחיר"] },
        { threshold: -15, items: ["ביטול מענקים לחד-הוריות", "זקנים בעוני גלוי", "ויתור על השכבות החלשות"] },
        { threshold: -25, items: ["שינוי מבני בזכאות", "עוני קיצוני מוסתר", "1.2 מיליון ללא רשת ביטחון"] },
      ],
    },
  },
  {
    id: "health",
    label: "בריאות",
    emoji: "🏥",
    color: "#10b981",
    current: 69,
    min: 40,
    max: 110,
    insights: {
      decrease: [
        { threshold: -5,  severity: "warning",  text: "המתנה לרופא מומחה עלתה ל-5 חודשים. נסה אספירין." },
        { threshold: -15, severity: "critical", text: "20 מחלקות אשפוז נסגרות. אל דאגה — פרטי רק 3,000 ₪ לפגישה." },
        { threshold: -25, severity: "critical", text: "ישראל חוזרת לרמת בריאות של שנות ה-90. נוסטלגיה אמיתית." },
      ],
      increase: [
        { threshold: 5,   severity: "normal",   text: "1,200 מיטות אשפוז חדשות. לאנשים שיהיו בהן." },
        { threshold: 15,  severity: "normal",   text: "רופא משפחה שמגיע תוך שבוע. מושג חדשני לישראל." },
        { threshold: 25,  severity: "normal",   text: "ממוצע OECD בבריאות. אחרי 40 שנה של פיגור." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 5,  items: ["1,200 מיטות אשפוז חדשות", "תור לרופא תוך שבוע", "ציוד רפואי מתקדם"] },
        { threshold: 15, items: ["רפואת שיניים בסל הבריאות", "פסיכיאטריה נגישה לכולם", "רופא משפחה אמיתי"] },
        { threshold: 25, items: ["ממוצע OECD — לראשונה", "מיטות ICU כמו גרמניה", "המתנה פחות מחודש"] },
      ],
      decrease: [
        { threshold: -5,  items: ["תור לרופא מומחה — 5 חודשים", "פחות תרופות בסל", "קופות חולות חלשות"] },
        { threshold: -15, items: ["20 מחלקות אשפוז נסגרות", "רופאים עוזבים לחו\"ל", "ביטוח פרטי הפך הכרחי"] },
        { threshold: -25, items: ["חדרי מיון עמוסים ב-300%", "תמותה הניתנת למניעה עולה", "ישראל 1990"] },
      ],
    },
  },
  {
    id: "transport_subsidy",
    label: "סבסוד תחבורה ציבורית ודיור",
    emoji: "🚌",
    color: "#14b8a6",
    current: 22,
    min: 10,
    max: 40,
    insights: {
      decrease: [
        { threshold: -4,  severity: "warning",  text: "כרטיס חודשי קפץ ב-40%. הנסיעה לעבודה הפכה מיותרת." },
        { threshold: -8,  severity: "critical", text: "ביטול סבסוד שכר דירה. 200,000 משפחות בחיפוש דירה." },
        { threshold: -12, severity: "critical", text: "תחבורה ציבורית ללא סבסוד. רק מכוניות. רק פקק." },
      ],
      increase: [
        { threshold: 4,   severity: "normal",   text: "כרטיס חודשי זול יותר ב-30%. אנשים מוכנים להפסיק לנהוג." },
        { threshold: 10,  severity: "normal",   text: "סבסוד שכר דירה לזוגות צעירים. ת\"א אולי בת-השגה שוב." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 4,  items: ["תחבורה ציבורית בהישג יד", "פחות מכוניות על הכביש", "סבסוד לאוכלוסיות חלשות"] },
        { threshold: 10, items: ["שכר דירה בר-השגה", "זוגות נשארים בערים הגדולות", "פחות לחץ כלכלי"] },
      ],
      decrease: [
        { threshold: -4,  items: ["כרטיס חודשי יקר ב-40%", "פחות נוסעים בתחבורה", "מכוניות נוספות בכביש"] },
        { threshold: -8,  items: ["ביטול סבסוד שכ\"ד", "משפחות עוזבות ת\"א", "פנאי כלכלי? כמעט אפס"] },
        { threshold: -12, items: ["תחבורה ציבורית רק לעשירים", "שכר דירה בשיא", "ת\"א = לוס אנג'לס"] },
      ],
    },
  },
  {
    id: "holocaust_survivors",
    label: "ניצולי שואה",
    emoji: "🕍",
    color: "#a855f7",
    current: 5,
    min: 3,
    max: 9,
    insights: {
      decrease: [
        { threshold: -1,  severity: "warning",  text: "קיצוץ בתמיכה לניצולי שואה. יש עוד זמן לתקן את זה?" },
        { threshold: -2,  severity: "critical", text: "הניצולים הזקנים והחולים ישלמו את מחיר הקיצוץ. ממש הם." },
      ],
      increase: [
        { threshold: 1,   severity: "normal",   text: "תוספת כספית לניצולים חיים. כמה שנים נותרו — כדאי לנצל." },
        { threshold: 3,   severity: "normal",   text: "כל ניצול יקבל ליווי אישי וסיוע בשכר דירה. מאוחר מדי? לא בטוח." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 1, items: ["קצבה חודשית גבוהה יותר", "טיפול רפואי בבית", "סיוע במחיית יום-יום"] },
        { threshold: 3, items: ["ליווי אישי לכל ניצול", "שיפוץ דירות", "מרכזי יום מורחבים"] },
      ],
      decrease: [
        { threshold: -1, items: ["קיצוץ בקצבאות ניצולים", "פחות שירותי בריאות", "ניצולים בבדידות"] },
        { threshold: -2, items: ["ביטול ליווי אישי", "מרכזי יום נסגרים", "ניצולים ללא מענה"] },
      ],
    },
  },
  {
    id: "immigration",
    label: "עולים חדשים",
    emoji: "✈️",
    color: "#06b6d4",
    current: 2,
    min: 1,
    max: 5,
    insights: {
      decrease: [
        { threshold: -0.5, severity: "warning",  text: "פחות תמיכה לעולים חדשים. אולי ייחשבו פעמיים לפני שיעלו." },
        { threshold: -1,   severity: "critical", text: "מרכזי קליטה נסגרים. עולים ישנים שנים ראשונות ברחוב — ממש." },
      ],
      increase: [
        { threshold: 1,   severity: "normal",   text: "שיפור קורסי עברית ותמיכה בתעסוקה. עולים משתלבים מהר יותר." },
        { threshold: 2,   severity: "normal",   text: "ישראל מושכת מומחים מחו\"ל שוב. יש לאן לחזור." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 1, items: ["קורסי עברית חינמיים", "סיוע בדיור לעולים", "תמיכה בתעסוקה"] },
        { threshold: 2, items: ["ישראל יעד אטרקטיבי", "מומחים חוזרים מחו\"ל", "קהילות עולים מבוססות"] },
      ],
      decrease: [
        { threshold: -0.5, items: ["מרכזי קליטה עמוסים", "פחות קורסי שפה", "עולים מתקשים להשתלב"] },
        { threshold: -1,   items: ["מרכזי קליטה נסגרים", "עולים ללא תמיכה", "ירידה בעלייה לישראל"] },
      ],
    },
  },
  {
    id: "national_security",
    label: "משטרה ובתי כלא",
    emoji: "👮",
    color: "#dc2626",
    current: 27,
    min: 15,
    max: 45,
    insights: {
      decrease: [
        { threshold: -4,  severity: "warning",  text: "פחות שוטרים ברחוב. הפשע המאורגן ישמח לשמוע." },
        { threshold: -8,  severity: "critical", text: "ביטול יחידות מיוחדות. הפשע כבר מחפש משרדים." },
        { threshold: -12, severity: "critical", text: "ירידה חדה באכיפת חוק. הפשע המאורגן שולט על כבישים." },
      ],
      increase: [
        { threshold: 4,   severity: "normal",   text: "3,000 שוטרים חדשים. עוד גם בלשים מומחים." },
        { threshold: 8,   severity: "normal",   text: "יחידות סייבר חדשות. הפשע הדיגיטלי מודאג." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 4,  items: ["3,000 שוטרים נוספים", "יותר ניידות בשטח", "ירידה בפשיעה"] },
        { threshold: 8,  items: ["יחידות סייבר מורחבות", "מאבק בפשע מאורגן", "מערכת מעצרים מתקדמת"] },
      ],
      decrease: [
        { threshold: -4,  items: ["פחות שוטרים בשטח", "זמן תגובה ארוך יותר", "פשיעה עולה"] },
        { threshold: -8,  items: ["יחידות מיוחדות מצטמצמות", "פשע מאורגן מתחזק", "אכיפה חלשה"] },
        { threshold: -12, items: ["אובדן שליטה על כבישים", "הגנה אזרחית מינימלית", "ישראל 1948"] },
      ],
    },
  },
  {
    id: "intelligence",
    label: "מוסד ושב\"כ",
    emoji: "🕵️",
    color: "#7c3aed",
    current: 19,
    min: 10,
    max: 32,
    insights: {
      decrease: [
        { threshold: -3,  severity: "warning",  text: "קיצוץ במודיעין. מישהו יצטרך לשאול את איראן בעצמו." },
        { threshold: -6,  severity: "critical", text: "מקורות מודיעיניים מצטמצמים. הפתעות אסטרטגיות בדרך." },
        { threshold: -9,  severity: "critical", text: "ישראל עיוורת. כמה זמן עד להפתעה הבאה?" },
      ],
      increase: [
        { threshold: 3,   severity: "normal",   text: "קיבולת מודיעינית גדלה. פחות הפתעות מאיראן." },
        { threshold: 6,   severity: "normal",   text: "יחידות סייבר מתקדמות. ישראל שולטת בדיגיטל הביטחוני." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 3,  items: ["מקורות מודיעין מורחבים", "יחידות סייבר חדשות", "הרתעה נסתרת"] },
        { threshold: 6,  items: ["שליטה מודיעינית אזורית", "מניעת איומים מוקדמת", "ישראל בטוחה יותר"] },
      ],
      decrease: [
        { threshold: -3,  items: ["מקורות מצטמצמים", "כיסוי מודיעיני חלש", "הפתעות אסטרטגיות"] },
        { threshold: -6,  items: ["ישראל חשופה לאיומים", "פחות ביצועי סייבר", "עיוורון אסטרטגי"] },
        { threshold: -9,  items: ["מודיעין בשפל", "תלות בבעלי ברית", "7 באוקטובר הבא?"] },
      ],
    },
  },
  {
    id: "veterans",
    label: "חיילים משוחררים",
    emoji: "🎖️",
    color: "#b45309",
    current: 4,
    min: 2,
    max: 8,
    insights: {
      decrease: [
        { threshold: -1,  severity: "warning",  text: "חיילים משוחררים עם פחות תמיכה. מי ירצה לשרת בצבא?" },
        { threshold: -2,  severity: "critical", text: "ביטול תמיכה נפשית לחיילים. PTSD לא נעלם לבד." },
      ],
      increase: [
        { threshold: 1,   severity: "normal",   text: "מענקי שחרור גבוהים יותר. הצבא מתחיל לשלם מחיר הוגן." },
        { threshold: 3,   severity: "normal",   text: "מרכזי שיקום נפשי לחיילים משוחררים. סוף סוף." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 1, items: ["מענק שחרור גבוה יותר", "תמיכה בלימודים", "קליטה מהירה לשוק העבודה"] },
        { threshold: 3, items: ["מרכזי שיקום נפשי", "ליווי אישי לחיילים", "ישראל מכבדת את שירותם"] },
      ],
      decrease: [
        { threshold: -1, items: ["מענק שחרור נמוך", "פחות תמיכה נפשית", "חיילים נופלים בין הכיסאות"] },
        { threshold: -2, items: ["PTSD ללא טיפול", "חיילים מתקשים לשוב", "ירידה במוטיבציה לשירות"] },
      ],
    },
  },
  {
    id: "otef",
    label: "עוטף עזה וקצת מעבר",
    emoji: "🏗️",
    color: "#f97316",
    current: 17,
    min: 5,
    max: 35,
    insights: {
      decrease: [
        { threshold: -3,  severity: "warning",  text: "עיכוב בשיקום. עשרות אלפי תושבים עדיין לא חזרו לביתם." },
        { threshold: -8,  severity: "critical", text: "עיכוב של שנתיים בשיקום. הכפרים יישארו ריקים קצת יותר." },
        { threshold: -12, severity: "critical", text: "שיקום העוטף על הנייר. בפועל — אפס." },
      ],
      increase: [
        { threshold: 3,   severity: "normal",   text: "אלפי יחידות דיור נוספות בשיקום. תושבים מתחילים לחזור." },
        { threshold: 8,   severity: "normal",   text: "כל כפרי עוטף עזה ישוקמו עד 2027. מהיר ממה שתכננו." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 3,  items: ["אלפי יחידות דיור בהקמה", "תושבים חוזרים לכפרים", "בניית קהילות מחדש"] },
        { threshold: 8,  items: ["כל כפרי העוטף מוחזרים", "פארקי תעשייה חדשים", "ישראל בונה ממגף"] },
      ],
      decrease: [
        { threshold: -3,  items: ["עיכוב בשיקום הכפרים", "תושבים בדירות זמניות", "ממשיכים לחכות"] },
        { threshold: -8,  items: ["כפרי עוטף עדיין ריקים", "ירידה בביטחון האישי", "תושבים לא חוזרים"] },
        { threshold: -12, items: ["עוטף ללא שיקום", "ויתור על הפריפריה", "ממשלה שבגדה בתושבים"] },
      ],
    },
  },
  {
    id: "north",
    label: "פיתוח הצפון",
    emoji: "🌿",
    color: "#22c55e",
    current: 15,
    min: 5,
    max: 30,
    insights: {
      decrease: [
        { threshold: -3,  severity: "warning",  text: "פחות השקעה בצפון. הגליל ממשיך להרגיש שכוח." },
        { threshold: -7,  severity: "critical", text: "פיתוח הצפון קפא. התושבים עוזבים לתל אביב." },
        { threshold: -10, severity: "critical", text: "הצפון בשפל. ירידה דמוגרפית. פריפריה תמיד תשלם." },
      ],
      increase: [
        { threshold: 3,   severity: "normal",   text: "פרויקטי פיתוח בגליל. יש כבר על מי לסמוך." },
        { threshold: 8,   severity: "normal",   text: "פיתוח הצפון קפץ 10 שנה קדימה. הגליל הפך מוקד השקעה לאומי." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 3,  items: ["פארק תעשייה בגליל", "כבישים ותשתיות חדשות", "ישובים מתחזקים"] },
        { threshold: 8,  items: ["קפיצת מדרגה בפריפריה", "ישובים חדשים בגליל", "מודל השקעה לאומי"] },
      ],
      decrease: [
        { threshold: -3,  items: ["פחות פרויקטי פיתוח", "ירידה בשירותים ציבוריים", "צפון מוחלש"] },
        { threshold: -7,  items: ["תושבים עוזבים לת\"א", "ירידה דמוגרפית בגליל", "ישובים בשקיעה"] },
        { threshold: -10, items: ["הצפון בשפל היסטורי", "ויתור על הפריפריה", "אסון דמוגרפי"] },
      ],
    },
  },
  {
    id: "economy",
    label: "משרד הכלכלה והתעשייה",
    emoji: "🏭",
    color: "#64748b",
    current: 5,
    min: 2,
    max: 12,
    insights: {
      decrease: [
        { threshold: -1,  severity: "warning",  text: "פחות תמיכה לעסקים קטנים. הקיוסק שלמה נסגר. שוב." },
        { threshold: -2,  severity: "critical", text: "תמיכה בתעשייה בירידה. חברות מפתחות מוצרים בחו\"ל." },
        { threshold: -3,  severity: "critical", text: "ישראל מאבדת יתרון תחרותי בתעשייה. סין שמחה." },
      ],
      increase: [
        { threshold: 2,   severity: "normal",   text: "תמריצים לעסקים קטנים. 5,000 עסקים חדשים בשנה." },
        { threshold: 5,   severity: "normal",   text: "ישראל בונה מרכזי תעשייה. הייצור חוזר לארץ." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 2, items: ["תמיכה לעסקים קטנים", "הפחתת רגולציה", "יצירת משרות"] },
        { threshold: 5, items: ["מרכזי תעשייה חדשים", "ייצור מקומי גדל", "ירידה בייבוא"] },
      ],
      decrease: [
        { threshold: -1, items: ["עסקים קטנים נסגרים", "פחות יצירת משרות", "תעשייה מצטמצמת"] },
        { threshold: -2, items: ["חברות עוברות לחו\"ל", "אובדן יתרון תחרותי", "מיתון תעשייתי"] },
        { threshold: -3, items: ["ישראל מאבדת מוניטין", "ייבוא מחליף ייצור מקומי", "אבטלה תעשייתית"] },
      ],
    },
  },
  {
    id: "agriculture",
    label: "משרד החקלאות",
    emoji: "🌾",
    color: "#84cc16",
    current: 2,
    min: 1,
    max: 5,
    insights: {
      decrease: [
        { threshold: -0.5, severity: "warning",  text: "פחות תמיכה לחקלאים. הגבינה הצפתית הפכה יוקרה." },
        { threshold: -1,   severity: "critical", text: "חקלאות ישראלית בשקיעה. מיובא הכל. גם הטחינה." },
      ],
      increase: [
        { threshold: 0.5,  severity: "normal",   text: "תמיכה בחקלאים קטנים. יש עוד עגבניות ישראליות בשוק." },
        { threshold: 2,    severity: "normal",   text: "ישראל מחזקת את ביטחון המזון. לא תלויים בטורקיה." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 0.5, items: ["תמיכה בחקלאים קטנים", "טכנולוגיה חקלאית מתקדמת", "ייצוא חקלאי גדל"] },
        { threshold: 2,   items: ["ביטחון מזון לאומי", "מוצרים ישראליים בשוק", "חקלאות כלכלית"] },
      ],
      decrease: [
        { threshold: -0.5, items: ["חקלאים קטנים נסגרים", "מחירי מזון עולים", "ייבוא גובר"] },
        { threshold: -1,   items: ["חקלאות ישראלית בשקיעה", "תלות גבוהה בייבוא", "מחירי מזון בשיא"] },
      ],
    },
  },
  {
    id: "environment",
    label: "משרדי הגנת הסביבה, תיירות ותקשורת",
    emoji: "🌍",
    color: "#0ea5e9",
    current: 1,
    min: 0.5,
    max: 3,
    insights: {
      decrease: [
        { threshold: -0.3, severity: "warning",  text: "פחות תקציב לסביבה. הים התיכון כבר לא כזה תיכוני." },
        { threshold: -0.5, severity: "critical", text: "תיירות? השמועה שישראל מזהמת לא עוזרת." },
      ],
      increase: [
        { threshold: 0.3,  severity: "normal",   text: "נשמרים שמורות טבע חדשות. הדרסה הגדולה הצילה." },
        { threshold: 1,    severity: "normal",   text: "ישראל מגדילה תיירות ירוקה. 3 מיליון תיירים יותר." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 0.3, items: ["שמורות טבע מוגנות", "תיירות ירוקה", "מדיניות סביבתית"] },
        { threshold: 1,   items: ["ישראל יעד תיירות עולמי", "תשתיות תיירות חדשות", "הכנסות מתיירות"] },
      ],
      decrease: [
        { threshold: -0.3, items: ["זיהום סביבתי גדל", "שמורות מוזנחות", "תיירות פוחתת"] },
        { threshold: -0.5, items: ["ישראל מאחר ביעדי אקלים", "נזק לים התיכון", "תיירים בורחים"] },
      ],
    },
  },
  {
    id: "transport",
    label: "משרד התחבורה והבטיחות בדרכים",
    emoji: "🚇",
    color: "#8b5cf6",
    current: 34,
    min: 15,
    max: 60,
    insights: {
      decrease: [
        { threshold: -5,  severity: "warning",  text: "המטרו מתעכב 3 שנים. תל אביב תמשיך להיות פקק בינלאומי." },
        { threshold: -12, severity: "critical", text: "הקפאת רכבת קלה. הנסיעה מאשדוד לת\"א תישאר 3 שעות." },
        { threshold: -20, severity: "critical", text: "ישראל תחתית OECD בתחבורה ציבורית. כמו תמיד. לנצח." },
      ],
      increase: [
        { threshold: 5,   severity: "normal",   text: "עוד 25 ק\"מ של רכבת קלה. אולי תצליח לאסוף את הילד בזמן!" },
        { threshold: 12,  severity: "normal",   text: "חלק מקווי המטרו בגוש דן מוקדמים בשנתיים." },
        { threshold: 20,  severity: "normal",   text: "רכבת מהירה ת\"א–ירושלים ב-30 דק'. ציביליזציה!" },
      ],
    },
    highlights: {
      increase: [
        { threshold: 5,  items: ["מטרו ת\"א מוקדם בשנתיים", "רכבת קלה חדשה", "פחות פקק בכבישים"] },
        { threshold: 12, items: ["רכבת ת\"א–ירושלים ב-30 דק'", "מטרו חיפה מתחיל", "אוטובוסים חשמליים"] },
        { threshold: 20, items: ["ממוצע אירופה בתחבורה", "פקק? מושג של העבר", "תחבורה ציבורית 24/7"] },
      ],
      decrease: [
        { threshold: -5,  items: ["מטרו מתעכב 3 שנים", "תחבורה ציבורית מצומצמת", "עוד תחנות נסגרות"] },
        { threshold: -12, items: ["הקפאת רכבת קלה", "כבישים לא מתוחזקים", "ת\"א–אשדוד = 3 שעות"] },
        { threshold: -20, items: ["תחתית OECD בתחבורה", "ירידה בבטיחות כבישים", "שום דבר לא מתקדם"] },
      ],
    },
  },
  {
    id: "housing",
    label: "משרד הבינוי והשיכון",
    emoji: "🏠",
    color: "#f43f5e",
    current: 5,
    min: 2,
    max: 15,
    insights: {
      decrease: [
        { threshold: -1,  severity: "warning",  text: "פחות יחידות דיור ציבוריות. השכירות עלתה שוב. כמובן." },
        { threshold: -2,  severity: "critical", text: "הפסקת בנייה ציבורית. הזוגות הצעירים יחכו עוד 10 שנה לדירה." },
        { threshold: -3,  severity: "critical", text: "ישראל מזניחה דיור ציבורי. כולם שוכרים מיזמים פרטיים. במחיר שוק." },
      ],
      increase: [
        { threshold: 2,   severity: "normal",   text: "10,000 יחידות דיור ציבוריות חדשות. סוף לרשימות ההמתנה?" },
        { threshold: 5,   severity: "normal",   text: "שכונות שלמות בנויות. מחיר למשתכן מקבל תנופה אמיתית." },
        { threshold: 8,   severity: "normal",   text: "מחירי הדיור מתחילים לרדת. הזוגות הצעירים לא מאמינים." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 2,  items: ["10,000 דירות ציבוריות", "שכונות מעורבות", "מחיר למשתכן מוגדל"] },
        { threshold: 5,  items: ["מחירי דיור בירידה", "דירות נגישות לזוגות צעירים", "תשתיות שכונתיות"] },
        { threshold: 8,  items: ["מהפכת הדיור", "ת\"א בת-השגה", "ישראל ב-OECD בנגישות דיור"] },
      ],
      decrease: [
        { threshold: -1, items: ["פחות יחידות דיור ציבוריות", "שכירות עולה", "זוגות צעירים יוצאים"] },
        { threshold: -2, items: ["הקפאת בנייה ציבורית", "רשימות המתנה ארוכות", "מחירי דיור בשיא"] },
        { threshold: -3, items: ["דיור ציבורי כמעט ולא קיים", "ישראל = שוק פרטי מלא", "רק עשירים קונים דירה"] },
      ],
    },
  },
  {
    id: "energy",
    label: "תשתיות אנרגיה ומים",
    emoji: "⚡",
    color: "#eab308",
    current: 2,
    min: 1,
    max: 6,
    insights: {
      decrease: [
        { threshold: -0.5, severity: "warning",  text: "פחות השקעה בתשתיות מים. בצורת? מי חשב על זה?" },
        { threshold: -1,   severity: "critical", text: "תשתיות אנרגיה ישנות. הפסקות חשמל הפכו שגרה." },
      ],
      increase: [
        { threshold: 0.5,  severity: "normal",   text: "עדכון תשתיות חשמל. הפסקות חשמל פוחתות בצורה ניכרת." },
        { threshold: 2,    severity: "normal",   text: "ישראל מובילה בסולרי. 40% מהאנרגיה מתחדשת עד 2027." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 0.5, items: ["תשתיות חשמל מעודכנות", "מים בטוחים לשתייה", "אנרגיה זולה יותר"] },
        { threshold: 2,   items: ["40% אנרגיה מתחדשת", "עצמאות אנרגטית", "ישראל ירוקה יותר"] },
      ],
      decrease: [
        { threshold: -0.5, items: ["תשתיות ישנות ומתדרדרות", "הפסקות חשמל גדלות", "איכות מים יורדת"] },
        { threshold: -1,   items: ["משבר תשתיות אנרגיה", "תלות בדלק מיובא", "עלויות חשמל מזנקות"] },
      ],
    },
  },
  {
    id: "justice",
    label: "משרד המשפטים",
    emoji: "⚖️",
    color: "#9ca3af",
    current: 5,
    min: 2,
    max: 10,
    insights: {
      decrease: [
        { threshold: -1,  severity: "warning",  text: "פחות שופטים. תיקים מחכים 6 שנים. לא לגמרי צדק." },
        { threshold: -2,  severity: "critical", text: "מערכת המשפט עמוסה ב-300%. הנאשמים מחכים שנים לדיון." },
        { threshold: -3,  severity: "critical", text: "שלטון החוק נחלש. מי שיש לו כסף שוכר עורך דין. האחרים — מחכים." },
      ],
      increase: [
        { threshold: 1,   severity: "normal",   text: "200 שופטים חדשים. תיקים מגיעים לפסיקה תוך שנתיים." },
        { threshold: 3,   severity: "normal",   text: "דיגיטציה של בתי המשפט. חצי מהתיקים מסתיימים תוך שנה." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 1, items: ["200 שופטים חדשים", "תיקים מהירים יותר", "צדק נגיש לכולם"] },
        { threshold: 3, items: ["בתי משפט דיגיטליים", "תיקים מסתיימים תוך שנה", "שלטון חוק חזק"] },
      ],
      decrease: [
        { threshold: -1, items: ["תיקים מחכים 6 שנים", "מחסור חמור בשופטים", "צדק מעוכב = עיוות דין"] },
        { threshold: -2, items: ["מערכת משפט עמוסה", "נאשמים מחכים שנים", "ביטחון משפטי נפגע"] },
        { threshold: -3, items: ["שלטון חוק בשפל", "צדק רק לבעלי כסף", "שחיתות גוברת"] },
      ],
    },
  },
  {
    id: "foreign",
    label: "משרד החוץ",
    emoji: "🌐",
    color: "#0284c7",
    current: 3,
    min: 1,
    max: 7,
    insights: {
      decrease: [
        { threshold: -1,  severity: "warning",  text: "שגרירויות מצטמצמות. מי ידבר בשביל ישראל בלונדון?" },
        { threshold: -2,  severity: "critical", text: "ישראל מקצצת דיפלומטיה. אבל רוצה שהעולם יבין אותה." },
      ],
      increase: [
        { threshold: 1,   severity: "normal",   text: "שגרירויות חדשות נפתחות. ישראל חוזרת למפה הדיפלומטית." },
        { threshold: 2,   severity: "normal",   text: "ישראל משפרת יחסים עם מדינות אפריקה ואסיה. הבידוד נגמר." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 1, items: ["שגרירויות חדשות", "שיפור יחסי חוץ", "נוכחות בינלאומית חזקה"] },
        { threshold: 2, items: ["דיפלומטיה פעילה", "הסכמי שיתוף פעולה", "ישראל פחות מבודדת"] },
      ],
      decrease: [
        { threshold: -1, items: ["שגרירויות נסגרות", "חולשה דיפלומטית", "פחות ייצוג בינלאומי"] },
        { threshold: -2, items: ["ישראל מבודדת יותר", "פחות הסכמים מסחריים", "דיפלומטיה בשפל"] },
      ],
    },
  },
  {
    id: "knesset",
    label: "הכנסת",
    emoji: "🏛️",
    color: "#64748B",
    current: 1,
    min: 0.5,
    max: 5,
    insights: {
      decrease: [
        { threshold: -0.2, severity: "warning",  text: "פחות תקציב לכנסת. חברי הכנסת ייסגרו בלי קיוסק? לא בדיוק." },
        { threshold: -0.5, severity: "critical", text: "הכנסת בתקציב מינימלי. דמוקרטיה זולה — יתכן לא הכי יציבה." },
      ],
      increase: [
        { threshold: 0.2,  severity: "normal",   text: "שיפורים בשקיפות הכנסת. ישיבות מדווחות בשידור חי." },
        { threshold: 0.7,  severity: "normal",   text: "מחקר פרלמנטרי מוגבר. חברי כנסת מחוקקים עם יותר נתונים." },
      ],
    },
    highlights: {
      increase: [
        { threshold: 0.2, items: ["שקיפות גבוהה יותר", "מחקר פרלמנטרי", "שידורים חיים מכל ישיבה"] },
        { threshold: 0.7, items: ["חקיקה מבוססת נתונים", "מנגנוני פיקוח חזקים", "דמוקרטיה מתפקדת"] },
      ],
      decrease: [
        { threshold: -0.2, items: ["פחות שקיפות", "מחקר פרלמנטרי מצומצם", "חקיקה ללא נתונים"] },
        { threshold: -0.5, items: ["כנסת בתקציב שלד", "פיקוח נחלש", "דמוקרטיה בזול"] },
      ],
    },
  },
];

export const FIXED_ITEMS = [
  { label: "ריבית על חוב", amount: 64.6, note: "לא ניתן לשינוי — חוב קיים" },
  { label: "פנסיות ממשלתיות", amount: 26.8, note: "התחייבות חוקית" },
];

export function getHighlights(category, delta) {
  if (Math.abs(delta) < 2) return null;
  const list = delta < 0 ? category.highlights?.decrease : category.highlights?.increase;
  if (!list) return null;
  const absDelta = Math.abs(delta);
  let best = null;
  for (const item of list) {
    if (absDelta >= Math.abs(item.threshold)) best = item;
  }
  return best ?? null;
}

export function getInsight(category, delta) {
  if (Math.abs(delta) < 1) return null;
  const list = delta < 0 ? category.insights.decrease : category.insights.increase;
  const absDelta = Math.abs(delta);
  let best = null;
  for (const item of list) {
    if (absDelta >= Math.abs(item.threshold)) best = item;
  }
  return best ?? null;
}

// "אחר" — כל הסעיפים שלא הוכנסו לקטגוריות המשחק (ממשלה, דיגיטציה, אחר כללי)
// default categories sum=553, fixed=91.4, other=120 → total=764.4 → deficit=(764.4−613)/2420×100=6.25%
const OTHER_SPENDING = 120;

export function calcDeficit(values) {
  const totalSpend =
    Object.values(values).reduce((a, b) => a + b, 0) +
    FIXED_ITEMS.reduce((a, b) => a + b.amount, 0) +
    OTHER_SPENDING;
  const revenue = 613; // הכנסות המדינה הצפויות לשנת 2027
  return ((totalSpend - revenue) / GDP * 100).toFixed(1);
}
