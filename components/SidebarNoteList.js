// import dayjs from 'dayjs';
import { getAllNotes } from "@/utils/prisma";
import SidebarNoteItemHeader from "@/components/SidebarNoteItemHeader";
import SidebarNoteListFilter from "@/components/SidebarNoteListFilter";

/**
 * 笔记列表
 */

const SidebarNoteList = async () => {
  // const { notes } = props;
  // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  // await sleep(1000);

  const notes = await getAllNotes();

  const arr = Object.entries(notes);

  if (!arr.length) {
    return <div className="notes-empty">No notes created yet!</div>;
  }

  // return (
  //   <ul className="notes-list">
  //     {arr.map(([noteId, content]) => {
  //       const note = JSON.parse(content);
  //       // const { title, updateTime } = JSON.parse(content);

  //       return (
  //         <li key={noteId}>
  //           <SidebarNoteItem noteId={noteId} note={note} />
  //         </li>
  //       );
  //     })}
  //   </ul>
  // );
  // return <SidebarNoteListFilter notes={arr} />;
  return (
    <SidebarNoteListFilter
      notes={arr.map(([noteId, note]) => {
        const noteData = JSON.parse(note);
        return {
          noteId,
          note: noteData,
          header: (
            <SidebarNoteItemHeader
              title={noteData.title}
              updateTime={noteData.updateTime}
            />
          ),
        };
      })}
    />
  );
};

export default SidebarNoteList;