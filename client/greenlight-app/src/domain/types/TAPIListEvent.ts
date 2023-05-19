export type TListEventAPIResponse = {
  _id?: string;
  categoriaId?: string;
  titulo?: string;
  local?: string;
  data?: string;
  tempo?: string;
  fotoB64?: string;
  usuario?: {
    _id: string;
    nome: string;
    email: string;
    senha: string;
    data: string;
    token: string;
  };
  categoria?: {
    _id: string;
    titulo: string;
    data: string;
  };
  participantes?: any[];
};

export type TListEventCountAPIResponse = {
  error: boolean;
  length: number;
  data: number;
};
