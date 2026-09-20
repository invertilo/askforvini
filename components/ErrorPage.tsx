import Link from "next/link";
import type { ReactNode } from "react";

type ErrorPageProps = {
  code: string;
  title: string;
  body: string;
  homeHref: string;
  homeLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  action?: ReactNode;
};

export function ErrorPage({
  code,
  title,
  body,
  homeHref,
  homeLabel,
  secondaryHref,
  secondaryLabel,
  action,
}: ErrorPageProps) {
  return (
    <main className="page-wrap flex min-h-dvh flex-col justify-center py-16">
      <p className="font-data text-[0.8125rem] tracking-[0.14em] text-content-secondary uppercase">
        {code}
      </p>
      <h1 className="mt-3 font-display text-[2.5rem] font-medium leading-none tracking-tight">
        askforvini
        <span className="font-data text-[0.62em] text-signal">.pw</span>
      </h1>
      <h2 className="mt-8 font-display text-[1.5rem] font-medium leading-tight text-content">
        {title}
      </h2>
      <p className="mt-4 max-w-[36rem] text-content-secondary">{body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={homeHref}
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-medium text-accent-fg"
        >
          {homeLabel}
        </Link>
        {secondaryHref && secondaryLabel ? (
          <Link
            href={secondaryHref}
            className="inline-flex min-h-11 items-center rounded-full border border-hairline px-5 font-medium text-content"
          >
            {secondaryLabel}
          </Link>
        ) : null}
        {action}
      </div>
    </main>
  );
}
