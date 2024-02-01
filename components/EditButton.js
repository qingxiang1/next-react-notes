import Link from 'next/link';

const EditButton = ({ noteId, children }) => {

  const isDraft = noteId === null;

  return (
    <Link href={`/note/edit/${noteId || ""}`} className="link--unstyled">
      <button
        className={
          [
            "edit-button",
            isDraft ? "edit-button--solid" : "edit-button--outline",
          ].join(" ")
        }
        role="menuitem"
      >
        {children}
      </button>
    </Link>
  );
};

export default EditButton;