import { certifications } from "../data/certifications";

export default function Certifications() {
  return (
    <section id="certifications">
      <div className="theme-layer" id="tl-certifications"></div>

      <div className="section-wordmark" id="wm-certifications">
        CERTIFICATIONS
      </div>

      <div className="certifications-inner">
        <div className="work-header reveal">
          <div className="section-label">Certifications & Badges</div>

          <h2 className="section-title">
            Proof of <span style={{ color: "var(--accent)" }}>Learning</span>
          </h2>

          <p className="section-sub">
            Recognized credentials from universities and platforms across cloud, programming, and AI.
          </p>
        </div>

        <div className="cert-grid">
          {certifications.map((c) => (
            <a
              key={`${c.title}-${c.href}`}
              href={c.href}
              className="cert-item reveal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="cert-bg"></div>

              <div className="cert-badge-img">
                <img src={c.img} alt={c.imgAlt} />
              </div>

              <div className="cert-title">{c.title}</div>

              <div className="cert-sub">
                {c.subLines.map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>

              <div className="cert-meta">
                {c.tags.map((t) => (
                  <span className="cert-badge-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}