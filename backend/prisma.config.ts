import "dotenv/config";
import { defineConfig, env } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Migrations MUST use the Direct URL to bypass Supabase's pooler
    url: env("DIRECT_URL"),
  },
  
});