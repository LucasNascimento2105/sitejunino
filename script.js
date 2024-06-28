document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        var container = document.querySelector('.container');
        var image = document.getElementById('img1');
        var scrollPosition = window.scrollY;
        var windowHeight = window.innerHeight;

        // Calcula a distância entre o topo da imagem e o topo da janela
        var imageTop = image.getBoundingClientRect().top;
        var distanceFromTop = imageTop - windowHeight;

        // Calcula a opacidade com base na distância da imagem do topo da janela
        var opacity = 1 - (distanceFromTop / windowHeight);

        // Define a opacidade da imagem
        image.style.opacity = opacity;

        // Cor base do container
        var baseColor = '#EF233C';

        // Fator de escurecimento
        var darknessFactor = 0.9; // Ajuste o valor para alterar a intensidade do escurecimento

        // Calcula a cor mais escura do container com base no fator de escurecimento e na posição de rolagem
        var darkerColor = darkenColor(baseColor, darknessFactor * (scrollPosition / windowHeight));

        // Define a cor de fundo do contêiner
        container.style.backgroundColor = darkerColor;
    });

    // Função para escurecer uma cor em hexadecimal
    function darkenColor(color, factor) {
        var hex = color.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);

        r = Math.round(r * (1 - factor));
        g = Math.round(g * (1 - factor));
        b = Math.round(b * (1 - factor));

        var result = '#' + (r < 16 ? '0' : '') + r.toString(16) + (g < 16 ? '0' : '') + g.toString(16) + (b < 16 ? '0' : '') + b.toString(16);
        return result;
    }
});




function carregarTextoXML() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Parse do XML retornado
                var xmlDoc = new DOMParser().parseFromString(xhr.responseText, 'text/xml');

                // Extrair os textos dos elementos "produto"
                var produtos = xmlDoc.getElementsByTagName('produto');
                var paragrafos = document.getElementsByClassName('texto-produto');

                for (var i = 0; i < produtos.length; i++) {
                    var textoProduto = produtos[i].textContent;
                    paragrafos[i].textContent = textoProduto;
                }
            } else {
                console.error('Erro ao carregar o XML.');
            }
        }
    };

    // Abrir e enviar a requisição
    xhr.open('GET', 'dados.xml', true);
    xhr.send();
}

// Chamar a função para carregar o texto do XML
carregarTextoXML();
