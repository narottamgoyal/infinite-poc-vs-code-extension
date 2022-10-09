(function () {
    const vscode = acquireVsCodeApi();

    const btnfirst = document.querySelector('.btn-first');
    const btnsecond = document.querySelector('.btn-second');
    const txtbox = document.querySelector('.txt-box');
    const btnthird = document.querySelector('.btn-third');
    const btnfourth = document.querySelector('.btn-fourth');
    const btnfifth = document.querySelector('.btn-fifth');
    const btnsixth = document.querySelector('.btn-sixth');
    const btnseventh = document.querySelector('.btn-seventh');
    const btneightth = document.querySelector('.btn-eightth');
    const btnnineth = document.querySelector('.btn-nineth');
    const btntenth = document.querySelector('.btn-tenth');
    const btneleventh = document.querySelector('.btn-eleventh');


    btnfirst.addEventListener('click', firstBtnClicked);
    btnsecond.addEventListener('click', secondBtnClicked);
    btnthird.addEventListener('click', thirdBtnClicked);
    btnfourth.addEventListener('click', fourthBtnClicked);
    btnfifth.addEventListener('click', fifthBtnClicked);
    btnsixth.addEventListener('click', sixthBtnClicked);
    btnseventh.addEventListener('click', seventhBtnClicked);
    btneightth.addEventListener('click', eightthBtnClicked);
    btnnineth.addEventListener('click', ninethBtnClicked);
    btntenth.addEventListener('click', tenthBtnClicked);
    btneleventh.addEventListener('click', eleventhBtnClicked);

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

    async function sixthBtnClicked() {
        vscode.postMessage({
            type: 'btn-sixth',
            value: txtbox.value
        });
    }

    async function seventhBtnClicked() {
        vscode.postMessage({
            type: 'btn-seventh',
            value: txtbox.value
        });
    }

    async function eightthBtnClicked() {
        vscode.postMessage({
            type: 'btn-eightth',
            value: txtbox.value
        });
    }

    async function ninethBtnClicked() {
        vscode.postMessage({
            type: 'btn-nineth',
            value: txtbox.value
        });
    }

    function tenthBtnClicked() {
        vscode.postMessage({
            type: 'btn-tenth',
            value: txtbox.value
        });
    }

    function eleventhBtnClicked() {
        vscode.postMessage({
            type: 'btn-eleventh',
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