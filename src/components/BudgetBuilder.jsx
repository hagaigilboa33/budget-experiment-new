import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, getInsight } from "../data/budgetData";

const GAME_SECONDS   = 120;
const OTHER_SPENDING  = 120;
const HEADER_H        = 72;
const TOAST_DURATION  = 3800; // ms — appear, read, disappear

/* ─────────────────────────────────────
   COUNTDOWN HOOK
───────────────────────────────────── */
function useCountdown(total, onTimeout) {
  const [left, setLeft] = useState(total);
  const ref = useRef(null);
  useEffect(() => {
    ref.current = setInterval(() => {
      setLeft(t => {
        if (t <= 1) { clearInterval(ref.current); onTimeout(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, []);
  return left;
}

/* ─────────────────────────────────────
   MAIN
───────────────────────────────────── */
export default function BudgetBuilder({ values, setValues, onFinish, onTimeout, name, totalBudget }) {
  const [insight, setInsight] = useState(null);
  const [flash,   setFlash]   = useState(null);
  const insightTimer  = useRef(null);
  const flashTimer    = useRef(null);
  const activeInsight = useRef(null); // "text|catId" — prevents timer reset on same insight

  const timeLeft = useCountdown(GAME_SECONDS, onTimeout);
  const isUrgent = timeLeft <= 10;

  const currentSpend = Object.values(values).reduce((a, b) => a + b, 0);
  const available    = (totalBudget ?? 613) - OTHER_SPENDING;
  const remaining    = Math.round((available - currentSpend) * 10) / 10;

  useEffect(() => () => {
    clearTimeout(insightTimer.current);
    clearTimeout(flashTimer.current);
  }, []);

  const triggerFlash = useCallback((level) => {
    clearTimeout(flashTimer.current);
    setFlash(level);
    flashTimer.current = setTimeout(() => setFlash(null), 900);
  }, []);

  const handleChange = useCallback((raw, catId) => {
    const cat     = CATEGORIES.find(c => c.id === catId);
    const clipped = Math.max(cat.min, Math.min(cat.max, raw));
    const step    = (cat.min % 1 !== 0 || cat.max % 1 !== 0) ? 0.5 : 1;
    const val     = Math.round(clipped / step) * step;
    const delta   = val - cat.current;
    setValues(prev => ({ ...prev, [cat.id]: val }));
    const ins = getInsight(cat, delta);
    if (ins) {
      const key = ins.text + "|" + cat.id;
      if (key !== activeInsight.current) {
        // New insight — start fresh timer, don't reset if same insight is still showing
        activeInsight.current = key;
        clearTimeout(insightTimer.current);
        insightTimer.current = setTimeout(() => {
          setInsight(null);
          activeInsight.current = null;
        }, TOAST_DURATION);
        setInsight({ text: ins.text, emoji: cat.emoji, color: cat.color, severity: ins.severity, id: Date.now(), catId: cat.id });
      }
      if (delta < 0) {
        if (ins.severity === "critical") triggerFlash("critical");
        else if (ins.severity === "warning") triggerFlash("warning");
      }
    }
  }, [setValues, triggerFlash]);

  const flashColor = flash === "critical"
    ? "rgba(239,68,68,0.28)"
    : flash === "warning"
    ? "rgba(245,158,11,0.18)"
    : null;

  return (
    <div style={{ background: isUrgent ? "rgba(10,0,0,1)" : "#070B14", minHeight: "100vh", transition: "background 0.5s" }}>
      <div className="mesh-bg" />
      <div className="grid-overlay" />

      {/* Screen flash */}
      <AnimatePresence>
        {flashColor && (
          <motion.div
            key={flash + Date.now()}
            style={css.flashOverlay}
            initial={{ opacity: 1, backgroundColor: flashColor }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Insight toast — below sticky header */}
      <div style={css.toastPortal}>
        <AnimatePresence mode="wait">
          {insight && <InsightToast key={insight.id} insight={insight} />}
        </AnimatePresence>
      </div>

      {/* Sticky header */}
      <StickyHeader
        timeLeft={timeLeft}
        isUrgent={isUrgent}
        name={name}
        remaining={remaining}
        onFinish={onFinish}
      />

      {/* Scrollable content */}
      <div style={css.scrollArea}>
        <div style={css.shell}>

          {/* Section heading */}
          <div style={css.sectionHead}>
            <span style={css.sectionTitle}>חלוקת תקציב 2027</span>
            <span style={css.sectionCount}>{CATEGORIES.length} סעיפים</span>
          </div>

          {/* Category rows */}
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.022, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <CategoryRow
                cat={cat}
                value={values[cat.id]}
                onChange={handleChange}
              />
            </motion.div>
          ))}

          {/* Bottom finish button */}
          <motion.button
            style={css.finishBtn}
            whileHover={{ scale: 1.015, boxShadow: "0 14px 44px rgba(16,185,129,0.5)" }}
            whileTap={{ scale: 0.985 }}
            onClick={onFinish}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            ✓ סיים — ראה את הכרטיס שלי
          </motion.button>

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   STICKY HEADER
───────────────────────────────────── */
function StickyHeader({ timeLeft, isUrgent, name, remaining, onFinish }) {
  const mm = String(Math.floor(timeLeft / 60)).padStart(1, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const timerColor  = isUrgent ? "#EF4444" : timeLeft <= 30 ? "#F59E0B" : "rgba(255,255,255,0.9)";
  const isOver      = remaining < 0;
  const remainColor = isOver ? "#EF4444" : remaining === 0 ? "#10B981" : "#34D399";

  return (
    <div style={css.header}>
      <div style={css.headerInner}>

        {/* Timer (RTL-start = right side) */}
        <div style={css.timerBlock}>
          <span style={css.timerLabel}>
            {isUrgent ? `⚠ ${name}!` : "זמן נותר"}
          </span>
          <motion.span
            style={{ ...css.timerNum, color: timerColor }}
            animate={isUrgent ? { scale: [1, 1.07, 1] } : { scale: 1 }}
            transition={isUrgent ? { duration: 0.55, repeat: Infinity } : {}}
          >
            {mm}:{ss}
          </motion.span>
        </div>

        <div style={css.headerDivider} />

        {/* Remaining budget (center, expands) */}
        <div style={css.remainBlock}>
          <span style={{ ...css.remainLabel, color: isOver ? "#FCA5A5" : "rgba(255,255,255,0.38)" }}>
            {isOver ? "חריגה מהתקציב" : "נותר לחלוקה"}
          </span>
          <motion.div
            key={Math.round(remaining)}
            style={css.remainNumRow}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <span style={{ ...css.remainNum, color: remainColor }} dir="ltr">
              {isOver ? "" : "+"}{Math.round(remaining)}
            </span>
            <span style={css.remainUnit}>מיליארד</span>
          </motion.div>
        </div>

        <div style={css.headerDivider} />

        {/* Finish button */}
        <motion.button
          style={css.headerBtn}
          whileHover={{ scale: 1.05, boxShadow: "0 6px 22px rgba(16,185,129,0.4)" }}
          whileTap={{ scale: 0.94 }}
          onClick={onFinish}
        >
          סיים ✓
        </motion.button>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   CATEGORY ROW
───────────────────────────────────── */
function CategoryRow({ cat, value, onChange }) {
  const delta     = parseFloat((value - cat.current).toFixed(1));
  const isChanged = Math.abs(delta) >= 0.1;
  const isUp      = delta > 0;
  const valColor  = isChanged ? (isUp ? "#34D399" : "#F87171") : "rgba(255,255,255,0.85)";

  return (
    <div style={{ ...css.row, borderColor: cat.color + "22" }}>
      {/* Colored left-accent stripe */}
      <div style={{ ...css.rowStripe, background: `linear-gradient(180deg, ${cat.color}, ${cat.color}88)` }} />

      {/* Content */}
      <div style={css.rowBody}>

        {/* Name row */}
        <div style={css.rowNameRow}>
          <span style={css.rowEmoji}>{cat.emoji}</span>
          <span style={css.rowName}>{cat.label}</span>
          {/* Value + delta */}
          <div style={css.rowValWrap}>
            {isChanged && (
              <motion.span
                style={{
                  ...css.rowDelta,
                  color:      isUp ? "#34D399" : "#F87171",
                  background: isUp ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)",
                }}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                {isUp ? "+" : ""}{delta}
              </motion.span>
            )}
            <motion.span
              key={value}
              style={{ ...css.rowVal, color: valColor }}
              initial={{ scale: 1.14 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              dir="ltr"
            >
              {value}
            </motion.span>
            <span style={css.rowUnit}>מיליארד</span>
          </div>
        </div>

        {/* Slider */}
        <CompactSlider cat={cat} value={value} onChange={onChange} />

        {/* Range labels */}
        <div style={css.rangeRow}>
          <span style={css.rangeNum} dir="ltr">{cat.min}</span>
          <span style={css.rangeMid} dir="ltr">▲ {cat.current}</span>
          <span style={css.rangeNum} dir="ltr">{cat.max}</span>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   COMPACT SLIDER
───────────────────────────────────── */
function CompactSlider({ cat, value, onChange }) {
  const pct    = Math.max(0, ((value - cat.min) / (cat.max - cat.min)) * 100);
  const govPct = ((cat.current - cat.min) / (cat.max - cat.min)) * 100;
  const trackRef  = useRef(null);
  const dragging  = useRef(false);
  const cleanupFn = useRef(null);

  useEffect(() => () => { if (cleanupFn.current) cleanupFn.current(); }, []);

  // Attach non-passive touchstart so e.preventDefault() works (prevents page scroll during drag)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    return () => el.removeEventListener("touchstart", onTouchStart);
  }, []);

  const getVal = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    return cat.min + Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * (cat.max - cat.min);
  };

  const onMouseDown = e => {
    e.preventDefault();
    dragging.current = true;
    onChange(getVal(e.clientX), cat.id);
    const mm = e => { if (dragging.current) onChange(getVal(e.clientX), cat.id); };
    const mu = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup",  mu);
      cleanupFn.current = null;
    };
    cleanupFn.current = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup",  mu);
    };
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup",   mu);
  };

  const onTouchStart = e => {
    e.preventDefault();
    dragging.current = true;
    onChange(getVal(e.touches[0].clientX), cat.id);
    const tm = e => { e.preventDefault(); if (dragging.current) onChange(getVal(e.touches[0].clientX), cat.id); };
    const tu = () => {
      dragging.current = false;
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("touchend",  tu);
      cleanupFn.current = null;
    };
    cleanupFn.current = () => {
      dragging.current = false;
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("touchend",  tu);
    };
    window.addEventListener("touchmove", tm, { passive: false });
    window.addEventListener("touchend",  tu);
  };

  return (
    <div
      ref={trackRef}
      style={css.sliderTrack}
      onMouseDown={onMouseDown}
    >
      {/* Groove */}
      <div style={css.sliderGroove} />

      {/* Fill */}
      <motion.div
        style={{ ...css.sliderFill, background: cat.color }}
        animate={{ width: `${pct}%`, boxShadow: `0 0 8px ${cat.color}55` }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      />

      {/* Gov notch */}
      <div style={{ ...css.sliderGovNotch, left: `${govPct}%`, background: cat.color + "70" }} />

      {/* Thumb */}
      <motion.div
        style={{ ...css.sliderThumb, boxShadow: `0 0 0 2.5px ${cat.color}66, 0 2px 12px rgba(0,0,0,0.7)` }}
        animate={{ left: `calc(${pct}% - 10px)` }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        whileHover={{ scale: 1.28 }}
        whileTap={{ scale: 0.88 }}
      />
    </div>
  );
}

/* ─────────────────────────────────────
   INSIGHT TOAST
───────────────────────────────────── */
function InsightToast({ insight }) {
  const isCritical = insight.severity === "critical";
  const isWarning  = insight.severity === "warning";
  const borderCol  = isCritical ? "#EF4444" : isWarning ? "#F59E0B" : insight.color;

  return (
    <motion.div
      style={{ ...css.toast, borderColor: borderCol + "60", borderRight: `3px solid ${borderCol}` }}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{   opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.12 } }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <div style={css.toastInner}>
        <span style={{ fontSize: 26, flexShrink: 0, marginTop: 1 }}>{insight.emoji}</span>
        <span style={{
          ...css.toastText,
          color: isCritical ? "#FCA5A5" : isWarning ? "#FCD34D" : "var(--text-2)",
        }}>
          {isCritical && <span style={css.toastBadge}>⚠ חריג · </span>}
          {insight.text}
        </span>
      </div>
      <motion.div
        style={{ ...css.toastProgress, background: borderCol }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: TOAST_DURATION / 1000, ease: "linear" }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────
   STYLES
───────────────────────────────────── */
const css = {

  flashOverlay: {
    position: "fixed", inset: 0, zIndex: 200, pointerEvents: "none",
  },

  toastPortal: {
    position: "fixed",
    top: HEADER_H + 10,
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 32px)",
    maxWidth: 660,
    zIndex: 150,
  },

  /* ── Sticky header ── */
  header: {
    position: "fixed",
    top: 0, left: 0, right: 0,
    height: HEADER_H,
    zIndex: 100,
    background: "rgba(6,9,18,0.94)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
  },
  headerInner: {
    maxWidth: 700,
    margin: "0 auto",
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  headerDivider: {
    width: 1, height: 38, background: "rgba(255,255,255,0.08)", flexShrink: 0,
  },

  /* Timer block */
  timerBlock: {
    display: "flex", flexDirection: "column", alignItems: "flex-end", flexShrink: 0,
  },
  timerLabel: {
    fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.28)",
    letterSpacing: "0.1em", textTransform: "uppercase",
  },
  timerNum: {
    fontSize: 30, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1,
    fontVariantNumeric: "tabular-nums", transition: "color 0.4s",
  },

  /* Remaining block */
  remainBlock: {
    flex: 1,
    display: "flex", flexDirection: "column", alignItems: "center",
  },
  remainLabel: {
    fontSize: 9, fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase",
    transition: "color 0.3s",
  },
  remainNumRow: {
    display: "flex", alignItems: "baseline", gap: 4, marginTop: 1,
  },
  remainNum: {
    fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1,
    transition: "color 0.3s",
  },
  remainUnit: {
    fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600,
  },

  /* Header finish btn */
  headerBtn: {
    padding: "9px 16px",
    background: "linear-gradient(135deg, #10B981, #059669)",
    color: "#fff",
    fontSize: 13, fontWeight: 700,
    borderRadius: 11, border: "none",
    cursor: "pointer",
    letterSpacing: "-0.01em",
    boxShadow: "0 3px 14px rgba(16,185,129,0.3)",
    flexShrink: 0,
    whiteSpace: "nowrap",
  },

  /* ── Scroll area ── */
  scrollArea: {
    paddingTop: HEADER_H,
    paddingBottom: 56,
  },
  shell: {
    maxWidth: 700,
    margin: "0 auto",
    padding: "20px 14px 0",
    position: "relative",
    zIndex: 10,
  },
  sectionHead: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11, fontWeight: 700,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.1em", textTransform: "uppercase",
  },
  sectionCount: {
    fontSize: 11, fontWeight: 500,
    color: "rgba(255,255,255,0.2)",
  },

  /* ── Category row ── */
  row: {
    display: "flex",
    background: "rgba(255,255,255,0.025)",
    border: "1px solid",
    borderRadius: 14,
    marginBottom: 7,
    overflow: "hidden",
  },
  rowStripe: {
    width: 4, flexShrink: 0,
  },
  rowBody: {
    flex: 1,
    padding: "12px 14px 8px",
  },

  rowNameRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 9,
  },
  rowEmoji: { fontSize: 16, flexShrink: 0, lineHeight: 1 },
  rowName: {
    flex: 1,
    fontSize: 13, fontWeight: 700,
    color: "rgba(255,255,255,0.82)",
    lineHeight: 1.3,
  },
  rowValWrap: {
    display: "flex", alignItems: "center", gap: 4,
    flexShrink: 0, direction: "ltr",
  },
  rowVal: {
    fontSize: 21, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1,
    transition: "color 0.25s",
  },
  rowUnit: {
    fontSize: 9, color: "rgba(255,255,255,0.28)", fontWeight: 500, marginLeft: 1,
  },
  rowDelta: {
    fontSize: 11, fontWeight: 800,
    padding: "2px 6px", borderRadius: 100,
    letterSpacing: "0.01em",
  },

  /* ── Compact slider ── */
  sliderTrack: {
    position: "relative",
    height: 32,
    display: "flex", alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    touchAction: "none",
    direction: "ltr",
    marginBottom: 4,
  },
  sliderGroove: {
    position: "absolute", left: 0, right: 0,
    height: 4, borderRadius: 100,
    background: "rgba(255,255,255,0.07)",
  },
  sliderFill: {
    position: "absolute", top: "50%", left: 0,
    transform: "translateY(-50%)",
    height: 4, borderRadius: 100,
  },
  sliderGovNotch: {
    position: "absolute", top: "50%",
    transform: "translate(-50%, -50%)",
    width: 2, height: 14, borderRadius: 1,
  },
  sliderThumb: {
    position: "absolute",
    width: 20, height: 20, borderRadius: "50%",
    background: "#fff",
    top: "50%", transform: "translateY(-50%)",
    zIndex: 5, cursor: "grab",
  },

  rangeRow: {
    display: "flex", justifyContent: "space-between",
    direction: "ltr",
  },
  rangeNum: { fontSize: 9, color: "rgba(255,255,255,0.2)", fontWeight: 500 },
  rangeMid: { fontSize: 9, color: "rgba(255,255,255,0.13)", fontWeight: 500 },

  /* ── Bottom finish button ── */
  finishBtn: {
    width: "100%",
    padding: "18px 32px",
    color: "#fff",
    fontSize: 16, fontWeight: 700,
    borderRadius: 16, border: "none",
    cursor: "pointer",
    letterSpacing: "-0.01em",
    background: "linear-gradient(135deg, #10B981, #059669)",
    boxShadow: "0 4px 24px rgba(16,185,129,0.35)",
    marginTop: 14,
  },

  /* ── Toast ── */
  toast: {
    background: "rgba(8,10,18,0.98)",
    border: "1px solid",
    borderRadius: 16, overflow: "hidden",
    backdropFilter: "blur(24px)",
    boxShadow: "0 12px 60px rgba(0,0,0,0.7)",
  },
  toastInner: {
    display: "flex", alignItems: "flex-start",
    gap: 14, padding: "18px 20px",
  },
  toastText: { fontSize: 15, lineHeight: 1.6, fontWeight: 600 },
  toastBadge: { fontWeight: 900, fontSize: 13, letterSpacing: "0.03em" },
  toastProgress: { height: 3, transformOrigin: "left center", borderRadius: 0 },

};
