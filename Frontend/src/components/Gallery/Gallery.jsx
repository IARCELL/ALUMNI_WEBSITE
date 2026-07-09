import { useEffect, useState } from "react";
import "./Gallery.css";

/**
 * Helper to turn a Google Drive file ID into a viewable image URL.
 * The Drive folder must be shared as "Anyone with the link can view".
 *
 *   driveImg("1AbCdEf...")
 */
const driveImg = (id, sz = 1200) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${sz}`;

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GALLERY PHOTOS  —  REPLACE THESE PLACEHOLDERS
 * ─────────────────────────────────────────────────────────────────────────
 *  Placeholder images so the wall renders out of the box. Add a handful of
 *  real photos — they're spread across the scrolling rows automatically.
 *
 *  To use the real photos from the Drive folder
 *  (https://drive.google.com/drive/folders/1vHo_7fppf33VkSkHSvLk00By-0WqrLID):
 *
 *    1. Set the folder to "Anyone with the link can view".
 *    2. For each photo copy its file ID (from its share link:
 *       https://drive.google.com/file/d/<FILE_ID>/view) and use:
 *
 *         { src: driveImg("FILE_ID"), alt: "Convocation 2024" },
 *
 *  Or import local files instead:
 *
 *         import pic1 from "../../assets/Gallery/pic1.jpg";
 *         { src: pic1, alt: "..." }
 * ─────────────────────────────────────────────────────────────────────────
 */
const photos = [
  { src: "/gallery/2Y4A0622.jpg", alt: "IAR Cell event" },
  { src: "/gallery/2Y4A3190.jpg", alt: "IAR Cell event" },
  { src: "/gallery/2Y4A9607.jpg", alt: "IAR Cell event" },
  { src: "/gallery/DSC00332.jpg", alt: "IAR Cell event" },
  { src: "/gallery/DSC02410.jpg", alt: "IAR Cell event" },
];

// Spread the photos across N rows so each row has its own set to scroll.
const ROWS = 2;
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
            {/* track is duplicated so the scroll loops seamlessly */}
            <div className={`gallery-track ${r % 2 ? "reverse" : ""}`}>
              {[...rowImgs, ...rowImgs, ...rowImgs, ...rowImgs].map((img, i) => (
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
