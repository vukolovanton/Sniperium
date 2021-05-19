export type SnippetTypes = "code" | "text";

export interface Snippet {
  id: string;
  type: SnippetTypes;
  content: string;
}
