// // WorksList.tsx
// import React, { useMemo } from "react";
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";

// type Work = {
//   id: string;
//   title: string;
//   description: string;
//   form: string;
//   wordCount: number;
//   pageCount: number;
//   genre: string;
//   fileName: string;
//   manuscriptIsVisible: boolean;
// };

// const fetchWorks = async (): Promise<Work[]> => {
//   const res = await fetch("http://localhost:3000/api/works");
//   if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
//   return res.json();
// };

// const updateWork = async ({
//   id,
//   manuscriptIsVisible,
// }: {
//   id: string;
//   manuscriptIsVisible: boolean;
// }): Promise<Work> => {
//   const res = await fetch(`http://localhost:3000/api/works/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ manuscriptIsVisible }),
//   });
//   if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
//   return res.json();
// };

// export function ReactQuery() {
//   const queryClient = useQueryClient();

//   // Fetch works
//   const { data: works, isLoading, error } = useQuery({
//     queryKey: ["works"],
//     queryFn: fetchWorks,
//     staleTime: 1000 * 60, // 1 minute cache
//   });

//   // Mutation for toggling manuscriptIsVisible
//   const mutation = useMutation({
//     mutationFn: updateWork,
//     onMutate: async ({ id, manuscriptIsVisible }) => {
//       // Cancel any ongoing refetches
//       await queryClient.cancelQueries({ queryKey: ["works"] });

//       // Snapshot previous value
//       const prevWorks = queryClient.getQueryData<Work[]>(["works"]);

//       // Optimistically update cache
//       queryClient.setQueryData<Work[]>(["works"], (old) =>
//         old?.map((w) =>
//           w.id === id ? { ...w, manuscriptIsVisible } : w
//         ) ?? []
//       );

//       // Rollback context
//       return { prevWorks };
//     },
//     onError: (_err, _vars, context) => {
//       // Roll back on error
//       if (context?.prevWorks) {
//         queryClient.setQueryData(["works"], context.prevWorks);
//       }
//     },
//     onSettled: () => {
//       // Revalidate after mutation
//       queryClient.invalidateQueries({ queryKey: ["works"] });
//     },
//   });

//   if (isLoading) return <p>Loading works…</p>;
//   if (error) return <p style={{ color: "crimson" }}>{String(error)}</p>;
//   if (!works?.length) return <p>No works found.</p>;

//   return (
//     <ul style={{ listStyle: "none", padding: 0 }}>
//       {works.map((w) => (
//         <li
//           key={w.id}
//           style={{
//             border: "1px solid #ddd",
//             borderRadius: 8,
//             padding: 12,
//             marginBottom: 8,
//           }}
//         >
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <strong>{w.title}</strong>
//             <button
//               onClick={() =>
//                 mutation.mutate({
//                   id: w.id,
//                   manuscriptIsVisible: !w.manuscriptIsVisible,
//                 })
//               }
//             >
//               {w.manuscriptIsVisible ? "Hide manuscript" : "Show manuscript"}
//             </button>
//           </div>

//           <small>
//             {w.form} • {w.genre} • {w.pageCount} pages ({w.wordCount} words)
//           </small>

//           {w.manuscriptIsVisible && (
//             <div style={{ marginTop: 8 }}>
//               <em>Manuscript preview would render here…</em>
//             </div>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// }

// // Wrap your app at the root level (index.tsx or App.tsx)
// const queryClient = new QueryClient();

// export function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ReactQuery />
//     </QueryClientProvider>
//   );
// }
