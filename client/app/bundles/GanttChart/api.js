/*
 * Saves an array of tasks for the current chart
 */
export function saveGanttChart (tasks) {
  const url = String(window.location.pathname)

  console.log(url)

  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify({ tasks }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    return res.json()
  })
}
