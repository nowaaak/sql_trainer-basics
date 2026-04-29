export interface TableColumn {
  name: string
  type: string
  pk?: boolean
  fk?: boolean
}

export interface SchemaTable {
  name: string
  columns: TableColumn[]
}

export interface Schema {
  tables: SchemaTable[]
}

export interface ValidationConfig {
  requiredKeywords: string[]
  optionalKeywords?: string[]
  forbiddenKeywords?: string[]
  hints?: string[]
  multipleJoins?: boolean
}

export interface ExerciseTranslation {
  title: string
  description: string
  hints?: string[]
  explanation?: string
}

export type ExerciseTranslationMap = Partial<Record<number, ExerciseTranslation>>

export type Category = 'ddl' | 'dml' | 'dql' | 'joins'
export type JoinType = 'inner' | 'left' | 'right' | 'advanced'
export type Difficulty = 1 | 2 | 3

export interface Exercise {
  id: number
  category: Category
  joinType?: JoinType
  title: string
  difficulty: Difficulty
  description: string
  schema: Schema | null
  validation: ValidationConfig
  tags?: string[]
  explanation?: string
}

export interface FeedbackState {
  type: 'success' | 'error' | 'warning'
  title: string
  message: string
  hints?: string[]
}

export interface TrainerState {
  currentExercise: Exercise | null
  currentCategory: Category | 'all'
  currentJoinType: JoinType | null
  userSQL: string
  feedback: FeedbackState | null
  currentHints: string[]
  hintLevel: number
  showSuccessModal: boolean
}
