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
};
