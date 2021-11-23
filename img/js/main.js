'use strict'

var gQuests
var gCurrQuestIdx
var gTimeOutId
var gIsGameOver

function init() {
    gIsGameOver = false
    gQuests = createQuests()
    gCurrQuestIdx = 0
    closeModal()
    renderQuest()
}

function createQuests() {
    var quests = [
        {  opts: ['I LOVE ROME', 'I LOVE PARIS'], correctOptIndex: 0 },
        {  opts: ['MUST GO TO DUBLIN', 'MUST GO TO LONDON'], correctOptIndex: 0 },
        {  opts: ['I CAN USE A PIZZA NOW!', 'I CAN USE A CROISSANT NOW!'], correctOptIndex: 1 },
        {  opts: ['LETS GET HIGH!', 'LETS GET LOW?'], correctOptIndex: 0 },
        {  opts: ['APPLE IS THE BEST', 'SAMSUNG IS THE BEST'], correctOptIndex: 0 }
    ]
    return quests
}

function renderQuest() {
    var strHtml = ''
    var elQuest = document.querySelector('.quest-box')
    elQuest.style.backgroundImage = `url("../img/${gCurrQuestIdx}.jpg")`
    var questOpts = gQuests[gCurrQuestIdx].opts
    for (var i = 0; i < questOpts.length; i++) {
        var questOpt = questOpts[i]
        strHtml += `<button data-idx="${i}" onclick=checkAnswer(this.dataset.idx) > ${questOpt} </button>`
    }
    elQuest.innerHTML = strHtml
}

function checkAnswer(questOpt) {
    if (+questOpt !== gQuests[gCurrQuestIdx].correctOptIndex) return openModal()
    if (gCurrQuestIdx === gQuests.length - 1) {
        gIsGameOver = true
        openModal()
        return
    }
    gCurrQuestIdx++
    renderQuest()
    closeModal()
}

function restart(elBtn) {
    elBtn.style.display = 'none'
    init()
}

function openModal() {
    clearTimeout(gTimeOutId)
    var elModal = document.querySelector('.modal')
    var elparagraph = elModal.querySelector('p')
    if (!gIsGameOver) {
        elparagraph.innerText = 'worng answer try again!'
        gTimeOutId = setTimeout(() => {
            closeModal()
        }, 3000);
    } else {
        var elBtn = elModal.querySelector('button')
        elparagraph.innerText = 'Victorious you are number one'
        elBtn.style.display = 'block'
    }
    elModal.style.display = 'flex'
}

function closeModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

