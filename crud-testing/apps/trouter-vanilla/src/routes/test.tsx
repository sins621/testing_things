import { createFileRoute } from "@tanstack/react-router";
import { Button } from "ui-shadcn-core/components/button";

export const Route = createFileRoute("/test")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Button>Hello</Button>;
}
