class SQLTrainer {
    constructor() {
        this.currentExercise = null;
        this.currentCategory = 'all';
        this.completedExercises = this.loadProgress();
        this.hintLevel = 0;
        this.currentJoinType = null;

        this.init();
    }

    init() {
        this.bindEvents();
        this.renderExerciseList();
        this.updateProgress();
    }

    bindEvents() {
        document.getElementById('categoryTabs').addEventListener('click', (e) => {
            const btn = e.target.closest('.tab-btn');
            if (btn) {
                this.setCategory(btn.dataset.category);
            }
        });

        document.getElementById('exerciseList').addEventListener('click', (e) => {
            const item = e.target.closest('.exercise-item');
            if (item) {
                if (item.dataset.joinType) {
                    if (this.currentCategory !== 'joins') {
                        this.setCategory('joins');
                    }
                    this.setJoinType(item.dataset.joinType);
                } else if (item.dataset.id) {
                    this.loadExercise(parseInt(item.dataset.id));
                }
            }
        });

        document.getElementById('submitBtn').addEventListener('click', () => {
            this.validateSolution();
        });

        document.getElementById('clearBtn').addEventListener('click', () => {
            document.getElementById('sqlEditor').value = '';
            this.hideFeedback();
        });

        document.getElementById('showHintBtn').addEventListener('click', () => {
            this.showNextHint();
        });

        document.getElementById('nextExerciseBtn').addEventListener('click', () => {
            this.closeModal();
            this.loadNextExercise();
        });

        document.getElementById('prevExerciseBtn').addEventListener('click', () => {
            this.loadPreviousExercise();
        });

        document.getElementById('nextExerciseBtnInline').addEventListener('click', () => {
            this.loadNextExercise();
        });

        document.getElementById('resetProgress').addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Fortschritt wirklich zurücksetzen?')) {
                this.resetProgress();
            }
        });

        document.getElementById('sqlEditor').addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.validateSolution();
            }
        });

        document.getElementById('successModal').addEventListener('click', (e) => {
            if (e.target.id === 'successModal') {
                this.closeModal();
            }
        });
    }

    setCategory(category) {
        this.currentCategory = category;
        if (category !== 'joins') {
            this.currentJoinType = null;
        } else {
            this.currentJoinType = null;
            this.resetExerciseView('Wähle eine Join-Art', 'Wähle links eine Join-Art aus, um zu beginnen.');
        }

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });

        this.renderExerciseList();
    }

    resetExerciseView(title, message) {
        this.currentExercise = null;
        document.getElementById('exerciseTitle').textContent = title;
        document.getElementById('exerciseBadge').textContent = this.currentCategory.toUpperCase();
        document.getElementById('exerciseDescription').innerHTML = `<p>${message}</p>`;
        this.renderDifficulty(0);
        this.renderSchema(null);
        document.getElementById('sqlEditor').value = '';
        this.hideFeedback();
        this.updateExerciseNav();
    }

    getJoinTypeLabel(joinType) {
        const labels = {
            inner: 'INNER JOIN',
            left: 'LEFT JOIN',
            right: 'RIGHT JOIN',
            advanced: 'WEITERE JOINs'
        };
        return labels[joinType] || 'JOINs';
    }

    getJoinGroups() {
        const groups = {
            inner: [],
            left: [],
            right: [],
            advanced: []
        };

        exercises
            .filter(ex => ex.category === 'joins')
            .forEach(ex => {
                const type = ex.joinType || 'advanced';
                if (!groups[type]) {
                    groups[type] = [];
                }
                groups[type].push(ex);
            });

        return groups;
    }

    setJoinType(joinType) {
        this.currentJoinType = joinType;
        this.renderExerciseList();
        const filtered = this.getFilteredExercises();
        if (filtered.length > 0) {
            this.loadExercise(filtered[0].id);
        }
    }

    getFilteredExercises() {
        if (this.currentCategory === 'all') {
            return exercises;
        }
        if (this.currentCategory === 'joins') {
            if (!this.currentJoinType) {
                return [];
            }
            return exercises.filter(ex => ex.category === 'joins' && ex.joinType === this.currentJoinType);
        }
        return exercises.filter(ex => ex.category === this.currentCategory);
    }

    renderExerciseList() {
        const list = document.getElementById('exerciseList');
        if (this.currentCategory === 'joins') {
            const groups = this.getJoinGroups();
            const order = ['inner', 'left', 'right', 'advanced'];
            list.innerHTML = order
                .filter(type => groups[type] && groups[type].length > 0)
                .map(type => {
                    const isActive = this.currentJoinType === type;
                    return `
                        <div class="exercise-item ${isActive ? 'active' : ''}" data-join-type="${type}">
                            <span class="exercise-item-text">${this.getJoinTypeLabel(type)}</span>
                            <span class="exercise-group-count">${groups[type].length} Aufgaben</span>
                        </div>
                    `;
                }).join('');
            return;
        }

        if (this.currentCategory === 'all') {
            const groups = this.getJoinGroups();
            const order = ['inner', 'left', 'right', 'advanced'];
            const nonJoinExercises = exercises.filter(ex => ex.category !== 'joins');
            const groupItems = order
                .filter(type => groups[type] && groups[type].length > 0)
                .map(type => {
                    const isActive = this.currentJoinType === type && this.currentCategory === 'joins';
                    return `
                        <div class="exercise-item ${isActive ? 'active' : ''}" data-join-type="${type}">
                            <span class="exercise-item-text">${this.getJoinTypeLabel(type)}</span>
                            <span class="exercise-group-count">${groups[type].length} Aufgaben</span>
                        </div>
                    `;
                });

            list.innerHTML = [
                ...nonJoinExercises.map(ex => {
                    const isCompleted = this.completedExercises.includes(ex.id);
                    const isActive = this.currentExercise?.id === ex.id;
                    return `
                        <div class="exercise-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}" data-id="${ex.id}">
                            <span class="exercise-item-text">${ex.title}</span>
                            <span class="exercise-item-category">${ex.category.toUpperCase()}</span>
                        </div>
                    `;
                }),
                ...groupItems
            ].join('');
            return;
        }

        const filtered = this.getFilteredExercises();

        list.innerHTML = filtered.map(ex => {
            const isCompleted = this.completedExercises.includes(ex.id);
            const isActive = this.currentExercise?.id === ex.id;

            return `
                <div class="exercise-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}" data-id="${ex.id}">
                    <span class="exercise-item-text">${ex.title}</span>
                    <span class="exercise-item-category">${ex.category.toUpperCase()}</span>
                </div>
            `;
        }).join('');
    }

    loadExercise(id) {
        const exercise = exercises.find(ex => ex.id === id);
        if (!exercise) return;

        this.currentExercise = exercise;
        this.hintLevel = 0;

        document.getElementById('exerciseTitle').textContent = exercise.title;
        if (exercise.category === 'joins' && exercise.joinType) {
            document.getElementById('exerciseBadge').textContent = this.getJoinTypeLabel(exercise.joinType);
        } else {
            document.getElementById('exerciseBadge').textContent = exercise.category.toUpperCase();
        }
        document.getElementById('exerciseDescription').innerHTML = exercise.description;

        this.renderDifficulty(exercise.difficulty);
        this.renderSchema(exercise.schema);
        this.updateExerciseNav();

        document.getElementById('sqlEditor').value = '';
        this.hideFeedback();
        this.renderExerciseList();
    }

    renderDifficulty(level) {
        const container = document.getElementById('difficultyBadge');
        const stars = [];
        for (let i = 1; i <= 3; i++) {
            stars.push(`<i class="${i <= level ? 'fas' : 'far'} fa-star"></i>`);
        }
        container.innerHTML = stars.join('');
    }

    renderSchema(schema) {
        const section = document.getElementById('schemaSection');
        const display = document.getElementById('schemaDisplay');

        if (!schema) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        display.innerHTML = schema.tables.map(table => `
            <div class="schema-table">
                <div class="schema-table-header">${table.name}</div>
                <div class="schema-table-columns">
                    ${table.columns.map(col => `
                        <div class="schema-column ${col.pk ? 'pk' : ''} ${col.fk ? 'fk' : ''}">
                            <span>${col.name}</span>
                            <span class="column-type">${col.type}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    validateSolution() {
        if (!this.currentExercise) {
            this.showFeedback('warning', 'Keine Übung ausgewählt', 'Bitte wähle zuerst eine Übung aus der Liste.');
            return;
        }

        const userSQL = document.getElementById('sqlEditor').value.trim();

        if (!userSQL) {
            this.showFeedback('warning', 'Leere Eingabe', 'Bitte gib eine SQL-Abfrage ein.');
            return;
        }

        const validation = this.currentExercise.validation;
        const result = this.checkSQL(userSQL, validation);

        if (result.isCorrect) {
            this.markAsCompleted(this.currentExercise.id);
            this.showSuccessModal();
        } else {
            this.showFeedback('error', 'Nicht ganz richtig', result.message, validation.hints);
        }
    }

    checkSQL(userSQL, validation) {
        const upperSQL = userSQL.toUpperCase();
        const normalizedSQL = this.normalizeSQL(userSQL);

        const syntaxErrors = this.checkBasicSyntax(userSQL);
        if (syntaxErrors) {
            return { isCorrect: false, message: syntaxErrors };
        }

        if (validation.forbiddenKeywords) {
            for (const keyword of validation.forbiddenKeywords) {
                if (upperSQL.includes(keyword.toUpperCase())) {
                    return {
                        isCorrect: false,
                        message: `Deine Abfrage enthält etwas, das hier nicht verwendet werden soll. Lies die Aufgabe nochmal genau.`
                    };
                }
            }
        }

        const missingRequired = [];
        for (const keyword of validation.requiredKeywords) {
            const keywordUpper = keyword.toUpperCase();
            const searchSQL = keyword.includes('.') || keyword.includes('@')
                ? userSQL
                : upperSQL;
            const searchKeyword = keyword.includes('.') || keyword.includes('@')
                ? keyword
                : keywordUpper;

            if (!searchSQL.includes(searchKeyword)) {
                missingRequired.push(keyword);
            }
        }

        if (missingRequired.length > 0) {
            const hints = this.generateMissingHints(missingRequired);
            return {
                isCorrect: false,
                message: hints
            };
        }

        if (validation.multipleJoins) {
            const joinCount = (upperSQL.match(/\bJOIN\b/g) || []).length;
            if (joinCount < 2) {
                return {
                    isCorrect: false,
                    message: 'Du brauchst mehrere JOINs um alle Tabellen zu verknüpfen.'
                };
            }
        }

        return { isCorrect: true };
    }

    checkBasicSyntax(sql) {
        const upper = sql.toUpperCase().trim();

        if (upper.startsWith('SELECT') && !upper.includes('FROM')) {
            return 'Eine SELECT-Abfrage benötigt eine FROM-Klausel.';
        }

        if (upper.includes('UPDATE') && !upper.includes('SET')) {
            return 'Ein UPDATE-Statement benötigt eine SET-Klausel.';
        }

        if (upper.includes('INSERT') && !upper.includes('VALUES') && !upper.includes('SELECT')) {
            return 'Ein INSERT-Statement benötigt VALUES oder SELECT.';
        }

        const openParens = (sql.match(/\(/g) || []).length;
        const closeParens = (sql.match(/\)/g) || []).length;
        if (openParens !== closeParens) {
            return 'Die Anzahl der öffnenden und schließenden Klammern stimmt nicht überein.';
        }

        const quotes = (sql.match(/'/g) || []).length;
        if (quotes % 2 !== 0) {
            return 'Es gibt nicht geschlossene Anführungszeichen in deiner Abfrage.';
        }

        return null;
    }

    normalizeSQL(sql) {
        return sql
            .replace(/\s+/g, ' ')
            .replace(/\s*,\s*/g, ',')
            .replace(/\s*=\s*/g, '=')
            .trim()
            .toUpperCase();
    }

    generateMissingHints(missingKeywords) {
        const categories = {
            commands: ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP'],
            clauses: ['FROM', 'WHERE', 'SET', 'INTO', 'VALUES', 'ON', 'JOIN', 'LEFT', 'RIGHT', 'INNER'],
            operators: ['AND', 'OR', 'LIKE', 'BETWEEN', 'IN'],
            functions: ['COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'YEAR'],
            keywords: ['TABLE', 'ADD', 'MODIFY', 'COLUMN', 'PRIMARY KEY', 'AUTO_INCREMENT']
        };

        const missing = {
            commands: [],
            clauses: [],
            operators: [],
            functions: [],
            keywords: [],
            other: []
        };

        for (const keyword of missingKeywords) {
            let found = false;
            for (const [category, words] of Object.entries(categories)) {
                if (words.includes(keyword.toUpperCase())) {
                    missing[category].push(keyword);
                    found = true;
                    break;
                }
            }
            if (!found) {
                missing.other.push(keyword);
            }
        }

        const hints = [];

        if (missing.commands.length > 0) {
            hints.push('Dir fehlt ein wichtiges SQL-Kommando.');
        }

        if (missing.clauses.length > 0) {
            if (missing.clauses.some(k => ['JOIN', 'LEFT', 'RIGHT', 'INNER'].includes(k.toUpperCase()))) {
                hints.push('Denke daran, wie du Tabellen verknüpfen kannst.');
            } else if (missing.clauses.includes('WHERE')) {
                hints.push('Wie filterst du bestimmte Datensätze?');
            } else if (missing.clauses.includes('ON')) {
                hints.push('Bei JOINs musst du angeben, welche Spalten verglichen werden.');
            } else {
                hints.push('Es fehlt eine wichtige Klausel in deiner Abfrage.');
            }
        }

        if (missing.operators.length > 0) {
            hints.push('Prüfe, welchen Operator du für die Bedingung brauchst.');
        }

        if (missing.functions.length > 0) {
            hints.push('Hast du an die richtige Aggregatfunktion gedacht?');
        }

        if (missing.other.length > 0) {
            if (missing.other.some(k => /^\d+$/.test(k))) {
                hints.push('Überprüfe die Zahlenwerte in deiner Abfrage.');
            } else {
                hints.push('Achte auf die Tabellen- und Spaltennamen.');
            }
        }

        return hints.length > 0
            ? hints.join(' ')
            : 'Deine Abfrage ist noch nicht vollständig. Vergleiche mit der Aufgabenstellung.';
    }

    showFeedback(type, title, message, hints = null) {
        const section = document.getElementById('feedbackSection');
        const card = document.getElementById('feedbackCard');
        const icon = document.getElementById('feedbackIcon');
        const titleEl = document.getElementById('feedbackTitle');
        const messageEl = document.getElementById('feedbackMessage');
        const hintsSection = document.getElementById('hintsSection');
        const hintText = document.getElementById('hintText');
        const showHintBtn = document.getElementById('showHintBtn');

        card.className = `feedback-card ${type}`;

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-circle'
        };
        icon.innerHTML = `<i class="fas ${icons[type]}"></i>`;

        titleEl.textContent = title;
        messageEl.textContent = message;

        if (hints && hints.length > 0 && type === 'error') {
            hintsSection.style.display = 'block';
            showHintBtn.style.display = 'inline-flex';
            hintText.style.display = 'none';
            this.currentHints = hints;
            this.hintLevel = 0;
        } else {
            hintsSection.style.display = 'none';
        }

        section.style.display = 'block';
    }

    showNextHint() {
        if (!this.currentHints || this.hintLevel >= this.currentHints.length) {
            return;
        }

        const hintText = document.getElementById('hintText');
        const showHintBtn = document.getElementById('showHintBtn');

        hintText.innerHTML = `<strong>Hinweis ${this.hintLevel + 1}:</strong> ${this.currentHints[this.hintLevel]}`;
        hintText.style.display = 'block';

        this.hintLevel++;

        if (this.hintLevel >= this.currentHints.length) {
            showHintBtn.style.display = 'none';
        } else {
            showHintBtn.innerHTML = `<i class="fas fa-lightbulb"></i> Weiterer Hinweis (${this.hintLevel + 1}/${this.currentHints.length})`;
        }
    }

    hideFeedback() {
        document.getElementById('feedbackSection').style.display = 'none';
    }

    showSuccessModal() {
        document.getElementById('successModal').classList.add('show');
    }

    closeModal() {
        document.getElementById('successModal').classList.remove('show');
    }

    loadNextExercise() {
        const filtered = this.getFilteredExercises();
        if (filtered.length === 0) {
            return;
        }
        const currentIndex = filtered.findIndex(ex => ex.id === this.currentExercise?.id);

        let nextIndex = currentIndex + 1;
        if (nextIndex >= filtered.length) {
            nextIndex = 0;
        }

        let attempts = 0;
        while (this.completedExercises.includes(filtered[nextIndex].id) && attempts < filtered.length) {
            nextIndex = (nextIndex + 1) % filtered.length;
            attempts++;
        }

        this.loadExercise(filtered[nextIndex].id);
    }

    loadPreviousExercise() {
        const filtered = this.getFilteredExercises();
        if (filtered.length === 0) {
            return;
        }
        const currentIndex = filtered.findIndex(ex => ex.id === this.currentExercise?.id);
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = filtered.length - 1;
        }
        this.loadExercise(filtered[prevIndex].id);
    }

    updateExerciseNav() {
        const nav = document.getElementById('exerciseNav');
        const navText = document.getElementById('exerciseNavText');
        if (this.currentCategory !== 'joins' || !this.currentJoinType || !this.currentExercise) {
            nav.style.display = 'none';
            return;
        }

        const filtered = this.getFilteredExercises();
        const index = filtered.findIndex(ex => ex.id === this.currentExercise.id);
        if (index === -1) {
            nav.style.display = 'none';
            return;
        }

        navText.textContent = `Aufgabe ${index + 1} / ${filtered.length}`;
        nav.style.display = 'flex';
    }

    markAsCompleted(id) {
        if (!this.completedExercises.includes(id)) {
            this.completedExercises.push(id);
            this.saveProgress();
            this.updateProgress();
            this.renderExerciseList();
        }
    }

    updateProgress() {
        const total = exercises.length;
        const completed = this.completedExercises.length;
        const percentage = total > 0 ? (completed / total) * 100 : 0;

        document.getElementById('progressFill').style.width = `${percentage}%`;
        document.getElementById('progressText').textContent = `${completed} / ${total} gelöst`;
    }

    saveProgress() {
        localStorage.setItem('sqlTrainerProgress', JSON.stringify(this.completedExercises));
    }

    loadProgress() {
        const saved = localStorage.getItem('sqlTrainerProgress');
        return saved ? JSON.parse(saved) : [];
    }

    resetProgress() {
        this.completedExercises = [];
        this.saveProgress();
        this.updateProgress();
        this.renderExerciseList();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SQLTrainer();
});
