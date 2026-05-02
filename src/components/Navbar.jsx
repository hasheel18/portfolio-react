export default function Navbar() {
  return (
    <nav>
      <div className="logo">Hasheel.dev</div>

      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#certifications">Certifications</a></li>
        <li><a href="#blogs">Blogs</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <button className="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}