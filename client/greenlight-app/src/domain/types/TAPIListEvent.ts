export type TListEventAPIResponse = {
  _id?: string;
  categoriaId?: string;
  titulo?: string;
  local?: string;
  data?: string;
  tempo?: string;
  fotoBase64?: string;
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
  participantes?: {
    _id: string;
    usuarioId: string;
    descricao: string;
    data: Date;
    nome: string;
    email: string;
    fotoBase64: string;
  }[];
};

export type TListEventCountAPIResponse = {
  error: boolean;
  length: number;
  data: number;
};
