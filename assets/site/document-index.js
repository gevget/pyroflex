(() => {
  const form = document.querySelector('#document-filters');
  const productFilter = document.querySelector('#document-product');
  const kindFilter = document.querySelector('#document-kind');
  const searchField = document.querySelector('#document-search');
  const entries = [...document.querySelectorAll('.pf-doc-row')];
  const count = document.querySelector('#document-count');
  const empty = document.querySelector('#document-empty');
  if (!form || !productFilter || !kindFilter || !searchField || !entries.length) return;

  const isEnglish = document.documentElement.lang === 'en';
  const requestedProduct = new URLSearchParams(window.location.search).get('product');
  if (requestedProduct && [...productFilter.options].some((option) => option.value === requestedProduct)) {
    productFilter.value = requestedProduct;
  }

  const applyFilters = () => {
    const product = productFilter.value;
    const kind = kindFilter.value;
    const query = searchField.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const entry of entries) {
      const pages = entry.dataset.pages.split(/\s+/).filter(Boolean);
      const matchesProduct = product === 'all' || pages.includes(product);
      const matchesKind = kind === 'all' || entry.dataset.kind === kind;
      const matchesSearch = !query || entry.dataset.search.includes(query);
      entry.hidden = !(matchesProduct && matchesKind && matchesSearch);
      if (!entry.hidden) visible += 1;
    }
    if (count) count.textContent = isEnglish
      ? `Showing ${visible} of ${entries.length} documents`
      : `Показано ${visible} из ${entries.length} документов`;
    if (empty) empty.hidden = visible > 0;
  };

  productFilter.addEventListener('change', applyFilters);
  kindFilter.addEventListener('change', applyFilters);
  searchField.addEventListener('input', applyFilters);
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('reset', () => window.setTimeout(applyFilters, 0));
  applyFilters();
})();
