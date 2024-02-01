import { marked } from "marked";
// html clean 工具，可设置允许的标签及属性，不允许的不会进行解析
import sanitizeHtml from "sanitize-html";

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  "img",
  "h1",
  "h2",
  "h3",
]);
const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ["alt", "src"],
  }
);

const NotePreview = ({ children }) => {
  return (
    <div className="note-preview">
      <div
        className="text-with-markdown"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(marked(children || ""), {
            allowedTags,
            allowedAttributes,
          }),
        }}
      />
    </div>
  );
};

export default NotePreview;