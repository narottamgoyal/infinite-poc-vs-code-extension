(function () {
    const vscode = acquireVsCodeApi();

    const btnfirst = document.querySelector('.btn-first');
    const btnsecond = document.querySelector('.btn-second');
    const txtbox = document.querySelector('.txt-box');
    const btnthird = document.querySelector('.btn-third');

    btnfirst.addEventListener('click', firstBtnClicked);
    btnsecond.addEventListener('click', secondBtnClicked);
    btnthird.addEventListener('click', thirdBtnClicked);

    function firstBtnClicked() {
        vscode.postMessage({
            type: 'btn-first',
            value: 'btn-first clicked'
        });
    }

    function secondBtnClicked() {
        vscode.postMessage({
            type: 'btn-second',
            value: txtbox.value
        });
    }

    function thirdBtnClicked() {
        vscode.postMessage({
            type: 'btn-third',
            value: txtbox.value
        });
    }

}());