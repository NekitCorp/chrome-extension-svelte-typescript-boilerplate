export function getElementByXpath(path: string, context?: Node): Node {
    return document.evaluate(
        path,
        context || document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}

export function getElementsByXpath(xpath: string, context?: Node): HTMLElement[] {
    const result = [];
    const nodes = document.evaluate(
        xpath,
        context || document,
        null,
        XPathResult.ORDERED_NODE_ITERATOR_TYPE,
        null
    );
    let node = nodes.iterateNext();
    while (node) {
        result.push(node);
        node = nodes.iterateNext();
    }
    return result;
}