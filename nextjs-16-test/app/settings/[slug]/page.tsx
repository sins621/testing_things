export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${slug}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  const json = await res.json();
  return <div>My Post: {JSON.stringify(json)}</div>;
}
