// Simulação de carrinho de compras
let cartCount = 0;

// Elementos DOM
const buyNowButtons = document.querySelectorAll('#buyNow, #finalBuy');
const addToCartButton = document.getElementById('addToCart');
const cartButton = document.querySelector('.btn-cart');

// Função para formatar preço
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

// Função para comprar agora
function buyNow() {
    const productName = "Cortador Multifuncional 2.0";
    const price = 89.90;
    
    alert(`🎉 Ótima escolha! Você está comprando:\n\n${productName}\n\nPreço: ${formatPrice(price)}\n\nRedirecionando para checkout...`);
    
    // Aqui você integraria com sua plataforma de pagamento
    // Exemplo: window.location.href = "https://seu-checkout.com";
}

// Função para adicionar ao carrinho
function addToCart() {
    cartCount++;
    
    // Atualizar botão do carrinho
    if (cartButton) {
        cartButton.innerHTML = `<i class="fas fa-shopping-cart"></i> Carrinho (${cartCount})`;
    }
    
    // Mostrar confirmação
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        <strong>🎉 Produto adicionado!</strong>
        <p>Cortador Multifuncional 2.0</p>
        <p>Total no carrinho: ${cartCount} item(s)</p>
    `;
    
    document.body.appendChild(notification);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Função para abrir chat
function openChat() {
    alert("💬 Chat de atendimento\n\nEm breve você será atendido por nosso time de vendas!\n\nEnquanto isso, pode nos chamar no WhatsApp: (11) 99999-9999");
}

// Adicionar animação CSS para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Contador de estoque (simulação)
function updateStockCounter() {
    const stockElement = document.querySelector('.stock-counter p');
    if (stockElement) {
        // Simular diminuição gradual do estoque
        let stock = 12;
        const sold = Math.floor(Math.random() * 3); // 0-2 vendas a cada visita
        stock = Math.max(1, stock - sold);
        
        stockElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Apenas ${stock} unidades em estoque!`;
        
        const progress = document.querySelector('.progress');
        if (progress) {
            const percentage = (stock / 12) * 100;
            progress.style.width = `${percentage}%`;
        }
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
