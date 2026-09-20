type SkipLinkProps = {
  label: string;
};

export function SkipLink({ label }: SkipLinkProps) {
  return (
    <a className="skip-link" href="#main">
      {label}
    </a>
  );
}
