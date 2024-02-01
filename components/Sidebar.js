/**
 * 笔记列表 Sidebar
 */
import React, { Suspense } from "react";
import Link from 'next/link';
// import { getAllNotes } from '@/utils/prisma';
import SidebarNoteList from "@/components/SidebarNoteList";
import EditButton from '@/components/EditButton';
import NoteListSkeleton from "@/components/NoteListSkeleton";
import SidebarSearchField from "@/components/SidebarSearchField";
import SidebarImport from "@/components/SidebarImport";
import { useTranslation } from '@/app/i18n/index';

// 为 SidebarNoteList 添加 Suspense 以及 fallback UI NoteListSkeleton
const Sidebar = async ({ lng }) => {
  // const notes = await getAllNotes();

  const { t } = await useTranslation(lng);

  return (
    <>
      <section className="col sidebar">
        <Link href={"/"} className="link--unstyled">
          <section className="sidebar-header">
            <img
              className="logo"
              src="../logo.svg"
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
            <strong>{t("note-title")}</strong>
          </section>
        </Link>

        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField />
          <EditButton noteId={null}>{t("new")}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList
            // notes={notes}
            />
          </Suspense>
        </nav>
        <SidebarImport />
      </section>
    </>
  );
};

export default Sidebar;
