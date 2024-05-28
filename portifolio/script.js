document.addEventListener('DOMContentLoaded', () => {
    bloquearMenuContexto()
    corMenuFixo()
    menuRwd()
    portfolio()
})

function bloquearMenuContexto() {
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });
}

function corMenuFixo() {
    const header = document.querySelector('.header-container')
    const alturaHome = document.querySelector('.home-container').offsetHeight

    document.addEventListener("scroll", adicionarCor)

    function adicionarCor() {
        if (scrollY > alturaHome - 66){
            header.classList.add('teste')
        }
        else {
            header.classList.remove('teste')
        }
    }
}

function menuRwd() {
    const body = document.body
    const categoriasBox = document.querySelector('.header-categorias-box')
    const btn = document.querySelector('.header-menu-rwd-btn')
    const categorias = document.querySelectorAll('.header-categoria-link')

    categorias.forEach(categoria => {
        categoria.addEventListener('click', mostrarSecao)
    })

    btn.addEventListener('click', () => {
        categoriasBox.classList.toggle('header-menu-visivel')

        if (categoriasBox.classList.contains('header-menu-visivel')) {
            btn.src = 'img/menu-mobile/fechar.svg'

            removerScroll()
        }
        else {
            btn.src = 'img/menu-mobile/abrir.svg'

            adicionarScroll()
        }
    })

    function mostrarSecao() {
        btn.src = 'img/menu-mobile/abrir.svg'

        categoriasBox.classList.remove('header-menu-visivel')

        body.classList.add('scroll-visivel')
    }

    function removerScroll() {
        body.classList.remove('scroll-visivel')
        body.classList.add('scroll-escondido')
    }

    function adicionarScroll() {
        body.classList.remove('scroll-escondido')
        body.classList.add('scroll-visivel')
    }
}

function portfolio() {
    const btnIlustracoes = document.querySelector('.portfolio-btn-ilustracoes')
    const btnVetores = document.querySelector('.portfolio-btn-vetores')
    const btnDesign = document.querySelector('.portfolio-btn-design')
    const btnArte = document.querySelector('.portfolio-btn-arte')

    const portfolioVetores = document.querySelector('.portfolio-vetores')
    const portfolioIlustracoes = document.querySelector('.portfolio-ilustracoes')
    const portfolioDesign = document.querySelector('.portfolio-design')
    const portfolioArte = document.querySelector('.portfolio-arte')

    const subtitulos = document.querySelectorAll('.portfolio-item')
    const portfolios = document.querySelectorAll('.portfolio-imagens')

    btnIlustracoes.addEventListener('click', () => {
        removerPortfolioVisivel()
        removerFundoSubtitulo()

        btnIlustracoes.classList.add('portfolio-visivel-fundo')
        portfolioIlustracoes.classList.add('portfolio-visivel')
    })

    btnVetores.addEventListener('click', () => {
        removerPortfolioVisivel()
        removerFundoSubtitulo()

        btnVetores.classList.add('portfolio-visivel-fundo')
        portfolioVetores.classList.add('portfolio-visivel')
    })

    btnDesign.addEventListener('click', () => {
        removerPortfolioVisivel()
        removerFundoSubtitulo()

        btnDesign.classList.add('portfolio-visivel-fundo')
        portfolioDesign.classList.add('portfolio-visivel')
    })
    
    btnArte.addEventListener('click', () => {
        removerPortfolioVisivel()
        removerFundoSubtitulo()

        btnArte.classList.add('portfolio-visivel-fundo')
        portfolioArte.classList.add('portfolio-visivel')
    })

  
    function removerPortfolioVisivel() {
        portfolios.forEach(portfolio => {
            portfolio.classList.remove('portfolio-visivel')
        })
    }

    function removerFundoSubtitulo() {
        subtitulos.forEach(subtitulo => {
            subtitulo.classList.remove('portfolio-visivel-fundo')
        })
    }
}