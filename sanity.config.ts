"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "isla-thrifts",
  title: "Isla Thrifts Studio",
  // defineConfig requires a non-empty projectId at module-load time. The Studio page
  // short-circuits to a setup screen when projectId is missing, so this placeholder
  // is never actually used to fetch anything.
  projectId: projectId || "placeholder",
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
