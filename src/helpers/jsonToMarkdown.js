function generateTitleOfFolder(folder) {
  return `\n## ${folder}\n`
}
function generateStatusOfTask(task) {
  return task.isReady ? '[+]' : '[ ]'
}
function generateTaskItem(task) {
  const isReady = generateStatusOfTask(task)
  const isFavourite = task.isFavourite ? '(!)' : ''
  if (isFavourite) {
    return `- ${isReady} ${isFavourite} ${task.text}\n`
  }
  return `- ${isReady} ${task.text}\n`
}
function generateSubtaskItem(subtask) {
  const isReady = generateStatusOfTask(subtask)
  return `  - ${isReady} ${subtask.text}\n`
}
function generateDate() {
  const formatter = Intl.DateTimeFormat(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return formatter.format(new Date())
}

export function jsonToMarkdown() {
  const folders = JSON.parse(localStorage.getItem('folders'))
  let result = `Дата создания: ${generateDate()}\n`
  for (const [folder, tasks] of folders) {
    result += generateTitleOfFolder(folder)
    if (tasks.length) result += '\n'
    for (const task of tasks) {
      result += generateTaskItem(task)
      for (const subtask of task.subtasks) {
        result += generateSubtaskItem(subtask)
      }
    }
  }
  return result
}

export function downloadMarkdownAsFile(markdownContent, filename) {
  const element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(markdownContent)
  )
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
