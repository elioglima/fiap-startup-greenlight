export type TAddEvent = {
  usuarioId: string;
  categoriaId: string;
  title: string;
  date: string;
  time: string;
  location: string;
};

export type TAddEventReturn = {
  error: boolean;
  length: number;
  data: any;
};
