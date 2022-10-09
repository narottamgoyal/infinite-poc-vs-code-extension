(function () {
    const vscode = acquireVsCodeApi();

    const btnfirst = document.querySelector('.btn-first');
    const btnsecond = document.querySelector('.btn-second');
    const txtbox = document.querySelector('.txt-box');
    const btnthird = document.querySelector('.btn-third');
    const btnfourth = document.querySelector('.btn-fourth');
    const btnfifth = document.querySelector('.btn-fifth');

    btnfirst.addEventListener('click', firstBtnClicked);
    btnsecond.addEventListener('click', secondBtnClicked);
    btnthird.addEventListener('click', thirdBtnClicked);
    btnfourth.addEventListener('click', fourthBtnClicked);
    btnfifth.addEventListener('click', fifthBtnClicked);

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

    function fourthBtnClicked() {
        vscode.postMessage({
            type: 'btn-fourth',
            value: 'btn-fourth clicked'
        });
    }

    async function fifthBtnClicked() {
        vscode.postMessage({
            type: 'btn-fifth',
            value: txtbox.value
        });
    }

    window.addEventListener("message", async (event) => {
        const message = event.data;
        switch (message.type) {
            case "transferDataFromTsToUi":
                txtbox.value = message.data;
                break;
        }
    });

}());