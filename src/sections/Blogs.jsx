import { blogs } from "../data/blogs";

export default function Blogs() {
  return (
    <section id="blogs" className="reveal">
      <div id="tl-blogs" className="theme-layer"></div>

      <div className="section-wordmark" id="wm-blogs">
        BLOGS
      </div>

      <div className="work-header">
        <div>
          <div className="section-label">BLOGS</div>
          <h2 className="section-title">Articles</h2>
          <div className="section-sub">Articles on software, dev tools, and ideas I’m exploring.</div>
        </div>
      </div>

      <div className="blogs-grid">
        {blogs.map((b) => (
          <a key={b.href} href={b.href} className="blog-card" target="_blank" rel="noreferrer">
            <div className="blog-card-thumb" style={{ backgroundImage: `url('${b.thumb}')` }}></div>

            <div className="blog-card-inner">
              <div className="blog-card-tags">
                {b.tags.map((t) => (
                  <span className="blog-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="blog-card-title">{b.title}</div>
              <div className="blog-card-desc">{b.desc}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}