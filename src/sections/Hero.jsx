export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg-layer"></div>

      <div className="section-wordmark" id="wm-hero">ENGINEER</div>

      <div className="hero-content">
        <div className="hero-tag">
          <span className="blink"></span>Ready to tackle real-world challenges
        </div>

        <h1 className="hero-title">
          Software<br />
          <span className="line-accent">Engineer</span><br />
          & Builder
        </h1>

        <p className="hero-sub">
          I build systems that perform, interfaces that delight, and software that stands the test of time. SE undergraduate.
          Always learning.
        </p>

        <div className="hero-cta">
          <button
            className="btn-primary"
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
          >
            View My Work
          </button>

          <button
            className="btn-outline"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get In Touch
          </button>
        </div>

        <div className="hero-stats">
          <div>
            <div className="stat-num">SE</div>
            <div className="stat-label">Degree</div>
          </div>
          <div>
            <div className="stat-num">2nd</div>
            <div className="stat-label">Year of Study</div>
          </div>
          <div>
            <div className="stat-num">3+</div>
            <div className="stat-label">Languages</div>
          </div>
        </div>
      </div>

      <div className="scroll-hint">Explore</div>
    </section>
  );
}