const cardsData = [
    { imgSrc: './img/img1.jpg', title: 'Homem Aranha', price: '120R$' },
    { imgSrc: './img/img2.jpg', title: 'Thor', price: '70R$' },
    { imgSrc: './img/img3.jpg', title: 'Hulk', price: '100R$' },
    { imgSrc: './img/img4.jpg', title: 'Homem de Ferro', price: '70R$' },
    { imgSrc: './img/img5.jpg', title: 'Capitão America', price: '65R$' },
    { imgSrc: './img/img6.jpg', title: 'Captã Marvel', price: '43R$' }
];

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

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);

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

document.addEventListener('DOMContentLoaded', function() {
    var storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
        alert('Você não está logado. Redirecionando para a página inicial.');
        window.location.href = 'index.html';
    } else {
        displayLoggedInUser(); 
    }
});




function caculaCesta() {
    var total = 0;
    cardsData.forEach((cardData) => {
        var priceString = cardData.price.replace('R$', '').trim(); 
        var priceNumber = parseFloat(priceString); 
        total += priceNumber;
    });

  
    alert(`Total da cesta: R$ ${total.toFixed(2)}`); 
}

function displayLoggedInUser() {
    var storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        var userInfo = document.createElement('div');
        userInfo.textContent = 'Logado como ' + storedUser.username;
        userInfo.style.marginRight = '20px';
        userInfo.style.fontWeight = 'bold';
        userInfo.style.color = 'white';
        document.getElementById('loggedInUserInfo').appendChild(userInfo);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayLoggedInUser();
});
