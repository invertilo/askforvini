import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-wrap flex min-h-dvh flex-col justify-center py-16">
      <h1 className="font-display text-[2.5rem] font-medium leading-none">
        askforvini
        <span className="font-data text-[0.62em] text-signal">.pw</span>
      </h1>
      <p className="mt-6 max-w-[36rem] text-content-secondary">
        Esta ruta no existe. / This path does not exist.
      </p>
      <Link
        href="/es"
        className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full bg-accent px-5 font-medium text-accent-fg"
      >
        Inicio
      </Link>
    </main>
  );
}
