"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod"; // 数据校验工具

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, "请填写内容").max(1000, "字数最多 1000"),
});

/**
 * 新增笔记
 * @param {*} noteId
 * @param {*} title
 * @param {*} body
 */
export async function saveNote(prevState, formData) {
  // 获取noteId
  const noteId = formData.get("noteId");

  const data = {
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date(),
  };

  // 校验数据
  const validated = schema.safeParse(data);

  if (!validated.success) {
    return {
      errors: validated.error.issues,
    };
  }

  // 更新数据库
  if (noteId) {
    updateNote(noteId, JSON.stringify(data));
    revalidatePath("/", "layout");
    redirect(`/note/${noteId}`);
  } else {
    const res = await addNote(JSON.stringify(data));
    revalidatePath("/", "layout");
    redirect(`/note/${res}`);
  }

  // return { message: `Add Success!` };
}

/**
 * 删除笔记
 * @param {*} noteId
 */
export async function deleteNote(prevState, formData) {
  const noteId = formData.get("noteId");

  delNote(noteId);
  revalidatePath("/", "layout");
  redirect("/");
}
