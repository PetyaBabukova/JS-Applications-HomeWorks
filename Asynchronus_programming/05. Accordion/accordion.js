function solution() {
    let mainElement = document.getElementById('main');

    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then(res => res.json())
        .then(data => {
            data.forEach(x => {
                let accordionContainer = createElWithClassAndTextContent('div', 'accordion', undefined);
                let accordionHead = createElWithClassAndTextContent('div', 'head', undefined);
                let titleElement = createElWithClassAndTextContent('span', undefined, x.title);
                let moreBtn = createElWithClassAndTextContent('button', 'button', 'More');
                moreBtn.setAttribute('id', x._id);
                moreBtn.addEventListener('click', function(e) { viewMore(e, accordionContainer); });

                accordionHead.appendChild(titleElement);
                accordionHead.appendChild(moreBtn);
                accordionContainer.appendChild(accordionHead);

                mainElement.appendChild(accordionContainer);
            });
        });

    function viewMore(e, accordionContainer) {
        e.preventDefault();
        let button = e.target;
        let contentId = button.id;

        // Check if the detailed content has already been loaded
        let moreDiv = accordionContainer.querySelector('.extra');
        if (!moreDiv) {
            // If not, fetch it and append
            fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${contentId}`)
                .then(res => res.json())
                .then(data => {
                    moreDiv = createElWithClassAndTextContent('div', 'extra', undefined);
                    let pEl = document.createElement('p');
                    pEl.textContent = data.content;
                    moreDiv.appendChild(pEl);
                    accordionContainer.appendChild(moreDiv);
                    moreDiv.style.display = 'block'; // Ensure it's visible
                    button.textContent = 'Less';
                });
        } else {
            // Toggle visibility
            moreDiv.style.display = moreDiv.style.display === 'none' ? 'block' : 'none';
            button.textContent = button.textContent === 'More' ? 'Less' : 'More';
        }
    }

    function createElWithClassAndTextContent(tagName, className, textContent) {
        const element = document.createElement(tagName);
        if (className) element.className = className;
        if (textContent !== undefined) element.textContent = textContent;
        return element;
    }
}

solution();
