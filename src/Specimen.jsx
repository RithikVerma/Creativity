import React, { useEffect, useRef } from "react";

// Build a folded tube from cross-sections and draw the farthest faces first.
function makeMesh() {
  const count = 88,
    sides = 22,
    rings = [];
  const center = (t) => {
    const r = 1.35 + 0.26 * Math.cos(3 * t + 0.3);
    return [r * Math.cos(t), r * Math.sin(t), 0.62 * Math.sin(2 * t + 0.7)];
  };
  const normalize = (v) => v.map((n) => n / Math.hypot(...v));
  const cross = (a, b) => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
  for (let i = 0; i < count; i++) {
    const t = (i * 2 * Math.PI) / count,
      c = center(t),
      next = center(t + 0.001);
    const tangent = normalize(next.map((n, k) => n - c[k]));
    const n = normalize(cross(tangent, [0, 0, 1])),
      b = cross(tangent, n);
    rings.push(
      Array.from({ length: sides }, (_, j) => {
        const a = (j * 2 * Math.PI) / sides,
          radius = 0.48 + 0.09 * Math.cos(t * 3);
        return c.map(
          (v, k) => v + radius * (Math.cos(a) * n[k] + Math.sin(a) * b[k]),
        );
      }),
    );
  }
  return rings;
}

const mesh = makeMesh();
export default function Specimen() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const draw = (offset = 0) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2),
        w = canvas.clientWidth,
        h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      const rx = 0.68,
        ry = -0.4,
        rz = -0.4 + offset;
      const pts = mesh.map((ring) =>
        ring.map(([x, y, z]) => {
          const a = y * Math.cos(rx) - z * Math.sin(rx),
            b = y * Math.sin(rx) + z * Math.cos(rx);
          const c = x * Math.cos(ry) + b * Math.sin(ry),
            depth = -x * Math.sin(ry) + b * Math.cos(ry);
          const scale = Math.min(w / 4.35, h / 3.8);
          return [
            w / 2 + (c * Math.cos(rz) - a * Math.sin(rz)) * scale,
            h / 2 + (c * Math.sin(rz) + a * Math.cos(rz)) * scale,
            depth,
          ];
        }),
      );
      const faces = [];
      pts.forEach((ring, i) =>
        ring.forEach((p, j) => {
          const next = pts[(i + 1) % pts.length],
            k = (j + 1) % ring.length;
          const vertices = [p, next[j], next[k], ring[k]];
          faces.push({
            vertices,
            z: vertices.reduce((sum, v) => sum + v[2], 0) / 4,
          });
        }),
      );
      faces.sort((a, b) => a.z - b.z);
      ctx.fillStyle = "#f8f8f1";
      ctx.strokeStyle = "#282921";
      ctx.lineWidth = 0.7;
      ctx.lineJoin = "round";
      for (const { vertices } of faces) {
        ctx.beginPath();
        vertices.forEach(([x, y], k) =>
          k ? ctx.lineTo(x, y) : ctx.moveTo(x, y),
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    };
    const observer = new ResizeObserver(() => draw());
    observer.observe(canvas);
    const move = (e) => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const r = canvas.getBoundingClientRect();
        draw(((e.clientX - r.left) / r.width - 0.5) * 0.38);
      }
    };
    const reset = () => draw();
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", reset);
    return () => {
      observer.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", reset);
    };
  }, []);
  return (
    <div className="specimen" aria-hidden="true">
      <i className="crosshair tl" />
      <i className="crosshair tr" />
      <canvas ref={ref} />
      <div className="figure-label">
        FIG. 01 <span>/</span> TOROIDAL STUDY
      </div>
      <i className="crosshair bl" />
      <i className="crosshair br" />
    </div>
  );
}
