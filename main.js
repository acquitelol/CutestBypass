(async function() {
    'use strict';

    const patcher = await import("https://esm.sh/spitroast");
    const labels = await getRecursively(() => document.getElementsByClassName("status-bar-label-text"));
    labels[1].textContent = "Rosie :3";

    const AppContainer = document.getElementById("app-container");
    const ReactRoot = AppContainer._reactRootContainer._internalRoot;
    const ReactPendingProps = ReactRoot.current.child.pendingProps;
    const Contexts = ReactPendingProps.children.props.children.props.children[0];
    const SparxWebContainer = Contexts.props.children.props.children[1].type
    const SparxWeb = SparxWebContainer.WrappedComponent.prototype;

    let dynamicSubmitButton = document.getElementById("skill-delivery-submit-button");

    patcher.after("render", SparxWeb, function(_, res) {
        document.__props = this.props;
        dynamicSubmitButton = document.getElementById("skill-delivery-submit-button");
    });

    patcher.after("render", findReact(document.getElementsByClassName('wac-overlay')[0]).__proto__, function(_, res) {
        const answers = localStorageHandler.get(this.props.bookworkCode);
        const container = findInReactTree(res, r => r.props.children[1].props.className?.includes("bookwork-code"));

        if (!container) return;

        container.props.children[1].key = "answer-container";
        container.props.children[1].props.children = ["Answers: ", answers.join("")]

        return res;
    })

    dynamicSubmitButton?.addEventListener("click", storeAnswers);

    document.addEventListener("keypress", function(event) {
        if (event.key === "Enter" && dynamicSubmitButton) {
            storeAnswers();
        }
    })
})();