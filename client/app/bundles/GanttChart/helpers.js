export function parseGanttChartProps (props) {

}

/*
 * Returns the
 */
export function calcDragTickSize (x, startDate) {
  return x(addHours(startDate, 1))
}

/*
 * Adds one hour to a date
 */
export function addHours (date, numHours) {
  return new Date(date.getTime() + numHours * 60 * 60 * 1000)
}

export function toDate (s) { 
  return new Date(s)
}

export function parseTasks (tasks) {
  return tasks.sort((t1, t2) => {
    return t1.start - t2.start
  }).reverse().map((task) => {
    task.start = new Date(task.start)
    task.end = new Date(task.end)

    return task
  })
}

