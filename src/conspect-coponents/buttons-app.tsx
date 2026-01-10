const B = () => {
  console.log('B');

  return <p>B</p>;
};

export const ButtonsApp = () => {
  return (
    <>
      <B />
    </>
  );
};

gameSettings.currentTemplate = data.easyTemplates.find(
  (item) => item.name === event.target.innerText,
)
  ? data.easyTemplates.find((item) => item.name === event.target.innerText)
  : data.mediumTemplates.find((item) => item.name === event.target.innerText)
    ? data.mediumTemplates.find((item) => item.name === event.target.innerText)
    : data.hardTemplates.find((item) => item.name === event.target.innerText)
      ? data.hardTemplates.find((item) => item.name === event.target.innerText)
      : undefined;
