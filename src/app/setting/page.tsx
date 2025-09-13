"use client";

import RequireAuth from "@/components/require-auth";
import { useEffect, useMemo, useState } from "react";
import { useCmsStore } from "@/store/use-cms-store";

export default function SettingsPage() {
  const { groups, menus, addGroup, load } = useCmsStore();

  const [gName, setGName] = useState("");

  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [mName, setMName] = useState("");
  const [mPath, setMPath] = useState("");
  const [editingMenu, setEditingMenu] = useState<{
    id: string;
    name: string;
    path: string;
  } | null>(null);

  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    if (!selectedGroup && groups.length) setSelectedGroup(groups[0].id);
  }, [groups, selectedGroup]);

  //   const menusByGroup = useMemo(() => {
  //     const map: Record<string, typeof menus> = {};
  //     for (const g of groups) map[g.id] = [];
  //     for (const m of menus) (map[m.groupId] ??= []).push(m);
  //     return map;
  //   }, [groups, menus]);

  return (
    <RequireAuth>
      <section className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Settings</h1>
          {/* <button
          onClick={clearAll}
          className="text-sm rounded bg-red-600 px-3 py-1 text-white hover:opacity-90"
          title="Hapus semua data lokal"
        >
          Clear All
        </button> */}
        </div>

        {/* MENU GROUPS */}
        <div className="grid gap-4 rounded-lg border bg-white p-4">
          <h2 className="text-lg font-medium">Menu Groups</h2>

          {/* Add group */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (gName.trim()) {
                addGroup(gName);
                setGName("");
              }
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              className="w-full border px-3 py-2"
              placeholder="New group name"
              value={gName}
              onChange={(e) => setGName(e.target.value)}
            />
            <button className="rounded bg-gray-900 px-4 py-2 text-white hover:opacity-90">
              Add Group
            </button>
          </form>

          {/* List groups */}
          <ul className="grid gap-2">
            {groups.length === 0 && (
              <li className="text-sm text-gray-500">No groups yet.</li>
            )}
            {groups.map((g) => (
              <li
                key={g.id}
                className="flex items-center justify-between rounded border px-3 py-2"
              >
                <div className="flex items-center gap-3">
                    <>
                        <span className="font-medium">{g.name}</span>
                    </>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </RequireAuth>
  );
}
