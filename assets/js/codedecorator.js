window.onload = decorate_code_blocks;


function decorate_code_blocks() {
    divs = [].slice.call(document.getElementsByTagName("div"));

    function is_language_tagged(element) {
        for (token of element.classList.entries()) {
            if (token[1].startsWith("language-")) {
                return true;
            }
        }
        return false;
    }

    filtered = divs.filter(is_language_tagged);

    const prefix_length = "language-".length;

    //  Check how rouge highlighter works
    //  and try to generate this map automatically
    const language_map = new Map([
        ["cpp", "C++"],
        ["rust", "Rust"],
        ["java", "Java"]
    ]);

    //  This might become a get_or_verbatim
    //  Instead of returning a default value, 
    //  if the key is not in the map...
    //  we just use that key as text.
    //  NOTE: this might be tricky; we might need to remove
    //  some text following the three backticks and use that
    //  as our key
    language_map.get_or_default = function (key){
        if (this.has(key)){
            return this.get(key);
        } else {
            return "Pseudo-code";
        }
    }

    for (div of filtered) {
        const language_tag = document.createElement("languagetag");
        found_language = div.classList[0].substring(prefix_length);
        const text_node = document.createTextNode(language_map.get_or_default(found_language));
        language_tag.appendChild(text_node);
        div.parentNode.insertBefore(language_tag, div);
    }
}