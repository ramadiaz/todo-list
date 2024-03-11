const NotePreview = ({ title, content }) => {
  return (
    <div className="relative bg-orange-200 w-52 h-52 ">
      <h3 className="p-2">{content}</h3>
      <div className="absolute bottom-0 bg-orange-300 w-full px-2 py-2">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default NotePreview;
