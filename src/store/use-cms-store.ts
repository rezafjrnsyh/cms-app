"use client";

import { create } from "zustand";
import { Menu, MenuGroup } from "@/types/cms";

type CmsState = {
  groups: MenuGroup[];
  menus: Menu[];
  addGroup: (name: string) => void;
  removeGroup: (id: string) => void;
  renameGroup: (id: string, name: string) => void;
  addMenu: (groupId: string, name: string, path: string) => void;
  removeMenu: (id: string) => void;
  load: () => void;
};

const STORAGE_KEY = "cms-state-v1";

function persist(next: { groups: MenuGroup[]; menus: Menu[] }) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
}

export const useCmsStore = create<CmsState>((set, get) => ({
  groups: [],
  menus: [],
  load: () => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        set({ groups: parsed.groups ?? [], menus: parsed.menus ?? [] });
        return;
      } catch {}
    }
    // seed awal
    const seed = {
      groups: [
        { id: "g-1", name: "Main" },
        { id: "g-2", name: "Admin" },
      ],
      menus: [
        { id: "m-1", name: "Dashboard", path: "/home", groupId: "g-1" },
        { id: "m-2", name: "Users", path: "/settings", groupId: "g-2" },
      ],
    };
    persist(seed);
    set(seed);
  },
  addGroup: (name) => {
    const g: MenuGroup = { id: crypto.randomUUID(), name: name.trim() };
    const next = { groups: [...get().groups, g], menus: get().menus };
    persist(next); set(next);
  },
  removeGroup: (id) => {
    const next = {
      groups: get().groups.filter((g) => g.id !== id),
      menus: get().menus.filter((m) => m.groupId !== id),
    };
    persist(next); set(next);
  },
  renameGroup: (id, name) => {
    const next = {
      groups: get().groups.map((g) => (g.id === id ? { ...g, name: name.trim() } : g)),
      menus: get().menus,
    };
    persist(next); set(next);
  },
  addMenu: (groupId, name, path) => {
    const m: Menu = { id: crypto.randomUUID(), name: name.trim(), path: path.trim(), groupId };
    const next = { groups: get().groups, menus: [...get().menus, m] };
    persist(next); set(next);
  },
  removeMenu: (id) => {
    const next = { groups: get().groups, menus: get().menus.filter((m) => m.id !== id) };
    persist(next); set(next);
  },
}));