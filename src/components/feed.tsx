import { api } from "~/utils/api";
import Loader from "./loader";
import PostView from "./postView";

function Feed() {
  const { data, isLoading: tweetsLoading } = api.posts.getAll.useQuery();

  if (tweetsLoading) return <Loader />;

  if (!data) return <div>Something went super wrong!</div>;

  return (
    <div className="flex grow flex-col overflow-y-scroll">
      {data?.map((fullPost) => (
        <PostView key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
}

export default Feed;
