import { Note } from './note';

export interface FetchNotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}
