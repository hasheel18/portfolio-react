import { skills } from "../data/skills";

export default function About() {
  return (
    <section id="about">
      <div className="theme-layer" id="tl-about"></div>
      <div className="section-wordmark" id="wm-about">
        ABOUT
      </div>

      <div className="about-inner">
        <div className="about-card reveal">
          <div className="about-card-inner" id="tilt-card">
            <div className="card-grid"></div>
            <div className="card-glow"></div>
            <div className="card-orb o1"></div>
            <div className="card-orb o2"></div>

            <img
              src="/images/profile01.png"
              alt="Dhanusha Hasheel"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                borderRadius: "12px",
                zIndex: 1,
              }}
            />

            <div className="card-text-overlay">
              <div className="card-name">Dhanusha Hasheel</div>
              <div className="card-role">Software Engineering Undergraduate</div>
            </div>
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: ".15s" }}>
          <div className="section-label">About Me</div>
          <h2 className="section-title">
            Turning ideas into
            <br />
            <span style={{ color: "var(--accent)" }}>working software</span>
          </h2>

          <p className="about-text">
            I'm a second-year software engineering undergraduate passionate about writing code that's elegant,
            efficient, and meaningful. I love the full spectrum of engineering.
          </p>

          <p className="about-text">
            I love to participate in hackathons and write blog articles to help others to gain and explore IT
            knowledge.
          </p>

          <div className="skills-grid">
            {skills.map((s) => (
              <div className="skill-pill" key={s.name}>
                <span className="dot" style={{ background: s.color }}></span>
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}