import LoadingTest from "./_components/json-test";
import { Suspense } from "react";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <Suspense fallback={<div>Loading</div>}>
            <LoadingTest slug={slug} />
        </Suspense>
    );
}
