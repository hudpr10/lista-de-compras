const listaContainer = document.querySelector('.lista')
const listaItens = localStorage.getItem('lista') ? JSON.parse(localStorage.getItem('lista')) : []

const campos = document.querySelectorAll('.topo__campo-texto-input')
const campoItem = campos[0]
const campoQuantidade = campos[1]


campos.forEach(cadaInput => {
    cadaInput.addEventListener('keydown', (e) => {
        if(e.code == 'Enter') {
            if(campoItem.value == '' || campoQuantidade.value == '') {
                console.log('Adicione o item desejado e sua quantidade!')
            } else {
                adicionarItemNaLista(campoItem.value, campoQuantidade.value)

                listaItens.push({
                    item: campoItem.value,
                    quantidade: parseInt(campoQuantidade.value),
                    checked: false
                })

                campoItem.value = ''
                campoQuantidade.value = 1
                localStorage.setItem('lista', JSON.stringify(listaItens))
            }
        }
    })
});

listaItens.forEach(cadaItem => {
    adicionarItemNaLista(cadaItem.item, cadaItem.quantidade, cadaItem.checked)
    console.log(document.querySelector('.lista-item'))
})

function adicionarItemNaLista(produto, quantidade, marcado) {
    const li = document.createElement('li')
    li.classList.add('lista-item')

    const inicioLI = document.createElement('div')
    inicioLI.classList.add('lista-inicio')

    const iconeCheck = document.createElement('img')
    iconeCheck.classList.add('lista-check')
    iconeCheck.setAttribute('src', 'assets/icon-check-vazio.svg')

    const textoLI = document.createElement('div')
    textoLI.classList.add('lista-info__container')

    const itemLI = document.createElement('p')
    itemLI.classList.add('lista-info__texto')
    itemLI.innerHTML = produto

    const quantidadeLI = document.createElement('p')
    quantidadeLI.classList.add('lista-info__quantidade')
    quantidadeLI.innerHTML = `<span class="texto-cinza">u:</span> ${quantidade}`

    const iconeRemover = document.createElement('img')
    iconeRemover.classList.add('lista-icons__remove')
    iconeRemover.setAttribute('src', 'assets/icon-remove.svg')
    
    listaContainer.appendChild(li)
    li.appendChild(inicioLI)
    inicioLI.appendChild(iconeCheck)
    inicioLI.appendChild(textoLI)
    textoLI.appendChild(itemLI)
    textoLI.appendChild(quantidadeLI)
    li.appendChild(iconeRemover)

    iconeRemover.addEventListener('click', () => {
        const indice = listaItens.findIndex((objeto) => {
            return objeto.item == produto
        })
        listaItens.splice(indice, 1)
        li.remove()
        localStorage.setItem('lista', JSON.stringify(listaItens))
    })

    iconeCheck.addEventListener('click', () => {
        const indice = listaItens.findIndex((objeto) => {
            return objeto.item == produto
        })

        if(listaItens[indice].checked == false) {
            listaItens[indice].checked = true
            iconeCheck.setAttribute('src', 'assets/icon-check-cheio.svg')
            li.classList.add('lista-fundo__vermelho')
            itemLI.classList.add('texto-riscado')
            quantidadeLI.innerHTML = `<span class="texto-cinza texto-vermelho">u:</span> ${quantidade}`
        } else {
            listaItens[indice].checked = false
            iconeCheck.setAttribute('src', 'assets/icon-check-vazio.svg')
            li.classList.remove('lista-fundo__vermelho')
            itemLI.classList.remove('texto-riscado')
            quantidadeLI.innerHTML = `<span class="texto-cinza">u:</span> ${quantidade}`
        }
        localStorage.setItem('lista', JSON.stringify(listaItens))
    })

    if(marcado) {
        iconeCheck.setAttribute('src', 'assets/icon-check-cheio.svg')
        li.classList.add('lista-fundo__vermelho')
        itemLI.classList.add('texto-riscado')
        quantidadeLI.innerHTML = `<span class="texto-cinza texto-vermelho">u:</span> ${quantidade}`
    } else {
        iconeCheck.setAttribute('src', 'assets/icon-check-vazio.svg')
        li.classList.remove('lista-fundo__vermelho')
        itemLI.classList.remove('texto-riscado')
        quantidadeLI.innerHTML = `<span class="texto-cinza">u:</span> ${quantidade}`
    }
}