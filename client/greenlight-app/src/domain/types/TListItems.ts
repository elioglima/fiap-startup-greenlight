export type TListItems = {
  id: string;
  title: string;
  date: Date;
  timeStart: string;
  photoDataBase64: string;
  category: {
    id: string;
    description: string;
  };
};
