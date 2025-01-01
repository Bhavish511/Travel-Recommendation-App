document.getElementById('search-btn').addEventListener('click', function () {
    const keyword = document.getElementById('search-bar').value.toLowerCase();
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear previous results

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let results = [];
            if (keyword.includes('beach')) {
                results = data.beaches;
            } else if (keyword.includes('temple')) {
                results = data.temples;
            } else if (keyword.includes('country')) {
                results = data.countries.flatMap(country => country.cities);
            }

            if (results.length > 0) {
                results.forEach(item => {
                    content.innerHTML += `
                        <div class="result">
                            <h2>${item.name}</h2>
                            <img src="${item.imageUrl}" alt="${item.name}">
                            <p>${item.description}</p>
                        </div>
                    `;
                });
            } else {
                content.innerHTML = `<p>No results found for "${keyword}".</p>`;
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.getElementById('reset-btn').addEventListener('click', function () {
    document.getElementById('search-bar').value = '';
    document.getElementById('content').innerHTML = `
        <img src="https://source.unsplash.com/1600x900/?travel" alt="Travel Background" class="background-image">
        <div class="introduction">
            <h1>Welcome to TravelBloom</h1>
            <p>Explore the best travel destinations across the globe with personalized recommendations.</p>
        </div>
    `;
});
