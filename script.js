// Configuração para InfinitPay
const INFINITPAY_CONFIG = {
    apiKey: 'SUA_CHAVE_API_AQUI', // Você vai conseguir na dashboard da InfinitPay
    productId: 'cortador-multifuncional-2.0',
    price: 89.90,
    description: 'Cortador Multifuncional 2.0 + Frete Grátis'
};

// Elementos DOM
const modal = document.getElementById('checkoutModal');
const closeBtn = document.querySelector('.close');
const buyButtons = document.querySelectorAll('#buyNow, #finalBuy, #infinitPayButton');

// Abrir modal de checkout
function openCheckoutModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Iniciar pagamento com InfinitPay
async function startInfinitPayPayment() {
    const productData = {
        name: "Cortador Multifuncional 2.0",
        price: INFINITPAY_CONFIG.price,
        quantity: 1,
        description: INFINITPAY_CONFIG.description,
        shipping: {
            free_shipping: true,
            estimated_delivery: "5-7 dias úteis"
        }
    };

    try {
        // Simulação da API da InfinitPay
        // Na prática, você usaria algo como:
        // const response = await fetch('https://api.infinitpay.com.br/checkout', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${INFINITPAY_CONFIG.apiKey}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(productData)
        // });
        
        // Para demonstração, vamos simular o redirecionamento
        showLoading();
        
        setTimeout(() => {
            hideLoading();
            
            // Em produção, redirecionaria para o checkout da InfinitPay
            // window.location.href = response.data.checkout_url;
            
            // Para demonstração, mostramos uma mensagem de sucesso
            alert('🎉 Redirecionando para o pagamento seguro da InfinitPay...\n\nEm produção, você seria redirecionado para o checkout oficial.');
            
            closeModal();
        }, 1500);
        
    } catch (error) {
        console.error('Erro no pagamento:', error);
        alert('❌ Ocorreu um erro ao processar o pagamento. Tente novamente.');
    }
}

// Funções de loading
function showLoading() {
    const button = document.getElementById('infinitPayButton');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESSANDO...';
    button.disabled = true;
    
    // Restaurar depois de 3 segundos
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 3000);
}

function hideLoading() {
    const button = document.getElementById('infinitPayButton');
    button.innerHTML = '<i class="fas fa-check"></i> PAGAMENTO PROCESSADO!';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Configurar botões de compra
    buyButtons.forEach(button => {
        if (button.id !== 'infinitPayButton') {
            button.addEventListener('click', openCheckoutModal);
        }
    });
    
    // Botão de pagamento InfinitPay
    const infinitPayButton = document.getElementById('infinitPayButton');
    if (infinitPayButton) {
        infinitPayButton.addEventListener('click', startInfinitPayPayment);
    }
    
    // Fechar modal
    closeBtn.addEventListener('click', closeModal);
    
    // Fechar modal clicando fora
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Configurar PIX com desconto
    setupPixDiscount();
    
    // Contador de estoque
    updateStockCounter();
});

// Configurar desconto PIX
function setupPixDiscount() {
    const pixPrice = (INFINITPAY_CONFIG.price * 0.95).toFixed(2); // 5% desconto
    console.log(`💰 Preço com PIX (5% off): R$ ${pixPrice}`);
}

// Atualizar contador de estoque
function updateStockCounter() {
    // Simulação de estoque baixo
    const stockElements = document.querySelectorAll('.stock-text');
    stockElements.forEach(el => {
        const stock = Math.floor(Math.random() * 5) + 3;
        el.textContent = `Apenas ${stock} unidades disponíveis`;
    });
}
