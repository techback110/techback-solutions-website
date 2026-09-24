import { SettingsForm } from "@/components/admin/forms";
import { PageTitle } from "@/components/admin/shell";
import { getSettings } from "@/lib/data";

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <>
      <PageTitle title="Settings" description="Contact details and page copy used across the website." />
      <SettingsForm settings={settings} />
    </>
  );
}
