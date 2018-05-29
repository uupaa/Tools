
export function save() { // auto save
  saveSelectIndex("#queries_company_id", "queries_company_id");
}

function saveSelectIndex(selector, id) {
  const node = document.querySelector(selector);
  if (node) {
    node.onchange = () => {
      localStorage[`junk_20180529$_${id}`] = node.selectedIndex;
    };
  }
}

export function load() { // auto load
  loadSelectIndex("#queries_company_id", "queries_company_id");
}

function loadSelectIndex(selector, id) {
  const node = document.querySelector(selector);
  if (node) {
    node.selectedIndex = localStorage[`junk_20180529$_${id}`];
  }
}

