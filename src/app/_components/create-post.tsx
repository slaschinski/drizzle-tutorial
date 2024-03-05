"use client";

import { useState } from "react";
import { handlePost } from "./handle-post";

export function CreatePost({
  categories,
}: {
  categories: { name: string | null; value: number }[] | null;
}) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(1);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handlePost(name, categoryId)
          .then(() => {
            location.reload();
          })
          .catch((e) => console.log(e));
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <select
        className="text-black"
        onChange={(event) => {
          setCategoryId(parseInt(event.currentTarget.value));
        }}
      >
        {categories ? (
          categories.map((category) => {
            return (
              <option key={category.value} value={category.value}>
                {category.name}
              </option>
            );
            //return <p key={category.value}>{category.name}</p>;
          })
        ) : (
          <option value={0}>No category available</option>
        )}
      </select>
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
      >
        Submit
      </button>
    </form>
  );
}
