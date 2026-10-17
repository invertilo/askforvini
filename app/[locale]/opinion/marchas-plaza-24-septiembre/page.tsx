import "@/app/opinion-article.css";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const chapters = [
  {
    file: "111",
    title: "¿Qué hay detrás de estas marchas?",
    context: "Acá empieza el cuento: se habla de derechos, pero las propias conversaciones muestran otra cosa. Cuando los mensajes contradicen el discurso, hay que dejar de repetir consignas y mirar los hechos.",
    alt: "Lámina introductoria sobre las marchas en Santa Cruz de la Sierra, con ilustración de la Plaza 24 de Septiembre.",
  },
  {
    file: "222",
    title: "Entender lo que se reclama",
    context: "Si necesitan que alguien les escriba un guion para explicar los decretos que supuestamente rechazan, la pregunta es inevitable: ¿están defendiendo una idea o repitiendo una consigna que no entienden? Eso no es conciencia social; es inercia.",
    alt: "Lámina que pregunta si los participantes conocen las razones de la marcha y muestra una captura de conversación.",
  },
  {
    file: "333",
    title: "Crítica y dependencia del Estado",
    context: "Exigir que caiga un gobierno mientras se espera que ese mismo Estado resuelva todo no es rebeldía: es conveniencia. Criticar al poder es legítimo; reclamar beneficios y rechazar toda responsabilidad propia es la contradicción que este mensaje deja expuesta.",
    alt: "Lámina de opinión sobre las exigencias dirigidas a un gobierno al que se critica.",
  },
  {
    file: "444",
    title: "La presencia de menores",
    context: "La captura pregunta cuántos menores hay y habla de organizar un bloque. Si esos menores terminan adelante, dejan de ser participantes y pasan a ser una barrera humana. Ninguna causa, por urgente que se presente, tiene derecho a convertir a niños en protección para adultos.",
    alt: "Capturas de una encuesta sobre menores de edad y un mensaje acerca de organizar un bloque de personas menores.",
  },
  {
    file: "555",
    title: "Preparación para posibles enfrentamientos",
    context: "Hablan de máscaras y artículos de defensa personal antes de salir a marchar, y después quieren venderlo como una protesta pacífica. No hace falta inventar nada: la preparación ya cuenta una historia. Si se preparan para el choque, deben hacerse cargo del choque.",
    alt: "Lámina con captura de un mensaje sobre artículos de defensa personal, máscaras y posibles enfrentamientos.",
  },
  {
    file: "666",
    title: "Una frase antisemita",
    context: "Esto no es una consigna incómoda ni una broma de mal gusto: es antisemitismo explícito. La edad no lo vuelve menos grave y la protesta no lo vuelve legítimo. Si alguien amenaza o insulta por identidad, hay que señalarlo sin maquillarlo.",
    alt: "Lámina que denuncia una frase antisemita reproducida en una captura de chat.",
  },
  {
    file: "777",
    title: "Crítica política y ataques por identidad",
    context: "Pedir que caiga un gobierno puede ser una posición política. Meter a personas en el mismo paquete y atacarlas por su identidad es otra cosa. Llamar rebelión al odio no lo convierte en justicia: solo lo disfraza.",
    alt: "Lámina con un mensaje sobre el gobierno y los sionistas, seguida de una valoración editorial.",
  },
  {
    file: "888",
    title: "Los daños tampoco son una respuesta",
    context: "El discurso intenta presentar el vandalismo como parte noble de la protesta. No lo es. La propiedad pública pertenece a todos y la privada tampoco se convierte en un blanco legítimo porque alguien diga tener una causa. Romper y dañar no demuestra valentía: demuestra impunidad.",
    alt: "Lámina sobre daños a propiedad pública y privada con una captura que describe al bloque negro.",
  },
  {
    file: "999",
    title: "La responsabilidad también es parte de protestar",
    context: "Después de leer todo esto, queda una pregunta simple: ¿qué están defendiendo realmente? Una protesta pierde autoridad cuando necesita menores como escudo, máscaras para el choque, insultos por identidad y vandalismo para sostener su relato. El cuento se cae cuando aparecen los hechos.",
    alt: "Lámina final sobre responsabilidad en las protestas, con capturas de conversaciones mencionadas en la serie.",
  },
] as const;

const englishChapters = [
  { title: "What is behind these marches?", context: "This is where the story begins: the slogans talk about rights, but the documented conversations reveal something else. When messages contradict the public narrative, stop repeating slogans and look at the facts." },
  { title: "Understanding the demands", context: "If someone has to write a script explaining the decrees they supposedly oppose, the question is unavoidable: are they defending an idea or repeating a slogan they do not understand? That is not social awareness; it is inertia." },
  { title: "Criticism and dependence on the state", context: "Demanding that a government fall while expecting that same state to solve everything is not rebellion: it is convenience. Criticism of power is legitimate; demanding benefits while rejecting personal responsibility exposes the contradiction." },
  { title: "Minors as a human shield", context: "The screenshot asks how many minors there are and discusses organizing a group. If those minors end up at the front, they stop being participants and become a human shield. No cause, however urgent it claims to be, has the right to turn children into protection for adults." },
  { title: "Preparing for confrontation", context: "They discuss masks and personal-defense items before marching, then try to sell it as a peaceful protest. Nothing needs to be invented: the preparation already tells a story. If they prepare for a clash, they must own the consequences." },
  { title: "An explicit antisemitic phrase", context: "This is not an uncomfortable slogan or a tasteless joke: it is explicit antisemitism. Age does not make it less serious, and protest does not make it legitimate. Threats or insults based on identity must be called out without euphemisms." },
  { title: "Political criticism and attacks based on identity", context: "Calling for a government to fall can be a political position. Lumping people together and attacking them because of their identity is something else. Calling hatred rebellion does not turn it into justice; it only disguises it." },
  { title: "Damage is not an answer", context: "The narrative tries to present vandalism as the noble part of protest. It is not. Public property belongs to everyone, and private property does not become a legitimate target because someone claims to have a cause. Breaking things is not courage: it is impunity." },
  { title: "Responsibility is part of protest", context: "After reading all of this, one question remains: what are they really defending? A protest loses its authority when it needs minors as shields, masks for confrontation, identity-based insults, and vandalism to sustain its story. The narrative collapses when the facts appear." },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const path = `/${locale}/opinion/marchas-plaza-24-septiembre`;
  return {
    metadataBase: new URL("https://opinion.askforvini.pw"),
    title: locale === "es" ? "¿Qué hay detrás de estas marchas? | Opinión — askforvini" : "What is behind these marches? | Opinion — askforvini",
    description: locale === "es" ? "Nueve láminas de opinión que documentan antisemitismo, vandalismo y contradicciones presentadas como protesta." : "Nine illustrated panels documenting antisemitism, vandalism, and contradictions presented as protest.",
    alternates: { canonical: path, languages: { es: "/es/opinion/marchas-plaza-24-septiembre", en: "/en/opinion/marchas-plaza-24-septiembre" } },
  };
}

export default async function MarchasArticle({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const isEnglish = locale === "en";
  const displayChapters = isEnglish ? chapters.map((chapter, index) => ({ ...chapter, ...englishChapters[index] })) : chapters;

  return (
    <main className="opinion-article">
      <header className="opinion-article-header">
        <div className="page-wrap opinion-article-header-inner">
          <Link href={`/${locale}/opinion`} className="opinion-article-back"><ArrowLeft size={16} /> {isEnglish ? "Back to opinion" : "Volver a opinión"}</Link>
          <span>OPINION.ASKFORVINI.PW / ARCHIVO</span>
        </div>
      </header>

      <article>
        <div className="page-wrap opinion-article-intro">
          <p className="opinion-article-kicker">{isEnglish ? "LONG READ" : "PUBLICACIÓN EXTENSA"} <span>·</span> {isEnglish ? "09 PANELS" : "09 LÁMINAS"} <span>·</span> SANTA CRUZ DE LA SIERRA</p>
          <h1>{isEnglish ? <>What is behind<br />these marches?</> : <>¿Qué hay detrás<br />de estas marchas?</>}</h1>
          <p className="opinion-article-deck">{isEnglish ? "A documented opinion on how antisemitism, hate, and incitement can be presented as protest in Plaza 24 de Septiembre—and why evidence must remain part of the debate." : "Una opinión documentada sobre cómo el antisemitismo, el odio y la incitación pueden presentarse como protesta en la Plaza 24 de Septiembre, y por qué las pruebas deben seguir en el centro del debate."}</p>
          <div className="opinion-article-meta"><span>VINICIUS / {isEnglish ? "OPINION" : "OPINIÓN"}</span><span>{isEnglish ? "VISUAL STORY · 9 CHAPTERS" : "LECTURA VISUAL · 9 CAPÍTULOS"}</span></div>
        </div>

        <nav className="page-wrap opinion-chapters" aria-label={isEnglish ? "Publication chapters" : "Capítulos de la publicación"}>
          <span>{isEnglish ? "IN THIS PUBLICATION" : "EN ESTA PUBLICACIÓN"}</span>
          <div>{displayChapters.map((chapter, index) => <a key={chapter.file} href={`#lamina-${chapter.file}`}>{String(index + 1).padStart(2, "0")}</a>)}</div>
        </nav>

        <div className="opinion-article-sequence">
          {displayChapters.map((chapter, index) => (
            <section className="page-wrap opinion-chapter" id={`lamina-${chapter.file}`} key={chapter.file} aria-labelledby={`titulo-${chapter.file}`}>
              <div className="opinion-chapter-heading"><span>{String(index + 1).padStart(2, "0")} / 09</span><div><h2 id={`titulo-${chapter.file}`}>{chapter.title}</h2><p>{chapter.context}</p></div></div>
              <figure>
                <Image src={`/opinion/marchas/${chapter.file}.webp`} alt={chapter.alt} width={1254} height={1254} sizes="(max-width: 960px) 100vw, 960px" priority={index === 0} />
                <figcaption>{isEnglish ? "Panel" : "Lámina"} {String(index + 1).padStart(2, "0")} · {isEnglish ? "Visual material supplied by Vinicius" : "Material visual aportado por Vinicius"}</figcaption>
              </figure>
            </section>
          ))}
        </div>
        <aside className="page-wrap opinion-article-note"><span>{isEnglish ? "EDITORIAL NOTE" : "NOTA EDITORIAL"}</span><p>{isEnglish ? "These screenshots were supplied for this opinion piece. Each panel contains an interpretation; where a screenshot alone does not confirm a detail, the accompanying context says so. The panels themselves are in Spanish." : "Las capturas se presentan como material aportado para esta opinión. Cada lámina contiene su propia interpretación; cuando una captura no confirma un detalle por sí sola, lo señalamos en el texto de contexto."}</p><Link href={`/${locale}/opinion`}>{isEnglish ? "Back to all publications" : "Volver a todas las publicaciones"} <ArrowUpRight size={16} /></Link></aside>
      </article>
      <footer className="page-wrap opinion-article-footer"><span>© 2026 ASKFORVINI</span><Link href={`/${locale}`}>ASKFORVINI.PW ↗</Link></footer>
    </main>
  );
}
