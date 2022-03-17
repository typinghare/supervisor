export interface Task {
  id: number,
  status: number,
  startTime: string | null,
  lastResumeTime: string | null,
  endTime: string | null,
  duration: number | null,
  comment: string,
  createTime: string,
  taskTypeName: string,
  expectedDuration: number
  taskTypeIntro: string,
  subjectName: string
}