"use strict";
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"}[char]));
const safeUrl = (value) => {
  try { const url = new URL(value, window.location.href); return ["http:", "https:"].includes(url.protocol) ? url.href : null; } catch { return null; }
};
const visual = (kind) => kind === "quant"
  ? '<div class="quant-sketch"><span class="sketch-title">PORTFOLIO RESEARCH</span><svg viewBox="0 0 320 150"><path class="chart-grid" d="M25 15V128H305 M25 40H305 M25 70H305 M25 100H305"/><path class="chart-band" d="M25 108L65 83L105 91L145 57L185 67L225 33L265 42L305 17L305 68L265 85L225 75L185 102L145 91L105 120L65 119L25 126Z"/><path class="chart-line" d="M25 118L65 101L105 105L145 75L185 87L225 54L265 63L305 40"/></svg><span class="math-note">E[R] − λ · risk</span></div>'
  : kind === "operations"
  ? '<div class="crm-sketch"><div class="crm-bar"><i></i><i></i><i></i><span>workspace</span></div><div class="crm-body"><aside><b>◈</b><span></span><span></span><span></span></aside><div class="crm-main"><span class="sketch-title">PROSPECT OVERVIEW</span><div class="crm-tiles"><div>Prospects<b>▰ ▰ ▱</b></div><div>Follow-ups<b>▰ ▱ ▱</b></div></div><div class="crm-table"><span>Company</span><span>Next step</span><i></i><em>Follow up</em><i></i><em>Demo</em><i></i><em>Contact</em></div></div></div></div>'
  : kind === "language"
  ? '<div class="model-sketch"><div>prompt</div><span>→</span><div>model</div><span>→</span><div class="model-output">output</div></div><div class="eval-sketch"><span>factuality</span><i></i><span>relevance</span><i></i><span>fluency</span><i></i></div>'
  : kind === "vision"
  ? '<div class="image-sketch"><span>image</span><div class="pixel-food" aria-hidden="true">◒</div><span>256 × 256</span></div><span class="sketch-arrow">→</span><div class="prediction-sketch">prediction<br><strong>food / non-food</strong></div>'
  : '<div class="car-sketch" aria-hidden="true"><svg viewBox="0 0 200 100"><path d="M25 61 L40 36 L116 36 L145 59 L177 62 L183 78 L17 78 L19 64 Z"/><circle cx="50" cy="78" r="13"/><circle cx="151" cy="78" r="13"/><path d="M49 43 L44 57 L128 57 L110 43 Z"/></svg></div><span class="classifier-label">pixels → representation → class</span>';

const list = document.querySelector("#project-list");
if (list) {
  const categoryOrder = {vision: 0, llm: 1, platform: 2};
  list.innerHTML = [...PORTFOLIO_PROJECTS].sort((a,b) => categoryOrder[a.category] - categoryOrder[b.category]).map((project, index) => {
    const href = project.href && safeUrl(project.href);
    return `<article class="project" data-category="${escapeHtml(project.category)}">
      <div class="project-visual ${escapeHtml(project.visual)}" aria-hidden="true">${visual(project.visual)}</div>
      <div class="project-copy"><p class="eyebrow">${escapeHtml(project.kind)}</p><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.summary)}</p><ul class="tags" aria-label="Technologies">${project.tags.map(tag=>`<li>${escapeHtml(tag)}</li>`).join("")}</ul>
      <details><summary>Read project notes <span aria-hidden="true">+</span></summary><div class="project-notes"><h4>Context</h4><p>${escapeHtml(project.context)}</p><h4>My contribution</h4><p>${escapeHtml(project.contribution)}</p><h4>Approach</h4><p>${escapeHtml(project.approach)}</p><h4>Scope & limitations</h4><p>${escapeHtml(project.limitation)}</p><p class="minor">${escapeHtml(project.source)}</p>${href ? `<a class="text-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">View source code ↗</a>` : ""}</div></details></div>
    </article>`;
  }).join("");
  document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    const category = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach(other => other.setAttribute("aria-pressed", String(other === button)));
    let count = 0;
    list.querySelectorAll(".project").forEach(project => { project.hidden = category !== "all" && project.dataset.category !== category; if (!project.hidden) count++; });
    document.querySelector("#filter-status").textContent = `${count} project${count === 1 ? "" : "s"} shown`;
  }));
}
const writing = document.querySelector("#writing-list");
const blogSketch = (post) => post.title.includes("Git:")
  ? '<svg viewBox="0 0 160 100"><path d="M30 15V85M30 35C110 35 115 40 115 65M115 65C115 85 30 70 30 85"/><circle cx="30" cy="20" r="6"/><circle cx="30" cy="50" r="6"/><circle cx="30" cy="80" r="6"/><circle cx="115" cy="60" r="6"/></svg>'
  : post.title.includes("Classifier")
  ? '<svg viewBox="0 0 160 100"><rect x="15" y="20" width="55" height="60" rx="4"/><path d="M20 70L38 45L50 60L60 50L65 70M82 50H103M97 44L103 50L97 56"/><circle cx="53" cy="35" r="5"/><rect x="115" y="25" width="25" height="10"/><rect x="115" y="45" width="30" height="10"/><rect x="115" y="65" width="20" height="10"/></svg>'
  : post.title.includes("Bash")
  ? '<svg viewBox="0 0 160 100"><rect x="15" y="15" width="130" height="70" rx="5"/><path d="M15 30H145M30 45L40 52L30 59M48 59H70M30 72H105"/><circle cx="26" cy="23" r="2"/><circle cx="35" cy="23" r="2"/></svg>'
  : '<svg viewBox="0 0 160 100"><path d="M55 22L35 50L55 78M105 22L125 50L105 78M89 18L72 82"/><circle cx="12" cy="50" r="3"/><circle cx="148" cy="50" r="3"/></svg>';
if (writing && PORTFOLIO_WRITING.length) {
  const posts = PORTFOLIO_WRITING.filter(post => safeUrl(post.href));
  writing.innerHTML = posts.map(post => `<article class="writing-row"><time datetime="${escapeHtml(post.date)}">${escapeHtml(post.date)}</time><div class="writing-copy"><h3><a href="${escapeHtml(safeUrl(post.href))}" target="_blank" rel="noopener noreferrer">${escapeHtml(post.title)}</a></h3><p>${escapeHtml(post.summary)}</p><a class="text-link" href="${escapeHtml(safeUrl(post.href))}" target="_blank" rel="noopener noreferrer">Read more on Medium ↗</a></div><a class="blog-thumbnail" href="${escapeHtml(safeUrl(post.href))}" target="_blank" rel="noopener noreferrer" aria-label="Read ${escapeHtml(post.title)} on Medium"><span aria-hidden="true">${blogSketch(post)}</span></a></article>`).join("");
  document.querySelector("#writing-empty").hidden = posts.length > 0;
}
document.querySelectorAll("#year").forEach(element => { element.textContent = new Date().getFullYear(); });
document.querySelector("#print-cv")?.addEventListener("click", () => window.print());

// Decorative motion is progressive enhancement; content never depends on it.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const motionTargets = document.querySelectorAll(".site-header, .hero, .section, .contact-section, .project");
const entranceAnimations = new Map();
const titleResets = new Map();
let motionObserver;

document.querySelectorAll("#intro-title em, .section h2, .contact-section h2, .project h3").forEach(title => {
  const text = title.textContent;
  const effect = text === "Elie-Andre." ? "typing" : text === "German car classifier" ? "car" : text === "Quant" ? "formula" : text === "Leapmind OS" ? "gear" : "binary";
  title.classList.add("interactive-title");
  title.dataset.titleEffect = effect;
  const original = document.createElement("span");
  original.className = "title-base";
  while (title.firstChild) original.append(title.firstChild);
  const overlay = document.createElement("span");
  overlay.className = "title-effect";
  overlay.setAttribute("aria-hidden", "true");
  title.append(original, overlay);
  if (effect === "gear") {
    title.setAttribute("aria-label", text);
    const teeth = Array.from({length:32}, (_, i) => {
      const angle = (i / 32) * Math.PI * 2;
      const radius = i % 4 < 2 ? 44 : 34;
      return `${i ? "L" : "M"}${50 + Math.cos(angle) * radius},${50 + Math.sin(angle) * radius}`;
    }).join("") + "Z";
    original.innerHTML = `Leapmind <span class="gear-slot"><span class="gear-letter">O</span><span class="gear-icon" aria-hidden="true"><svg class="title-gear" viewBox="0 0 100 100"><path d="${teeth}"/><circle cx="50" cy="50" r="17"/></svg></span></span>S`;
  }
  let timer = 0;
  let frame = 0;
  let glyphs = [];
  let pointer;
  // Keep each title's digits stable; only their reveal follows the pointer.
  const binaryDigits = effect === "binary" ? Array.from(text, () => Math.random() < .5 ? "0" : "1") : [];
  const allowed = () => !reducedMotion.matches && finePointer.matches && !document.hidden && !title.closest(".motion-offscreen");
  const reset = () => {
    clearTimeout(timer);
    cancelAnimationFrame(frame);
    timer = 0;
    frame = 0;
    glyphs = [];
    title.classList.remove("title-active");
    overlay.replaceChildren();
  };
  titleResets.set(title, reset);
  const measureGlyphs = () => {
    const range = document.createRange();
    const node = original.firstChild;
    const box = title.getBoundingClientRect();
    const result = [];
    let offset = 0;
    let firstTop;
    for (const character of text) {
      range.setStart(node, offset);
      range.setEnd(node, offset + character.length);
      const rect = range.getBoundingClientRect();
      firstTop ??= rect.top;
      result.push({character, x:rect.left - box.left, y:rect.top - firstTop,
        width:rect.width, centerX:rect.left + rect.width / 2, centerY:rect.top + rect.height / 2});
      offset += character.length;
    }
    return result;
  };
  const paintLocal = () => {
    if (!allowed()) { reset(); return; }
    const size = parseFloat(getComputedStyle(title).fontSize);
    glyphs.forEach(glyph => {
      const distance = Math.hypot(pointer.x - glyph.centerX, pointer.y - glyph.centerY);
      const blend = glyph.character.trim() ? Math.max(0, Math.min(1, (size * .9 - distance) / (size * .65))) : 0;
      glyph.element.style.setProperty("--glyph-blend", blend.toFixed(3));
      // Swap one crisp layer at a time; hysteresis prevents edge flicker.
      const replaced = glyph.element.classList.contains("glyph-replaced");
      glyph.element.classList.toggle("glyph-replaced", blend >= (replaced ? .25 : .45));
      glyph.blend = blend;
    });
  };
  const move = event => {
    if (!title.classList.contains("title-active") || !["binary", "formula"].includes(effect)) return;
    pointer = {x:event.clientX, y:event.clientY};
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = 0; paintLocal(); });
  };
  const start = event => {
    if (!allowed() || title.classList.contains("title-active")) return;
    title.classList.add("title-active");
    if (["binary", "formula", "typing"].includes(effect)) {
      glyphs = measureGlyphs();
      glyphs.forEach((glyph, index) => {
        const cell = document.createElement("span");
        cell.className = effect === "typing" ? "typing-glyph" : "local-glyph";
        cell.style.left = glyph.x + "px";
        cell.style.top = glyph.y + "px";
        cell.style.width = glyph.width + "px";
        glyph.element = cell;
        if (effect === "typing") {
          cell.textContent = glyph.character;
        } else {
          const letter = document.createElement("span");
          letter.className = "glyph-original";
          letter.textContent = glyph.character;
          const replacement = document.createElement("span");
          replacement.className = effect === "formula" ? "formula-symbol" : "binary-digit";
          replacement.textContent = effect === "formula" ? [..."∑x²−λ"][index % 5] : binaryDigits[index];
          if (effect === "formula") replacement.dataset.tone = index % 2 ? "green" : "black";
          else replacement.dataset.digit = replacement.textContent;
          cell.append(letter, replacement);
          glyph.replacement = replacement;
        }
        overlay.append(cell);
      });
    }
    if (effect === "binary" || effect === "formula") {
      const box = title.getBoundingClientRect();
      pointer = event && Number.isFinite(event.clientX) ? {x:event.clientX, y:event.clientY} : {x:box.left + box.width / 2, y:box.top + box.height / 2};
      paintLocal();
    } else if (effect === "typing") {
      const caret = document.createElement("span");
      caret.className = "typing-caret";
      overlay.append(caret);
      let index = 0;
      const typeNext = () => {
        if (!allowed()) { reset(); return; }
        const glyph = glyphs[index++];
        glyph.element.classList.add("typed");
        caret.style.left = (glyph.x + glyph.width) + "px";
        caret.style.top = (glyph.y + parseFloat(getComputedStyle(title).fontSize) * .13) + "px";
        if (index < glyphs.length) timer = setTimeout(typeNext, 90);
        else { caret.hidden = true; timer = 0; }
      };
      typeNext();
    } else if (effect === "car") {
      // A low, boxy JDM-inspired coupe: rear wing, long bonnet and spoke wheels.
      overlay.innerHTML = '<span class="title-car"><svg viewBox="0 0 240 80"><path class="car-body" d="M8 50L25 45L54 22Q58 18 67 18H126L155 40L208 44L229 54V67H8Z"/><path class="car-wing" d="M9 32H42V38H9ZM18 36H22V48H18"/><path class="car-window" d="M63 25H89V40H42ZM96 25H123L144 40H96Z"/><path class="car-trim" d="M17 53H220M107 46H120M191 48H221M15 61H224"/><g class="car-wheel"><circle cx="49" cy="64" r="14"/><path d="M49 54V74M39 64H59M42 57L56 71M42 71L56 57"/></g><g class="car-wheel"><circle cx="188" cy="64" r="14"/><path d="M188 54V74M178 64H198M181 57L195 71M181 71L195 57"/></g></svg></span>';
      title.style.setProperty("--car-travel", title.clientWidth + "px");
    }
  };
  title.addEventListener("pointerenter", start);
  title.addEventListener("pointermove", move, {passive:true});
  title.addEventListener("pointerleave", reset);
  title.addEventListener("pointercancel", reset);
  // Decorative hover text never replaces the accessible heading or handles clicks.
  title.addEventListener("focusin", start);
  title.addEventListener("focusout", reset);
});

document.querySelectorAll(".chart-line").forEach(path => path.setAttribute("pathLength", "1"));
if ("IntersectionObserver" in window) {
  const entered = new WeakSet();
  motionObserver = new IntersectionObserver(entries => {
    entries.forEach(({target, isIntersecting}) => {
      target.classList.toggle("motion-offscreen", !isIntersecting);
      if (!isIntersecting) {
        entranceAnimations.get(target)?.cancel();
        titleResets.forEach((reset, title) => { if (target === title || target.contains(title)) reset(); });
      }
      if (!isIntersecting || entered.has(target) || target.classList.contains("project") || target.classList.contains("site-header") || reducedMotion.matches) return;
      entered.add(target);
      if (document.hidden) return;
      const animation = target.animate([{opacity:0, transform:"translateY(10px)"}, {opacity:1, transform:"translateY(0)"}],
        {duration:450, easing:"cubic-bezier(.22,.61,.36,1)"});
      entranceAnimations.set(target, animation);
      animation.finished.catch(() => {}).finally(() => entranceAnimations.delete(target));
    });
  }, {threshold:0.08});
  motionTargets.forEach(target => motionObserver.observe(target));
}
const syncMotion = () => {
  document.documentElement.classList.toggle("motion-paused", document.hidden || reducedMotion.matches);
  if (document.hidden || reducedMotion.matches || !finePointer.matches) titleResets.forEach(reset => reset());
  if (document.hidden || reducedMotion.matches) entranceAnimations.forEach(animation => animation.cancel());
};
document.addEventListener("visibilitychange", syncMotion);
reducedMotion.addEventListener("change", syncMotion);
finePointer.addEventListener("change", syncMotion);
window.addEventListener("resize", () => titleResets.forEach(reset => reset()));
syncMotion();
