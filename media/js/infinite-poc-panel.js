(function () {
    const vscode = acquireVsCodeApi();

    const btnfirst = document.querySelector('.btn-first');

    btnfirst.addEventListener('click', firstBtnClicked);

    function firstBtnClicked() {
        vscode.postMessage({
            type: 'btn-first',
            value: 'btn-first clicked'
        });
    }
}());