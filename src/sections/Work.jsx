
import { projects } from "../data/projects";

export default function Work() {
  return (
    <section id="work">
      {/* Background and wordmark */}
      <div
        className="theme-layer"
        id="tl-work"
      ></div>

      <div
        className="section-wordmark"
        id="wm-work"
      >
        PROJECTS
      </div>

      {/* Section heading */}
      <div className="work-header reveal">
        <div className="work-header-left">
          <div className="section-label">
            WORK
          </div>

          <h2 className="section-title">
            Featured{" "}
            <span style={{ color: "var(--accent)" }}>
              Projects
            </span>
          </h2>

          <p className="section-sub">
            A collection of projects I've built,
            exploring different technologies and
            solving real-world problems.
          </p>
        </div>
      </div>

      {/* Project cards */}
      <div className="projects-grid">
        {projects.map((project, index) => (
          <article
            className="project-card reveal"
            key={project.id}
          >
            {/* Project image */}
            <div className="project-card-image">
              <img
                src={project.image}
                alt={`${project.title} application screenshot`}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Project information */}
            <div className="project-card-body">
              <div className="project-card-top">
                <span className="project-number">
                  {String(index + 1).padStart(2, "0")}
                  {" / PROJECT"}
                </span>
              </div>

              <div className="project-card-content">
                <h3 className="project-card-title">
                  {project.title}
                </h3>

                <p className="project-card-description">
                  {project.description}
                </p>

                {/* Technology tags */}
                <div className="project-card-tags">
                  {project.tech.map((technology) => (
                    <span
                      className="project-tag"
                      key={technology}
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project links */}
              <div className="project-card-footer">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.262.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.53 11.53 0 0 1 12 5.803c1.02.005 2.045.138 3.003.397 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.373-12-12-12Z" />
                  </svg>

                    GitHub
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-live-link"
                    aria-label={`View live demo of ${project.title}`}
                  >
                    Live Demo

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}