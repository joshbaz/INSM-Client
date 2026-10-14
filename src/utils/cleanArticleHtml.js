import DOMPurify from "dompurify";

// Only the formatting the blog editor supports; everything else (styles, classes, layout) is dropped
const ALLOWED_TAGS = ["p", "h1", "h2", "h3", "strong", "b", "em", "i", "u", "a", "ul", "ol", "li", "blockquote", "br", "img"];
const ALLOWED_ATTR = ["href", "src", "alt"];

const BLOCK_SELECTOR = "div, p, h1, h2, h3, h4, h5, h6, ul, ol, li, blockquote, table, section, article";

// Pasted pages (and the editor itself on Enter) wrap content in <div>s. A div holding only inline
// content becomes a paragraph; a div wrapping other blocks is unwrapped so its blocks are kept.
const normalizeDivs = (root) => {
  const divs = [...root.querySelectorAll("div")].reverse(); // innermost first
  for (const div of divs) {
    if (div.querySelector(BLOCK_SELECTOR)) {
      div.replaceWith(...div.childNodes);
    } else {
      const p = document.createElement("p");
      p.append(...div.childNodes);
      div.replaceWith(p);
    }
  }
};

// Only h1–h3 are styled on the site, so fold smaller headings into h3
const normalizeHeadings = (root) => {
  for (const heading of root.querySelectorAll("h4, h5, h6")) {
    const h3 = document.createElement("h3");
    h3.append(...heading.childNodes);
    heading.replaceWith(h3);
  }
};

export const cleanArticleHtml = (html) => {
  if (!html) return "";

  const template = document.createElement("template");
  template.innerHTML = DOMPurify.sanitize(html); // strip scripts/handlers before touching the DOM
  normalizeDivs(template.content);
  normalizeHeadings(template.content);

  return DOMPurify.sanitize(template.innerHTML, { ALLOWED_TAGS, ALLOWED_ATTR });
};

const escapeHtml = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Paste handler for contentEditable editors: inserts cleaned HTML, or plain text as paragraphs
export const handleCleanPaste = (e, onChange) => {
  e.preventDefault();

  const html = e.clipboardData.getData("text/html");
  const text = e.clipboardData.getData("text/plain");

  const cleaned = html
    ? cleanArticleHtml(html)
    : text
        .split(/\n{2,}/)
        .map((para) => `<p>${escapeHtml(para).replace(/\n/g, "<br>")}</p>`)
        .join("");

  document.execCommand("insertHTML", false, cleaned);
  onChange(e.currentTarget.innerHTML);
};
