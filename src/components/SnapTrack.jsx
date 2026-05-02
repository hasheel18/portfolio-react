export default function SnapTrack() {
  return (
    <div className="snap-track">
      <button className="snap-dot active" data-target="hero" title="Home"></button>
      <button className="snap-dot" data-target="about" title="About"></button>
      <button className="snap-dot" data-target="work" title="Work"></button>
      <button className="snap-dot" data-target="certifications" title="Certifications"></button>
      <button className="snap-dot" data-target="blogs" title="Blogs"></button>
      <button className="snap-dot" data-target="contact" title="Contact"></button>
    </div>
  );
}