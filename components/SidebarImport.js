"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function SidebarImport() {

  const router = useRouter();

  const onChange = async (e) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("something went wrong");
        return;
      }

      const data = await response.json();
      router.push(`/note/${data.uid}`);
      router.refresh();
    } catch (error) {
      console.error("something went wrong");
    }

    // 重置 file input
    e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <form method="post" encType="multipart/form-data">
      <div style={{ textAlign: "center" }}>
        <label htmlFor="file" style={{ cursor: "pointer" }}>
          Import .md File
        </label>
        <input
          type="file"
          id="file"
          name="file"
          multiple
          style={{ position: "absolute", clipPath: "rect(0 0 0 0)" }}
          onChange={onChange}
          accept=".md"
        />
      </div>
    </form>
  );
}
