import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { ConfirmModalContext } from "../../Context/ConfirmModalContext";
import { useLockBodyScroll } from "../../CustomHooks/useLockBodyScroll";

const GlobalConfirmModal = ({ title, detail, onPress }) => {
    const {isShowModal, hideConfirmModal } = useContext(ConfirmModalContext);
    useLockBodyScroll(isShowModal)
  return (
    <AnimatePresence>
      {/* backdrop */}
      {isShowModal && <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={hideConfirmModal}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      >
        {/* modal card — stop click propagation so backdrop click closes but card click doesn't */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
        >
          {/* top accent */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00ff87] to-transparent opacity-60" />

          <div className="p-6 space-y-6">
            {/* icon + text */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20 flex items-center justify-center text-lg">
                📅
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-black tracking-tight text-white">
                  {title || "Confirm Booking"}
                </h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  {detail || "You want to book this slot. This action cannot be undone."}
                </p>
              </div>
            </div>

            {/* divider */}
            <div className="h-px bg-white/5" />

            {/* actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={hideConfirmModal}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/50
                           border border-white/10 hover:border-white/20 hover:text-white/80
                           transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onPress}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-black
                           bg-[#00ff87] hover:bg-[#00ff87]/85
                           shadow-[0_0_16px_rgba(0,255,135,0.3)] hover:shadow-[0_0_24px_rgba(0,255,135,0.5)]
                           transition-all duration-200 cursor-pointer"
              >
                Confirm →
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  );
};

export default GlobalConfirmModal;