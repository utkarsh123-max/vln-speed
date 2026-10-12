import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

/**
 * Drop this at the top of any content page (About, FAQ, Download Speed,
 * etc.) right after the <Seo /> tag. navigate(-1) goes to whatever page
 * the person actually came from (Home, a Footer link, search results...)
 * rather than hardcoding a single "back to" destination.
 */
export function BackButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(-1)}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ x: -2 }}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary hover:text-primary transition-colors mb-6"
    >
      <ArrowLeft size={14} />
      Back
    </motion.button>
  );
}