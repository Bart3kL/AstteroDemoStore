type ExtractVariables<T> = T extends { variables: object } ? T["variables"] : never;

export async function fetchGraphQL<T>({
	query,
	variables,
}: {
	query: string;
	variables?: ExtractVariables<T>;
}) {
	try {
		const response = await fetch(
			`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
				},
				body: JSON.stringify({
					...(query && { query }),
					...(variables && { variables }),
				}),
				next: {
					revalidate: 1,
				},
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data.data;
	} catch (e) {
		console.error("Failed to fetch GraphQL data:", e);
		throw e;
	}
}
