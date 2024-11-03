export interface IDocumentData {
  title: string;
  subject: string;
  detailSubject?: string;
  age: number;
  groupSize: string;
  activityType: string;
  activityGoal?: string[];
  activityTool?: string[];
  precautions?: string[];
  evaluationCriteria?: string[];
  activityContent?: IActivityContent[];
  nuriCurriculum?: INuriCurriculum;
  attachments?: IAttachment[];
  images?: string[];
}

interface IActivityContent {
  subtitle: string; // 활동 부제목
  content: string; // 활동 내용 설명
}

interface INuriCurriculum {
  [category: string]: {
    [detail: string]: string[];
  };
}

interface IAttachment {
  url: string; // 파일 URL
  fileName: string; // 파일 이름
  type?: string; // 파일 유형
}
