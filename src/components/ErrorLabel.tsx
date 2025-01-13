interface ErrorLabel {
  children: string;
}
function ErrorLabel({ children }: ErrorLabel) {
  return <div className="text-slate-700 text-xs text-left mt-1.5">{children}</div>;
}

export default ErrorLabel;
