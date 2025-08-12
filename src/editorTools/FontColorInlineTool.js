export default class FontColorInlineTool {
  static get isInline() {
    return true;
  }

  constructor({ api }) {
    this.api = api;
    this.tag = 'SPAN';
    this.class = 'cdx-font-color';
    this.colors = ['#000000', '#444444', '#0055ff', '#aa0000', '#008000', '#8e44ad'];
  }

  render() {
    const select = document.createElement('select');
    select.classList.add('cdx-font-color-select');

    this.colors.forEach(color => {
      const option = document.createElement('option');
      option.value = color;
      option.innerText = color;
      option.style.color = color;
      select.appendChild(option);
    });

    select.addEventListener('change', () => {
      const fontColor = select.value;
      this.api.selection.save();
      this.wrapSelection({ fontColor });
      this.api.selection.restore();
    });

    return select;
  }

  wrapSelection({ fontColor }) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const span = document.createElement(this.tag);
    span.classList.add(this.class);
    span.style.color = fontColor;

    span.appendChild(range.extractContents());
    range.insertNode(span);
  }

  surround() {}
  checkState() { return false; }
  clear() {}
}
