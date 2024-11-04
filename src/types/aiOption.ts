export interface IOption {
  name: string;
  value: string;
  image?: string;
}

export interface IAnswers {
  age: string;
  groupSize: string;
  theme: string;
  category: string;
}

export interface ISelectedAnswers {
  age: number;
  groupSize: string;
  subject: string;
  activityType: string;
}
