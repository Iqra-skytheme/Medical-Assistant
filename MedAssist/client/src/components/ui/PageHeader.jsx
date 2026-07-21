function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-teal-600 dark:text-teal-400 transition-colors duration-300">
        {title}
      </h1>
      <p className="mt-5 text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed text-lg transition-colors duration-300">
        {subtitle}
      </p>
    </div>
  );
}

export default PageHeader;