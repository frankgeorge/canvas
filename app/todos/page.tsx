import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function TodosPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from("todos").select();

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Todos</h1>
      <ul className="space-y-2">
        {todos?.map((todo: { id: string; name: string }) => (
          <li key={todo.id} className="flex items-center gap-2 py-2 border-b border-[#EAE7DF]">
            {todo.name}
          </li>
        ))}
        {(!todos || todos.length === 0) && (
          <li className="text-[#9A9A93] py-4">No todos yet. Create a todos table in Supabase to get started.</li>
        )}
      </ul>
    </div>
  );
}
