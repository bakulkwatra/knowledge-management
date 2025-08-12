export default class FontSizeInlineTool {
  static get isInline() {
    return true;
  }

  constructor({ api }) {
    this.api = api;
    this.tag = 'SPAN';
    this.class = 'cdx-font-size';
    this.sizes = ['12px', '14px', '16px', '18px', '20px', '24px'];
  }

  render() {
    const select = document.createElement('select');
    select.classList.add('cdx-font-size-select');

    this.sizes.forEach(size => {
      const option = document.createElement('option');
      option.value = size;
      option.innerText = size;
      select.appendChild(option);
    });

    select.addEventListener('change', () => {
      const fontSize = select.value;
      this.api.selection.save();
      this.wrapSelection({ fontSize });
      this.api.selection.restore();
    });

    return select;
  }

  wrapSelection({ fontSize }) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const span = document.createElement(this.tag);
    span.classList.add(this.class);
    span.style.fontSize = fontSize;

    span.appendChild(range.extractContents());
    range.insertNode(span);
  }

  surround() {}
  checkState() { return false; }
  clear() {}
}
