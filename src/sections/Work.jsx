export default function Work() {
  return (
    <section id="work">
      <div className="theme-layer" id="tl-work"></div>
      <div className="section-wordmark" id="wm-work">
        PROJECTS
      </div>

      <div className="work-header reveal">
        <div className="work-header-left">
          <div className="section-label">Work</div>
          <h2 className="section-title">
            Featured <span style={{ color: "var(--accent)" }}>Projects</span>
          </h2>
        </div>
      </div>

      {/* FEATURED: COMPLETED PROJECT */}
      <div className="featured-project reveal">
        <div className="fp-info">
          <div>
            <div className="fp-badge">
              <span className="dot-live"></span>Completed
            </div>
            <div className="fp-title">
              User Management
              <br />
              System
            </div>
            <p className="fp-desc">
              A fully functional full-stack CRUD web application for managing users — built with a Java Spring Boot REST
              API backend, React frontend, and MySQL database. Supports create, read, update, and delete operations with
              clean UI and real-time API integration.
            </p>

            <div className="fp-stack">
              <div className="fp-stack-label">Tech Stack</div>
              <div className="fp-stack-pills">
                <span className="pill">Java</span>
                <span className="pill">Spring Boot</span>
                <span className="pill">React</span>
                <span className="pill">MySQL</span>
                <span className="pill">REST API</span>
                <span className="pill">Postman</span>
                <span className="pill">Git</span>
              </div>
            </div>
          </div>

          <div className="fp-actions">
            <a
              href="https://github.com/hasheel18/FullStack-Application.git"
              className="fp-btn fp-btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>

        {/* Visual pane */}
        <div className="fp-visual">
          <div className="fp-visual-bg"></div>
          <div className="fp-grid-overlay"></div>
          <div className="fp-orb fp-orb-1"></div>
          <div className="fp-orb fp-orb-2"></div>

          <div className="mock-browser">
            <div className="mock-titlebar">
              <span className="mock-dot r"></span>
              <span className="mock-dot y"></span>
              <span className="mock-dot g"></span>
              <div className="mock-url">localhost:3000/users</div>
            </div>

            <div className="mock-screen">
              <div className="mock-app-bar">
                <span className="mock-app-bar-title">User Management App</span>
                <span className="mock-add-btn">+ Add User</span>
              </div>

              <div className="mock-table-header">
                <span className="mock-th">Name</span>
                <span className="mock-th">Username</span>
                <span className="mock-th">Email</span>
                <span className="mock-th">Status</span>
              </div>

              <div className="mock-row">
                <span className="mock-cell">
                  <span
                    className="mock-avatar"
                    style={{ background: "linear-gradient(135deg,#6c63ff,#00e5ff)" }}
                  ></span>
                  Alex Chen
                </span>
                <span className="mock-cell">alex_c</span>
                <span className="mock-cell">alex@dev.io</span>
                <span className="mock-cell">
                  <span className="mock-badge-active">Active</span>
                </span>
              </div>

              <div className="mock-row">
                <span className="mock-cell">
                  <span
                    className="mock-avatar"
                    style={{ background: "linear-gradient(135deg,#ff4d8d,#ff9800)" }}
                  ></span>
                  Sam Rivera
                </span>
                <span className="mock-cell">sam_r</span>
                <span className="mock-cell">sam@dev.io</span>
                <span className="mock-cell">
                  <span className="mock-badge-active">Active</span>
                </span>
              </div>

              <div className="mock-row">
                <span className="mock-cell">
                  <span
                    className="mock-avatar"
                    style={{ background: "linear-gradient(135deg,#39ff14,#00e5ff)" }}
                  ></span>
                  Morgan Lee
                </span>
                <span className="mock-cell">morgan_l</span>
                <span className="mock-cell">morgan@dev.io</span>
                <span className="mock-cell">
                  <span className="mock-badge-active">Active</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IN PROGRESS + COMING SOON */}
      <div className="inprogress-grid">
        <div className="ip-card reveal">
          <div className="ip-card-top">
            <div className="ip-badge">
              <span className="dot-progress"></span>In Progress
            </div>
            <div className="ip-num">02</div>
          </div>

          <div className="ip-body">
            <div className="ip-title">Flight Radar Application ✈️</div>
            <p className="ip-desc">
              Building a real-time Flight Radar app using an API for live aircraft tracking. Stay tuned.
            </p>

            <div className="ip-progress-wrap">
              <div className="ip-progress-meta">
                <span className="ip-progress-label">Progress</span>
                <span className="ip-progress-pct">50%</span>
              </div>

              <div className="ip-bar-track">
                <div className="ip-bar-fill" style={{ width: "50%" }}></div>
              </div>
            </div>

            <div className="ip-tags">
              <span className="ip-tag">JavaScript</span>
            </div>
          </div>
        </div>

        <div className="ip-card placeholder reveal">
          <div className="placeholder-inner">
            <div className="placeholder-text">
              Coming Soon...
              <br />
              Stay Tuned!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}