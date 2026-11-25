import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/report.$id.tsx
var $$splitComponentImporter = () => import("./report._id-DJUZ3YFS.js");
var Route = createFileRoute("/report/$id")({
	head: () => ({ meta: [
		{ title: "Report workspace — Capstone Report Generator" },
		{
			name: "description",
			content: "Template-based Capstone Project Report generator for SIMATS Engineering with individualized submissions and technical figures."
		},
		{
			property: "og:title",
			content: "Capstone report workspace"
		},
		{
			property: "og:description",
			content: "Generate, review and export individualized capstone project reports chapter by chapter."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
