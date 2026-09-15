import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

function Alerts(props) {
  const capitalize = (word) => {
    if (!word) return "";
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
 
  if (!props.alert) return <div className={"bg-gray-200"} />;

  const isSuccess = props.alert.typ === "success";
  const Icon = isSuccess ? CheckCircle : AlertCircle;

  return (
    <div style={{ minHeight: '38px' }} className={`pt-2 pb-2 bg-gray-200 flex items-center justify-center px-4`}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm w-full max-w-xl ${
            isSuccess
              ? "bg-green-100 border border-green-300 text-green-800"
              : "bg-red-100 border border-red-300 text-red-800"
          }`}
          role="alert"
        >
          <Icon className="w-4 h-4 shrink-0" />
          <span><strong>{capitalize(props.alert.typ)}</strong>: {props.alert.msg}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Alerts;
