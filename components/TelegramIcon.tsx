type TelegramIconProps = {
  className?: string;
  strokeWidth?: number;
};

export function TelegramIcon({ className, strokeWidth = 2 }: TelegramIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21.5 4.5 2.7 11.6c-.7.3-.7 1.3 0 1.5l4.7 1.5 1.8 5.5c.2.7 1.1.9 1.6.4l2.6-2.6 4.6 3.4c.6.4 1.4.1 1.6-.6L22.6 5.4c.2-.8-.6-1.5-1.1-.9Z" />
      <path d="m7.4 14.6 11.6-7.4-7.3 9.2" />
    </svg>
  );
}
