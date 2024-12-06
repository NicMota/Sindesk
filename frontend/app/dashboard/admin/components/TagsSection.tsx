export default function TagsSection({selected,setSelected, tags,setTags}) {


    const handleTagClick = (e,tag) => {
        e.preventDefault();
        if (selected.includes(tag)) {
            // Se a tag já estiver selecionada, removê-la da lista de selecionados
            setSelected(selected.filter(t => t !== tag));
            setTags([...tags, tag]); // Adiciona a tag de volta à lista de tags
        } else {
            // Se a tag não estiver selecionada, adicioná-la à lista de selecionados
            setSelected([...selected, tag]);
            setTags(tags.filter(t => t !== tag)); // Remove a tag da lista de tags
        }
    };

    return (
        <div className="border border-black flex flex-col h-fit bg-amber-100">
            <p className="text-amber-900 font-serif capitalize px-2 pt-1 border-b border-amber-800 font-bold">selecione as tags do seu ticket:</p>
            {selected.length !== 0 && (
                <div className="h-fit px-2 flex bg-amber-50">
                    {selected.map((tag, index) => (
                        <Tag key={index} tag={tag} selected={true} handleTagClick={handleTagClick} />
                    ))}
                </div>
            )}
            {tags.length!==0 && (
                <div className="flex px-2 py-1">
                    {tags.map((tag, index) => (
                        <Tag key={index} tag={tag} selected={false} handleTagClick={handleTagClick} />
                    ))}
                </div>
            )}
        </div>
    );
}

function Tag({ tag, selected, handleTagClick }) {
    return (
        <button
            onClick={(e) => handleTagClick(e,tag)}
            className={`m-2 p-1 capitalize rounded w-fit duration-300 font-serif text-amber-900 transition-all ${selected ? 'bg-indigo-700 text-indigo-100' : 'bg-amber-500'} hover:bg-black hover:text-amber-100`}
        >
            {tag.name}
        </button>
    );
}

