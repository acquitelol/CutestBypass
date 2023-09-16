import logger from '@logger';
import utilities from '@utilities';
import { storages } from '@core/handlers/state';

const { findReact, findInTree, findInReactTree, isEmpty } = utilities;
const { bookwork } = storages;

function processAnswers(input: Record<string, Record<string, any>>) {
    const answers: string[] = [];

    if (!isEmpty(input.number_fields)) {
        Object.values(input.number_fields).forEach(field =>
            field.value && answers.push(field.value));
    }

    if (!isEmpty(input.cards)) {
        Object.values(input.cards).forEach(card =>
            card.slot_ref && answers.push(card.content[0].text))
    }

    if (!isEmpty(input.choices)) {
        Object.values(input.choices).forEach(choice =>
            choice.selected && answers.push(choice.content[0].text))
    }

    return answers;
}

function handler() {
    const possibleQuestionWrapper: HTMLDivElement = document.querySelector('[class*="_QuestionWrapper_"]');
    const possibleQuestionInfo = document.querySelector('[class*="_QuestionInfo_"]');

    if (!possibleQuestionWrapper || !possibleQuestionInfo) {
        logger.warn(
            'Wrappers failed to query! You\'re likely not in a question.',
            {
                question: possibleQuestionWrapper,
                info: possibleQuestionInfo
            }
        );
        return;
    }

    const QuestionWrapper = findReact(possibleQuestionWrapper);
    const QuestionInfo = findReact(possibleQuestionInfo);

    const endpoint = findInReactTree(QuestionWrapper.memoizedProps.children, x => x.layout && x.input);
    const questionText = findInTree(endpoint.layout, x => x.type.includes('question-text'), { walkable: ['content'] });

    // Remove all question-dependent Latex formatting and remove consecutive spaces
    const id = findInTree(questionText, x => x.element === 'text', { walkable: ['content'] })?.text
        .replace(/\$.*?\$/g, '')
        .replace(/ +/g, " ");

    const code = QuestionInfo.memoizedProps.bookworkCode;
    const answers = processAnswers(endpoint.input);

    if (!id || !code || !answers) {
        logger.warn('Answers failed to parse:', { id, code, answers });
        return;
    }

    bookwork.set(code, [
        ...bookwork.get(code)?.filter(x => x.id !== id) ?? [],
        { id, answers, date: Date.now() }
    ]);
}

export default async function () {
    document.addEventListener('pointerdown', handler, { capture: true });
    document.addEventListener('keydown', handler, { capture: true });

    return () => {
        document.removeEventListener('pointerdown', handler, { capture: true });
        document.removeEventListener('keydown', handler, { capture: true });
    }
}