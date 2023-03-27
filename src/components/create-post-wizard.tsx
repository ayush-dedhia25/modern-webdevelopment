import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import Loader from "./loader";

function CreatePostWizard() {
  const { user } = useUser();
  const [tweet, setTweet] = useState("");
  const ctx = api.useContext();
  const { mutate, isLoading: isTweeting } = api.posts.create.useMutation({
    onSuccess: () => {
      setTweet("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e: any) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to tweet! Try again later");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full gap-4">
      <Image
        src={user.profileImageUrl}
        alt="Profile Image"
        className="h-14 w-14 rounded-full object-cover"
        width={56}
        height={56}
      />
      <input
        type="text"
        placeholder="Type some emojis here..."
        className="grow bg-transparent outline-none"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (tweet !== "") {
              mutate({ content: tweet });
            }
          }
        }}
        disabled={isTweeting}
      />
      {tweet !== "" && !isTweeting && (
        <button
          type="button"
          onClick={(e) => mutate({ content: tweet })}
          disabled={isTweeting}
        >
          Post
        </button>
      )}
      {isTweeting && <Loader size={4} fill="white" inline />}
    </div>
  );
}

export default CreatePostWizard;
