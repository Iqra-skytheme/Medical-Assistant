function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  loading = false,
  disabled = false,
}) {
  const styles = {
    primary:
      "bg-teal-600 text-white hover:bg-teal-700",

    secondary:
      "border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        ${styles[variant]}
        w-full
        px-6
        py-3
        rounded-xl
        transition
        duration-300
        font-medium
        flex
        items-center
        justify-center
        gap-2
        disabled:opacity-70
        disabled:cursor-not-allowed
      `}
    >
      {loading ? (
        <>
          {/* Spinner */}
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>

          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;