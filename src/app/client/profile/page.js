import ProfileInfo from "./profile-info";
import ChangePassword from "./password-change";

export default async function UserProfile() {
  const user = {};

  return (
    <div className="container mx-auto p-5">
      <h1 className="mb-5 text-2xl font-bold md:text-3xl">Votre profil</h1>

      <div className="grid grid-cols-2 gap-5">
        <ProfileInfo user={user} />
        <ChangePassword />
      </div>
    </div>
  );
}
