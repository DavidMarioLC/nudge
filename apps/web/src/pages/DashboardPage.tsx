import { useSession } from "@/lib/auth-client";

export default function DashboardPage() {
	const { data } = useSession();
	const username = data?.user.name;
	return (
		<section>
			<h2 className="font-semibold text-4xl">Welcome, {username}!</h2>
		</section>
	);
}
