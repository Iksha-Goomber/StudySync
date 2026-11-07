export type Task = {
  id: string; title: string; subject: string; type: "Assignment"|"Quiz"|"Exam"|"Study";
  dueDate: string; difficulty: number; hours: number; completed: boolean; notes?: string;
};
export function priorityScore(task: Task, now = new Date()) {
  const due = new Date(task.dueDate + "T23:59:00");
  const days = Math.max(0, (due.getTime()-now.getTime())/86400000);
  const urgency = days <= 0 ? 100 : Math.max(0, 100 - days*12);
  const difficulty = task.difficulty * 10;
  const effort = Math.min(100, task.hours * 12);
  return Math.round(urgency*.55 + difficulty*.3 + effort*.15);
}
export function makeSchedule(tasks: Task[], availableHours: number) {
  const pending = tasks.filter(t=>!t.completed).sort((a,b)=>priorityScore(b)-priorityScore(a));
  let remaining = Math.max(0, availableHours);
  return pending.map(t=>{
    const allocated = Math.min(t.hours, remaining);
    remaining = Math.max(0, remaining-allocated);
    return {...t, allocated, score:priorityScore(t)};
  }).filter(t=>t.allocated>0);
}
export function todayISO(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
