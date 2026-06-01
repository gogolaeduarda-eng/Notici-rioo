// Simulando uma base de dados de notícias
const noticias = [
    {
        id: 1,
        titulo: "O Futuro da Inteligência Artificial em 2026",
        descricao: "Especialistas apontam que a integração entre hardware quântico e modelos de linguagem redefine o mercado de tecnologia global este ano.",
        categoria: "tecnologia",
        imagem: "https://picsum.photos/800/500?random=1",
        data: "01 de Junho de 2026",
        destaque: true
    },
    {
        id: 2,
        titulo: "Seleção se prepara para o próximo desafio mundial",
        descricao: "Com novos talentos escalados, a equipe técnica foca em treinos intensivos de jogadas ensaiadas para surpreender os adversários.",
        categoria: "esportes",
        imagem: "https://picsum.photos/400/250?random=2",
        data: "01 de Junho de 2026",
        destaque: false
    },
    {
        id: 3,
        titulo: "Streaming bate recorde de bilheteria com nova série sci-fi",
        descricao: "A produção que custou milhões já se pagou no primeiro fim de semana e se tornou o assunto mais comentado das redes sociais.",
        categoria: "entretenimento",
        imagem: "https://picsum.photos/400/250?random=3",
        data: "31 de Maio de 2026",
        destaque: false
    },
    {
        id: 4,
        titulo: "Novos smartphones chegam ao mercado com bateria que dura uma semana",
        descricao: "A tecnologia baseada em novas ligas de grafeno promete revolucionar a autonomia dos dispositivos móveis.",
        categoria: "tecnologia",
        imagem: "https://picsum.photos/400/250?random=4",
        data: "30 de Maio de 2026",
        destaque: false
    },
    {
        id: 5,
        titulo: "Campeonato nacional de surf termina com virada histórica",
        descricao: "O jovem atleta de apenas 19 anos superou as ondas gigantes e garantiu o título nos últimos segundos da bateria.",
        categoria: "esportes",
        imagem: "https://picsum.photos/400/250?random=5",
        data: "29 de Maio de 2026",
        destaque: false
    }
];

// Seletores do DOM
const featuredSection = document.getElementById('featured-section');
const newsGrid = document.getElementById('news-grid');
const categoryButtons = document.querySelectorAll('.nav-btn');
const themeToggle = document.getElementById('theme-toggle');

// Função para renderizar o site
function carregarNoticias(categoriaFiltrada = 'todas') {
    // Limpa as seções
    featuredSection.innerHTML = '';
    newsGrid.innerHTML = '';

    // Filtrar notícias
    const noticiasFiltradas = categoriaFiltrada === 'todas' 
        ? noticias 
        : noticias.filter(n => n.categoria === categoriaFiltrada);

    // Se não houver notícias na categoria
    if (noticiasFiltradas.length === 0) {
        newsGrid.innerHTML = `<p>Nenhuma notícia encontrada para esta categoria.</p>`;
        return;
    }

    // Identificar destaque (apenas se estivermos na aba 'todas')
    const temDestaque = categoriaFiltrada === 'todas';
    
    noticiasFiltradas.forEach(noticia => {
        if (noticia.destaque && temDestaque) {
            // Renderiza o card de destaque maior
            featuredSection.innerHTML = `
                <div class="featured-card">
                    <img src="${noticia.imagem}" alt="${noticia.titulo}" class="featured-img">
                    <div class="featured-content">
                        <span class="badge">${noticia.categoria}</span>
                        <h3>${noticia.titulo}</h3>
                        <p>${noticia.descricao}</p>
                        <span class="card-date">${noticia.data}</span>
                    </div>
                </div>
            `;
        } else {
            // Renderiza o card normal no Grid
            const card = document.createElement('div');
            card.classList.add('news-card');
            card.innerHTML = `
                <img src="${noticia.imagem}" alt="${noticia.titulo}" class="card-img">
                <div class="card-content">
                    <span class="badge" style="background-color: var(--primary-color)">${noticia.categoria}</span>
                    <h4>${noticia.titulo}</h4>
                    <p>${noticia.descricao.substring(0, 100)}...</p>
                    <span class="card-date">${noticia.data}</span>
                </div>
            `;
            newsGrid.appendChild(card);
        }
    });
}

// Evento para os botões de categoria
categoryButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove classe ativa de todos
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona classe ativa no clicado
        e.target.classList.add('active');
        
        // Filtra as notícias
        const categoria = e.target.getAttribute('data-category');
        carregarNoticias(categoria);
    });
});

// Lógica de Alternância de Tema (Claro / Escuro)
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
    } else {
        document.body.setAttribute('data-theme', 'dark');
    }
});

// Inicialização padrão do site
window.addEventListener('DOMContentLoaded', () => {
    carregarNoticias();
});
