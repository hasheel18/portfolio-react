export default function MobileNav() {
  return (
    <div className="mobile-nav" id="mobile-nav">
      <button className="mobile-nav-close" id="mobile-nav-close" aria-label="Close menu">
        <span></span>
        <span></span>
      </button>

      <a href="#about" className="mobile-nav-item">About</a>
      <a href="#work" className="mobile-nav-item">Work</a>
      <a href="#certifications" className="mobile-nav-item">Certifications</a>
      <a href="#blogs" className="mobile-nav-item">Blogs</a>
      <a href="#contact" className="mobile-nav-item">Contact</a>

      <div className="mobile-nav-tag">Dhanusha Hasheel · SE</div>
    </div>
  );
}