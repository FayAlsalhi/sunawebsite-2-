import {
  createFileRoute,
  Link,
  notFound,
  useRouter,
} from "@tanstack/react-router";
import { motion } from "framer-motion";
import { getProject, PROJECTS } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    return {
      meta: p
        ? [
            { title: `${p.title} — Project` },
            { name: "description", content: p.description },
            { property: "og:title", content: p.title },
            { property: "og:description", content: p.description },
            { property: "og:type", content: "article" },
            { property: "og:image", content: p.src },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:image", content: p.src },
          ]
        : [],
    };
  },
  component: ProjectDetail,
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 text-white">
        <p>Something went wrong loading this project.</p>
        <button
          onClick={() => {
            reset();
            router.invalidate();
          }}
          className="rounded-full bg-[hsl(18_88%_55%)] px-5 py-2 text-sm font-medium"
        >
          Retry
        </button>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 text-white">
      <p>Project not found.</p>
      <Link to="/" className="text-[hsl(18_88%_55%)] underline">
        Back home
      </Link>
    </div>
  ),
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-28">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
        >
          العودة للأعمال →
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <span className="inline-block rounded-full bg-[hsl(18_88%_55%)] px-3 py-1 text-xs font-medium text-white">
            {project.tag}
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.3] tracking-tight md:text-6xl">
            {project.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2 text-sm text-neutral-400">
            <span>العميل · {project.client}</span>
            <span>السنة · {project.year}</span>
          </div>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={project.src}
          alt={project.title}
          className="mt-12 h-[320px] w-full rounded-[2rem] object-cover md:h-[520px]"
        />

        <p className="mt-12 max-w-2xl text-lg leading-relaxed text-neutral-300">
          {project.description}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {project.gallery.map((src: string, i: number) => (
            <img
              key={i}
              src={src}
              alt={`${project.title} detail ${i + 1}`}
              loading="lazy"
              className="h-[260px] w-full rounded-[2rem] object-cover md:h-[340px]"
            />
          ))}
        </div>

        <div className="mt-20 border-t border-white/10 pt-10">
          <p className="text-xs font-semibold tracking-[0.3em] text-[hsl(18_88%_55%)]">
            [ مشاريع أخرى ]
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {PROJECTS.filter((p) => p.slug !== project.slug).map((p) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="rounded-full border border-white/15 px-5 py-2 text-sm text-neutral-300 transition-colors hover:border-[hsl(18_88%_55%)] hover:text-white"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
