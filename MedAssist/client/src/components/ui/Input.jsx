function Input({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-teal-600 dark:focus:ring-teal-400 focus:border-teal-600 dark:focus:border-teal-400 transition placeholder-slate-400 dark:placeholder-white/60 ${className}`}
      {...props}
    />
  );
}

export default Input;