const params = new URLSearchParams(window.location.search);
const topic = params.get('topic');

fetch('data/formulas.json')
.then(response => response.json())
.then(data => {

    const formulas = data[topic];

    document.getElementById('topicTitle').innerText = topic.toUpperCase();

    let html = '';

    formulas.forEach(item => {

        html += `
        <div class="formula-box">

            <img src="${item.image}" class="formula-image">

            <h3>${item.name}</h3>

            <div class="formula-text">
                ${item.formula}
            </div>

            <p class="description">
                ${item.description}
            </p>

        </div>
        `;

    });

    document.getElementById('formulaContainer').innerHTML = html;

});
