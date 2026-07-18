import { useRef, useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { CATEGORIES, calcDeficit } from "../data/budgetData";

const BOI_TARGET = 3.5;
const GDP        = 2420;
const REVENUE    = 613;
const OTHER      = 120;

const SHORT = {
  defense:             "ביטחון",
  education:           "חינוך",
  health:              "בריאות",
  welfare:             "ביטוח לאומי",
  transport_subsidy:   "סבסוד תחב'",
  holocaust_survivors: "ניצולי שואה",
  immigration:         "עולים",
  national_security:   "משטרה",
  intelligence:        "מודיעין",
  veterans:            "חיילים",
  otef:                "עוטף",
  north:               "פיתוח צפון",
  economy:             "כלכלה",
  agriculture:         "חקלאות",
  environment:         "סביבה",
  transport:           "תחבורה",
  housing:             "דיור",
  energy:              "אנרגיה",
  justice:             "משפטים",
  foreign:             "חוץ",
  knesset:             "כנסת",
};

const FINANCE_LABEL = {
  taxes: "העלאת מיסים 💰",
  loans: "גיוס הלוואות 🏦",
};

/* ═══════════════════════════════════
   ANALYSIS — editorial, delta-focused
═══════════════════════════════════ */
function buildAnalysis(withDelta, deficit) {
  const parts  = [];
  const raises = withDelta.filter(c => c.delta >= 3).sort((a, b) => b.delta - a.delta);
  const cuts   = withDelta.filter(c => c.delta <= -3).sort((a, b) => a.delta - b.delta);

  /* ── Increases ── */
  if (raises.length === 0) {
    parts.push(`לא הגדלת אף סעיף בצורה משמעותית — תקציב שמרני שמרבה על הקיים.`);
  } else {
    const top = raises[0];
    const list = raises.slice(0, 2).map(c => `${c.shortLabel} (+${c.delta} מיליארד)`).join(" ו-");
    parts.push(`הגדלת בעיקר: ${list}.`);
    if (top.id === "defense")
      parts.push(`ישראל תגיע ל-${(top.value / GDP * 100).toFixed(1)}% מהתמ"ג על ביטחון — מהגבוהות בעולם. הרתעה חזקה, אבל פחות כסף לשירותים אזרחיים.`);
    else if (top.id === "education")
      parts.push(`השקעה בחינוך — תוצאות יגיעו בעוד עשור. כיתות קטנות יותר, מורים טובים יותר.`);
    else if (top.id === "health")
      parts.push(`בריאות מקבלת חיזוק — תורי הרופאים יתקצרו, יותר מיטות אשפוז. ישראל עדיין מתחת לממוצע OECD.`);
    else if (top.id === "welfare")
      parts.push(`רשת הביטחון הסוציאלי מתחזקת — קצבאות גבוהות יותר לנכים, קשישים וחד-הוריות.`);
    else if (top.id === "transport")
      parts.push(`תשתיות תחבורה — ROI ברור: פחות פקק, יותר פריון, מטרו מהיר יותר.`);
    else if (top.id === "housing")
      parts.push(`יותר יחידות דיור ציבוריות — סיכוי אמיתי להוריד שכר דירה.`);
    else if (top.id === "otef")
      parts.push(`תושבי העוטף וסביבתו חוזרים לבתיהם מהר יותר.`);
  }

  /* ── Cuts ── */
  if (cuts.length === 0) {
    parts.push(`לא קיצצת בצורה משמעותית — הגידול ממומן מגירעון גבוה יותר.`);
  } else {
    const top  = cuts[0];
    const list = cuts.slice(0, 2).map(c => `${c.shortLabel} (${c.delta} מיליארד)`).join(" ו-");
    parts.push(`קיצצת בעיקר: ${list}.`);
    if (top.id === "defense" && top.delta <= -8)
      parts.push(`קיצוץ ביטחוני משמעותי — מאפשר להפנות משאבים לאזרחים, אבל יורד מהרתעה.`);
    else if (top.id === "education" && top.delta <= -8)
      parts.push(`קיצוץ בחינוך כואב לאורך זמן — פגיעה בדור הבא.`);
    else if (top.id === "welfare" && top.delta <= -5)
      parts.push(`קיצוץ ברווחה — הנכים, הקשישים והחד-הוריות ישלמו את המחיר.`);
    else if (top.id === "health" && top.delta <= -5)
      parts.push(`קיצוץ בבריאות — תורים ארוכים, יותר אנשים עוברים לביטוח פרטי.`);
  }

  /* ── Deficit ── */
  if (deficit < BOI_TARGET)
    parts.push(`הגירעון ${deficit}% — מתחת ליעד בנק ישראל (3.5%), שלא הושג מזה שנים.`);
  else if (deficit < 5)
    parts.push(`הגירעון ${deficit}% — ${(deficit - BOI_TARGET).toFixed(1)}% מעל יעד בנק ישראל (3.5%).`);
  else
    parts.push(`הגירעון ${deficit}% — גבוה; כל 1% = ~24 מיליארד ₪ חוב חדש לדורות הבאים.`);

  return parts.join(" ");
}

/* ═══════════════════════════════════
   PRIORITY BLOCK
═══════════════════════════════════ */
function PriorityBlock({ items, isIncrease }) {
  const color = isIncrease ? "#34D399" : "#F87171";
  const label = isIncrease ? "📈  אשקיע יותר ב" : "📉  אשקיע פחות ב";
  return (
    <div style={{ ...S.priorityBlock, borderColor: color + "44", background: color + "0C" }}>
      <div style={{ ...S.priorityBlockLabel, color }}>{label}</div>
      {items.map((c, i) => (
        <div key={c.id}>
          <div style={S.priorityItemRow}>
            <span style={S.priorityEmoji}>{c.emoji}</span>
            <span style={{ ...S.priorityItemDelta, color }}>
              {isIncrease ? "+" : ""}{c.delta} מיליארד
            </span>
            <span style={S.priorityItemName}>{c.shortLabel}</span>
          </div>
          {i < items.length - 1 && <div style={S.prioritySep} />}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════
   BUDGET BARS
═══════════════════════════════════ */
function BudgetBars({ withDelta }) {
  const THRESHOLD = 2;
  const increases = withDelta.filter(c => c.delta >= THRESHOLD).sort((a, b) => b.delta - a.delta);
  const cuts      = withDelta.filter(c => c.delta <= -THRESHOLD).sort((a, b) => a.delta - b.delta);
  const unchanged = withDelta.filter(c => Math.abs(c.delta) < THRESHOLD);

  const maxAbs = Math.max(
    increases.length ? increases[0].delta : 0,
    cuts.length      ? Math.abs(cuts[0].delta) : 0,
    1,
  );

  return (
    <div>
      {increases.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={S.barGroupHead}>
            <span style={{ ...S.barGroupLabel, color: "#34D399" }}>📈  הגדלות</span>
            <span style={S.barGroupCount}>{increases.length} סעיפים</span>
          </div>
          {increases.map(cat => (
            <BarRow key={cat.id} cat={cat} maxAbs={maxAbs} isIncrease={true} />
          ))}
        </div>
      )}

      {cuts.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={S.barGroupHead}>
            <span style={{ ...S.barGroupLabel, color: "#F87171" }}>📉  קיצוצים</span>
            <span style={S.barGroupCount}>{cuts.length} סעיפים</span>
          </div>
          {cuts.map(cat => (
            <BarRow key={cat.id} cat={cat} maxAbs={maxAbs} isIncrease={false} />
          ))}
        </div>
      )}

      {unchanged.length > 0 && (
        <div style={S.unchangedRow}>
          <span style={S.unchangedTitle}>ללא שינוי משמעותי — </span>
          <span style={S.unchangedList}>
            {unchanged.length <= 5
              ? unchanged.map(c => c.shortLabel).join(" · ")
              : `${unchanged.slice(0, 3).map(c => c.shortLabel).join(", ")} ועוד ${unchanged.length - 3}`}
          </span>
        </div>
      )}
    </div>
  );
}

function BarRow({ cat, maxAbs, isIncrease }) {
  const color = isIncrease ? "#34D399" : "#F87171";
  const pct   = Math.max(4, (Math.abs(cat.delta) / maxAbs) * 100);

  return (
    <div style={S.barRow}>
      <div style={S.barLabelWrap}>
        <span style={{ fontSize: 13, lineHeight: 1, flexShrink: 0 }}>{cat.emoji}</span>
        <span style={S.barName}>{cat.shortLabel}</span>
      </div>
      <div style={S.barTrackOuter}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}99, ${color})`,
          borderRadius: 4,
          boxShadow: `0 0 6px ${color}33`,
        }} />
      </div>
      <div style={{ ...S.barDelta, color }}>
        {isIncrease ? "+" : ""}{cat.delta}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   DNA BAR
═══════════════════════════════════ */
function BudgetDnaBar({ withDelta }) {
  return (
    <div style={S.dna}>
      <div style={S.dnaBar}>
        {withDelta.map(cat => (
          <div
            key={cat.id}
            title={`${cat.shortLabel}: ${cat.value}`}
            style={{ flex: cat.value, background: cat.color, opacity: Math.abs(cat.delta) >= 2 ? 0.85 : 0.35 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   STAT BLOCK
═══════════════════════════════════ */
function StatBlock({ label, value, sub, subColor = "rgba(255,255,255,0.45)" }) {
  return (
    <div style={S.statBlock}>
      <div style={S.statLabel}>{label}</div>
      <div style={S.statValue}>{value}</div>
      {sub && <div style={{ ...S.statSub, color: subColor }}>{sub}</div>}
    </div>
  );
}

/* ═══════════════════════════════════
   MAIN
═══════════════════════════════════ */
export default function ResultCard({ values, name, onRestart, totalBudget = 613, financingMethod }) {
  const cardRef = useRef(null);
  const [saving, setSaving] = useState(false);

  const deficit  = parseFloat(calcDeficit(values));
  const defColor = deficit < 3.5 ? "#10B981" : deficit < 5.5 ? "#F59E0B" : "#EF4444";
  const vsBOI    = parseFloat((deficit - BOI_TARGET).toFixed(1));
  const boiColor = deficit < BOI_TARGET ? "#34D399" : deficit < 5 ? "#F59E0B" : "#F87171";

  const boiVerdict =
    deficit < 2          ? "מצוין — גירעון נמוך" :
    deficit < BOI_TARGET ? "סביר — מתחת ליעד" :
    deficit < 5          ? "גבוה מהיעד" :
    deficit < 7          ? "גירעון גבוה — בעייתי" :
                           "גירעון מסוכן 🚨";

  const withDelta = CATEGORIES.map(c => ({
    ...c,
    value:      values[c.id],
    delta:      Math.round(values[c.id] - c.current),
    shortLabel: SHORT[c.id] || c.label.split(" ")[0],
  }));

  const analysisParagraph = buildAnalysis(withDelta, deficit);

  const budgetGrowth = totalBudget - REVENUE;
  const available    = totalBudget - OTHER;
  const allocated    = parseFloat(CATEGORIES.reduce((s, c) => s + values[c.id], 0).toFixed(1));
  const remaining    = parseFloat((available - allocated).toFixed(1));

  const SUMMARY_THRESHOLD = 2;
  const topIncreases = withDelta.filter(c => c.delta >= SUMMARY_THRESHOLD).sort((a, b) => b.delta - a.delta).slice(0, 5);
  const topCuts      = withDelta.filter(c => c.delta <= -SUMMARY_THRESHOLD).sort((a, b) => a.delta - b.delta).slice(0, 5);

  const varColor = Math.abs(remaining) <= 2 ? "#34D399" : remaining > 0 ? "#F59E0B" : "#EF4444";
  const varText  = Math.abs(remaining) <= 2
    ? `✓ חילקת כמעט בדיוק את התקציב הזמין (${available} מיליארד)`
    : remaining > 0
    ? `שימו לב: נותרו ${remaining} מיליארד שלא חולקו`
    : `שימו לב: הוצאת ${Math.abs(remaining)} מיליארד יותר מהקבוע בתקציב`;

  /* save as image */
  const handleSave = async () => {
    setSaving(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#070B14", scale: 2, useCORS: true, logging: false,
      });
      const blob = await new Promise(r => canvas.toBlob(r, "image/png"));
      const file = new File([blob], `תקציב-${name}.png`, { type: "image/png" });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: `התקציב של ${name}`, files: [file] });
      } else {
        const url = URL.createObjectURL(blob);
        Object.assign(document.createElement("a"), { href: url, download: file.name }).click();
        URL.revokeObjectURL(url);
      }
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  /* WhatsApp */
  const handleWhatsApp = () => {
    const top = withDelta
      .filter(c => Math.abs(c.delta) >= 3)
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
      .slice(0, 2);
    const lines = [
      `🇮🇱 בניתי את תקציב המדינה שלי עם כלכליסט`,
      ``,
      `גירעון: ${deficit}% | יעד בנק ישראל: ${BOI_TARGET}%`,
      ...top.map(c => `${c.delta > 0 ? "📈" : "📉"} ${c.shortLabel}: ${c.delta > 0 ? "+" : ""}${c.delta} מיליארד ₪`),
      ``,
      `בנה גם אתה 👇`,
    ].join("\n");
    window.open(`https://wa.me/?text=${encodeURIComponent(lines)}`, "_blank");
  };

  return (
    <div style={S.page}>
      <div className="mesh-bg" />
      <div className="grid-overlay" />

      <motion.div
        style={S.shell}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* nav */}
        <div style={S.pageHeader}>
          <div style={S.navBrand}>
            <span style={S.navLogo}>כלכליסט</span>
          </div>
          <span style={S.pageTitle}>הכרטיס שלך מוכן</span>
        </div>

        {/* CARD */}
        <div
          ref={cardRef}
          style={{ ...S.card, boxShadow: `0 0 0 1.5px ${defColor}28, 0 40px 100px rgba(0,0,0,0.7)` }}
        >

          {/* ── HERO ── */}
          <div style={S.hero}>
            <div style={{
              position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
              background: `radial-gradient(ellipse 90% 70% at 50% -5%, ${defColor}28 0%, transparent 65%)`,
            }} />

            <div style={S.heroRow}>
              <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
                <div style={S.heroSup}>שר האוצר</div>
                <div style={S.heroName}>{name}</div>
              </div>
              <div style={{ ...S.defBadge, borderColor: defColor + "55", background: defColor + "14" }}>
                <div style={{ ...S.defNum, color: defColor }}>{deficit}%</div>
                <div style={S.defLabel}>גירעון</div>
              </div>
            </div>

            {/* BOI target */}
            <div style={S.boiRow}>
              <div>
                <div style={S.boiLabel}>יעד בנק ישראל — 3.5%</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>
                  {vsBOI > 0 ? `▲ ${vsBOI}% מעל היעד` : `▼ ${Math.abs(vsBOI).toFixed(1)}% מתחת ליעד`}
                </div>
              </div>
              <div style={{ ...S.boiDiff, color: boiColor }}>{boiVerdict}</div>
            </div>
          </div>

          {/* ── DNA BAR ── */}
          <BudgetDnaBar withDelta={withDelta} />

          {/* ── BUDGET STATS ── */}
          <div style={S.section}>
            <div style={S.sectionLabel}>על התקציב שקבעת</div>
            <div style={S.statGrid}>
              <StatBlock
                label="גודל התקציב"
                value={`${totalBudget} מיליארד ₪`}
                sub={
                  budgetGrowth > 0
                    ? `מעל צפי ההכנסות ב-${budgetGrowth} מיליארד`
                    : budgetGrowth < 0
                    ? `מתחת לצפי ההכנסות ב-${Math.abs(budgetGrowth)} מיליארד`
                    : `שווה לצפי ההכנסות — תקציב מאוזן`
                }
                subColor={budgetGrowth > 0 ? "#F59E0B" : budgetGrowth < 0 ? "#34D399" : "rgba(255,255,255,0.28)"}
              />
              <StatBlock
                label={financingMethod ? "איך נממן" : "אופי התקציב"}
                value={
                  financingMethod
                    ? FINANCE_LABEL[financingMethod]
                    : budgetGrowth < 0 ? "קיצוץ הוצאות 📉" : "מסגרת קיימת ✓"
                }
                sub={
                  financingMethod === "taxes"
                    ? "הכנסות גבוהות — שכר ביד פחות"
                    : financingMethod === "loans"
                    ? "חוב גדל — הדור הבא ישלם"
                    : budgetGrowth < 0
                    ? "גירעון נמוך, הוצאות מצומצמות"
                    : "ניהול במסגרת ההכנסות"
                }
              />
            </div>
          </div>

          {/* ── ALLOCATION VARIANCE ── */}
          <div style={{ ...S.section, paddingTop: 0 }}>
            <div style={{
              padding: "10px 14px", borderRadius: 10,
              background: varColor + "14", border: `1px solid ${varColor}33`,
              fontSize: 12.5, fontWeight: 600, color: varColor, lineHeight: 1.5,
            }}>
              {varText}
            </div>
          </div>

          {/* ── BUDGET BARS ── */}
          <div style={S.section}>
            <div style={S.sectionLabel}>התקציב שלי</div>

            {/* Priority summary */}
            {(topIncreases.length > 0 || topCuts.length > 0) && (
              <div style={S.prioritySummary}>
                {topIncreases.length > 0 && (
                  <PriorityBlock items={topIncreases} isIncrease={true} />
                )}
                {topCuts.length > 0 && (
                  <PriorityBlock items={topCuts} isIncrease={false} />
                )}
              </div>
            )}

            <div style={S.barsSubLabel}>שינויים ביחס לתקציב הנוכחי</div>
            <BudgetBars withDelta={withDelta} />
          </div>

          {/* ── ANALYSIS ── */}
          <div style={S.analysis}>
            <div style={S.sectionLabel}>ניתוח</div>
            <motion.p
              style={S.analysisParagraph}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {analysisParagraph}
            </motion.p>
          </div>

          {/* ── CARD FOOTER ── */}
          <div style={S.cardFooter}>
            <span style={S.footerCta}>בנה את התקציב שלך ←</span>
          </div>

        </div>

        {/* SHARE BUTTONS */}
        <div style={S.actions}>
          <motion.button
            style={{ ...S.btn, ...S.btnWa }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(37,211,102,0.35)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleWhatsApp}
          >
            <span>💬</span> שתף ב-WhatsApp
          </motion.button>
          <motion.button
            style={{ ...S.btn, ...S.btnSave }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(99,102,241,0.35)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            disabled={saving}
          >
            <span>{saving ? "⏳" : "📸"}</span>
            {saving ? "יוצר תמונה..." : "שמור כתמונה"}
          </motion.button>
          <button style={S.btnRestart} onClick={onRestart}>↩ נסה שוב</button>
        </div>

      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════
   STYLES
═══════════════════════════════════ */
const S = {
  page:  { minHeight: "100vh", position: "relative", overflow: "hidden", padding: "0 0 80px" },
  shell: { maxWidth: 620, margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 10 },

  pageHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "20px 0 22px", borderBottom: "1px solid var(--border)", marginBottom: 24,
  },
  navBrand:  { display: "flex", alignItems: "center", gap: 8 },
  navLogo:   { fontSize: 14, fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.02em" },
  pageTitle: { fontSize: 13, fontWeight: 600, color: "var(--text-2)" },

  /* CARD */
  card: {
    background: "#070B14",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 22, overflow: "hidden", marginBottom: 16,
  },

  /* HERO */
  hero: {
    position: "relative", overflow: "hidden",
    padding: "22px 22px 18px",
    background: "linear-gradient(180deg, #0D1525 0%, #080C18 100%)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  heroRow: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    gap: 14, marginBottom: 14,
  },
  heroSup: {
    fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)",
    letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4, position: "relative", zIndex: 1,
  },
  heroName: {
    fontSize: "clamp(26px, 6.5vw, 36px)", fontWeight: 900,
    color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.05, position: "relative", zIndex: 1,
  },
  defBadge: {
    flexShrink: 0, padding: "12px 18px", borderRadius: 16,
    textAlign: "center", border: "1.5px solid", position: "relative", zIndex: 1,
  },
  defNum: {
    fontSize: "clamp(28px, 7vw, 38px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1,
  },
  defLabel: {
    fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: 3,
  },

  /* BOI row */
  boiRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10, padding: "9px 14px", position: "relative", zIndex: 1,
  },
  boiLabel: { fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.55)" },
  boiDiff:  { fontSize: 13, fontWeight: 800 },

  /* DNA BAR */
  dna:    { padding: "10px 22px", borderBottom: "1px solid rgba(255,255,255,0.04)" },
  dnaBar: { display: "flex", height: 5, borderRadius: 3, overflow: "hidden", gap: 1 },

  /* SECTION */
  section: {
    padding: "16px 22px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  sectionLabel: {
    fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
    textTransform: "uppercase", color: "rgba(99,102,241,0.9)", marginBottom: 12,
  },

  /* STAT GRID */
  statGrid:  { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  statBlock: {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12, padding: "12px 14px",
  },
  statLabel: {
    fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.5)",
    letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4,
  },
  statValue: {
    fontSize: 14, fontWeight: 800, color: "rgba(255,255,255,0.85)",
    letterSpacing: "-0.01em", lineHeight: 1.3,
  },
  statSub: { fontSize: 10, fontWeight: 500, marginTop: 4, lineHeight: 1.4 },

  /* PRIORITY SUMMARY */
  prioritySummary: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 },
  priorityBlock: { padding: "14px 16px", borderRadius: 12, border: "1px solid" },
  priorityBlockLabel: {
    fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase",
    marginBottom: 10,
  },
  priorityItemRow: {
    display: "flex", alignItems: "center", gap: 12, padding: "9px 0",
  },
  priorityEmoji: { fontSize: 22, lineHeight: 1, flexShrink: 0, width: 28, textAlign: "center" },
  priorityItemName: {
    fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em",
  },
  priorityItemDelta: { fontSize: 12, fontWeight: 700, direction: "ltr", flexShrink: 0 },
  prioritySep: { height: 1, background: "rgba(255,255,255,0.05)", margin: "0 0 0 40px" },

  /* BARS SUB-LABEL */
  barsSubLabel: {
    fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 12,
  },

  /* BUDGET BARS */
  barGroupHead: {
    display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8,
  },
  barGroupLabel: {
    fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase",
  },
  barGroupCount: {
    fontSize: 9, color: "rgba(255,255,255,0.35)", fontWeight: 500,
  },
  barRow: {
    display: "flex", alignItems: "center", gap: 10, marginBottom: 6,
  },
  barLabelWrap: {
    display: "flex", alignItems: "center", gap: 5,
    width: 88, flexShrink: 0,
  },
  barName: {
    fontSize: 10.5, fontWeight: 600, color: "rgba(255,255,255,0.65)",
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
  },
  barTrackOuter: {
    flex: 1, height: 8, borderRadius: 4,
    background: "rgba(255,255,255,0.05)", overflow: "hidden",
  },
  barDelta: {
    width: 36, flexShrink: 0,
    fontSize: 11, fontWeight: 800,
    direction: "ltr", textAlign: "right", whiteSpace: "nowrap",
  },
  unchangedRow: {
    paddingTop: 10, marginTop: 4,
    borderTop: "1px solid rgba(255,255,255,0.04)",
  },
  unchangedTitle: {
    fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.2)",
    letterSpacing: "0.06em", textTransform: "uppercase",
  },
  unchangedList: {
    fontSize: 9.5, color: "rgba(255,255,255,0.2)", fontWeight: 500, lineHeight: 1.7,
  },

  /* ANALYSIS */
  analysis: { padding: "16px 22px", borderTop: "1px solid rgba(255,255,255,0.04)" },
  analysisParagraph: {
    margin: 0, fontSize: 12.5, lineHeight: 1.8,
    color: "rgba(255,255,255,0.55)", fontWeight: 500, textAlign: "right",
  },

  /* CARD FOOTER */
  cardFooter: {
    padding: "11px 22px", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 10,
  },
  footerCta: { color: "#6366F1", fontWeight: 700 },

  /* ACTIONS */
  actions: { display: "flex", flexDirection: "column", gap: 10 },
  btn: {
    width: "100%", padding: "15px", borderRadius: 14,
    fontSize: 15, fontWeight: 700, border: "none",
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: 10, cursor: "pointer", transition: "all 0.2s", letterSpacing: "-0.01em",
  },
  btnWa: {
    background: "linear-gradient(135deg, #22C55E, #16A34A)",
    color: "#fff", boxShadow: "0 4px 20px rgba(34,197,94,0.25)",
  },
  btnSave: {
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    color: "#fff", boxShadow: "0 4px 20px rgba(99,102,241,0.25)",
  },
  btnRestart: {
    width: "100%", padding: "12px",
    background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.3)", fontSize: 13, fontWeight: 600,
    borderRadius: 12, cursor: "pointer", letterSpacing: "-0.01em",
  },
};
