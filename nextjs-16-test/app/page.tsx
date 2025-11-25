import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <span>Test</span>
      <Link prefetch={true} href="/settings/3">
        Preload
      </Link>
    </div>
  );
}
