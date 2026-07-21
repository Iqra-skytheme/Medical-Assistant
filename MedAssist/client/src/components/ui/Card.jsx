function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-teal-950/10 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;