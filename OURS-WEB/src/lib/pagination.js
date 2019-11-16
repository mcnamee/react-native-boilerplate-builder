export default (meta, link) => {
  const pagination = [];

  if (meta && meta.last_page > 1) {
    for (let p = 1; p <= parseInt(meta.last_page, 10); p++) {
      if (p === 1) {
        pagination.push({ title: p, link });
      } else {
        pagination.push({ title: p, link: `${link}${p}` });
      }
    }
  }

  return pagination;
};
