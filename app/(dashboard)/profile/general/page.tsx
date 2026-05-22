import { MobileHeader } from "@/components/global/MobileHeader";
import { GeneralProfileForm } from "@/components/profile/GeneralProfileForm";

export default function GeneralProfilePage() {
  return (
    <>

      <div className="mx-auto mt-6 w-full max-w-3xl space-y-4 pb-24 lg:pb-8">
      
        <GeneralProfileForm />
      </div>
    </>
  );
}