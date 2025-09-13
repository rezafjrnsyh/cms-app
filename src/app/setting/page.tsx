"use client";

import RequireAuth from "@/components/require-auth";
import { useEffect, useMemo, useState } from "react";
import { useCmsStore } from "@/store/use-cms-store";

export default function SettingsPage() {
  const { groups, removeGroup, renameGroup, addGroup, load } = useCmsStore();

  const [gName, setGName] = useState("");
  const [editingGroup, setEditingGroup] = useState<{id: string, name: string} | null>(null);

  const [selectedGroup, setSelectedGroup] = useState<string>("");

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
                  {editingGroup?.id === g.id ? (
                    <>
                      <input
                        className="border px-2 py-1 text-sm"
                        value={editingGroup.name}
                        onChange={(e) =>
                          setEditingGroup({
                            ...editingGroup,
                            name: e.target.value,
                          })
                        }
                      />
                      <button
                        className="text-sm rounded bg-gray-900 px-2 py-1 text-white"
                        onClick={() => {
                          renameGroup(g.id, editingGroup.name);
                          setEditingGroup(null);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="text-sm rounded px-2 py-1 hover:bg-gray-100"
                        onClick={() => setEditingGroup(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="font-medium">{g.name}</span>
                      <button
                        className="text-xs rounded px-2 py-1 hover:bg-gray-100"
                        onClick={() =>
                          setEditingGroup({ id: g.id, name: g.name })
                        }
                      >
                        Rename
                      </button>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeGroup(g.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </RequireAuth>
  );
}
