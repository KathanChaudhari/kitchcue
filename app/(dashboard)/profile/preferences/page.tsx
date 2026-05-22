import { MobileHeader } from "@/components/global/MobileHeader";
import { PreferencesForm } from "@/components/profile/PreferencesForm";

export default function PreferencesPage() {
  return (
    <>

      <div className="mx-auto mt-6 w-full max-w-4xl space-y-4 pb-24 lg:pb-8">
        

        <PreferencesForm />
      </div>
    </>
  );
}