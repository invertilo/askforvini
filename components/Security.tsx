"use client";

import { InPageAnchor } from "@/components/InPageAnchor";
import { KineticText } from "@/components/motion/KineticText";
import type { Locale } from "@/lib/i18n";
import type { Messages } from "@/lib/messages";
import { FileSearch, Shield } from "lucide-react";
import type { ReactNode } from "react";

type SecurityProps = {
  locale: Locale;
  copy: Messages["security"];
};

function CaseRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2 border-t border-hairline py-5 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] md:gap-8">
      <dt className="font-data text-[0.8125rem] tracking-[0.12em] text-content-secondary uppercase">
        {label}
      </dt>
      <dd className="text-content-secondary">{children}</dd>
    </div>
  );
}

export function Security({ locale, copy }: SecurityProps) {
  const { case: report } = copy;

  return (
    <section id="security" className="page-wrap pb-20 md:pb-28">
      <div className="flex items-start gap-3">
        <Shield
          aria-hidden="true"
          className="mt-1 size-5 shrink-0 text-signal"
          strokeWidth={1.75}
        />
        <div className="min-w-0">
          <KineticText
            as="h2"
            className="font-display text-[1.75rem] font-medium leading-tight"
          >
            {copy.title}
          </KineticText>
          <p className="mt-5 max-w-[42rem] text-content-secondary">{copy.lede}</p>
        </div>
      </div>

      <p className="mt-12 font-data text-[0.8125rem] tracking-[0.14em] text-content-secondary uppercase">
        {copy.phasesLabel}
      </p>
      <ol className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {copy.phases.map((phase, index) => (
          <li key={phase.title} className="min-w-0">
            <p className="font-data text-[0.8125rem] text-content-secondary">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-display text-[1.15rem] font-medium leading-snug text-content">
              {phase.title}
            </h3>
            <p className="mt-2 text-content-secondary">{phase.body}</p>
          </li>
        ))}
      </ol>

      <article className="mt-16 border-t border-hairline pt-10">
        <div className="flex items-start gap-3">
          <FileSearch
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-signal"
            strokeWidth={1.75}
          />
          <div className="min-w-0">
            <p className="font-data text-[0.8125rem] tracking-[0.14em] text-content-secondary uppercase">
              {report.eyebrow}
            </p>
            <h3 className="mt-2 font-display text-[1.35rem] font-medium leading-tight text-content">
              {report.title}
            </h3>
            <p className="mt-3 max-w-[42rem] text-content-secondary">
              {report.summary}
            </p>
          </div>
        </div>

        <dl className="mt-8">
          <CaseRow label={report.vectorLabel}>{report.vector}</CaseRow>
          <CaseRow label={report.methodsLabel}>
            <ul className="list-disc space-y-1 pl-5">
              {report.methods.map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>
          </CaseRow>
          <CaseRow label={report.endpointsLabel}>
            <ul className="space-y-1 font-data text-[0.875rem] text-content">
              {report.endpoints.map((endpoint) => (
                <li key={endpoint}>
                  <code>{endpoint}</code>
                </li>
              ))}
            </ul>
          </CaseRow>
          <CaseRow label={report.dataLabel}>{report.dataImpact}</CaseRow>
          <CaseRow label={report.riskLabel}>
            <span className="text-content">{report.risk}</span>
          </CaseRow>
          <CaseRow label={report.responseLabel}>{report.response}</CaseRow>
        </dl>
      </article>

      <p className="mt-12 max-w-[42rem] text-content-secondary">
        {copy.cta}{" "}
        <InPageAnchor
          href={`/${locale}#connect`}
          className="font-medium text-content underline-offset-4 hover:underline"
        >
          {copy.ctaConnect}
        </InPageAnchor>
      </p>
    </section>
  );
}
