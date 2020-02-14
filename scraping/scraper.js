const puppeter = require("puppeteer");
const Project = require("../models/project");

module.exports.start = async () => {
    const browser = await puppeter.launch({headless: true, devtools: true});
    const page = await browser.newPage();
    await page.goto("http://www.legislador.com.br/LegisladorWEB.ASP?WCI=ProjetoTramite&ID=20", {waitUntil: "domcontentloaded"});

    const form = await page.$(".form-inline");
    await page.evaluate((form) =>  {
        const input = form.querySelector(".form-control.mx-1");
        input.value = "transporte";
        form.submit();
        return input;
    }, form);
    await page.waitFor(1500);

    const cards = await page.$$("div.card > .card-body");
    console.log(cards.length);

    for(let index in cards) {
        console.log(index);
        const card = cards[index];
        const detailsBtn = await page.evaluateHandle(card => card.querySelector(".btn.btn-outline-secondary"), card);
        await detailsBtn.click();
    }
    await page.waitFor(cards.length * 500);
    const allOpenedPages = await browser.pages();
    const justNewPages = allOpenedPages.slice(2, allOpenedPages.length);
    let allProjects = [];

    for (let pageIndex in justNewPages) {
        const currentPage = justNewPages[pageIndex];
        const  project = await scrapEachNewPageProject(currentPage);
        allProjects.push(project);
    }
    await page.waitFor(1000);
    console.log(allProjects)
    saveProjecs(allProjects);
    await page.waitFor(1000);
    browser.close();
}

const scrapEachNewPageProject = async (page) => {
    return await page.evaluate(() => {
        var titulo = document.querySelector(".card-title").innerText;
        var data =  document.querySelector(".card-subtitle.mb-2.text-muted").innerText;

        var infoCard = document.querySelectorAll(".card-body")[0];
        var infoRow = infoCard.querySelector(".col-lg > .row").children;
        console.log(infoRow);
        var situacao = infoRow[1].innerText;
        var assunto = infoRow[7].innerText;
        var autor = infoRow[9].innerText.replace("\n", " ");

        var tramite = [];
        var divTramite = document.querySelector("#idTramite");
        var tableTramite = divTramite.querySelector("table");
        var rows = tableTramite.tBodies[0].rows;
        for(var index in rows) {
            var row = rows[index];
            if (row.cells) 
                tramite.push({
                    projeto: row.cells[0].innerText,
                    entrada: row.cells[1].innerText,
                    prazo: row.cells[2].innerText,
                    devolucao: row.cells[3].innerText
                });
        }
        var ementaCard = document.querySelectorAll(".card-body")[2];
        var ementa = ementaCard.querySelector("p").innerText;
        
        var project = {
            titulo : titulo,
            data: data,
            situacao: situacao,
            assunto: assunto,
            autor: autor,
            ementa: ementa,
            tramite: tramite
        }
        console.log(project);
        return project;
    });
}

const saveProjecs = async (projects) => {
    try {
        const saved = await Project.insertMany(projects);
    }
    catch (err) {
        console.log(err)
        throw new Error(err);
    }
}


