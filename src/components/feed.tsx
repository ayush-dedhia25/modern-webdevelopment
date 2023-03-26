import { api } from "~/utils/api";
import Loader from "./loader";
import PostView from "./postView";

function Feed() {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <Loader />;

  if (!data) return <div>Something wen't super wrong!</div>;

  return (
    <div>
      {data?.map((fullPost) => (
        <PostView key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
}

export default Feed;
