import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faArrowUpRightFromSquare,
  faUserDoctor,
  faBrain,
  faComments,
  faLocationDot,
  faCircleNotch,
  faGlobe,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import { generateRegionalHelplines } from "../services/llmService";

// Global fallback
const GLOBAL_HELPLINES = [
  { name: "Befrienders Worldwide", note: "Global emotional support & suicide prevention network.", phone: "befrienders.org", href: "https://www.befrienders.org/" },
  { name: "Crisis Text Line", note: "Free 24/7 crisis support via text (US, UK, CA, IE).", phone: "Text HOME → 741741", href: "https://www.crisistextline.org/" },
  { name: "IASP Crisis Centres", note: "International directory of crisis centres by country.", phone: "See directory", href: "https://www.iasp.info/resources/Crisis_Centres/" },
  { name: "WHO Mental Health", note: "WHO global resource for national mental health services.", phone: "See directory", href: "https://www.who.int/health-topics/mental-health" },
];

const PROVIDER_TYPES = [
  { icon: faUserDoctor, title: "Psychiatrist", desc: "Diagnostic evaluation, medication, and specialist assessment." },
  { icon: faBrain, title: "Psychologist", desc: "Formal testing, neurodevelopmental assessment, and therapy planning." },
  { icon: faComments, title: "Therapist", desc: "Coping skills, emotional regulation, burnout, grief, and daily support." },
];

function HelplineCard({ h, index }) {
  return (
    <motion.a
      href={h.href}
      target="_blank"
      rel="noopener noreferrer"
      className="hc-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="hc-top">
        <span className="hc-name">{h.name}</span>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="hc-ext" />
      </div>
      <p className="hc-note">{h.note}</p>
      <div className="hc-phone">
        <FontAwesomeIcon icon={faPhone} />
        {h.phone}
      </div>
    </motion.a>
  );
}

export default function Referral() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState("idle"); // idle | locating | done | error
  const [statusMsg, setStatusMsg] = useState("");
  const [helplines, setHelplines] = useState(GLOBAL_HELPLINES);
  const [detectedRegion, setDetectedRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (searchParams.get("auto") === "true") {
      handleLocate();
      setSearchParams({}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocate = async () => {
    setErrorMsg(null);
    setStatus("locating");
    setStatusMsg("Requesting location…");

    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      setStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setStatusMsg("Identifying your region…");
          const { latitude, longitude } = position.coords;

          const geoRes = await fetch(
            `/api/geocode?lat=${latitude}&lon=${longitude}`
          );
          if (!geoRes.ok) throw new Error("Reverse geocoding failed.");
          const geo = await geoRes.json();

          const city = geo.address?.city || geo.address?.town || geo.address?.village || geo.address?.county || "";
          const state = geo.address?.state || "";
          const country = geo.address?.country || "";
          const region = [city, state, country].filter(Boolean).join(", ");
          if (!region) throw new Error("Could not resolve region from coordinates.");

          setDetectedRegion(region);
          setStatusMsg(`Found: ${region}. Loading local helplines…`);

          const cards = await generateRegionalHelplines(country || region);
          if (cards && Array.isArray(cards) && cards.length > 0) {
            setHelplines(cards);
            setStatus("done");
          } else {
            throw new Error("Our AI couldn't formulate local helplines. Showing global resources.");
          }
        } catch (err) {
          console.error(err);
          setErrorMsg("Could not fetch local helplines: " + err.message);
          setStatus("error");
        }
      },
      (err) => {
        console.error(err);
        setErrorMsg("Location access was denied. Enable permissions and try again.");
        setStatus("error");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleReset = () => {
    setHelplines(GLOBAL_HELPLINES);
    setDetectedRegion(null);
    setStatus("idle");
    setErrorMsg(null);
    setStatusMsg("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="support-page"
    >
      {/* ── Header strip ─────────────────────────────── */}
      <div className="support-header">
        <div>
          <p className="text-kicker">Support & Referral</p>
          <h1 className="support-title">Find help near you.</h1>
          <p className="support-sub">
            Public, free, and government-backed mental health resources — worldwide.
          </p>
        </div>

        {/* Location pill */}
        <div className="support-locate-row">
          {status === "idle" || status === "error" ? (
            <button onClick={handleLocate} className="btn btn--primary">
              <FontAwesomeIcon icon={faLocationDot} />
              Locate resources
            </button>
          ) : status === "locating" ? (
            <button className="btn btn--primary" disabled>
              <FontAwesomeIcon icon={faCircleNotch} spin />
              {statusMsg}
            </button>
          ) : (
            <div className="support-region-pill">
              <FontAwesomeIcon icon={faLocationDot} />
              {detectedRegion}
              <button onClick={handleReset} className="support-region-reset" title="Reset">
                <FontAwesomeIcon icon={faRefresh} />
              </button>
            </div>
          )}
          {errorMsg && <p className="support-error">{errorMsg}</p>}
        </div>
      </div>

      {/* ── Helplines grid ───────────────────────────── */}
      <section>
        <div className="support-section-label">
          <FontAwesomeIcon icon={detectedRegion ? faLocationDot : faGlobe} />
          {detectedRegion ? `Helplines near ${detectedRegion}` : "Global helplines"}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={detectedRegion || "global"}
            className="hc-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {helplines.map((h, i) => <HelplineCard key={h.name} h={h} index={i} />)}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Provider types ───────────────────────────── */}
      <section>
        <div className="support-section-label">
          <FontAwesomeIcon icon={faUserDoctor} />
          Who to see
        </div>
        <div className="hc-provider-row">
          {PROVIDER_TYPES.map((p) => (
            <div key={p.title} className="hc-provider-card">
              <div className="hc-provider-icon">
                <FontAwesomeIcon icon={p.icon} />
              </div>
              <div>
                <p className="hc-provider-title">{p.title}</p>
                <p className="hc-provider-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
