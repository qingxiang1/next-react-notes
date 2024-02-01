"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useTranslation } from "@/app/i18n/client.js";

function Spinner({ active = true }) {
  return (
    <div
      className={["spinner", active && "spinner--active"].join(" ")}
      role="progressbar"
      aria-busy={active ? "true" : "false"}
    />
  );
}

const SidebarSearchField = ({ lng }) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { t } = useTranslation(lng, "basic");

  function handleSearch(term) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="search" role="search">
      <input
        id="sidebar-search-input"
        placeholder={t('search')}
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isPending} />
    </div>
  );
};

export default SidebarSearchField;
