import { useEffect, useState } from "react";
import "./Gallery.css";

/**
 * Photos are served from public/gallery/ as web-optimised JPEGs
 * (longest side 1600px, quality 80).
 *
 * convocation2026/ is gitignored — those images are NOT in the repo, so they
 * must be regenerated locally from the originals before running or deploying.
 */
const CONVOCATION_COUNT = 53;

const convocation2026 = Array.from({ length: CONVOCATION_COUNT }, (_, i) => ({
  src: `/gallery/convocation2026/conv-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: "Convocation 2026",
}));

const events = [
  { src: "/gallery/2Y4A0622.jpg", alt: "IAR Cell event" },
  { src: "/gallery/2Y4A3190.jpg", alt: "IAR Cell event" },
  { src: "/gallery/2Y4A9607.jpg", alt: "IAR Cell event" },
  { src: "/gallery/DSC00332.jpg", alt: "IAR Cell event" },
  { src: "/gallery/DSC02410.jpg", alt: "IAR Cell event" },
];

const photos = [...convocation2026, ...events];

// Spread the photos across N rows so each row has its own set to scroll.
const ROWS = 3;
const rows = Array.from({ length: ROWS }, (_, r) =>
  photos.filter((_, i) => i % ROWS === r)
);

const Gallery = () => {
  const [active, setActive] = useState(null);

  // Close the enlarged view with the Escape key.
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section className="gallery-page">
      <div className="gallery-header">
        <h1>Gallery</h1>
        <p>Moments from our events, reunions and campus life. Click any photo to view it in full.</p>
      </div>

      <div className="gallery-wall">
        {rows.map((rowImgs, r) => (
          <div className="gallery-row" key={r}>
            {/* track holds the row twice so the scroll loops seamlessly */}
            <div className={`gallery-track ${r % 2 ? "reverse" : ""}`}>
              {[...rowImgs, ...rowImgs].map((img, i) => (
                <button
                  type="button"
                  className="gallery-item"
                  key={i}
                  onClick={() => setActive(img)}
                  aria-label={`Enlarge ${img.alt}`}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div className="gallery-lightbox" onClick={() => setActive(null)}>
          <button className="gallery-close" aria-label="Close">&times;</button>
          <img src={active.src} alt={active.alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
};

export default Gallery;
