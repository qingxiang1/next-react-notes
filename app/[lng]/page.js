import { useTranslation } from "@/app/i18n/index";
export default async function Home({ params: { lng } }) {

  const { t } = await useTranslation(lng);

  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">{t("initText")}</span>
    </div>
  );
}
