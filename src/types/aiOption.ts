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

export interface ISubjectContent {
  subtitle: string;
  content: string;
}

export interface ISubjectData {
  status: string;
  data: ISubjectContent[];
  message: string | null;
}
