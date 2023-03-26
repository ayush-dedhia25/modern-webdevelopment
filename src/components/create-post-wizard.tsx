import { useUser } from "@clerk/nextjs";

function CreatePostWizard() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex w-full gap-4">
      <img
        src={user.profileImageUrl}
        alt="Profile Image"
        className="h-14 w-14 rounded-full object-cover"
      />
      <input
        type="text"
        placeholder="Type some emojis here..."
        className="bg-transparent outline-none"
      />
    </div>
  );
}

export default CreatePostWizard;
