interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`bg-transparent border border-gray-300 rounded-md text-white p-0 px-3 shrink-0 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
