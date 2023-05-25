export type TListItemsParticipants = {
  id: string;
  usuarioId: string;
  description: string;
  photoBase64: string;
  date: Date;
  mail: string;
  name: string;
};

export type TListItems = {
  id: string;
  title: string;
  date: Date;
  timeStart: string;
  photoBase64: string;
  local: string;
  category: {
    id: string;
    description: string;
  };
  participants: TListItemsParticipants[];
};
