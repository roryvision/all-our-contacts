interface Error {
  status?: number;
}

interface Contact {
  FN: string;
  LN?: string | null;
  TEL: number;
}

interface ContactResponse {
  id: number;
  created_at: string;
  first_name: string;
  last_name?: string | null;
  phone: number;
  group_id: string;
}
