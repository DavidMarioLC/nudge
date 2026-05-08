ALTER TABLE "tasks" DROP CONSTRAINT "tasks_project_id_projects_id_fk";--> statement-breakpoint
ALTER TABLE "projects" DROP CONSTRAINT "projects_pkey";--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "id" SET DATA TYPE uuid USING "id"::uuid;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_pkey";--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "id" SET DATA TYPE uuid USING "id"::uuid;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "project_id" SET DATA TYPE uuid USING "project_id"::uuid;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;