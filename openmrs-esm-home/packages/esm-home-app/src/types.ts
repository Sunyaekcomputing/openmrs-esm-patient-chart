// types.ts
export interface Patient {
    uuid: string;
    display: string;
    identifiers?: {
      display: string;
    }[];
    person?: {
      display: string;
      gender: string;
      age: number;
    };
  }
  