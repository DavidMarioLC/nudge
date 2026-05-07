import { eq } from "drizzle-orm";
import { db } from "@/db/index";
import { projects } from "@/db/schema";

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export class ProjectsService {
	async findAll(): Promise<Project[]> {
		return db.select().from(projects);
	}
	async findAllByUser(user_id: string): Promise<Project[]> {
		return db.select().from(projects).where(eq(projects.user_id, user_id));
	}
	async findById(id: string): Promise<Project> {
		const [result] = await db
			.select()
			.from(projects)
			.where(eq(projects.id, id))
			.limit(1);

		return result;
	}
	async create(data: NewProject): Promise<Project> {
		const [result] = await db.insert(projects).values(data).returning();
		return result;
	}
	async createByUser(user_id: string, data: NewProject): Promise<Project> {
		const [result] = await db
			.insert(projects)
			.values({ ...data, user_id })
			.returning();
		return result;
	}
	async update(id: string, data: NewProject): Promise<Project> {
		const [result] = await db
			.update(projects)
			.set(data)
			.where(eq(projects.id, id))
			.returning();

		return result;
	}
	async remove(id: string): Promise<void> {
		await db.delete(projects).where(eq(projects.id, id));
	}
}
