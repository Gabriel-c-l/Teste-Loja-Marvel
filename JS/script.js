const cardsData = [
    { imgSrc: './img/img1.jpg', title: 'Homem Aranha', price: '120R$' },
    { imgSrc: './img/img2.jpg', title: 'Thor', price: '70R$' },
    { imgSrc: './img/img3.jpg', title: 'Hulk', price: '100R$' },
    { imgSrc: './img/img4.jpg', title: 'Homem de Ferro', price: '70R$' },
    { imgSrc: './img/img5.jpg', title: 'Capitão America', price: '65R$' },
    { imgSrc: './img/img6.jpg', title: 'Capitã Marvel', price: '43R$' }
];

let cartItems = [];

function createCard(cardData) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.classList.add('bonecos');
    img.src = cardData.imgSrc;
    img.alt = cardData.title;

    const title = document.createElement('h3');
    title.textContent = cardData.title;

    const price = document.createElement('p');
    price.textContent = `Preço: ${cardData.price}`;

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Adicionar ao Carrinho';
    addToCartButton.classList.add('addToCartBtn'); 
    addToCartButton.addEventListener('click', function() {
        addToCart(cardData);
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(addToCartButton);

    return card;
}

function renderCards() {
    const grupElement = document.querySelector('.grup');

    cardsData.forEach((cardData) => {
        const cardElement = createCard(cardData);
        grupElement.appendChild(cardElement);
    });
}

document.addEventListener('DOMContentLoaded', renderCards);

function openModal(modalType) {
    const modal = document.getElementById(`${modalType}Modal`);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalType) {
    const modal = document.getElementById(`${modalType}Modal`);
    if (modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var newUser = {
        username: document.getElementById('new_username').value,
        email: document.getElementById('new_email').value,
        cpf: document.getElementById('new_cpf').value,
        cep: document.getElementById('new_cep').value,
        password: document.getElementById('new_password').value
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    alert('Usuário cadastrado com sucesso!');
    closeModal('cadastro');
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var storedUser = JSON.parse(localStorage.getItem('user'));
    var enteredUsername = document.getElementById('username').value;
    var enteredPassword = document.getElementById('password').value;
    if (storedUser && enteredUsername === storedUser.username && enteredPassword === storedUser.password) {
        alert('Login bem-sucedido!');
        window.location.href = 'index2.html'; 
    } else {
        alert('Nome de usuário ou senha incorretos.');
    }
});

function displayLoggedInUser() {
    var storedUser = JSON.parse(localStorage.getItem('user'));
    var loggedInUserInfo = document.getElementById('loggedInUserInfo');
    if (storedUser && loggedInUserInfo) {
        var userInfo = document.createElement('div');
        userInfo.textContent = 'Logado como ' + storedUser.username;
        userInfo.style.marginRight = '20px';
        userInfo.style.fontWeight = 'bold';
        userInfo.style.color = 'white';
        loggedInUserInfo.appendChild(userInfo);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayLoggedInUser();
});

function openCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

const cartImage = document.querySelector('.carrinho');
if (cartImage) {
    cartImage.addEventListener('click', openCartModal);
}

document.addEventListener('DOMContentLoaded', function() {
    const cartImage = document.querySelector('.carrinho');
    if (cartImage) {
        cartImage.addEventListener('click', openCartModal);
    }
});

function addToCart(item) {
    cartItems.push(item);

    // Exibir alerta informando que o produto foi adicionado ao carrinho
    alert(`${item.title} foi adicionado ao carrinho!`);

    const cartList = document.getElementById('cartItems');
    if (cartList) {
        cartList.innerHTML = '';
        cartItems.forEach(item => {
            const li = document.createElement('li');

            // Imagem reduzida do produto
            const img = document.createElement('img');
            img.src = item.imgSrc;
            img.alt = item.title;
            img.style.width = '50px'; // Tamanho reduzido da imagem
            li.appendChild(img);

            // Nome e preço do produto
            const text = document.createTextNode(`${item.title} - ${item.price}`);
            li.appendChild(text);

            cartList.appendChild(li);
        });
    }

    updateCartTotal();
}

function updateCartTotal() {
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) {
        let total = 0;
        cartItems.forEach(item => {
            let priceString = item.price.replace('R$', '').trim();
            let priceNumber = parseFloat(priceString);
            total += priceNumber;
        });
        cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
}

const el = document.getElementById('overlayBtn');
if (el) {
  el.addEventListener('click', swapper, false);
}
