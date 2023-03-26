import dayjs from "dayjs";
import Image from "next/image";
import { RouterOutputs } from "~/utils/api";

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

function PostView({ post, author }: PostWithUser) {
  return (
    <div
      key={post.id}
      className="flex items-center gap-3 border-b border-slate-400 p-4"
    >
      <Image
        src={author.profilePicture}
        alt={`@${author.username}'s profile picture`}
        className="rounded-full"
        width={48}
        height={48}
      />
      <div className="flex flex-col gap-1">
        <span className="font-roboto text-sm font-bold text-slate-300">
          @{author.username}{" "}
          <span className="text-gray-500">
            • {dayjs(post.createdAt).fromNow()}
          </span>
        </span>
        <span>{post.content}</span>
      </div>
    </div>
  );
}

export default PostView;
