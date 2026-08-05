import { useEffect, useRef, useState } from "react";
import "./Gallery.css";

/**
 * Photos are served from public/gallery/ as web-optimised JPEGs
 * (longest side 1600px, quality 80).
 */
const CONVOCATION_COUNT = 31;

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

export { photos };

// Spread the photos across N rows so each row has its own set to scroll.
const ROWS = 3;
const rows = Array.from({ length: ROWS }, (_, r) =>
  photos.filter((_, i) => i % ROWS === r)
);

const AUTO_SPEED = 18;      // px per second
const RESUME_DELAY = 2000;  // ms of stillness before auto-scroll takes over again
const DRAG_SLOP = 5;        // px of movement that counts as a drag, not a click

const Chevron = ({ dir }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points={dir === "left" ? "15 18 9 12 15 6" : "9 6 15 12 9 18"} />
  </svg>
);

const GalleryRow = ({ images, reverse, onOpen }) => {
  const trackRef = useRef(null);
  const dragging = useRef(false);
  const dragDistance = useRef(0);
  const captured = useRef(false);
  const resumeAt = useRef(0);
  // Sub-pixel scroll position. scrollLeft rounds, so accumulating ~0.3px per
  // frame straight onto it never moves - the position has to be kept here.
  const pos = useRef(0);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const [grabbing, setGrabbing] = useState(false);

  const holdAuto = () => {
    resumeAt.current = performance.now() + RESUME_DELAY;
  };

  // Auto-scroll. The track holds the row twice, so any position p and p+half
  // show the same thing - that's what makes the wrap invisible.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const half = el.scrollWidth / 2;

      if (half > 0) {
        // Anything that moved the track without us doing it - wheel, touch,
        // the arrows' smooth scroll - shows up as drift. Adopt it and yield.
        if (Math.abs(el.scrollLeft - pos.current) > 2) {
          pos.current = el.scrollLeft;
          if (!dragging.current) holdAuto();
        }

        if (!dragging.current && now >= resumeAt.current) {
          pos.current += (reverse ? -1 : 1) * AUTO_SPEED * dt;
          if (pos.current >= half) pos.current -= half;
          else if (pos.current < 0) pos.current += half;
          el.scrollLeft = pos.current;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reverse]);

  // Drag to scroll (mouse only - touch already pans natively).
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    dragging.current = true;
    dragDistance.current = 0;
    dragStart.current = { x: e.clientX, scrollLeft: trackRef.current.scrollLeft };
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const el = trackRef.current;
    const dx = e.clientX - dragStart.current.x;
    dragDistance.current = Math.max(dragDistance.current, Math.abs(dx));

    // Grab the pointer only once this is a real drag. Capturing on pointerdown
    // would retarget pointerup to the track, so `click` would fire there
    // instead of on the photo and nothing would ever open.
    if (!captured.current) {
      if (dragDistance.current <= DRAG_SLOP) return;
      el.setPointerCapture(e.pointerId);
      captured.current = true;
      setGrabbing(true);
    }

    let next = dragStart.current.scrollLeft - dx;
    const half = el.scrollWidth / 2;
    // Shift the anchor as we wrap so dragging can continue indefinitely.
    if (half > 0) {
      while (next >= half) { next -= half; dragStart.current.scrollLeft -= half; }
      while (next < 0)     { next += half; dragStart.current.scrollLeft += half; }
    }
    el.scrollLeft = next;
    pos.current = next;
  };

  const endDrag = (e) => {
    if (!dragging.current) return;
    dragging.current = false;
    if (captured.current) {
      captured.current = false;
      setGrabbing(false);
      holdAuto();
      try { trackRef.current.releasePointerCapture(e.pointerId); } catch { /* already released */ }
    }
  };

  const nudge = (dir) => {
    const el = trackRef.current;
    holdAuto();
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="gallery-row">
      <button
        type="button"
        className="gallery-arrow left"
        onClick={() => nudge(-1)}
        aria-label="Scroll left"
      >
        <Chevron dir="left" />
      </button>

      <div
        className={`gallery-track ${grabbing ? "grabbing" : ""}`}
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {[...images, ...images].map((img, i) => (
          <button
            type="button"
            className="gallery-item"
            key={i}
            onClick={() => {
              // Ignore the click that ends a drag.
              if (dragDistance.current > DRAG_SLOP) return;
              onOpen(img);
            }}
            aria-label={`Enlarge ${img.alt}`}
          >
            <img src={img.src} alt={img.alt} loading="lazy" draggable="false" />
          </button>
        ))}
      </div>

      <button
        type="button"
        className="gallery-arrow right"
        onClick={() => nudge(1)}
        aria-label="Scroll right"
      >
        <Chevron dir="right" />
      </button>
    </div>
  );
};

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
        <p>
          Moments from our events, reunions and campus life. Drag or use the
          arrows to browse, and click any photo to view it in full.
        </p>
      </div>

      <div className="gallery-wall">
        {rows.map((rowImgs, r) => (
          <GalleryRow
            key={r}
            images={rowImgs}
            reverse={r % 2 === 1}
            onOpen={setActive}
          />
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
