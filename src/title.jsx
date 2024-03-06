function Title() {
  return <h1>bonjour de react</h1>;
}

function Text({ contenu, contenu2 }) {
  return (
    <div>
      <p>{contenu}</p>
      <p>{contenu2}</p>
    </div>
  );
}

export { Title, Text };
