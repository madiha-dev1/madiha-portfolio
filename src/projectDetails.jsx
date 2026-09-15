import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { projects } from "./projects";

function ProjectDetails() {
  const { slug } = useParams();

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Project Not Found
          </h1>

          <Link
            to="/"
            className="mt-5 inline-block text-[#ff5cda]"
          >
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell neon-border min-h-screen rounded-3xl p-7 md:p-12">

      {/* Back */}
      <Link
        to="/#projects"
        className="inline-flex items-center gap-2 text-sm
                   text-white/60 transition
                   hover:text-[#ff5cda]"
      >
        <ArrowLeft size={17} />
        Back to Projects
      </Link>


      {/* Heading */}
      <div className="mt-8">
        <p className="text-sm text-[#ff5cda]">
          {project.type}
        </p>

        <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">
          {project.title}
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-white/55">
          {project.shortDescription}
        </p>
      </div>


      {/* Project Image */}
      <div className="mt-10 overflow-hidden rounded-3xl
                      border border-white/10 bg-white/[0.03]">

        <img
          src={project.image}
          alt={project.title}
          className="w-full object-cover"
        />

      </div>


      {/* About + Tech */}
      <div className="mt-12 grid gap-10 md:grid-cols-2">

        {/* About */}
        <div>
          <h2 className="text-xl font-semibold text-white">
            About this project
          </h2>

          <p className="mt-4 leading-7 text-white/55">
            {project.description}
          </p>
        </div>


        {/* Technologies */}
        <div>
          <h2 className="text-xl font-semibold text-white">
            Technologies
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">

            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border
                           border-[#ff31d2]/20
                           bg-[#ff31d2]/5
                           px-3 py-2 text-xs
                           text-white/70"
              >
                {tech}
              </span>
            ))}

          </div>
        </div>

      </div>


      {/* Features */}
      <div className="mt-12">

        <h2 className="text-xl font-semibold text-white">
          Features
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {project.features.map((feature) => (
            <div
              key={feature}
              className="rounded-2xl border border-white/10
                         bg-white/[0.03] p-4
                         text-sm text-white/60"
            >
              ✦ {feature}
            </div>
          ))}

        </div>

      </div>


      {/* Video */}
      <div className="mt-12">

        <h2 className="text-xl font-semibold text-white">
          Project Demo
        </h2>

        <div className="mt-5 overflow-hidden rounded-3xl
                        border border-white/10 bg-black">

          <video
            src={project.video}
            controls
            className="w-full"
          />

        </div>

      </div>


      {/* Buttons */}
      <div className="mt-8 flex flex-wrap gap-3">

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full
                     border border-white/10
                     bg-white/[0.04]
                     px-5 py-3 text-sm text-white/70
                     transition hover:border-[#ff31d2]
                     hover:text-[#ff5cda]"
        >
          <Github size={17} />
          GitHub
        </a>

        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full
                     bg-[#ff31d2] px-5 py-3
                     text-sm text-white
                     transition
                     hover:shadow-[0_0_25px_rgba(255,49,210,0.5)]"
        >
          <ExternalLink size={17} />
          Live Website
        </a>

      </div>

    </section>
  );
}

export default ProjectDetails;