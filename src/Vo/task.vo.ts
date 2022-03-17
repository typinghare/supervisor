export default interface TaskVo {
  id: number;

  status: number;

  startTime: string;

  lastResumeTime: string;

  endTime: string;

  duration: number;

  comment: string;

  createTime: string;

  taskTypeName: string;

  expectedDuration: number;

  taskTypeIntro: string;

  subjectName: string;
}