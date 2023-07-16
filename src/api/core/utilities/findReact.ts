/**
 * Finds a React component (if any) by its HTMLNode through React fibers.
 * @param {HTMLNode} element
 * @param {number} traverseUp
 * @returns ReactElement | null
 */
const findReact = (element: Element | null, traverseUp = 0) => {
    if (!element) return null;

    const key = Object.keys(element).find(key => {
        return key.startsWith("__reactFiber$")
        || key.startsWith("__reactInternalInstance$");
    }) ?? "";

    const elementFiber = element[key]
    if (!elementFiber) return null;

    if (elementFiber._currentElement) {
        let computedFiber = elementFiber._currentElement._owner;

        for (let i = 0; i < traverseUp; i++) {
            computedFiber = computedFiber._currentElement._owner;
        }

        return computedFiber._instance;
    }

    const getComputedFiber = fiber => {
        let parentFiber = fiber.return;

        while (typeof parentFiber.type == "string") {
            parentFiber = parentFiber.return;
        }

        return parentFiber;
    };

    let computedFiber = getComputedFiber(elementFiber);

    for (let i = 0; i < traverseUp; i++) {
        computedFiber = getComputedFiber(computedFiber);
    }

    return computedFiber.stateNode;
};

export default findReact;