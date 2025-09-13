"use client";

import RequireAuth from "@/components/require-auth";
import { useEffect, useMemo, useState } from "react";
import { useCmsStore } from "@/store/use-cms-store";
import { TrashIcon, PlusIcon, PencilIcon } from "@heroicons/react/24/solid";

export default function SettingsPage() {
  const { groups, menus, removeGroup, renameGroup, addGroup, 
    addMenu, removeMenu, load, renameMenu, clearAll } =
    useCmsStore();

  const [gName, setGName] = useState("");
  const [editingGroup, setEditingGroup] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [mName, setMName] = useState("");
  const [mPath, setMPath] = useState("");
  const [editingMenu, setEditingMenu] = useState<{id: string, name: string, path: string} | null>(null);

  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    if (!selectedGroup && groups.length) setSelectedGroup(groups[0].id);
  }, [groups, selectedGroup]);

  const menusByGroup = useMemo(() => {
    const map: Record<string, typeof menus> = {};
    for (const g of groups) map[g.id] = [];
    for (const m of menus) (map[m.groupId] ??= []).push(m);
    return map;
  }, [groups, menus]);

  return (
    <RequireAuth>
      <section className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <button
          onClick={clearAll}
          className="text-sm rounded bg-red-600 px-3 py-1 text-white hover:opacity-90"
          title="Hapus semua data lokal"
        >
          Clear All
        </button>
        </div>

        {/* MENU GROUPS */}
        <div className="grid gap-4 rounded-lg border bg-white p-4">
          <h2 className="text-lg font-medium">Groups</h2>

          {/* Add group */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (gName.trim()) {
                addGroup(gName);
                setGName("");
              }
            }}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <input
              className="w-full border px-3 py-2"
              placeholder="New group name"
              value={gName}
              onChange={(e) => setGName(e.target.value)}
            />
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-gray-50 p-2 hover:bg-gray-100">
              <PlusIcon className="h-5 w-7 text-gray-700"/>
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
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                        className="text-sm text-gray-600 hover:underline"
                        onClick={() =>
                          setEditingGroup({ id: g.id, name: g.name })
                        }
                      >
                      <PencilIcon className="h-5 w-5" />
                      </button>
                  <button
                    onClick={() => removeGroup(g.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* MENUS */}
        <div className="grid gap-4 rounded-lg border bg-white p-4">
          <h2 className="text-lg font-medium">Menus</h2>

          {/* Add / Edit menu */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!selectedGroup) return;
              if (editingMenu) {
              renameMenu(editingMenu.id, mName || editingMenu.name, mPath || editingMenu.path);
              setEditingMenu(null); setMName(""); setMPath(""); return;
            }
              if (mName.trim() && mPath.trim()) {
                addMenu(selectedGroup, mName, mPath);
                setMName("");
                setMPath("");
              }
            }}
            className="grid gap-3 md:grid-cols-4"
          >
            <select
              className="border px-3 py-2"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
              {groups.length === 0 && <option value="">No groups</option>}
            </select>
            <input
              className="border px-3 py-2"
              placeholder="Menu name"
              value={mName}
              onChange={(e) => setMName(e.target.value)}
            />
            <input
              className="border px-3 py-2"
              placeholder="Path e.g. /home"
              value={mPath}
              onChange={(e) => setMPath(e.target.value)}
            />
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-gray-50 p-2 hover:bg-gray-100">
              <PlusIcon className="h-4 w-4 text-gray-700"/>
            </button>
          </form>
        </div>

        {/* Menus by group */}
        <div className="grid gap-4 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.id} className="rounded border">
              <div className="border-b bg-gray-50 px-3 py-2 font-medium">
                {g.name}
              </div>
              <ul className="p-3">
                {(menusByGroup[g.id] ?? []).length === 0 && (
                  <li className="text-sm text-gray-500">
                    No menus in this group.
                  </li>
                )}
                {(menusByGroup[g.id] ?? []).map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center justify-between border-b py-2 last:border-b-0"
                  >
                    <div>
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-gray-500">{m.path}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => { setEditingMenu(m); setMName(m.name); setMPath(m.path); setSelectedGroup(m.groupId); }}
                        className="text-sm text-gray-600 hover:underline"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => removeMenu(m.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {groups.length === 0 && (
            <p className="text-sm text-gray-500">
              Create a group first to add menus.
            </p>
          )}
        </div>
      </section>
    </RequireAuth>
  );
}
