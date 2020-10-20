const puppeter = require('puppeteer')
// Analisar a página do Insta
async function start(){

    async function loadMore(page, selector){
        const moreButton = await page.$(selector)
        if(moreButton){
            console.log("More")
            await moreButton.click()
            await page.waitFor(selector,{timeout: 300}).catch(()=>{console.log("")})
            await loadMore(page, selector)
        }
    }

    async function getComents(page, selector){
        const comments = await  page.$$eval(selector, links => links.map(link =>{return  link.innerText}))
        return comments
    }



const browser = await puppeter.launch()
const page = await browser.newPage()
await page.goto('https://www.instagram.com/p/B6vzbRDAEML/')
await loadMore(page, '.dCJp8 ');
const arrobas = await getComents(page,'.C4VMK span a'  )
const counted = count(arrobas)
const sorted = sort(counted)
sorted.forEach(arroba=>{console.log(arroba)})

await browser.close()
}

//Pegando os comentários 



//Contar comentarios repetidos
function count(arrobas) {
    const count ={}
    arrobas.forEach(arroba =>{count[arroba] = (count[arroba] ||0)+1})
    return count
        
    };

//Ordenanado
function sort(counted){
    const entries = []
    for(prop in counted){
        entries.push([prop, counted[prop]])
    }
    const sorted = entries.sort((a,b)=> b[1]-a[1])
    return sorted
}
start()
//sort(count(fakeArroba))