const SpecialCharParser = {
  parse(text) {
    if (!text) return text;
    return text.replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"');
  },
};

export default SpecialCharParser;
