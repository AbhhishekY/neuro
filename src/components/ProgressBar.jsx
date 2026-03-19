import { motion } from "framer-motion";

export default function ProgressBar({ progress, accentHex }) {
  return (
    <div className="progress-track">
      <motion.div
        className="progress-fill"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ background: accentHex }}
      />
    </div>
  );
}
