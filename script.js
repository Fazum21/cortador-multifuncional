// Mapeamento automático de imagens
function setupImageMapping() {
    // Mapeamento dos nomes originais para os nomes usados no HTML
    const imageMap = {
        // Nome no HTML : Nome real no GitHub
        'produto-principal.jpg': 'Captura de tela_20260117-013320.jpg',
        'comparativo.jpg': 'Captura de tela_20260117-013243.jpg',
        'laminas-fatiar.jpg': 'Captura de tela_20260117-013229.jpg',
        'laminas-triturar.jpg': 'Captura de tela_20260117-013214.jpg',
        'laminas-picar.jpg': 'Captura de tela_20260117-013159.jpg',
        'passo-a-passo.jpg': 'Captura de tela_20260117-013138.jpg',
        'alimentos-varios.jpg': 'Captura de tela_20260117-013121.jpg'
    };
    
    // Atualiza todas as imagens na página
    document.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        
        // Verifica se é uma imagem da pasta images/
        if (src && src.startsWith('images/')) {
            const filename = src.split('/').pop(); // Pega o nome do arquivo
            const realFilename = imageMap[filename];
            
            if (realFilename) {
                // Atualiza o src com o nome real do arquivo
                img.src = `images/${realFilename}`;
                
                // Adiciona tratamento de erro
                img.onerror = function() {
                    console.error(`Imagem não encontrada: ${realFilename}`);
                    // Pode adicionar uma imagem placeholder aqui
                };
            }
        }
    });
}

// Executa quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    setupImageMapping();
});        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Configurar botões de compra
    buyNowButtons.forEach(button => {
        button.addEventListener('click', buyNow);
    });
    
    // Configurar botão do carrinho
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCart);
    }
    
    // Configurar botão do chat
    const chatButton = document.querySelector('.btn-chat');
    if (chatButton) {
        chatButton.addEventListener('click', openChat);
    }
    
    // Atualizar contador de estoque
    updateStockCounter();
    
    // Atualizar a cada 30 segundos
    setInterval(updateStockCounter, 30000);
    
    // Efeito de contagem regressiva para oferta
    function updateCountdown() {
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(23, 59, 59, 999);
        
        const diff = tomorrow - now;
        
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const offerBanner = document.querySelector('.offer-banner');
        if (offerBanner) {
            offerBanner.innerHTML = `🔥 OFERTA RELÂMPAGO: <strong>R$ 89,90</strong> | Termina em: ${hours}h ${minutes}m ${seconds}s | Frete Grátis`;
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
