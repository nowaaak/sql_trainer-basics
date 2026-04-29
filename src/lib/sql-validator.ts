import type { ValidationConfig } from '@/data/types'
import type { Dict } from '@/lib/i18n'

export interface ValidationResult {
  isCorrect: boolean
  message: string
}

type ValidationMessages = Dict['trainer']['validation']

export function validateSQL(
  userSQL: string,
  validation: ValidationConfig,
  messages: ValidationMessages,
): ValidationResult {
  if (!userSQL.trim()) {
    return { isCorrect: false, message: messages.emptyQuery }
  }

  const syntaxError = checkBasicSyntax(userSQL, messages)
  if (syntaxError) {
    return { isCorrect: false, message: syntaxError }
  }

  const upperSQL = userSQL.toUpperCase()

  if (validation.forbiddenKeywords) {
    for (const keyword of validation.forbiddenKeywords) {
      if (upperSQL.includes(keyword.toUpperCase())) {
        return {
          isCorrect: false,
          message: messages.forbiddenKeyword,
        }
      }
    }
  }

  const missing: string[] = []
  for (const keyword of validation.requiredKeywords) {
    const isCaseSensitive = keyword.includes('.') || keyword.includes('@')
    const found = isCaseSensitive
      ? userSQL.includes(keyword)
      : upperSQL.includes(keyword.toUpperCase())
    if (!found) missing.push(keyword)
  }

  if (missing.length > 0) {
    return { isCorrect: false, message: buildMissingHint(missing, messages) }
  }

  if (validation.multipleJoins) {
    const joinCount = (upperSQL.match(/\bJOIN\b/g) ?? []).length
    if (joinCount < 2) {
      return {
        isCorrect: false,
        message: messages.multipleJoins,
      }
    }
  }

  return { isCorrect: true, message: '' }
}

function checkBasicSyntax(sql: string, messages: ValidationMessages): string | null {
  const upper = sql.toUpperCase().trim()

  if (upper.startsWith('SELECT') && !upper.includes('FROM')) {
    return messages.selectNeedsFrom
  }
  if (upper.includes('UPDATE') && !upper.includes('SET')) {
    return messages.updateNeedsSet
  }
  if (upper.includes('INSERT') && !upper.includes('VALUES') && !upper.includes('SELECT')) {
    return messages.insertNeedsValuesOrSelect
  }

  const openParens = (sql.match(/\(/g) ?? []).length
  const closeParens = (sql.match(/\)/g) ?? []).length
  if (openParens !== closeParens) {
    return messages.unbalancedParens
  }

  const quotes = (sql.match(/'/g) ?? []).length
  if (quotes % 2 !== 0) {
    return messages.unclosedQuotes
  }

  return null
}

function buildMissingHint(missingKeywords: string[], messages: ValidationMessages): string {
  const commands = new Set(['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP'])
  const clauses = new Set(['FROM', 'WHERE', 'SET', 'INTO', 'VALUES', 'ON', 'JOIN', 'LEFT', 'RIGHT', 'INNER'])
  const functions = new Set(['COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'YEAR'])

  const hints: string[] = []

  const upper = missingKeywords.map(k => k.toUpperCase())

  if (upper.some(k => commands.has(k))) {
    hints.push(messages.missingCommand)
  }
  if (upper.some(k => ['JOIN', 'LEFT', 'RIGHT', 'INNER'].includes(k))) {
    hints.push(messages.missingJoin)
  } else if (upper.includes('WHERE')) {
    hints.push(messages.missingWhere)
  } else if (upper.includes('ON')) {
    hints.push(messages.missingOn)
  } else if (upper.some(k => clauses.has(k))) {
    hints.push(messages.missingClause)
  }
  if (upper.some(k => functions.has(k))) {
    hints.push(messages.missingAggregate)
  }
  if (missingKeywords.some(k => /^\d+$/.test(k))) {
    hints.push(messages.missingNumbers)
  }

  return hints.length > 0
    ? hints.join(' ')
    : messages.incomplete
}
