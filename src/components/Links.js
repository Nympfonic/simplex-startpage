import weblinks from "../weblinks.json";

export default function Links() {
  const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key])
        acc[key] = [];
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  }

  return (
    <section id="links" className="links">
      {Object.entries(groupBy(weblinks, 'category')).map(([category, items]) =>
        <ul key={category}>
          <li className="weblink-header">{category}</li>
          {items.sort((a, b) => {
            return a.order - b.order;
          }).map((weblink) =>
            <li key={weblink.id} className="weblink">
              <a href={weblink.url}>{weblink.name}</a>
            </li>
          )}
        </ul>)}
    </section>
  );
}