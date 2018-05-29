
export function save() { // auto save
/*
  saveText("#queries_id_from", "queries_id_from");
  saveText("#queries_id_to", "queries_id_to");
  saveSelectbox("#queries_web_status", "queries_web_status");
  saveSelectbox("#queries_office_id", "queries_office_id");
  saveSelectbox("#queries_company_id", "queries_company_id");
  saveSelectbox("#queries_event_id", "queries_event_id");
  saveSelectbox("#queries_scene_risk_id", "queries_scene_risk_id");
  saveRadio("#order_order_asc", "order_order_asc");
  saveRadio("#order_order_desc", "order_order_desc");
 */
}

function saveText(selector, id) {
  const node = document.querySelector(selector);
  if (node) {
    node.onchange = () => {
      localStorage[`junk_20180529$_${id}`] = node.value;
    };
  }
}
function saveSelectbox(selector, id) {
  const node = document.querySelector(selector);
  if (node) {
    node.onchange = () => {
      localStorage[`junk_20180529$_${id}`] = node.selectedIndex;
    };
  }
}
function saveRadio(selector, id) {
  const node = document.querySelector(selector);
  if (node) {
    node.onchange = () => {
      localStorage[`junk_20180529$_${id}`] = node.selectedIndex;
    };
  }
}

export function load() { // auto load
/*
  loadSelectbox("#queries_company_id", "queries_company_id");
 */
}

function loadSelectbox(selector, id) {
  const node = document.querySelector(selector);
  if (node) {
    node.selectedIndex = localStorage[`junk_20180529$_${id}`];
  }
}

