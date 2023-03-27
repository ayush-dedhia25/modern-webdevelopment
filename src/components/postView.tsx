import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { RouterOutputs } from "~/utils/api";

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

function PostView({ post, author }: PostWithUser) {
  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-400 p-4">
      <Image
        src={author.profilePicture}
        alt={`@${author.username}'s profile picture`}
        className="rounded-full"
        width={48}
        height={48}
      />
      <div className="flex flex-col">
        <Link href={`/@${author.username}`}>
          <span className="font-roboto text-sm font-bold text-slate-300">
            @{author.username}{" "}
          </span>
        </Link>
        <Link href={`/tweet/${post.id}`}>
          <span className="font-thin text-gray-500">
            • {dayjs(post.createdAt).fromNow()}
          </span>
        </Link>
      </div>
      <span className="text-2xl">{post.content}</span>
    </div>
  );
}

export default PostView;
