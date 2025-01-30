let starredItems = JSON.parse(localStorage.getItem('popcorn')) || [];

starredItems.forEach(id => {
    let item = document.getElementById(id);
    if (item) {
        item.querySelector('input[type="checkbox"').checked = true;
        document.getElementById('content').prepend(item);
    }
});

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        const item = event.target.closest('.items');
        const itemId = item.id;
        if (isChecked) {
            document.getElementById('content').prepend(item);
            if (!starredItems.includes(itemId)) {
                starredItems.push(itemId);
            }
        } else {
            const index = starredItems.indexOf(itemId);
            if (index > -1) {
                starredItems.splice(index, 1);
            }
        }

        localStorage.setItem('popcorn', JSON.stringify(starredItems));
        sortItems();
    });
});

sortItems();

function sortItems() {
    let itemsArray = Array.from(document.querySelectorAll('.items'));
    let starredItems = itemsArray.filter(item => 
        item.querySelector('input[type="checkbox"]').checked);
    let unstarredItems = itemsArray.filter(item => 
        !item.querySelector('input[type="checkbox"]').checked);

    starredItems.sort((a, b) =>
        b.dataset.maxGxp - a.dataset.maxGxp);
    unstarredItems.sort((a, b) =>
        b.dataset.maxGxp - a.dataset.maxGxp);

    const content = document.getElementById('content');
    content.innerHTML = '';
    starredItems.forEach(item =>
        content.append(item));
    unstarredItems.forEach(item =>
        content.append(item));
}