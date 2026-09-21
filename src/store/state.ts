import { atom } from "jotai";

export interface Repository {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  created_at: string;
  pushed_at: string;
  updated_at: string;
}

export interface RepositoryWithLanguages extends Repository {
  languages: Record<string, number>;
}

export const languagesAtom = atom<string[]>([]);

export const repositoriesAtom = atom<Repository[]>([]);

export const portfolioAtom = atom<RepositoryWithLanguages[]>([]);
