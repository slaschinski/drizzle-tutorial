import { eq } from "drizzle-orm";
import test from "node:test";
import { CreatePost } from "~/app/_components/create-post";
import { db } from "~/server/db";
import { categories, postTags, posts, tags } from "~/server/db/schema";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Drizzle <span className="text-[hsl(280,100%,70%)]">Tutorial</span>
        </h1>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const fetchedPostsWithCategories = await db
    .select()
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .leftJoin(postTags, eq(posts.id, postTags.postId))
    .leftJoin(tags, eq(postTags.tagId, tags.id));

  const categoriesFromDb = await db
    .select({
      name: categories.name,
      value: categories.id,
    })
    .from(categories);

  return (
    <div className="w-full max-w-xs">
      <div className="mb-2">
        {fetchedPostsWithCategories.length > 0 ? (
          fetchedPostsWithCategories.map((postWithCategory) => {
            return (
              <p key={postWithCategory.post.id} className="truncate">
                {postWithCategory.post.name} - {postWithCategory.category?.name}{" "}
                - {postWithCategory.tag?.name ?? "No tag"}
              </p>
            );
          })
        ) : (
          <p>You have no posts yet.</p>
        )}
      </div>

      <CreatePost categories={categoriesFromDb} />
    </div>
  );
}
