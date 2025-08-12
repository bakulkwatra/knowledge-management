export default class FontFamilyInlineTool {
  static get isInline() {
    return true;
  }

  constructor({ api }) {
    this.api = api;
    this.tag = 'SPAN';
    this.class = 'cdx-font-family';
    this.fonts = ['Arial', 'Georgia', 'Roboto', 'Times New Roman', 'Courier New', 'Helvetica'];
  }

  render() {
    const select = document.createElement('select');
    select.classList.add('cdx-font-family-select');

    this.fonts.forEach(font => {
      const option = document.createElement('option');
      option.value = font;
      option.innerText = font;
      option.style.fontFamily = font;
      select.appendChild(option);
    });

    select.addEventListener('change', () => {
      const font = select.value;
      this.api.selection.save();
      this.wrapSelection({ fontFamily: font });
      this.api.selection.restore();
    });

    return select;
  }

  wrapSelection({ fontFamily }) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const span = document.createElement(this.tag);
    span.classList.add(this.class);
    span.style.fontFamily = fontFamily;

    span.appendChild(range.extractContents());
    range.insertNode(span);
  }

  surround() {}
  checkState() { return false; }
  clear() {}
}
